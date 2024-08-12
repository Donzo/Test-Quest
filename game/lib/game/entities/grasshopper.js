ig.module(
	'game.entities.grasshopper'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	

EntityGrasshopper = ig.Entity.extend({
	size: {x: 20, y: 42},
	offset: {x: 22, y: 24},
	maxVel: {x: 4000, y: 4000},
	storeMaxVel: {x: 4000, y: 1000},
	storeVel: {x: null, y: null},
	friction: {x: 400, y: 0},
	
	zIndex: 90,
	gravityFactor: 1,
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.NEVER,
	
	name: null,
	health: 5,
	speed: 100,
	bounceSpeed: 1500,
	flip: false,
	pause: false,
	kOTB: false,
	imHit: false,
	hitByCharge: false,
	bounceDir: null,
	noticePlayer: false,
	overPlayer: false,
	playerVisible: false,
	strikeRange: 50,
	sightDist: 320, //This is used by DIST to Player
	playerEscapeDist: 480,
	myLauncher: null,
	watchTime: 1.5,
	punching: false,
	idle: false,
	flippedWhenIdle: false,
	flipTimeLimit: 1,
	readyToJump: false,
	readyForNextJump: false,
	jumping: false,
	jumpLanded: false,
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(60, 205, 60, .8)',
	
	animSheets: {
		cricket: new ig.AnimationSheet( 'media/enemies/grasshopper.png', 64, 64 )
	},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.attackTimer = new ig.Timer(0);
		this.boundryTimer = new ig.Timer(0);
		this.dieUpTimer = new ig.Timer(0);
		this.bounceTimer = new ig.Timer(0);
		this.sightTimer = new ig.Timer(0);
		this.lastSawPlayerTimer = new ig.Timer(0);
		this.flipTimer = new ig.Timer(0);
		this.flipTimer2 = new ig.Timer(0);
		this.nextJumpTimer = new ig.Timer(0);
		this.readyToJumpTimer = new ig.Timer(0);
		this.jumpingTimer = new ig.Timer(0);
		
		this.damageAnimTimer = new ig.Timer(0);
		this.timeSinceLastPunch = new ig.Timer(0);
		
		this.anims.idle = new ig.Animation( this.animSheets.cricket, .1, [0,1,2,3,4]);
		this.anims.idleFast = new ig.Animation( this.animSheets.cricket, .05, [0,1,2,3,4]);
		this.anims.readyToJump = new ig.Animation( this.animSheets.cricket, 1, [5]);
		this.anims.rising = new ig.Animation( this.animSheets.cricket, 1, [6]);
		this.anims.falling = new ig.Animation( this.animSheets.cricket, 1, [7]);
		this.anims.damaged = new ig.Animation( this.animSheets.cricket, .05, [8,9,10,11,10,9,8]);
		
		//Name me
		if( !ig.global.wm ) { 
			this.nameMe();
			this.setFlip();
		}
		//this.addAnim( 'walk', .1, [0,1,2,3,4,5,6,7] );

	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.kOTB = false;
		this.nameMe();
		this.setFlip();
	},
	nameMe: function(){
		this.name = "grasshopper" + ig.game.grasshopperCount;
		ig.game.grasshopperCount++;
	},
	setFlip: function(){
		var randomFlip = (Math.floor((Math.random() * 1000)));
		this.flip = randomFlip >= 500 ? true : false;
	},
	pauseTimers: function(){
		this.bounceTimer.pause();
		this.attackTimer.pause();
		this.dieUpTimer.pause();
		this.flipTimer.pause();
		this.flipTimer2.pause();
		this.sightTimer.pause();
		this.lastSawPlayerTimer.pause();
		this.boundryTimer.pause();
		this.nextJumpTimer.pause();
		this.timeSinceLastPunch.pause();
		this.damageAnimTimer.pause();
		this.jumpingTimer.pause();
		this.readyToJumpTimer.pause();
	},
	unpauseTimers: function(){
		this.bounceTimer.unpause();
		this.attackTimer.unpause();
		this.dieUpTimer.unpause();
		this.flipTimer.unpause();
		this.flipTimer2.unpause();
		this.sightTimer.unpause();
		this.damageAnimTimer.unpause();
		this.lastSawPlayerTimer.unpause();
		this.timeSinceLastPunch.unpause();
		this.boundryTimer.unpause();
		this.nextJumpTimer.unpause();
		this.jumpingTimer.unpause();
		this.readyToJumpTimer.unpause();
	},
	getReadyToJump: function(){
		var randomJumpTime = (Math.floor((Math.random() * 25) + 5)) * .01;
		this.readyToJumpTimer.set(randomJumpTime);
		this.readyToJump = true;
	},
	jumpNow: function(){
		var randomJumpTime = (Math.floor((Math.random() * 40) + 10)) * .01;
		this.jumpingTimer.set(randomJumpTime);
		this.jumping = true;
		this.jumpLanded = false;
	},
	setNextJump: function(){
		var randomJumpTime = (Math.floor((Math.random() * 100) + 100)) * .01;
		this.nextJumpTimer.set(randomJumpTime);
		this.readyForNextJump = false;
	},

	checkConditions: function(){
		
		//Kill me if player wins
		if (ig.game.getEntityByName('player')){
			var player = ig.game.getEntityByName('player');
			if (player.victoryDance && !this.kOTB){
				this.knockMeOutTheBox();
			}
		}
		
		//Bounce if Im hit and survive
		if (this.imHit && this.bounceTimer.delta() > 0){
			this.imHit = false;	
			this.bounceDir = null;
			if (this.hitByCharge){
				this.hitByCharge = false;
			}
		}
		//End Ready to Jump // Begin Jump
		if (this.readyToJump && this.readyToJumpTimer.delta() >= 0){
			this.readyToJump = false;
			this.jumpNow();
		}
		//End Jump
		if (this.jumping && this.jumpingTimer.delta() >= 0){
			this.jumping = false;
			this.setNextJump();
		}
		//Ready for Next Jump
		if(!this.readyForNextJump && this.nextJumpTimer.delta() >= 0){
			this.readyForNextJump = true;
			this.getReadyToJump();
		}

		//Player specific checks intended to FIND the player
		this.huntPlayer(); 
		
		//Setback last saw timer
		if (this.playerVisible && this.lastSawPlayerTimer.delta() < -this.watchTime){
			 this.lastSawPlayerTimer.set(this.watchTime)	
		}
		//Manage my sight
		if (this.playerVisible && this.lastSawPlayerTimer.delta() > 0){
			//I havent seen player in a while
			this.playerVisible = false;
			if (this.noticePlayer){
				this.noticePlayer = false;	
			}
		}
		//Logic for when player is not around
		if (!this.noticePlayer){
			//Notice the player
			if (this.facingPlayer && this.closeToPlayer && !this.pause && this.playerVisible ){
				this.noticePlayer = true;
			}
		}
		//Logic for a noticed player
		else {
			//Face the player
			if (!this.facingPlayer && this.flipTimer2.delta() >= 0 && this.jumpLanded){
				this.flip = !this.flip;
				this.flipTimer2.set(.25);
			}
			
			if(this.dtp < this.strikeRange){
				this.playerInStrikeRange = true;
			}
			else{
				this.playerInStrikeRange = false;
			}
			//Stop noticing player if he escapes																	  
			if (this.dtp > this.playerEscapeDist){
				this.noticePlayer = false;
			}
		}
	},
	huntPlayer: function(){
		if (ig.game.getEntityByName('player')){
			var player = ig.game.getEntityByName('player');
			
			//Figure out which way the player is so I can figure out if I'm facing him
			this.playerDir = player.pos.x + player.size.x < this.pos.x ? "left" : "right";
			
			//Figure out if I'm facing the player
			if (this.playerDir == "left" && this.flip || this.playerDir == "right" && !this.flip ){
				this.facingPlayer = true;
			}
			else {
				this.facingPlayer = false;
			}
			
			
			var px1 = player.pos.x;
			var px2 = player.pos.x + player.size.x;
			
			var myX1 = this.pos.x;
			var myX2 = this.pos.x + this.size.x;
			//Determine if I'm over the player
			if (myX2 >= px1 && myX2 <= px2 || myX1 <= px2 && myX1 >= px1){
				this.overPlayer = true;
			}
			else{
				this.overPlayer = false;
			}
			
			//Find distance to player
			this.dtp = this.distanceTo( player);
			this.playerY = player.pos.y + player.size.y;
			this.playerChest = player.pos.y + (player.size.y / 2);
			
			//If player is closer than sight distance, I am close to the player
			this.closeToPlayer = this.dtp < this.sightDist ? true : false;
			
			//Look for the player
			this.lookForPlayer();
			
		}
	},
	lookForPlayer: function(){
		if (this.sightTimer.delta() > 0){
			//Look again soon
			this.sightTimer.set(ig.game.sightTime);
			
			//Look for player if Im facing him and close enough
			if (this.facingPlayer && this.closeToPlayer && !this.kOTB ){
				ig.game.spawnEntity( EntitySight, this.pos.x, this.pos.y, {lookingFor: this.name, flip: this.flip});
			}
		}
	},
	paused: function(){
		//Capture Speed
		if (!this.storeVel.x){
			this.storeVel.x = this.vel.x; 	
		}
		if (!this.storeVel.y){
			this.storeVel.y = this.vel.y;	
		}
		this.vel.x = 0;
		this.vel.y = 0;
		this.maxVel.x = 0;
		this.maxVel.y = 0;
		this.storedSpeed = this.speed;
		this.speed = 0;

		//Get pause frame
		if (this.currentAnim){
			this.pauseFrame = this.currentAnim.frame;
		}
		this.pauseTimers();
		this.pause = true;
	},
	unpaused: function(){
		this.maxVel.x = this.storeMaxVel.x;
		this.maxVel.y = this.storeMaxVel.y;
		this.vel.x = this.storeVel.x;
		this.vel.y = this.storeVel.y;
		this.storeVel.x = null; 
		this.storeVel.y = null;
		this.speed = this.storedSpeed;
		
		this.currentAnim.gotoFrame(this.pauseFrame);
		this.unpauseTimers();
		this.pause = false;
	},
	update: function() {
		//Pause and Unpause
		if ( ig.game.pause && !this.pause || ig.game.getEntityByName('player') && ig.game.getEntityByName('player').landed != true ){
			this.paused();
		}
		else if (this.pause && !ig.game.pause){
			this.unpaused();	
		}
		//Check for bounce and stuff
		this.checkConditions();
		
		if (!this.pause){
			this.movements();

			//Flip around when close to edges
			if(this.jumpLanded && !ig.game.collisionMap.getTile(this.pos.x + (!this.flip ? + 312 : this.size.x - 312), this.pos.y + this.size.y + 1) && this.flipTimer.delta() >= 0 && !this.imHit){
				this.flip=!this.flip;
				this.flipTimer.set(this.flipTimeLimit);
			}
		}
		this.animateMe(); 
		
		//Kill me if I've been knocked out and I'm way off the screen
		if (this.kOTB){
			this.boundaries();
		}
		else{
			this.offScreenCheck();	
		}
		this.parent();
	},
	movements: function(){
		//Knocked out the box
		if (this.kOTB){
			if (ig.game.getEntityByName('player')){
				var player = ig.game.getEntityByName('player');
				if (player.pos.x > this.pos.x){
					this.vel.x =-220;
				}
				else{
					this.vel.x = 220;	
				}
			}
			if (this.dieUpTimer.delta() < 0){
				var bFF = this.dieUpTimer.delta() * -1;
				this.vel.y = -2000 * bFF;	
			}
			else{
				var bFF = this.dieUpTimer.delta();
				if (bFF > 1){
					bFF = 1;
				}
				this.vel.y = 1000 * bFF;
			}
		}
		else if (this.imHit){
			if (this.hitByCharge){
				this.vel.x = this.bounceSpeed * this.bounceDir * 2;
			}
			else{
				this.vel.x = this.bounceSpeed * this.bounceDir;
			}
		}
		else if (this.idle){
			this.vel.x = 0;
		}
		else if (this.noticePlayer && this.jumping || this.noticePlayer && !this.jumpLanded){
			//Vel X
			this.vel.x = this.flip ? -400 : 400	
		}
		else if (this.jumping || !this.jumpLanded ){
			this.vel.x = this.flip ? -300 : 300	
		}
		else{
			this.vel.x = 0;
		}
		
		if (!this.kOTB && this.jumping){
			this.vel.y = this.noticePlayer ? -600 : -550;
			if (this.overPlayer && this.noticePlayer){
				this.vel.x = 0;
			}
		}
		else if (this.overPlayer && this.noticePlayer && !this.jumpLanded){
			this.vel.y = 650;
			this.vel.x = 0;
		}
		
	},
	animateMe: function(){
		if (this.pause && this.currentAnim){
			this.currentAnim.gotoFrame(this.pauseFrame);	
		}
		else if (this.damageAnimTimer.delta() < 0 && !this.kOTB ){
			this.currentAnim = this.anims.damaged;	
		}
		else if (this.vel.y < 0){
			this.currentAnim = this.anims.rising;	
		}
		else if (this.vel.y > 0){
			this.currentAnim = this.anims.falling;		
		}
		else if (this.readyToJump){
			this.currentAnim = this.anims.readyToJump;
		}
		else{
			//Swoop if I notice player or just fly
			this.currentAnim = this.noticePlayer ? this.anims.idleFast : this.anims.idle;		
		}
		
		if (this.currentAnim){
			this.currentAnim.flip.x = this.flip;
		}
		
		//Rotation code
		if (this.kOTB && !this.pause){
			this.currentAnim.angle -= Math.PI/.25 * ig.system.tick;
		}
		else{
			this.currentAnim.angle = 0;	
		}
		
	},
	receiveDamage: function( amount, from ) {
		//Hit Sounds
		if (from == "stinger" && !this.kOTB){ig.game.stingerNoise();}
		this.health -= amount;
		this.anims.damaged.rewind();
		this.damageAnimTimer.set(.35);
		if( this.health <= 0 && !this.kOTB) {
			//Play dead creature sound
			//ig.game.birdDeadNoise();
			this.knockMeOutTheBox();
		}
	},
	kill: function() {
		this.parent();	
	},
	
	handleMovementTrace: function( res ) {
		if (this.kOTB){
			//float through walls
			this.pos.x += this.vel.x * ig.system.tick;
			this.pos.y += this.vel.y * ig.system.tick;	
		}
		else{
			this.parent( res );
		
			// Collision with a wall? return!
			if( res.collision.x ) {
				if (this.flipTimer.delta() > 0){
					this.flip = !this.flip;
					this.flipTimer.set(this.flipTimeLimit);
				}
			}
			if ( !this.landed && res.collision.y){
				this.landed = true;
				this.onGirder = false;
			}
			if ( !this.jumpLanded && !this.jumping && res.collision.y){
				this.jumpLanded = true;
			}
		}	
	},
	knockMeOutTheBox: function(){
		this.kOTB = true;
		this.dieUpTimer.set(.35);				
	},
	offScreenCheck: function(){
		if (this.flip && this.pos.x < 0 - this.size.x && this.boundryTimer.delta() > 0 ||  !this.flip && this.pos.x > ig.game.collisionMap.width * ig.game.collisionMap.tilesize && this.boundryTimer.delta() > 0 ){
			this.pos.x = this.spawnX;
			this.pos.y = this.spawnY;
		}
	},
	boundaries: function(){
		if (this.pos.y > ig.system.height * 1.5 + ig.game.screen.y){
			this.kill();
		}
	},
	check: function( other ) {
		if (ig.game.getEntityByName('player')){
			var player = ig.game.getEntityByName('player');
			if (other == player && !player.invin ){
				if (!ig.game.quiz && this.attackTimer.delta() > 0 && !this.kOTB && !this.imHit){
					//ig.game.birdAttackNoise();
					ig.game.quizbox.quiz(1, this.name);
					this.attackTimer.set(ig.game.enemyRecoveryTime);
					ig.game.grasshopperHitNoise();
				}
			}
		}
		
	}
});
	ig.EntityPool.enableFor( EntityGrasshopper );
});