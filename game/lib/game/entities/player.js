ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

	name:"player",
	
	size: {x: 20, y: 50},
	offset: {x: 84, y: 74},
	friction: {x: 4000, y: 0},
	frictionStore: 4000,
	storeVel: {x: 0, y: 0},
	maxVel: {x: 400, y: 6000},
	maxVelStore: {x: 400, y: 6000},
	swingingVel: 50,
	maxX: 400,
	maxY: 6000,

	accelGround: 1000,
	accelAir: 1000,
	
	jump: 800,
	jumpPenalty: 0,
	health: 100,
	
	gravityFactor: 1,
	theGravityFactor: 1,
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(245, 66, 212, 1)',
	
	type: ig.Entity.TYPE.A, 
	
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	pause: false,
	flip: false,
	zIndex: 100,
	
	jumpTime: .4,
	jumpCount: 0,
	
	maxJumpCount:99,
	bounceTime: .35,
	bouncing: false,
	attackTime: .35,
	attackAgainTime: .25,
	attacking: false,
	attackChargeTime: 1.5,
	attackCharging: false,
	chargeAttacking: false,
	
	falling: false,
	hovering: false,
	jumping: false,
	clinging: false,
	clingingLeft: false,
	clingingRight: false,
	hanging: false,
	touchingWall: false,
	noHanging: false,
	
	wallGrabSoundPlayed: false,
	
	onIce: false,
	onTheGround:false,
	landed: false,
	alive: true,
	dying: false,
	victory: false,
	invin: true,
	invinTime: 2,
	readyBro: true,
	hoverTime:10,
	hoverTimerPaused: false,
	rechargeHoverTimerTime: 5,
	hoverAnim: false,
	outOfHoverJuice: false,
	hoverTankFull: true,
	deathMode: null,
	rechargingHT: false,
	cT1: false,
	cT2: false,
	cT3: false,
	cT4: false,
	cT5: false,
	cT6: false,
	cT7: false,
	cT8: false,
	
	animSheets: {
		player: new ig.AnimationSheet( 'media/player-big.png',128, 128 ),
	},
	
	buzzingNow: false,
	hangClimbingNow: false,
	buzzingSound: new ig.Sound( 'media/sounds/buzzing-02.*', false ),
	jumpSound: new ig.Sound( 'media/sounds/jump-03.*', false ),
	wallGrabSound: new ig.Sound( 'media/sounds/wall-grab.*', false ),
	wallBounceSound: new ig.Sound( 'media/sounds/jump.*', false ),
	hangClimbingSound: new ig.Sound('media/sounds/hang-climbing.*', false),
	attackSound: new ig.Sound('media/sounds/wiz-shot.*', false),
	outOfJuiceSound: new ig.Sound('media/sounds/out-of-hover-juice.*', false),
	hoverJuiceFullSound: new ig.Sound( 'media/sounds/hover-juice-full.*', false ),
	chargeAttackSound: new ig.Sound('media/sounds/charge-attack-03.*', false),
	chargingSound: new ig.Sound('media/sounds/charging.*', false),
	chargedSound: new ig.Sound('media/sounds/charged.*', false),
	
	unpauseTimers: function(){
		this.invincibleTimer.unpause();
		this.hoverTimer.unpause();
		this.iceTimer.unpause();
		this.onSpikesTimer.unpause();
		this.releaseHoverTimer.unpause();
		this.pauseTheHTTimer.unpause(); 
		this.rechargeHoverTimerTimer.unpause();
		this.attackTimer.unpause();
		this.attackPendingTimer.unpause();
		this.attackChargeTimer.unpause();
		this.chargeAttackTimer.unpause();
		this.attackAgainTimer.unpause();
		this.clingReadyTimer.unpause();
		this.jumpTimer.unpause(); 
		this.bounceTimer.unpause(); 
		if (ig.game.flashingMessage){
			ig.game.flashingMessageTimer.unpause();
			ig.game.flashingMessageIntravelTimer.unpause();
		}
	},
	pauseTimers: function(){
		this.invincibleTimer.pause();
		this.hoverTimer.pause();
		this.iceTimer.pause();
		this.onSpikesTimer.pause();
		this.releaseHoverTimer.pause(); 
		this.pauseTheHTTimer.pause(); 
		this.jumpTimer.pause();
		this.chargeAttackTimer.pause();
		this.bounceTimer.pause();
		this.attackTimer.pause();
		this.attackPendingTimer.pause();
		this.attackChargeTimer.pause();
		this.attackAgainTimer.pause();
		this.rechargeHoverTimerTimer.pause();
		this.clingReadyTimer.pause();
		if (ig.game.flashingMessage){
			ig.game.flashingMessageTimer.pause();
			ig.game.flashingMessageIntravelTimer.pause();
		}
	},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		//Timers
		this.invincibleTimer = new ig.Timer(0);
		this.victoryTimer = new ig.Timer(0);
		this.jumpTimer = new ig.Timer(0);
		this.bounceTimer = new ig.Timer(0);
		this.attackTimer = new ig.Timer(0);
		this.attackPendingTimer = new ig.Timer(0);
		this.attackAgainTimer = new ig.Timer(0);
		this.chargeAttackTimer = new ig.Timer(0);
		this.attackChargeTimer = new ig.Timer(0);
		this.noHangingTimer = new ig.Timer(0);
		this.deathTimer = new ig.Timer(0);
		this.waitToStartTimer = new ig.Timer(.25);
		this.hoverTimer = new ig.Timer(this.hoverTime);
		this.pauseTheHTTimer = new ig.Timer(0);
		this.releaseHoverTimer = new ig.Timer(0);
		this.rechargeHoverTimerTimer = new ig.Timer(0);
		this.clingReadyTimer = new ig.Timer(0);
		this.iceTimer = new ig.Timer(0);
		this.onSpikesTimer = new ig.Timer(0);
		
	
		
		//Anims
		this.anims.idle = new ig.Animation( this.animSheets.player, .25, [0,1] );
		this.anims.run = new ig.Animation( this.animSheets.player, 0.1, [0,3,2,4] );
		this.anims.jump = new ig.Animation( this.animSheets.player, 1, [5], true );
		this.anims.fall = new ig.Animation( this.animSheets.player, 1, [7], true );
		this.anims.fly = new ig.Animation( this.animSheets.player, 0.05, [25,26,27,26] );
		this.anims.hover = new ig.Animation( this.animSheets.player, 0.05, [25,26,27,26] );
		this.anims.hoverIdle = new ig.Animation( this.animSheets.player, 0.1, [25,26,27,26] );
		this.anims.attack = new ig.Animation( this.animSheets.player, .05, [15,16,17,18,19,20,21,22,23], true );
		this.anims.hoverAttack = new ig.Animation( this.animSheets.player, .05, [5,6,7,8,9,10,11,12,13], true ); 

		this.anims.attackAir = new ig.Animation( this.animSheets.player, .05, [5,6,7,8,9,10,11,12,13], true );
		this.anims.clinging =  new ig.Animation( this.animSheets.player, 1, [1] );
		this.anims.win = new ig.Animation( this.animSheets.player, .1, [35,36,37,38,39,40,41,42,43,44,45,45,46], true );
		this.anims.appear = new ig.Animation( this.animSheets.player, .05, [46,45,44,43,42,41,40,39,38,37,36,35], true );
		this.anims.dying = new ig.Animation( this.animSheets.player, 1, [17], true);
		
		

		this.currentAnim = this.anims.fall;
		this.unpauseHoverTimer("init");
		
		//Make sure mute button exists
		if (!ig.global.wm){
			ig.game.spawnButtons();
			ig.game.storedCoins = ig.game.satCount; 
			
			
			if (ig.game.wingUpgrade){
				this.hoverTime = 20;
			}
		}
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.invincibleTimer.set(0);
		this.hoverTimer.set(this.hoverTime);
		this.dying = false;
		this.dead = false;
		this.pause = false;
		this.victoryDance = false;
		this.landed = false;
		this.deathMode = null;
		this.currentAnim = this.anims.appear;
		this.unpauseHoverTimer("reset");
		//Reset this variable so enemy deaths count towards metrics
		ig.game.clearingLevel = false;
		this.anims.appear.rewind();
		ig.game.storedCoins = ig.game.satCount; 
		//Calculate Token Stuff and Make sure mute button exists
		if (!ig.global.wm){
			ig.game.processTokens('reset');
			ig.game.spawnButtons();
		}
	},
	paused: function(){
		//Pause Movement
		
		this.storeVel.x = this.vel.x ? this.vel.x : 0; 	
		this.storeVel.y = this.vel.y ? this.vel.y : 0;	
		this.vel.x = 0;
		this.vel.y = 0;
		this.maxVelStore.x = this.maxVel.x;
		this.maxVelStore.y = this.maxVel.y;
		this.maxVel.x = 0;
		this.maxVel.y = 0;
		this.theGravityFactor = this.gravityFactor;
		this.gravityFactor = 0;
		//Pause Animation
		
		this.pauseFrame =  this.currentAnim ? this.currentAnim.frame : 0;
		this.pause = true;
		//Pause Timers
		this.pauseTimers();
		ig.game.pause = true;
	},
	unpaused: function(){
		//Restore Movement
		this.maxVel.x = this.maxVelStore.x;
		this.maxVel.y = this.maxVelStore.y;
		this.vel.x = this.storeVel.x;
		this.vel.y = this.storeVel.y;
		 this.gravityFactor = this.theGravityFactor;
		//Restore Timers
		this.unpauseTimers();
		//Restore Switches
		this.pause = false;
		this.anims.appear.rewind();
	},
	invincible: function(time){
		this.invin = true;
		this.invincibleTimer.set(time);
	},
	endOnIce: function(why){
		this.friction.x = this.frictionStore;
		this.onIce = false;	
		if ( !ig.input.state('left') &&  !ig.input.state('right')){
			this.vel.x = 0;
		}
	},
	checkForUnpause: function(){
		//This function clears the dead screen after death once level is restarted.
		if (ig.game.playerDead && !this.dying){
			if ( ig.input.released('attack') ||  ig.input.released('click')){
				ig.game.playerDead = false;
				ig.game.managingPlayerDeath = false;
				ig.game.dying = false;
				ig.game.pause = false;
				ig.game.checkForMessages();
			}	
		}
	},
	makeBeeNoises: function(){
		//Buzzing
		if (this.buzzingNow && !this.readyBro || this.buzzingNow && ig.game.muteGame ||this.buzzingNow && !this.hovering){
			this.buzzingSound.stop();
			this.buzzingSound.loop = false;
			this.buzzingNow = false;
		}
		if (this.hovering && !this.buzzingNow && !ig.game.muteGame){
			this.buzzingSound.loop = true;
			this.buzzingSound.volume = .033;
			this.buzzingSound.play();
			this.buzzingNow = true;
		}
		if (!this.hangClimbingNow && this.hanging && this.vel.x != 0 && !ig.game.muteGame){
			this.hangClimbingNow = true;
			this.hangClimbingSound.loop = true;
			this.hangClimbingSound.volume = .02;
			this.hangClimbingSound.play();
		}
		else if (this.hangClimbingNow && this.vel.x == 0 || this.hangClimbingNow && !this.hanging || this.hangClimbingNow && ig.game.muteGame ){
			this.hangClimbingSound.stop();
			this.hangClimbingNow = false;
		}
	},
	checkVel: function(){
		if (this.vel.y > 1){
			this.falling = true;
		}
	},

	attack: function(){
		if (!this.attacking && this.attackAgainTimer.delta() >= 0){
			this.attacking = true;
			this.attackPending = true;
			this.attackPendingTimer.set(.15);

			this.attackTimer.set(this.attackTime);
			this.attackAgainTimer.set(this.attackTime + this.attackAgainTime);
			if (this.vel.y == 0 && !this.hovering){
				this.anims.attack.rewind();
				this.anims.attackAir.rewind();
				this.anims.hoverAttack.rewind();
			}
			else{
				this.airAttack = true;
				this.anims.attackAir.rewind();
				this.anims.hoverAttack.rewind();
			}
			
			
			if (!ig.game.muteGame){
				this.attackSound.volume = .05;
				this.attackSound.play();
			}

		}

	},

	jumpNow: function(){
		if (!this.jumping && this.jumpCount < this.maxJumpCount){
			if (!this.outOfHoverJuice || this.hoverTimer.delta() < 0){
				var tpenalty = this.hoverTimer.delta() + this.jumpPenalty;
				if (this.jumpCount > 0 ){
					if (this.hoverAnim){
						this.jumpCount++;
						this.hoverTimer.set(tpenalty * -1);
						this.jumping = true;
						this.jumpTimer.set(this.jumpTime);
						this.anims.jump.rewind();
						this.anims.fly.rewind();
						this.anims.hover.rewind();
					}
				}
				else{
					this.jumpCount++;
					this.jumping = true;
					this.jumpTimer.set(this.jumpTime);
					this.anims.jump.rewind();
					this.anims.fly.rewind();
					this.anims.hover.rewind();
					
					
				}
				
				if (!ig.game.muteGame){
					this.jumpSound.volume = .025;
					this.jumpSound.play();
				}
			}
		}
	},
	spikeJump: function(height){
		this.jumping = true;
		this.jumpTimer.set(this.jumpTime * 2);
		this.anims.jump.rewind();
		this.anims.fly.rewind();
		this.anims.hover.rewind();
					
		if (height == 'high'){
			this.jumpTimer.set(this.jumpTime * 3);
			ig.game.spikeJumpNoise2();
		}	
		else{
			ig.game.spikeJumpNoise1();
		}
	},
	bounceNow: function(){
		if (!this.bouncing){
			this.bouncing = true;
			this.bounceTimer.set(this.bounceTime);
			this.anims.fly.rewind();
			this.anims.hover.rewind();
			
			if (!ig.game.muteGame){
				this.wallBounceSound.volume = .075;
				this.wallBounceSound.play();
			}
		}	
	},
	endHover: function(outOfJuice){
		if (outOfJuice){
			this.outOfHoverJuice = true;
			if (!ig.game.muteGame){
				this.outOfJuiceSound.volume = .025;
				this.outOfJuiceSound.play();
			}
		}
		this.pauseHoverTimer("endHover");
		this.hovering = false;
		this.gravityFactor = 1;
	},
	prepareToPauseHover: function(){
		this.pauseTheHT = true;
		this.pauseTheHTTimer.set(.05);
	},
	handleHoverTime: function(){
		//Check HoverTime
		if (this.hovering &&  this.hoverTimer.delta() >= 0){
			this.endHover(true);
		}
		if (this.onTheGround){
			this.rechargeHoverTimer();
		}
		if (this.clinging || this.hanging ){
			this.pauseHoverTimer('clinging or hanging');
		}
	},
	rechargeHoverTimer: function(){
		
		//Initiate Recharge, call once
		if (!this.rechargingHT && !this.hoverTankFull){
			this.rechargingHT = true;

			var baseMultiplyToFind100 = 100 / this.hoverTime;
			var numerator = (this.hoverTimer.delta() * -1) * baseMultiplyToFind100;
			var denominator = this.hoverTime * baseMultiplyToFind100;
			
			//This gets how much percent of the hover bar remains upon landing
			this.hoverTimeRemainingFactor = numerator * .01;
			this.chargeBarNeededFactor = 1 - this.hoverTimeRemainingFactor;
			if (this.hoverTimeRemainingFactor < 0){
				this.hoverTimeRemainingFactor = 0;
			}
			

			//I need to get to subtract this percentage from the total recharge bar time
			var rechargeBarToSubtract = this.rechargeHoverTimerTime * this.hoverTimeRemainingFactor;
			var rechargeTimePlusRemainingHoverTime = this.rechargeHoverTimerTime - rechargeBarToSubtract;
			this.rechargeHoverTimerTimer.set(rechargeTimePlusRemainingHoverTime);

			this.outOfHoverJuice = false;
		}
		else if (this.rechargingHT){
			
			var hoverChargeFactorReplenished = false;
			
			var amountOfTimeToRechage = this.rechargeHoverTimerTime * this.chargeBarNeededFactor;
			var baseMultiplyToFind100 = 100 / amountOfTimeToRechage;
			
			
			var numerator = (this.rechargeHoverTimerTimer.delta() * -1) * baseMultiplyToFind100;
			var denominator = this.rechargeHoverTimerTime * baseMultiplyToFind100;
			
			hoverChargeFactorReplenished = numerator * .01;
			
			if (hoverChargeFactorReplenished < 0){
				hoverChargeFactorReplenished = 0;
				if (!ig.game.muteGame && !this.hoverTankFull){
					this.hoverJuiceFullSound.volume = .01;
					this.hoverJuiceFullSound.play();
				}
				this.hoverTankFull = true;
			}
			
			var hoverRestoredFactor = 1 - hoverChargeFactorReplenished;
						
			if (hoverRestoredFactor >= this.chargeBarNeededFactor){
				this.hoverTankFull = true;
				this.rechargingHT = false;
				this.hoverTimer.set(this.hoverTime);
				this.pauseHoverTimer();
				
				if (!ig.game.muteGame){
					this.hoverJuiceFullSound.volume = .01;
					this.hoverJuiceFullSound.play();
				}
				
			}
			else{
				var myHoverTime = (this.hoverTime * this.hoverTimeRemainingFactor) + (this.hoverTime * hoverRestoredFactor);								
				this.hoverTimer.set(myHoverTime);
				this.pauseHoverTimer();
			}
			
		}
	},
	hover: function(){
		
		if (!this.hovering && this.jumpTimer.delta() > 0 && !this.outOfHoverJuice && !this.cT7){
			this.hovering = true;
			//Hold the hover animation
			this.releaseHover = false;
			this.hoverTankFull = false;
			if (!ig.game.quiz && !ig.game.pause){
				this.unpauseHoverTimer('hover');			
			}
			this.hoverAnim = true;
			this.anims.hover.rewind();
			this.anims.hoverIdle.rewind();
		}
	},
	pauseHoverTimer: function(where){
		this.hoverTimer.pause();
	},
	unpauseHoverTimer: function(where){
		this.hoverTimer.unpause();
	},
	handleInput: function(){
		if( this.vel.y > 300 && ig.input.pressed('jump')) {
			this.hover();
		}
		else if (ig.input.pressed('jump') && !this.clinging ){
			this.jumpNow();
		}
		//Hover and End Hover
		if (ig.input.state('jump')){
			this.hover();
		}
		if (ig.input.released('jump') && this.hovering || !ig.input.state('jump') && this.hovering ){
			this.endHover();
		}
		
		
		
		if (ig.input.pressed('action')){
			this.attack();
		}

		//We keep the hover animation longer than the player hovers because it looks less jerky
		if ( !ig.input.state('jump') && !this.releaseHover || this.outOfHoverJuice && !this.releaseHover ){
			this.releaseHover = true;
			this.releaseHoverTimer.set(.2);
		}

		
		
	},
	movements: function(){
		// move left or right
		var accelAir = this.accelAir;	
		var accel = this.accelGround;
		this.amReady = true;
		
		this.checkVel();
		
		//Add things that make me "not ready" - (Pause player while the rest of the game moves)
		//X
		this.gravityFactor = 1;
		
		
		//Y and Floating Stuff
		if (this.dying || this.dead || ig.game.transition || ig.game.deathScreen || this.victoryDance){
			this.amReady = false;	
			this.vel.y = 0;
			this.accel.y = 0;
			this.gravityFactor = 0;
			if (this.dying && !this.dead){
				this.vel.y = 150 * this.deathTimer.delta();
			}	
		}
		else if (this.bounce){
			if (this.bounce == 'right'){
				this.vel.y = 2500 * this.bounceTimer.delta();
				this.vel.x = -2500 * this.bounceTimer.delta();
			}
			else if (this.bounce == 'left'){
				this.vel.y = 2500 * this.bounceTimer.delta();
				this.vel.x = 2500 * this.bounceTimer.delta();
			}
		}
		else if (this.hovering ){
			this.gravityFactor = 0;
			this.vel.y = 0;
		}
		else if (this.jumping ){
			this.vel.y = 2500 * this.jumpTimer.delta();	
		}
		
		//Lower friction if on ice
		if (this.onIce){
			this.friction.x = 600;		
		}
		
		//X stuff
		if (this.dying || this.dead || this.victoryDance || ig.game.transition || ig.game.deathScreen || ig.game.quiz){
			this.amReady = false;	
			this.vel.x = 0;
			this.accel.x = 0;
		}
		else if (ig.input.state('left') && ig.input.state('right')){
			this.accel.x = 0;									
		}
		else if( ig.input.state('left')) {
			if (this.vel.x > 0){
				this.accel.x = 0;	
				this.vel.x = 0;
			}
			this.accel.x = -accel;
			this.flip = true;
		}
		else if( ig.input.state('right') ) {
			if (this.vel.x < 0){
				this.accel.x = 0;
				this.vel.x = 0;
			}
			this.accel.x = accel;
			this.flip = false;
		}
		else {
			this.accel.x = 0;
		}
	
		
	},
	animMe: function(){
		//Set Animation
		if (this.dying){
			this.currentAnim = this.anims.dying;
		}
		//Victory
		else if (this.victoryDance){
			this.currentAnim = this.anims.win;	
		}
		//Stay on a cool frame when the level loads, before the player first hits the ground.
		else if (!this.landed){
			this.currentAnim = this.anims.appear;
		}
		//Pause frame
		else if (this.pause){
			if (this.currentAnim){
				this.currentAnim.gotoFrame(this.pauseFrame);
			}
		}
		//Attacking
		else if (this.attacking){
			if (this.hovering){
				this.currentAnim = this.anims.hoverAttack;
			}
			else if (this.onTheGround){
				this.currentAnim = this.anims.attack;
			}
			else{
				this.currentAnim = this.anims.attackAir;
			}
		}
		//falling
		else if( this.vel.y > 0 ) {
			this.currentAnim = this.anims.fall;
		}
		//Hover
		else if (this.hovering && this.vel.x != 0){
			this.currentAnim = this.anims.hover;
		}
		else if (this.hovering || this.hoverAnim ){
			this.currentAnim = this.anims.hoverIdle;
		}
		else if( this.jumping ) {
			this.currentAnim = this.anims.jump;
		}
		else if( this.vel.x != 0 && !this.onIce) {
			this.currentAnim = this.anims.run;
		}
		else if( this.onIce && ig.input.state('left') || this.onIce && ig.input.state('right') || this.onIce && ig.input.pressed('left')|| this.onIce && ig.input.pressed('right')) {
			this.currentAnim = this.anims.run;
		}
		else {
			this.currentAnim = this.anims.idle;
			this.anims.run.rewind();
		}
		if (this.currentAnim && this.wallAttacking){
			this.currentAnim.flip.x = !this.flip;
		}
		else if (this.currentAnim && !this.clinging){
			this.currentAnim.flip.x = this.flip;
		}
		
		if (this.currentAnim){
			this.currentAnim.flip.x = !this.flip;
		}
	},
	checkConditions: function(){
		//Victory (start cut)
		if (this.victoryDance && this.victoryTimer.delta() > 0){
			if (ig.game.gameWon && !ig.game.transition){
				ig.game.endingScreen = true;
				//I kind of want to jump to the transition so I'm doing this odd delay.
				ig.game.fadeOut(-.93, ig.game.color1);				
			}
			else if (!ig.game.transition && !ig.game.gameWon){ 
				//FADEOUT
				//ig.game.fadeOut();
				ig.game.levelCleared = true;
				ig.game.slideRightIn("","",3);
			}
		}
		//Load Level and Kill Everything
		if (this.victoryDance && ig.game.readyToLoad){
			ig.game.pData.lvl++;
			//Set this variable so enemy killcount doesn't get crazy high every reload
			ig.game.clearingLevel = true;
			ig.game.saveGame();
			ig.game.LoadLevelBro( ig.game.pData.lvl );
			
		}
		if (this.dying && this.deathTimer.delta() > 0 && !this.dead){
			//Process Death Data - Reload
			ig.game.pData.deaths++;
			ig.game.saveGame();
			ig.game.satCount = ig.game.storedCoins; 
			this.dead = true;
			ig.game.playerDead = true;
			ig.game.fadeOut(0, ig.game.color1);	
		}
		//initiate dying sequence when health drops below 0
		if (this.health <= 0 && !this.dying){
			//Fade out to red or colorwrong
			this.initDeathSeq("fallThrough");
		}
		
		//Lag the end hoover for a minute
		if (this.releaseHover && this.releaseHoverTimer.delta() >= 0 && this.hoverAnim){
			this.hoverAnim = false;
		}
		
	
		//Handle Hover Time
		this.handleHoverTime();
		
		
		var maxX = ig.game.collisionMap.width * ig.game.collisionMap.tilesize;
		var maxY = ig.game.collisionMap.height * ig.game.collisionMap.tilesize;
		//Kill me if I fall out of collision area for some buggy reason.
		if (this.pos.y < 0 && !this.dying|| this.pos.x < 0 && !this.dying || this.pos.y > maxY && !this.dying || this.pos.x > maxX && !this.dying){
			this.initDeathSeq();
		}
		
		//Handle Jumping
		if (this.jumping && this.jumpTimer.delta() > 0){
			this.jumping = false;
		}
		
		//Handle Bouncing
		if (this.bouncing && this.bounceTimer.delta() > 0){
			this.bouncing = false;
			this.bounce = false;
		}
		//Charge attack
		if (this.attackCharging && !this.attackCharged && this.attackChargeTimer.delta() >= 0 ){
			this.attackCharged = true;
			if (!ig.game.muteGame){
				this.chargedSound.volume = .05;
				this.chargedSound.play();
			}
		}
		
		//Spawn attack
		if (this.attackPending && this.attackPendingTimer.delta() >= 0){
			this.attackPending = false;
			//Spawn Attack Object
			if (this.flip){
				//Left
				ig.game.spawnEntity( EntitySpell, this.pos.x - this.size.x, this.pos.y - (this.size.y/7), {flip: this.flip});
				setTimeout(() => {
				   	ig.game.spawnEntity( EntitySpell, this.pos.x - this.size.x, this.pos.y - (this.size.y/7), {flip: this.flip});
				}, 50);
				setTimeout(() => {
				   	ig.game.spawnEntity( EntitySpell, this.pos.x - this.size.x, this.pos.y - (this.size.y/7), {flip: this.flip});
				}, 100);
					
				if (ig.game.wandUpgrade){		
					setTimeout(() => {
				    	ig.game.spawnEntity( EntitySpell, this.pos.x - this.size.x, this.pos.y - (this.size.y/7), {flip: this.flip});
					}, 150);
					setTimeout(() => {
				    	ig.game.spawnEntity( EntitySpell, this.pos.x - this.size.x, this.pos.y - (this.size.y/7), {flip: this.flip});
					}, 200);
				}
			}//, {myHill: this.name}
			else{
				//Right
				ig.game.spawnEntity( EntitySpell, this.pos.x + this.size.x, this.pos.y - (this.size.y/7), {flip: this.flip});
				setTimeout(() => {
			    	ig.game.spawnEntity( EntitySpell, this.pos.x + this.size.x, this.pos.y - (this.size.y/7), {flip: this.flip});
				}, 50);
				setTimeout(() => {
			    	ig.game.spawnEntity( EntitySpell, this.pos.x + this.size.x, this.pos.y - (this.size.y/7), {flip: this.flip});
				}, 100);
				if (ig.game.wandUpgrade){	
					setTimeout(() => {
				    	ig.game.spawnEntity( EntitySpell, this.pos.x + this.size.x, this.pos.y - (this.size.y/7), {flip: this.flip});
					}, 150);
					setTimeout(() => {
				    	ig.game.spawnEntity( EntitySpell, this.pos.x + this.size.x, this.pos.y - (this.size.y/7), {flip: this.flip});
					}, 200);
				}
			}
		}
		//End attack
		if (this.attacking && this.attackTimer.delta() > 0){
			this.attacking = false;
			this.airAttack = false;
		}
		
		//End invinc
		if (this.invin && this.invincibleTimer.delta() > 0){
			this.invin = false;	
		}

		//End Flashing Messages
		if (ig.game.flashingMessage && ig.game.flashingMessageTimer.delta() > 0){
			ig.game.flashingMessage = false;
		}
		
		//Ice
		if (this.onIce && this.iceTimer.delta() > 0 || this.onIce && this.vel.y != 0 && this.iceTimer.delta() > -.08){
			this.endOnIce('timer ran out');
		}
		//Spikes
		if (ig.game.playerOnSpikes && this.onSpikesTimer.delta() > .05){
			ig.game.playerOnSpikes = false;	
		}
	},

	update: function() {
				
		if (!this.musicPlaying && !ig.game.cutScreen && !ig.game.titleScreen && !ig.game.fadeToRed && !ig.game.endingScreen){
			//this.playMusicBro();
			this.musicPlaying = true;
		}
		
		if (this.pause ||  ig.game.playerDead ){
			this.checkForUnpause();	
		}
		if ( ig.game.pause && !this.pause ){
			this.readyBro = false;
			ig.game.sortEntitiesDeferred();
			this.paused();
		}
		else if (this.pause && !ig.game.pause){
			this.readyBro = true;
			this.unpaused();
		}
	
		//Move if the Player is "Ready"
		if (this.readyBro && !ig.game.quiz){
			this.handleInput();
			this.movements();
			this.sizeMe();
			this.checkTiles();
		}
		//Dying
		else if (this.dying){
			//Death stuff
			this.vel.x = 0;	
			this.accel.x = 0;
			this.maxVel.y =  this.jump;
			this.vel.y = this.jump;
			this.collides = ig.Entity.COLLIDES.NEVER;
			this.type = ig.Entity.TYPE.NONE;
			if (this.deathMode == "fallThrough"){
					
			}
		}
		this.makeBeeNoises();
		
		//Set Animation
		this.checkConditions();
		this.animMe();
		
		
		this.parent();
	},
	initDeathSeq: function(deathMode){
		if (deathMode){
			this.deathMode = deathMode;
		}
		ig.music.stop();
		this.deathAnim = true;
		this.anims.dying.rewind();
		this.dying = true;
		ig.game.dying = true;
		this.deathTimer.set(2);
		ig.game.pData.deaths++;
		//Make a wrong sound
		if (!ig.game.muteGame){	ig.game.deadSound.volume = .4; ig.game.deadSound.play(); }

	},
	kill: function(){
		this.parent();
	},
	checkTiles: function(){
        //Tile Margins
        var tMX = 7;
        var tMY = 7;
        //Tile 1
        if (!ig.game.collisionMap.getTile(this.pos.x - tMX, this.pos.y - tMY)){
            this.cT1 = false;
        }
        else{
            this.cT1 = true;    
        }
        //Tile 2
        if (!ig.game.collisionMap.getTile(this.pos.x + this.size.x / 2, this.pos.y - tMY)){
            this.cT2 = false;
        }
        else{
            this.cT2 = true;    
        }
        //Tile 3
        if (!ig.game.collisionMap.getTile(this.pos.x + this.size.x + tMX, this.pos.y - tMY)){
            this.cT3 = false;
        }
        else{
            this.cT3 = true;    
        }
        //Tile 4
        if (!ig.game.collisionMap.getTile(this.pos.x - tMX, this.pos.y + this.size.y / 2)){
            this.cT4 = false;
        }
        else{
            this.cT4 = true;    
        }
        //Tile 5
        if (!ig.game.collisionMap.getTile(this.pos.x + this.size.x + tMX, this.pos.y + this.size.y / 2)){
            this.cT5 = false;
        }
        else{
            this.cT5 = true;    
        }
        //Tile 6
        if (!ig.game.collisionMap.getTile(this.pos.x - tMX, this.pos.y + this.size.y + tMY)){
            this.cT6 = false;
        }
        else{
            this.cT6 = true;    
        }
        //Tile 7
        if (!ig.game.collisionMap.getTile(this.pos.x + this.size.x / 2, this.pos.y + this.size.y + tMY)){
            this.cT7 = false;
        }
        else{
            this.cT7 = true;    
        }
        //Tile 8
        if (!ig.game.collisionMap.getTile(this.pos.x + this.size.x + tMX, this.pos.y + this.size.y + tMY)){
            this.cT8 = false;
        }
        else{
            this.cT8 = true;    
        }
        
        //Correct Wall Clips
        //Right
        if (ig.game.collisionMap.getTile(this.pos.x + this.size.x -1, this.pos.y + this.size.y /2)){
        	this.pos.x -=1;
        }
        //Left
        else if (ig.game.collisionMap.getTile(this.pos.x + 1, this.pos.y + this.size.y / 2 )){
        	this.pos.x +=1;
        }
        //Bottom
        if (ig.game.collisionMap.getTile(this.pos.x + this.size.x / 2, this.pos.y + this.size.y -1)){
        	this.pos.y -=1;
        }
    },
    sizeMe: function(){
    	
    	
	    this.size.x = 16;
	    this.size.y = 50;
		this.offset.x = 56;
		this.offset.y = 76;
		
    	
    },
    
	handleMovementTrace: function( res ) {
		if (this.deathMode == "fallThrough" && this.dying){
			//float through walls
			this.pos.x += this.vel.x * ig.system.tick;
			this.pos.y += this.vel.y * ig.system.tick;	
		}
		else{
			var accel = this.standing ? this.accelGround : this.accelAir;
			
			if (res.collision.x && !res.collision.slope){
				this.touchingWall = true;
			}
			else{
				this.touchingWall = false;
			}
			
			
			if( res.collision.y || res.collision.slope ){
				
				if (this.airAttack && res.collision.y){
					this.airAttack = false;
				}
				//I am really on the ground. I checked for tiles and erything
				if (this.cT6 || this.cT7 || this.cT8){
					this.onTheGround = true;
					this.clingReadyTimer.set(.05);
					this.jumpCount = 0;
					if (this.hoverAnim){
						this.hoverAnim = false;	
					}
				}
				this.vel.y = 0;	
				if (!this.landed){
					this.landed = true;
					ig.game.wonTheLevel = false;
					this.pauseHoverTimer("landed res col");
					ig.game.transition = false;
					ig.game.readyToLoad = false;
					ig.game.playMusicBro();
					//This prevents the player from reseting the cut animation over and over again.
					ig.game.cutCleared = false;
				}
			}
			else{
				this.onTheGround = false;
				this.clingReadyTimer.set(.05);
				this.rechargingHT = false;
			}
			//Continue resolving the collision as normal
			this.parent(res); 
		}
	}
});
EntitySparkle = ig.Entity.extend({
	size: {x: 32, y: 32},
	offset: {x: 0, y: 0},
	maxVel: {x: 0, y: 0},
	storeMaxVel: {x: 500, y: 1000},
	storeVel: {x: null, y: null},

	zIndex: 99,
	type: ig.Entity.TYPE.B, 
	checkAgainst: ig.Entity.TYPE.NONE, 
	collides: ig.Entity.COLLIDES.NEVER,
	
	pause: false,
	pauseFrame: 0,
	health: 3000,
	type: null,
	sparkleStartTime: .25,
	sparkleStopTime: .85,
	dieTime: .9,
	wizard: false,
	//tokenSound: new ig.Sound( 'media/sounds/token.*' ),
	animSheets: {
		rainbowBomb: new ig.AnimationSheet( 'media/sparkleEffect.png', 32, 32 ),
		wizard: new ig.AnimationSheet( 'media/sparkleEffect-bw.png', 32, 32)
		//jump: new ig.AnimationSheet( 'media/monkey-jumping.png', 42, 40 ),
	},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.dieTimer = new ig.Timer(this.dieTime);
		this.sparkleStartTimer = new ig.Timer(this.sparkleStartTime);
		this.sparkleStopTimer = new ig.Timer(this.sparkleStopTime);
		//Anims
		this.anims.blow = new ig.Animation( this.animSheets.rainbowBomb, .05, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], true );
		this.anims.darkBlow = new ig.Animation( this.animSheets.wizard, .05, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], true );
		if( !ig.global.wm ) { // not in wm?
			ig.game.sortEntitiesDeferred();
		}
	},
	
	reset: function( x, y, settings ) {
		this.dieTimer.set(this.dieTime);
		this.anims.blow.rewind();
		this.anims.darkBlow.rewind();
		this.sparkleStartTimer.set(this.sparkleStartTime);
		this.sparkleStopTimer.set(this.sparkleStopTime);
		ig.game.sortEntitiesDeferred();
		this.wizard = false;
		this.parent( x, y, settings );
	},
	
	pauseTimers: function(){
		this.dieTimer.pause();
	},
	unpauseTimers: function(){
		this.dieTimer.unpause();
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
		this.checkCond();
		this.animMe();
		//Pause and Unpause
		if ( ig.game.pause && !this.pause){
			this.paused();
		}
		else if (this.pause && !ig.game.pause){
			this.unpaused();	
		}
		this.parent();
	},
	checkCond: function(){
		//Kill me
		if (this.dieTimer.delta() > 0){
			this.kill();	
		}
	},
	handleMovementTrace: function( res ) {
		//float through walls
		this.pos.x += this.vel.x * ig.system.tick;
		this.pos.y += this.vel.y * ig.system.tick;	
	},
	animMe: function(){
		if (this.pause && this.currentAnim){
			this.currentAnim.gotoFrame(this.pauseFrame);	
		}
		else{
			if (this.wizard){
				this.currentAnim = this.anims.darkBlow;
			}
			else{
				this.currentAnim = this.anims.blow;
			}
		}
	}
});
EntitySpell = ig.Entity.extend({
	size: {x: 6, y: 6},
	offset: {x: 9, y: 9},
	maxVel: {x: 1000, y: 50},
		
	// The fraction of force with which this entity bounces back in collisions
	bounciness: 0, 
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	
	bounceCounter: 0,
	
	attackSound: new ig.Sound( 'media/sounds/wiz-shot.*' ),
	hitSound: new ig.Sound( 'media/sounds/wiz-hit.*' ),
	fizzleSound: new ig.Sound( 'media/sounds/wiz-fizzle.*' ),
	
	animSheet: new ig.AnimationSheet( 'media/wiz-star.png', 24, 24 ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = 50;
		this.addAnim( 'fly', 0.05, [0,1,2] ); 	
	},
	
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = 50;
	},
	killMe: function(){
		this.spawnSparkle();
		if (!ig.game.muteGame){
			this.fizzleSound.volume = .1;
			this.fizzleSound.play();			
		}
		this.kill();
	},
	spawnSparkle: function(){
		var spkPosX = this.pos.x;
		var spkPosY = this.pos.y;
		ig.game.spawnEntity( EntitySparkle, spkPosX, spkPosY, {flip: this.flip});
	},
	
	handleMovementTrace: function( res ) {
		this.parent( res );
		if(res.collision.x || res.collision.y || res.collision.slope) {
			this.killMe();
		}
	},
	
	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the B group.
	check: function( other ) {
		if (other.name =="token"){
			//Do nothing
		}
		else{
			if (!ig.game.muteGame){
				this.hitSound.volume = .1;
				this.hitSound.play();			
			}
			other.receiveDamage( 5, this );
			this.killMe();
		}
	}	
});

ig.EntityPool.enableFor( EntityPlayer );
ig.EntityPool.enableFor( EntitySpell );
ig.EntityPool.enableFor( EntitySparkle );
});
