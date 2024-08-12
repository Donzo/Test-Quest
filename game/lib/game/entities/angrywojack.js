ig.module(
	'game.entities.angrywojack'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	

EntityAngrywojack = ig.Entity.extend({
	size: {x: 28, y: 108},
	offset: {x: 50, y: 46},
	maxVel: {x: 4000, y: 4000},
	storeMaxVel: {x: 4000, y: 1000},
	storeVel: {x: null, y: null},
	friction: {x: 400, y: 0},
	
	zIndex: 88,
	gravityFactor: 1,
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.NEVER,
	
	name: null,
	health: 15,
	speed: 100,
	bounceSpeed: 1500,
	flip: false,
	pause: false,
	kOTB: false,
	imHit: false,
	hitByCharge: false,
	bounceDir: null,
	noticePlayer: false,
	playerVisible: false,
	strikeRange: 750,
	sightDist: 750, //This is used by DIST to Player
	playerEscapeDist: 480,
	myLauncher: null,
	watchTime: 1.5,
	punching: false,
	loadPunch: false,
	idle: false,
	idleTime: 2,
	flippedWhenIdle: false,
	flipTimeLimit: .25,
	hitSound: new ig.Sound( 'media/sounds/wiz-hit.*' ),
	screamSound: new ig.Sound( 'media/sounds/screaming.*' ),

	animSheets: {
		normal: new ig.AnimationSheet( 'media/angry-wojack.png', 112, 162 ),

	},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.anims.walk = new ig.Animation( this.animSheets.normal, 0.1, [0,1,2,3]);
		this.anims.walkFast = new ig.Animation( this.animSheets.normal, 0.05, [0,1,2,3]);
		this.anims.shootone = new ig.Animation( this.animSheets.normal, 0.1, [10,10,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]);
		this.anims.shoottwo = new ig.Animation( this.animSheets.normal, 0.1, [4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]);
		this.anims.shootthree = new ig.Animation( this.animSheets.normal, 0.1, [7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8]);
		this.anims.fade = new ig.Animation( this.animSheets.normal, 0.1, [13,7]);
		this.anims.idle = new ig.Animation( this.animSheets.normal, 0.2, [0,1,2,3]);
		this.anims.idleFast = new ig.Animation( this.animSheets.normal, 0.1, [0,1,2,3]);
		
		this.attackTimer = new ig.Timer(0);
		this.boundryTimer = new ig.Timer(0);
		this.dieUpTimer = new ig.Timer(0);
		this.bounceTimer = new ig.Timer(0);
		this.sightTimer = new ig.Timer(0);
		this.lastSawPlayerTimer = new ig.Timer(0);
		this.flipTimer = new ig.Timer(0);
		this.punchTimer = new ig.Timer(0);
		this.punchingTimer = new ig.Timer(0);
		this.idleTimer = new ig.Timer(0);
		this.timeSinceLastPunch = new ig.Timer(0);
		this.damagedAnimTimer = new ig.Timer(0);
		if (!ig.global.wm){
			this.nameMe();
		}
	},
	
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.kOTB = false;
		this.nameMe();
		this.setIdle();
		this.setFlip();
	},
	nameMe: function(){
		this.name = "angryWojack" + ig.game.angryWojackCount;
		ig.game.angryWojackCount++;
	},
	setFlip: function(){
		var randomFlip = (Math.floor((Math.random() * 1000)));
		this.flip = randomFlip >= 500 ? true : false;
	},
	setIdle: function(){
		var randomIdleTime = (Math.floor((Math.random() * 350) + 150)) * .01;
		this.idleTimer.set(randomIdleTime);
		
		var ranIdleTime = (Math.floor((Math.random() * 200) + 100)) * .01;
		this.idleTime = ranIdleTime;
		this.idle = false;
		
		this.flippedWhenIdle = false;
		
	},
	pauseTimers: function(){
		this.bounceTimer.pause();
		this.attackTimer.pause();
		this.dieUpTimer.pause();
		this.flipTimer.pause();
		this.sightTimer.pause();
		this.lastSawPlayerTimer.pause();
		this.boundryTimer.pause();
		this.punchTimer.pause();
		this.idleTimer.pause();
		this.damagedAnimTimer.pause();
		this.timeSinceLastPunch.pause();
		this.punchingTimer.pause();
	},
	unpauseTimers: function(){
		this.bounceTimer.unpause();
		this.attackTimer.unpause();
		this.dieUpTimer.unpause();
		this.flipTimer.unpause();
		this.sightTimer.unpause();
		this.idleTimer.unpause();
		this.lastSawPlayerTimer.unpause();
		this.damagedAnimTimer.unpause();
		this.timeSinceLastPunch.unpause();
		this.boundryTimer.unpause();
		this.punchTimer.unpause();
		this.punchingTimer.unpause();
	},
	getReadyToPunch: function(){
		this.loadPunch = true;
		var randomPunchTime = (Math.floor((Math.random() * 140) + 10)) * .01;
		this.randomPunchStyle = (Math.floor((Math.random() * 3)));
		this.punchTimer.set(randomPunchTime);
		this.punchSpawned = false;
	},
	cancelPunch: function(){
		this.loadPunch = false;
		this.playerInStrikeRange = false;
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
		
		
		//Randomly Punch
		if (this.loadPunch && !this.punching && this.punchTimer.delta() >= 0 && !this.idle && this.noticePlayer && !this.kOTB || this.loadPunch && this.playerInStrikeRange && this.timeSinceLastPunch.delta() > 2  && !this.kOTB ){
			this.punching = true;
			this.loadPunch = false;
			this.punchSpawned = false;
			this.punchingTimer.set(.8);
			this.anims.shootone.rewind();
			this.anims.shoottwo.rewind();
			this.anims.shootthree.rewind();
			ig.game.antPunchSound();
			//Spawn Attack Object
			if (this.flip){
				//Left
				ig.game.spawnEntity( EntityThunderball, this.pos.x, this.pos.y, {flip:!this.flip});	
			}
			else{
				//Right
				ig.game.spawnEntity( EntityThunderball, this.pos.x, this.pos.y, {flip:!this.flip});	
			}
		}
		//End Punch
		if (this.punching && this.punchingTimer.delta() >= 0){
			this.punching = false;
			this.timeSinceLastPunch.set(0);
		}
		//Idle
		if (!this.idle && !this.noticePlayer && !this.punching && this.idleTimer.delta() >= 0){
			this.idle = true;
		}
		//Flip When Idle
		if (this.idle && this.idleTimer.delta() >= this.idleTime / 3 && !this.flippedWhenIdle){
			this.flip = !this.flip;
			this.flippedWhenIdle = true;
		}
		//Flip When Idle
		if (this.idle && this.idleTimer.delta() >= this.idleTime / 1.5 && this.flippedWhenIdle){
			this.flip = !this.flip;
			this.flippedWhenIdle = false;
		}
		//End Idle
		if (this.idle && this.idleTimer.delta() >= this.idleTime){
			this.setIdle();
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
				//Roll Back Idle.
				this.setIdle();
			}
		}
		//Logic for a noticed player
		else {
			if (!this.loadPunch && !this.punching){
				this.getReadyToPunch();
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
				this.setIdle();
				this.cancelPunch();
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
			if(!ig.game.collisionMap.getTile(this.pos.x + (this.flip ? + 8 : this.size.x - 8), this.pos.y + this.size.y + 1) && this.flipTimer.delta() >= 0 ){
				if(this.vel.y==0){
					this.flip=!this.flip;
					this.flipTimer.set(this.flipTimeLimit);
				}
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
		else if (this.punching || this.idle){
			this.vel.x = 0;
		}
		else if (this.noticePlayer){
			//Vel X
			this.vel.x = this.flip ? -250 : 250	
		}
		else{
			//Vel X
			this.vel.x = this.flip ? -125 : 125
			
		}
	},
	animateMe: function(){
		if (this.pause && this.currentAnim){
			this.currentAnim.gotoFrame(this.pauseFrame);	
		}
		else if (this.punching){
			if (this.randomPunchStyle == 1){
				this.currentAnim = this.anims.shootone;		
			}
			else if (this.randomPunchStyle == 2){
				this.currentAnim = this.anims.shoottwo;		
			}
			else {
				this.currentAnim = this.anims.shootthree;		
			}
		}
		else if (this.idle){
			this.currentAnim = this.anims.idle;		
		}
		else{
			//Swoop if I notice player or just fly
			this.currentAnim = this.noticePlayer ? this.anims.walkFast : this.anims.walk;		
		}
		if (this.currentAnim){
			this.currentAnim.flip.x = !this.flip;
		}
		
		//Rotation code
		if (this.kOTB && !this.pause){
			this.currentAnim.angle -= Math.PI/.25 * ig.system.tick;
		}
		else if (this.currentAnim){
			this.currentAnim.angle = 0;	
		}
		
	},
	receiveDamage: function( amount, from ) {
		//Hit Sounds
		if (!this.kOTB){
			if (!ig.game.muteGame){
				this.hitSound.volume = .15;
				this.hitSound.play();			
			}
		}
		this.health -= amount;
		this.damagedAnimTimer.set(.55);	
		if( this.health <= 0 && !this.kOTB) {
			//Play dead creature sound
			//ig.game.birdDeadNoise();
			this.knockMeOutTheBox();
		}
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
		}	
	},
	knockMeOutTheBox: function(){
		this.kOTB = true;
		this.dieUpTimer.set(.35);
		if (!ig.game.wonTheLevel){
			ig.game.pData.deadGuys++;
			if (!ig.game.muteGame){
				this.screamSound.volume = .15;
				this.screamSound.play();			
			}
		}
		
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
				if (this.attackTimer.delta() > 0 && !this.kOTB && !this.imHit){
					player.health -=10;
					this.attackTimer.set(ig.game.enemyRecoveryTime);
					ig.game.antHitSound();
					player.invincible(.5);
				}
			}
			//I will die if the player is invulnerable
			else if (other == player && !this.kOTB && player.invin && !this.imHit){
				this.knockMeOutTheBox();
			}
		}
		
	}
});

