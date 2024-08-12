ig.module(
	'game.entities.sadwojacknest'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntitySadwojacknest = ig.Entity.extend({
	size: {x: 64, y: 64},
	offset: {x: 0, y: 0},
	maxVel: {x: 0, y: 0},
	storeMaxVel: {x: 0, y: 0},
	storeVel: {x: null, y: null},
	friction: {x: 0, y: 0},
	red: false,
	delay: 3,
	
	zIndex: 1,
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 0, 255, .8)',
	_wmScalable: true,
	
	type: ig.Entity.TYPE.NONE, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.NONE, // Check against friendly
	collides: ig.Entity.COLLIDES.NEVER,
	
	health: 9999999,
	respawnTime: .1,

	pause: false,
	spawnInitated: false,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
			
		//Name me
		if( !ig.global.wm ) { 
			this.nameMe();
		}
		
		this.respawnTimer = new ig.Timer(this.delay);
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.antSpawned = false;
		this.spawnInitated = false;
		this.respawnTimer.set(this.delay);
		this.nameMe();
	},
	nameMe: function(){
		this.name = "sadWojackNest" + ig.game.sadWojackNestCount;
		ig.game.sadWojackNestCount++;
	},

	spawnWojack: function(){
		//intiate spawn
		
		var randomSpawnX = this.pos.x + Math.floor((Math.random() * this.size.x));
		var randomSpawnY = this.pos.y + Math.floor((Math.random() * this.size.y));
		
		if (!this.pause && this.respawnTimer.delta() >= 0){
			//console.log('mosquito spawned at (' + randomSpawnX + ", " + randomSpawnY + ")" );
			
			var whichFlip = this.pos.x < 0 ? true : false;
			ig.game.spawnEntity( EntitySadwojack, randomSpawnX, randomSpawnY, {myNest: this.name, flip: whichFlip});
			this.setRespawnTime();
		}
	},
	setRespawnTime: function(){
		//var randomTime = (Math.random() * (1 - 0.01) + 0.01).toFixed(2);
		var buffer = 0.2;
		var randomTime = (Math.random() * (1 - 0.01) + 0.01 + buffer).toFixed(2);

		var rT = parseFloat(randomTime);
		this.respawnTimer.set(rT);
	},
	pauseTimers: function(){
		this.respawnTimer.pause();
	},
	unpauseTimers: function(){
		this.respawnTimer.unpause();
	},
	paused: function(){
		this.pauseTimers();
		this.pause = true;
	},
	unpaused: function(){
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
		
		this.spawnWojack();		
		this.parent();
	}
});
EntitySadwojack = ig.Entity.extend({
	size: {x: 40, y: 60},
	offset: {x: 44, y: 23},
	maxVel: {x: 4000, y: 4000},
	storeMaxVel: {x: 4000, y: 1000},
	storeVel: {x: null, y: null},
	friction: {x: 400, y: 0},
	
	zIndex: 92,
	gravityFactor: 1,
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.NEVER,
	
	flyingEnemy: true,
	name: null,
	health: 1,
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
	playerChest: 0,
	sightDist: 320, //This is used by DIST to Player
	playerEscapeDist: 480,
	myLauncher: null,
	watchTime: 1.5,
	punching: false,
	loadPunch: false,
	screamSound: new ig.Sound( 'media/sounds/scream-02.*' ),
	
	animSheets: {
		sadwojack: new ig.AnimationSheet( 'media/sadwojack.png', 128, 128 )
	},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.attackTimer = new ig.Timer(0);
		this.boundryTimer = new ig.Timer(10);
		this.dieUpTimer = new ig.Timer(0);
		this.bounceTimer = new ig.Timer(0);
		this.sightTimer = new ig.Timer(0);
		this.lastSawPlayerTimer = new ig.Timer(0);
		
		this.anims.fly = new ig.Animation( this.animSheets.sadwojack, .1, [0,1,2,3,4,5] );
		this.anims.flyFast = new ig.Animation( this.animSheets.sadwojack, .05, [0,1,2,3,4,5] );
		this.anims.damaged = new ig.Animation( this.animSheets.sadwojack, .1, [0,1,2,3,4,5] );
		this.anims.idle = new ig.Animation( this.animSheets.sadwojack, 1, [0]);

		
		//Name me
		if( !ig.global.wm ) { 
			this.nameMe();
		}
		//this.addAnim( 'walk', .1, [0,1,2,3,4,5,6,7] );

	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.kOTB = false;
		this.boundryTimer.set(10);
		this.nameMe();
	},
	nameMe: function(){
		this.name = "sadWojack" + ig.game.sadWojackCount;
		ig.game.sadWojackCount++;
	},

	pauseTimers: function(){
		this.bounceTimer.pause();
		this.attackTimer.pause();
		this.dieUpTimer.pause();
		this.sightTimer.pause();
		this.lastSawPlayerTimer.pause();
		this.boundryTimer.pause();
	},
	unpauseTimers: function(){
		this.bounceTimer.unpause();
		this.attackTimer.unpause();
		this.dieUpTimer.unpause();
		this.sightTimer.unpause();
		this.lastSawPlayerTimer.unpause();
		this.boundryTimer.unpause();
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
			if (this.playerDir == "left" && !this.flip || this.playerDir == "right" && this.flip ){
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
				ig.game.spawnEntity( EntitySight, this.pos.x, this.pos.y, {lookingFor: this.name});
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
		else if (this.noticePlayer){
			//Vel X
			this.vel.x = this.flip ? 220 : -220;
			
			//Vel Y
			if (this.playerChest > this.pos.y + this.size.y){
				this.vel.y = 200;
			}
			else if (this.playerChest < this.pos.y - (this.size.y /2)){
				this.vel.y = -200;
			}
		}
		else{
			//Vel X
			this.vel.x = this.flip ? 160 : -160;
			this.vel.y = 0;
			this.gravityFactor = 0;
		}
	},
	animateMe: function(){
		if (this.pause && this.currentAnim){
			this.currentAnim.gotoFrame(this.pauseFrame);	
		}
		else if (this.kOTB){
			this.currentAnim = this.anims.idle;		
		}
		else if (this.imHit){
			this.currentAnim = this.anims.damaged;	
		}
		else{
			//Swoop if I notice player or just fly
			this.currentAnim = this.noticePlayer ? this.anims.flyFast : this.anims.fly;		
		}
		if (this.currentAnim){
			this.currentAnim.flip.x = !this.flip;
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
		//float through walls
		this.pos.x += this.vel.x * ig.system.tick;
		this.pos.y += this.vel.y * ig.system.tick;	
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
			this.kill();
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
					var damage = 10;
					if (ig.game.armorUpgrade){
						damage = 5;
					}
					player.health -=damage;
					this.attackTimer.set(ig.game.enemyRecoveryTime);
					ig.game.mosquitoNoise();
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
	ig.EntityPool.enableFor( EntitySadwojacknest );
	ig.EntityPool.enableFor( EntitySadwojack );
});