ig.module(
	'game.entities.crumblebrick'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityCrumblebrick = ig.Entity.extend({
	size: {x: 32, y: 32},
	offset: {x: 0, y: 0},
	maxVel: {x: 0, y: 0},

	zIndex: -10,
	bounciness: 0,
	landed: false,
	type: ig.Entity.TYPE.A, 
	checkAgainst: ig.Entity.TYPE.BOTH, 
	collides: ig.Entity.COLLIDES.NEVER,
	broke: false,
	rT: 7,
	restoring: false,
	noRestore: false,
	facade: false,
	health: 3000,
	name: "crumblebrick",
	breakTime: 1,
	animSheet: new ig.AnimationSheet( 'media/blocks/crumble-brick.png', 32, 32 ),
	
	breakSound: new ig.Sound( 'media/sounds/crumble-brick-break.*' ),
	buildSound: new ig.Sound( 'media/sounds/crumble-brick-restore.*' ),
	crackSound: new ig.Sound( 'media/sounds/crumble-brick-crack.*' ),
	
	pause: false,
	lvlBeat: false,
	
	spawnCollisionTiles: function(){
		var xTiles = 0;
		var xPos = 0;
		var yTiles = 0;
		
		while (xTiles < 4){
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y, 1 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 8, 1 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 16, 1 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 24, 1 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 31, 1 );	
			xPos += 8;
			xTiles++;
		}
		this.size.y +=2;
		this.pos.y -= 1;
		this.offset.y = -2;
	},
	removeCollisionTiles: function(){
		var xTiles = 0;
		var xPos = 0;
		var yTiles = 0;
		this.size.y -=2;
		this.pos.y += 1;
		//this.offset.y = 0;
		
		while (xTiles < 4){
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 8, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 16, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 24, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 31, 0 );	
			xPos += 8;
			xTiles++;
		}
	},
	pauseTimers: function(){
		this.restoreTimer.pause();
		this.breakTimer.pause();
	},
	unpauseTimers: function(){
		this.restoreTimer.unpause();
		this.breakTimer.unpause();
	},
	paused: function(){
		this.pauseTimers();
		this.pause = true;
	},
	unpaused: function(){	
		this.unpauseTimers();
		this.pause = false;
	},
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.setBornPoint();
		this.restoreTimer = new ig.Timer(this.rT);
		this.breakTimer = new ig.Timer(1);
		//Anims
		this.addAnim( 'brick', 1, [0], true );	
		this.addAnim( 'break1', 1, [1], true );	
		this.addAnim( 'break2', 1, [11], true );	
		this.addAnim( 'break3', 1, [12], true );	
		this.addAnim( 'breakMe', .05, [2,3,10], true );	
		this.addAnim( 'restore', .05, [9,8,7,6,5,0], true );	
		if( !ig.global.wm ) { // not in wm?
			ig.game.sortEntitiesDeferred();
		}
		
	},
	setBornPoint: function(){
		this.bornX = this.pos.x;
		this.bornY = this.pos.y;
	},
	returnToBornPoint: function(){
		this.pos.x = this.bornX;
		this.pos.y = this.bornY;
	},
	reset: function( x, y, settings ) {
		if( !ig.global.wm ) { // not in wm?
			ig.game.sortEntitiesDeferred();
		}
		this.noRestore = false;
		this.setBornPoint();
		this.rubble1 = false;
		this.rubble2 = false;
		this.rubble3 = false;
		this.rubble4 = false;
		this.rubble5 = false;
		this.rubble6 = false;
		this.broke = false;
		this.collides = ig.Entity.COLLIDES.FIXED;
		this.lvlBeat = false;
		this.parent( x, y, settings );
	},
	restoreMe: function(){
		if (!ig.game.muteGame ){
			this.buildSound.volume = .01; 
			this.buildSound.play(); 
		}	
		this.returnToBornPoint();
		this.breaking = false;
		this.broke = false;
		this.setBricks = false;
		this.restoring = true;
		
		this.anims.restore.rewind();
	},
	endRestore: function(){
		this.restoring = false;
	},
	spawnRubble: function(whichRow){
		var yPos = 0;
		if (whichRow == 2){
			yPos+=6;
		}
		else if (whichRow == 3){
			yPos +=12;	
		}
		else if (whichRow == 4){
			yPos +=28;	
		}
		else if (whichRow == 5){
			yPos +=24;	
		}
		else if (whichRow == 6){
			yPos +=32;	
		}
		ig.game.spawnEntity( EntityRubble, this.pos.x, this.pos.y + yPos);	
		ig.game.spawnEntity( EntityRubble, this.pos.x + 6, this.pos.y + yPos);	
		ig.game.spawnEntity( EntityRubble, this.pos.x + 12, this.pos.y + yPos);	
		ig.game.spawnEntity( EntityRubble, this.pos.x + 18, this.pos.y + yPos);
		ig.game.spawnEntity( EntityRubble, this.pos.x + 24, this.pos.y + yPos);	
		ig.game.spawnEntity( EntityRubble, this.pos.x + 32, this.pos.y + yPos);	
	},
	killMe: function(){
		if (this.currentAnim.frame == 2){
			console.log('killed brick');
			this.kill();	
		}
	},
	update: function() {
		if (ig.game.levelBeat && !this.lvlBeat && this.breakTimer.delta() > 0 || ig.game.dying && !this.lvlBeat && this.breakTimer.delta() > 0 ){
			if ((this.pos.x + this.size.x) > ig.game.screen.x && (this.pos.x - this.size.x)< (ig.game.screen.x + ig.system.width) && (this.pos.y + this.size.y) > ig.game.screen.y && (this.pos.y  - this.size.y) < (ig.game.screen.y + ig.system.height)){
				this.breakMe();
			}
			this.lvlBeat = true;
		}
		if (!this.setBricks && ig.game.collisionMap){
			this.setBricks = true;
			if(!this.facade){
				this.spawnCollisionTiles();
			}
		}
		//Pause and Unpause
		if ( ig.game.pause && !this.pause ){
			this.paused();
		}
		else if (this.pause && !ig.game.pause){
			this.unpaused();	
		}
		
		//Pause
		if (this.pause == false && ig.game.quiz == true || this.pause == false && ig.game.cutScene == true) {
			this.pause = true;
			this.paused();	
		}
		//Unpause
		if (this.pause == true && ig.game.quiz == false && ig.game.cutScene == false) {
			this.pause = false;
			this.unpaused();	
		}
		
		this.animMe();
		
		if (this.broke){
			if (this.restoreTimer.delta() > 0){
				this.restoreMe();
			}
		}
		else if (this.breaking && this.breakTimer.delta() > 0){
			this.breakMe();
		}
		else if (this.restoring){
			if (this.currentAnim.frame == 5){
				this.endRestore();
				console.log('end restore');
			}
		}
		this.parent();
	},
	animMe: function(){
		if (this.pause && this.currentAnim){
			this.currentAnim.gotoFrame(this.pauseFrame);	
		}
		else if (this.restoring){
			this.currentAnim = this.anims.restore;	
		}
		else if (this.broke){
			this.currentAnim = this.anims.breakMe;
		}
		else if (this.breaking){
			var halfBroke = -(this.breakTime *.5);
			var almostBroke = -(this.breakTime *.75);
			
			if (this.breakTimer.delta() > almostBroke){
				this.currentAnim = this.anims.break3;
			}
			else if (this.breakTimer.delta() > halfBroke){
				this.currentAnim = this.anims.break2;
			}
			else{
				this.currentAnim = this.anims.break1;		
			}
		}
		else{
			this.currentAnim = this.anims.brick;
		}
	},
	breakMe: function(){
		if (!ig.game.muteGame && !ig.game.levelBeat && !ig.game.transition&& !ig.game.deathScreen && !ig.game.dying){
			this.breakSound.volume = .04; 
			this.breakSound.play(); 
		}	
		this.broke = true;
		this.breaking = false;
		this.restoreTimer.set(this.rT);
		this.currentAnim = this.anims.breakMe.rewind();
		if (!this.facade){
			this.removeCollisionTiles();
		}
		this.spawnRubble(1);
		this.spawnRubble(2);
		this.spawnRubble(3);
		this.spawnRubble(4);
		this.spawnRubble(5);
		this.spawnRubble(6);
		this.restoreTimer.set(this.rT);
		if (this.noRestore || ig.game.levelBeat || ig.game.dying){
			this.kill();	
		}
	},
	check: function( other ) {
		if (ig.game.getEntityByName('player')){
			var player = ig.game.getEntityByName('player');
			if (other == player && !this.breaking && player.pos.y <= this.pos.y && !player.dying ){
				if (!ig.game.muteGame ){
					this.crackSound.volume = .015; 
					this.crackSound.play(); 
				}	
				this.breaking = true;
				this.breakTimer.set(this.breakTime);
			}
			else if (other == player && this.broke){
				this.restoreTimer.set(this.rT);	
			}
			if (other == player && player.onIce){
				player.endOnIce('crumble brick');
			}
		}		
	}
	
});
EntityRubble = ig.Entity.extend({
	size: {x: 6, y: 4},
	offset: {x: 0, y: 0},
	maxVel: {x: 500, y: 800},
	storeMaxVel: {x: 500, y: 700},
	storeVel: {x: null, y: null},
	friction: {x: 400, y: 0},

	type: ig.Entity.TYPE.NONE, 
	checkAgainst: ig.Entity.TYPE.NONE, 
	collides: ig.Entity.COLLIDES.NEVER,
	
	whichWay: null,
	health: 3,
	speed: 200,
	randomX: null,
	randomY: null,
	myAnimBro: null,
	moveTime: .1,
	pause: false,
	animSheet: new ig.AnimationSheet( 'media/rubble.png', 6, 4 ),
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
	setMyAnim: function(){
		this.myAnimBro = 1 + Math.floor(Math.random()* 10);
		
		var whichWay  = 1 + Math.floor(Math.random()* 1000);
		if (whichWay >= 500){
			this.whichWay = "left";	
		}
		else{
			this.whichWay = "right";	
		}
		
		this.randomX = 25 + Math.floor(Math.random()* 100);
		this.randomY = 1000 + Math.floor(Math.random()* 1000);
	},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		//Timers
		var dT = this.moveTime;
		this.dieUpTimer = new ig.Timer(dT);
		this.moveTimer = new ig.Timer(this.moveTime);
		
		this.setMyAnim();
		//Anims
		this.addAnim( 'one', 1, [0], true );
		this.addAnim( 'two', 1, [1], true );
		this.addAnim( 'three', 1, [2], true );
		this.addAnim( 'four', 1, [3], true );
		this.addAnim( 'five', 1, [4], true );
		this.addAnim( 'six', 1, [5], true );
		this.addAnim( 'seven', 1, [6], true );
		this.addAnim( 'eight', 1, [7], true );
		this.addAnim( 'nine', 1, [8], true );
		this.addAnim( 'ten', 1, [9], true );
		
	},
	reset: function( x, y, settings ) {
		this.setMyAnim();
		var dT = this.moveTime;
		this.dieUpTimer.set(dT);
		this.moveTimer.set(this.moveTime);
		
		this.parent( x, y, settings );
	},
	
	update: function() {
		//Pause and Unpause
		if ( ig.game.pause && !this.pause ){
			this.paused();
		}
		else if (this.pause && !ig.game.pause){
			this.unpaused();	
		}
		this.move();
		this.animMe();
		this.boundaries();
		
		this.parent();
	},


	move: function(){
		if (this.pause ){
			this.vel.x = 0;
		}
		else if (ig.game.getEntityByName('player') && this.moveTimer.delta() > 0){
			var player = ig.game.getEntityByName('player');
			if (this.whichWay == "left"){
				this.vel.x =-this.randomX ;
			}
			else{
				this.vel.x = this.randomX ;	
			}
		}
		if ( this.moveTimer.delta() <= 0 || this.pause ){
			this.vel.y = 0;	
		}
		else if (this.dieUpTimer.delta() < 0){
			var bFF = this.dieUpTimer.delta() * -1;
			this.vel.y = -this.randomY * bFF;	
		}
		else{
			var bFF = this.dieUpTimer.delta();
			if (bFF > 1){
				bFF = 1;
			}
			this.vel.y = 1000 * bFF;
		}
	
	},
	
	animMe: function(){
		if (this.myAnimBro == 1){
			this.currentAnim = this.anims.one;		
		}
		else if (this.myAnimBro == 2){
			this.currentAnim = this.anims.two;	
		}
		else if (this.myAnimBro == 3){
			this.currentAnim = this.anims.three;	
		}
		else if (this.myAnimBro == 4){
			this.currentAnim = this.anims.four;	
		}
		else if (this.myAnimBro == 5){
			this.currentAnim = this.anims.five;	
		}
		else if (this.myAnimBro == 6){
			this.currentAnim = this.anims.six;	
		}
		else if (this.myAnimBro == 7){
			this.currentAnim = this.anims.seven;	
		}
		else if (this.myAnimBro == 8){
			this.currentAnim = this.anims.eight;	
		}
		else if (this.myAnimBro == 9){
			this.currentAnim = this.anims.nine;	
		}
		else if (this.myAnimBro == 10){
			this.currentAnim = this.anims.ten;	
		}
		if (!this.pause){
			this.currentAnim.angle -= Math.PI/.25 * ig.system.tick;
		}
	},
	kill: function() {
		//this.sfxDie.play();
		this.parent();
	},
	boundaries: function(){
		if (this.pos.y > ig.system.height * 1.5 + ig.game.screen.y){
			this.kill();
		}
	},
	handleMovementTrace: function( res ) {
		this.pos.x += this.vel.x * ig.system.tick;
		this.pos.y += this.vel.y * ig.system.tick;	
	}
});

ig.EntityPool.enableFor( EntityCrumblebrick );
ig.EntityPool.enableFor( EntityRubble );

});