EntityThunderball = ig.Entity.extend({
	size: {x: 21, y: 21},
	offset: {x: 9, y: 9},
	maxVel: {x: 300, y: 50},
	friction: {x: 0, y: 0},
	gravityFactor: 0,
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.NEVER,
	zIndex: 120,
	health: 1,
	gravity:0,
	pause: false,
	kOTB: false,
	bounceDir: null,
	speed: 300,
	storedSpeed: null,
	flip: false,
	name: "thunderball",
	boom: false,
	
	attackSound: new ig.Sound( 'media/sounds/wiz-shot.*' ),
	hitSound: new ig.Sound( 'media/sounds/wiz-hit.*' ),
	fizzleSound: new ig.Sound( 'media/sounds/wiz-fizzle.*' ),
	
	animSheet: new ig.AnimationSheet( 'media/thunder-ball.png', 39, 39 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		//this.throwSpear.volume = .50;
		this.addAnim( 'shock', 0.05, [0,1,2,3] );	
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
	},


	update: function() {
		this.currentAnim = this.anims.shock;	
		this.vel.x = this.flip ? this.speed : -this.speed;
		this.vel.y = 50;
		
		this.parent();
	},
	spawnSparkle: function(){
		var spkPosX = this.pos.x;
		var spkPosY = this.pos.y;
		ig.game.spawnEntity( EntitySparkle, spkPosX, spkPosY, {flip: this.flip, wizard: true});
		this.kill();
	},

	movements: function(){
		if (!this.air){
			var xSpeed = this.flip ? this.speed : -this.speed;
			this.vel.x = xSpeed;
			this.vel.y =0;
		}
	},

	receiveDamage: function( amount, from ) {
		this.health -= amount;
		
		if( this.health <= 0 ) {
			this.spawnSparkle();
			this.kill();
		}
	},
	handleMovementTrace: function( res ) {
		this.parent( res );
		if( res.collision.y  || res.collision.slope ||  res.collision.x) {
			this.spawnSparkle();
			this.kill();
		}
	},
	check: function( other ) {
		if (ig.game.getEntityByName('player')){
			//Snowball hit sound
			if (!ig.game.muteGame) {
				ig.game.teleportNoise2();
			}
			var player = ig.game.getEntityByName('player');
			if (other == player && !player.invin ){
				this.spawnSparkle();
				player.health -=10;
				player.invincible(.5);
				this.kill();
			}
		}
	}
});
EntitySight = ig.Entity.extend({
	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},
	maxVel: {x: 1000, y: 1000},
	storeMaxVel: {x: 1000, y: 1000},
	pushVel: {x: 0, y: 0},
	storeVel: {x: null, y: null},
	friction: {x: 0, y: 0},
	
	name: "sight",
	zIndex: 1,
	bounciness: 0,
	lookingFor: null,
	
	onlyForward: false,
	flip: false,
	
	type: ig.Entity.TYPE.NONE, 
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	health: 99999,
	speed: 1000,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		if( !ig.global.wm ) { // not in wm?
			this.harderOnRepeat();
		}
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.onlyForward = false;
		if( !ig.global.wm ) { // not in wm?
			this.harderOnRepeat();
		}

	},
	harderOnRepeat: function(){
		if(ig.game.pData.timesPassed > 0) {
			this.speed = 1500;
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

		this.pause = false;
	},
	update: function() {
		if (ig.game.dying ){
			this.kill();	
		}
		if ( ig.game.pause && !this.pause ){
			this.paused();
		}
		else if (this.pause && !ig.game.pause){
			this.unpaused();	
		}
		if (!this.pause){
			this.move();
		}
		
		this.parent();
	},

	move: function(){
		
		if (ig.game.getEntityByName('player')){
			if (this.onlyForward){
				this.vel.x = this.flip ? -this.speed : this.speed;
				this.vel.y = 0;
				this.gravityFactor = 0;
			}
			else{
				var player = ig.game.getEntityByName('player')
				var angle = this.angleTo( player );
				this.vel.x = Math.cos(angle) * this.speed;
				this.vel.y = Math.sin(angle) * this.speed;
			}
		}
	},

	handleMovementTrace: function( res ) {
		
		if ( res.collision.x ||  res.collision.y ||  res.collision.slope){
			this.kill();	
		}
		
		this.parent( res );
		
	},
	
	check: function( other ) {
		if (ig.game.getEntityByName('player')){
			var player = ig.game.getEntityByName('player');
			if (other == player && !player.invin){
				if (ig.game.getEntityByName(this.lookingFor)){
					
					var enemy = ig.game.getEntityByName(this.lookingFor);
					enemy.playerVisible = true;
					enemy.lastSawPlayerTimer.set(ig.game.lastSawPlayerTimerDefault);
					//console.log(enemy.name + ' sees player');
				}
			}
		}
		this.kill();
	}
});
	ig.EntityPool.enableFor( EntityAngrywojack );
	ig.EntityPool.enableFor( EntityThunderball );
	ig.EntityPool.enableFor( EntitySight );
});

