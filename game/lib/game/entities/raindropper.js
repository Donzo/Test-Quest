ig.module(
	'game.entities.raindropper'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityRaindropper = ig.Entity.extend({
	size: {x: 64, y: 64},
	offset: {x: 0, y: 0},
	maxVel: {x: 0, y: 0},
	storeMaxVel: {x: 0, y: 0},
	storeVel: {x: null, y: null},
	friction: {x: 0, y: 0},
	
	zIndex: 1,
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(66, 208, 245, 1)',
	_wmScalable: true,
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	health: 9999999,
	speed: 0,
	bounceSpeed: 0,
	flip: false,
	idle: false,
	dropTime: 3, //BaSE dump time
	randomDumpTime: true,
	pause: false,
	heavy: false,
	heavyRate: .03,
	heavyBurst: 7,
	
	rate: 1,
	slow: false,
	slowFactor: .66,
	randomDropTimeValue: 3,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		ig.game.fountain = "on";
		var randomDropTime = 1+Math.floor(Math.random()*3);
		this.rainDownTimer = new ig.Timer(randomDropTime);
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.kOTB = false;
		ig.game.fountain = "on";
		this.setRandomDropTime();
	},
	rainDown: function(){
		if (!this.pause && this.rainDownTimer.delta() > 0){
			
			var x = 1;
			var i = 0;
			
			if (this.heavy){
				x = this.heavyBurst;
			}
			while (i < x) {
				this.setRandomDropTime();
				this.rainDownTimer.set(this.randomDropTimeValue);
			
				var randomDecimal =  (1+Math.floor(Math.random()*100)) / 100;
				var randomDumpX = this.pos.x + (this.size.x * randomDecimal);
			
				ig.game.spawnEntity( EntityRain, randomDumpX, this.pos.y, {slow: this.slow, slowFactor: this.slowFactor});
				i++;
			} 
				
				
		}
	},
	pauseTimers: function(){
		this.rainDownTimer.pause();
	},
	unpauseTimers: function(){
		this.rainDownTimer.unpause();
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
		
		if (ig.game.fountain != "off"){
			this.rainDown();
		}

		if (ig.game.pData.lvl == 1){
			
			ig.game.writeMsg = true;
			ig.game.msgTxt = "Collect Gold and Survive for 5 Minutes!";
			ig.game.msgClr = "#F2A900";
		}
		else if (ig.game.pData.lvl == 2){
			ig.game.fountain = ig.game.satCount >= 110 && !ig.game.wonTheLevel ? "on" : "off";
			if (ig.game.satCount >= 110){
				if (ig.game.msgTxt != "Now take a shower, Wizard!"){
					ig.game.rainOnNoise();
				}
				ig.game.writeMsg = true;
				ig.game.msgTxt = "Now take a shower, Wizard!";
				ig.game.msgClr = "#fae383"; // fae383 F2A900 
			}
			else{
				ig.game.writeMsg = true;
				ig.game.msgTxt = "Stack 110 sats to turn on the shower, Wizard!";
				ig.game.msgClr = "#F2A900";
			}
		}
		else if (ig.game.pData.lvl == 3){
			ig.game.fountain = ig.game.satCount >= 225 && !ig.game.wonTheLevel ? "on" : "off";
			if (ig.game.satCount >= 225){
				if (ig.game.msgTxt != "Now take a shower, Wizard!"){
					ig.game.rainOnNoise();
				}
				ig.game.writeMsg = true;
				ig.game.msgTxt = "Now take a shower, Wizard!";
				ig.game.msgClr = "#fae383"; // fae383 F2A900 
			}
			else{
				ig.game.writeMsg = true;
				ig.game.msgTxt = "Stack 225 sats to turn on the shower, Wizard!";
				ig.game.msgClr = "#F2A900";
			}
		}
		else if (ig.game.pData.lvl == 4){
			ig.game.fountain = ig.game.satCount >= 420 && !ig.game.wonTheLevel ? "on" : "off";
			if (ig.game.satCount >= 420){
				if (ig.game.msgTxt != "Now take a shower, Wizard!"){
					ig.game.rainOnNoise();
				}
				ig.game.writeMsg = true;
				ig.game.msgTxt = "Now take a shower, Wizard!";
				ig.game.msgClr = "#fae383"; // fae383 F2A900 
			}
			else{
				ig.game.writeMsg = true;
				ig.game.msgTxt = "Stack 420 sats to turn on the shower, Wizard!";
				ig.game.msgClr = "#F2A900";
			}
		}
		if (ig.game.wonTheLevel){
			ig.game.msgTxt = "All clean, Wizard!";
		}
		else{
			//ig.game.writeMsg = true;
		}
		this.parent();
	},
	
	setRandomDropTime: function(){
		var randomDropTime1 = Math.floor(Math.random()*100) / 100;
		var randomDropTime2 = Math.floor(Math.random()*100) / 100;
		var randomDropTime3 = Math.floor(Math.random()*100) / 100;
		//Base drop rate plus three random values divided by rate.
		// (3 + .5 + .25 + .96) / 
		this.randomDropTimeValue = (this.dropTime + randomDropTime1 + randomDropTime2 + randomDropTime3) / this.rate;
		
		if (this.heavy){
			this.randomDropTimeValue = this.heavyRate;
		}
		
	}
});
EntityRain= ig.Entity.extend({
	size: {x: 20, y: 20},
	offset: {x: 2, y: 2},
	maxVel: {x: 1000, y: 1000},
	storeMaxVel: {x: 1000, y: 1000},
	storeVel: {x: null, y: null},
	friction: {x: 400, y: 0},
	
	zIndex: 1,
	
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.NEVER,
	
	health: 1,
	flyingEnemy: true,
	speed: 450,
	bounceSpeed: 450,
	runWaitTime: 2.5,
	drop: false,
	dropping: false,
	flip: false,
	idle: false,
	pause: false,
	kOTB: false,
	imHit: false,
	bounceDir: null,
	randomVelX: null,
	wallBumpCount: 0,
	whichDrop: 1,
	fallRate: 350,
	slow: false,
	slowFactor: .66,
	
	//attackSound: new ig.Sound( 'media/sounds/chihuahua.*' ),

	animSheets: {
		rain: new ig.AnimationSheet( 'media/raindrops.png', 32, 32 ),
	},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.dieUpTimer = new ig.Timer(0);
		this.whichDrop =  1+Math.floor(Math.random()*9);

		
		this.anims.dropOne = new ig.Animation( this.animSheets.rain, 1, [0], true);
		this.anims.dropTwo = new ig.Animation( this.animSheets.rain, 1, [1], true);
		this.anims.dropThree = new ig.Animation( this.animSheets.rain, 1, [2], true);
		this.anims.dropFour = new ig.Animation( this.animSheets.rain, 1, [3], true);
		this.anims.dropFive = new ig.Animation( this.animSheets.rain, 1, [4], true);
		this.anims.dropSix = new ig.Animation( this.animSheets.rain, 1, [5], true);
		this.anims.dropSeven = new ig.Animation( this.animSheets.rain, 1, [6], true);
		this.anims.dropEight = new ig.Animation( this.animSheets.rain, 1, [7], true);
		this.anims.dropNine = new ig.Animation( this.animSheets.rain, 1, [8], true);
		if (ig.game.pData.timesPassed > 0){
			this.slowFactor = 1;	
		}
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.whichDrop =  1+Math.floor(Math.random()*9);
		this.kOTB = false;
		if (ig.game.pData.timesPassed > 0){
			this.slowFactor = 1;	
		}
	},
	checkConditions: function(){
		//Kill me if player wins
		if (ig.game.getEntityByName('player')){
			var player = ig.game.getEntityByName('player');
			if (player.victoryDance && !this.kOTB){
				this.knockMeOutTheBox();
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
			this.vel.x = this.bounceSpeed * this.bounceDir;
		}
		else if (this.mode == "falling"){
			this.vel.x = 0;
			//If Im slow, use slowfactor to slow the rate of my fall
			this.vel.y = this.slow ? this.fallRate * this.slowFactor : this.fallRate;
		}
		
	},


	animateMe: function(){
		if (this.pause && this.currentAnim){
			this.currentAnim.gotoFrame(this.pauseFrame);	
		}
		else{
			if (this.whichDrop == 1){
				this.currentAnim = this.anims.dropOne;	
			}
			else if (this.whichDrop == 2){
				this.currentAnim = this.anims.dropTwo;	
			}
			else if (this.whichDrop == 3){
				this.currentAnim = this.anims.dropThree;	
			}
			else if (this.whichDrop == 4){
				this.currentAnim = this.anims.dropFour;	
			}
			else if (this.whichDrop == 5){
				this.currentAnim = this.anims.dropFive;	
			}
			else if (this.whichDrop == 6){
				this.currentAnim = this.anims.dropSix;	
			}
			else if (this.whichDrop == 7){
				this.currentAnim = this.anims.dropSeven;	
			}
			else if (this.whichDrop == 8){
				this.currentAnim = this.anims.dropEight;	
			}
			else if (this.whichDrop == 9){
				this.currentAnim = this.anims.dropNine;	
			}
			else{
				console.log(	'What s up with this.whichDrop =' + this.whichDrop);
			}
		}
		if (this.currentAnim){
			this.currentAnim.flip.x = this.flip;
		}
		//Rotation code
		if (this.kOTB && !this.pause){
			this.currentAnim.angle -= Math.PI/.25 * ig.system.tick;
		}
		else if ( !this.pause && this.vel.x < 0){
			if (this.vel.x <= -200){
				this.currentAnim.angle -= Math.PI/.2 * ig.system.tick;
			}
			else if (this.vel.x <= -100){
				this.currentAnim.angle -= Math.PI/.35 * ig.system.tick;
			}
			else{
				this.currentAnim.angle -= Math.PI/.5 * ig.system.tick;
			}
		}
		else if (!this.pause && this.vel.x > 0){
			if (this.vel.x >= 200){
				this.currentAnim.angle += Math.PI/.2 * ig.system.tick;
			}
			else if (this.vel.x >= 100){
				this.currentAnim.angle += Math.PI/.35 * ig.system.tick;
			}
			else{
				this.currentAnim.angle += Math.PI/.5 * ig.system.tick;
			}
		}
		else{
			if (this.currentAnim){
				this.currentAnim.angle = 0;
			}
		}
		
	},
	receiveDamage: function( amount, from ) {
		//Hit Sounds
		this.health -= amount;		
		this.knockMeOutTheBox();
	},
	kill: function() {
		//this.sfxDie.play();
		this.parent();
	},
	
	handleMovementTrace: function( res ) {
		this.pos.x += this.vel.x * ig.system.tick;
		this.pos.y += this.vel.y * ig.system.tick;	
	},
	knockMeOutTheBox: function(){
		ig.game.spawnEntity( EntityDroplet, this.pos.x, this.pos.y);	
		ig.game.spawnEntity( EntityDroplet, this.pos.x + this.size.x / 2, this.pos.y);	
		ig.game.spawnEntity( EntityDroplet, this.pos.x + this.size.x, this.pos.y);	
		ig.game.spawnEntity( EntityDroplet, this.pos.x + this.size.x / 2, this.pos.y + this.size.y /2);
		ig.game.spawnEntity( EntityDroplet, this.pos.x + this.size.x, this.pos.y + this.size.y / 2);	
		ig.game.spawnEntity( EntityDroplet, this.pos.x + this.size.x /2, this.pos.y + this.size.y / 2);
		this.kill();			
	},
	boundaries: function(){
		if (this.pos.y > ig.system.height * 1.5 + ig.game.screen.y){
			this.kill();
		}
	},
	check: function( other ) {
		if (ig.game.getEntityByName('player')){
			ig.game.rainDropCount++;
			if (!ig.game.wonTheLevel){
				ig.game.rainDropNoise(this.whichDrop);
				var player = ig.game.getEntityByName('player');
				if (player.health > 95){
					player.health = 100;
				}
				else if (player.health > 0){
					player.health += 5;
				}
			}
			if (ig.game.rainDropCount > 25 && !ig.game.wonTheLevel){
				//Set GameWon variable for switching transitions and endings and stuff if the game is over.
				if (ig.game.pData.lvl == ig.game.totalLevels){
					ig.game.gameWon = true;
				}
				//Trigger Player Animation and Prepare for Transition
				var player = ig.game.getEntityByName('player');
				if (player.victoryDance != true && !this.triggered){
					ig.music.stop();
					ig.game.wonTheLevel = true;
					this.triggered = true;
					player.anims.win.rewind();
					player.victoryDance = true;
					player.victoryTimer.set(2.75);
					
					if (!ig.game.muteGame ){	
						ig.game.victorySound.volume = .2; 
						ig.game.victorySound.play();
					}
					ig.game.writeMsg = true;
					ig.game.msgTxt = "All clean, Wizard!";
					ig.game.msgClr = "#4d4d4e";
				}
			}
			this.knockMeOutTheBox();
		}
	}
});
EntityDroplet = ig.Entity.extend({
	size: {x: 5, y: 5},
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
	animSheet: new ig.AnimationSheet( 'media/droplets.png', 5, 5 ),
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
		this.myAnimBro = 1 + Math.floor(Math.random()* 6);
		
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
		//this.addAnim( 'seven', 1, [6], true );
		//this.addAnim( 'eight', 1, [7], true );
		//this.addAnim( 'nine', 1, [8], true );
		//this.addAnim( 'ten', 1, [9], true );
		
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
		/*else if (this.myAnimBro == 7){
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
		}*/
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
	ig.EntityPool.enableFor( EntityRaindropper );
	ig.EntityPool.enableFor( EntityRain );
});