ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	//'impact.debug.debug',
	'impact.font',
	'plugins.camera',
	'plugins.dynamic-fonts',
	'plugins.quizbox',
	'plugins.touch-button',
	'game.entities.angrywojack',
	'game.entities.angrywojacknest',
	'game.entities.bearwojack',
	'game.entities.bearwojacknest',
	'game.entities.button',
	'game.entities.clockblock',
	'game.entities.clockblockswitch',
	'game.entities.crumblebrick',
	'game.entities.fountainblock',
	'game.entities.ice',
	'game.entities.lockblock',
	'game.entities.mutebutton',
	'game.entities.nohanging',
	'game.entities.player',
	'game.entities.raindropper',
	'game.entities.sadwojacknest',
	'game.entities.spikes',
	'game.entities.switchblock',
	'game.entities.switchblockblue',
	'game.entities.teleportblock',
	'game.entities.vanishingblock',
	'game.levels.l1',
	'game.levels.l2',
	'game.levels.l3',
	'game.levels.l4'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	//Don't forget to set this to the number of total levels or game will end early or something
	totalLevels: 4,
	
	gravity: 2500, // All entities are affected by this
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	//Define Main Colors
	color1:"#2ECC71",
	color2:"#F2A900",
	color3:"#fae383",
	color4:"#7219CC",
	color5:"#7E61B2",
	color6:"#ff161c",
	color7:"#000000",
	colorRight: "#AEFF57",//Lime
	colorWrong: "#ff161c", //Red
	defaultStatTextColor: "#ffffee",
	goldCoins: 0,
	
	buttonLeft: new ig.Image( 'media/buttons-and-logos/button-left.png' ),
	buttonRight: new ig.Image( 'media/buttons-and-logos/button-right.png' ),
	buttonJump: new ig.Image( 'media/buttons-and-logos/button-jump.png' ),
	buttonA: new ig.Image( 'media/buttons-and-logos/button-a.png' ),
	
	//Small Buttons
	buttonLeftSmall: new ig.Image( 'media/buttons-and-logos/button-left-small.png' ),
	buttonRightSmall: new ig.Image( 'media/buttons-and-logos/button-right-small.png' ),
	buttonJumpSmall: new ig.Image( 'media/buttons-and-logos/button-jump-small.png' ),
	buttonASmall: new ig.Image( 'media/buttons-and-logos/button-a-small.png' ),
	
	//Smaller Buttons
	buttonLeftSmaller: new ig.Image( 'media/buttons-and-logos/button-left-smaller.png' ),
	buttonRightSmaller: new ig.Image( 'media/buttons-and-logos/button-right-smaller.png' ),
	buttonJumpSmaller: new ig.Image( 'media/buttons-and-logos/button-jump-smaller.png' ),
	buttonASmaller: new ig.Image( 'media/buttons-and-logos/button-a-smaller.png' ),
	
	buttonMute: new ig.Image( 'media/buttons-and-logos/button-mute.png' ),
	buttonMuted: new ig.Image( 'media/buttons-and-logos/button-muted.png' ),
	buttonMuteSmall: new ig.Image( 'media/buttons-and-logos/button-mute-small.png' ),
	buttonMutedSmall: new ig.Image( 'media/buttons-and-logos/button-muted-small.png' ),
	
	muteGame: false,
	musicLevel: 1,
	satCount: 0,
	//Preloaded Songs
	songs: {
		l1: new ig.Sound('media/music/humdinger.*', false ),
		l2: new ig.Sound('media/music/woodwinds.*', false ),
		l3: new ig.Sound('media/music/quiet-storm.*', false ),
		l4: new ig.Sound('media/music/crystalvania.*', false ),
	},
	
	//Sounds
	rightSound: new ig.Sound( 'media/sounds/right.*' ),
	wrongSound: new ig.Sound( 'media/sounds/wrong.*' ),
	deadSound: new ig.Sound( 'media/sounds/dead.*' ),
	victorySound: new ig.Sound('media/sounds/victory-track.*'),
	youWinSound: new ig.Sound('media/sounds/you-win.*'),
	
	antPunchingSound: new ig.Sound('media/sounds/ant-punching.*', false),
	antHittingSound: new ig.Sound('media/sounds/ant-punch.*', false),
	clockBlockOffSound: new ig.Sound('media/sounds/clockblock-off.*', false),
	clockBlockOnSound: new ig.Sound('media/sounds/clockblock-on.*', false),
	cricketSound: new ig.Sound('media/sounds/cricket.*', false),
	faucetOffSound: new ig.Sound('media/sounds/faucet-off.*', false),
	flowerSound: new ig.Sound('media/sounds/flower.*', false),
	grasshopperSound: new ig.Sound('media/sounds/grasshopper.*', false),
	mosquitoSound: new ig.Sound('media/sounds/mosquito.*', false),
	pokeSound: new ig.Sound( 'media/sounds/spike.*' ),
	rainOnSound: new ig.Sound('media/sounds/rain-on.*', false),
	rainDropSound1: new ig.Sound('media/sounds/raindrop.*', false),
	rainDropSound2: new ig.Sound('media/sounds/raindrop-02.*', false),
	rainDropSound3: new ig.Sound('media/sounds/raindrop-03.*', false),
	rainDropSound4: new ig.Sound('media/sounds/raindrop-04.*', false),
	rainDropSound5: new ig.Sound('media/sounds/raindrop-05.*', false),
	rainDropSound6: new ig.Sound('media/sounds/raindrop-06.*', false),
	spikeJumpSound1: new ig.Sound('media/sounds/spikejump-01.*', false),
	spikeJumpSound2: new ig.Sound('media/sounds/spikejump-02.*', false),
	stingerSound: new ig.Sound('media/sounds/stinger-hit.*', false),
	switchBlockSound1: new ig.Sound('media/sounds/switch-block-01.*', false),
	switchBlockSound2: new ig.Sound('media/sounds/switch-block-02.*', false),
	teleportSound1: new ig.Sound('media/sounds/teleport-01.*', false),
	teleportSound2: new ig.Sound('media/sounds/teleport-02.*', false),
	tickingSound: new ig.Sound('media/sounds/ticking.*', false),
	
	wonTheLevel: false,
	
	flowerHUD: new ig.Image('media/hud-token.png'),
	
	enemyRecoveryTime: .66,
	playerOnSpikes: false,
	
	fadeColor: this.color3,
	slideColor: this.color3,
	
	titleScreen: true,
	deathScreen: false,
	transition: false,
	transitionType: null,
	flashScreen: false,
	flashScreenColor: null,
	flashMsgOnTime: .85,
	flashMsgOffTime: .15,
	flashMsg: true,
	
	//Upgrades
	wandUpgrade: false,
	armorUpgrade: false,
	wingUpgrade: false,
	
	
	flowerCount: 0,
	yellowKey: false,
	redKey: false,
	
	
	ca: null,
	ac1: null,
	ac2: null,
	ac3: null,
	ac4: null,
	ac5: null,
	ac6: null,
	
	//Ending Variables
	flickerColor: false,
	flickerCount: 0,
	flickerTotalCount: 0,
	flickerFreq: 1,
	maxFlickers: 50,
	
	lastSawPlayerTimerDefault: .1,
	
	switchBlock: "blue",


	sadWojackCount: 0,
	sadWojackNestCount: 0,
	bearWojackCount: 0,
	bearwojackNestCount: 0,
	angryWojackCount: 0,
	angrywojackNestCount:0,

	writeMsg: true,
	msgTxt: "Survive for 5:00 minutes!",
	msgClr: "#2ECC71",

	init: function() {
		//Bind Inputs
		ig.input.bind(ig.KEY.MOUSE1, 'click');
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
		ig.input.bind( ig.KEY.SPACE, 'action' );
		
		this.transitionTimer = new ig.Timer(0);
		this.flashScreenTimer = new ig.Timer(0);
		this.flashMessageTimer = new ig.Timer(0);
		this.questionClearTimer = new ig.Timer(0);
		this.deathScreenTimer = new ig.Timer(0);
		this.survivalTimer = new ig.Timer(300);

		//Load Title Screen images into impact
		this.loadTSImages();
		
		//Call for Dynamic Fonts
		this.dFonts = new DynamicFonts();
		
		//Wipe Data
		//this.wipeData();
		
		//Load Level
		//UNCOMMENT THIS WHEN NOT HACKATHONING
		this.LoadLevelBro( this.pData.lvl);
		
		
		//Call For the Quizbox Plugin
		this.quizbox = new Quizbox();
		
		ig.game.spawnEntity( EntityButton, 0, 0, { name: "start" });	


		//Instantiate Camera
		this.setupCamera();
		
		//Set Buttons
		ig.game.setButtons();
		
		if( ig.ua.mobile ) {
			this.amImobile = true;
		}
		else{
			this.amImobile = false;
		}
		
		//this.songs.l2 = new ig.Sound('media/music/song-02.*', false );
		//this.songs.l3 = new ig.Sound('media/music/song-04.*', false );
		
		//MUSIC
		ig.music.add (this.songs.l1, 01, ["l1"] );
		ig.music.add (this.songs.l2, 02, ["l2"] );
		ig.music.add (this.songs.l3, 03, ["l3"] );
		ig.music.add (this.songs.l4, 04, ["l4"] );
		
		ig.music.loop = true;
		ig.music.volume = this.musicLevel;	
		
		//Start Sound
		if (!ig.game.muteGame){	
			//this.startSound.volume = .15; this.startSound.play(); 
		}
		
	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		//Slow Game Down for Animation Debugging
		//ig.Timer.timeScale = .3;
		
		//Set Global Pauses
		if (this.quiz || this.transition || this.titleScreen || this.deathScreen || this.levelCleared || this.endingScreen){
			ig.game.pause = true;
		}
		else{
			ig.game.pause = false;
		}
		//Watch for Wave clear
		this.completeWave();
		
		//Clear the Death Screen
		if (this.deathScreen && this.deathScreenTimer.delta() > 0 && ig.input.released('click') && !ig.game.transition){
			ig.game.sortEntitiesDeferred();
			this.deathScreen = false;
			ig.game.pause = true;
			ig.game.fadeIn(0, this.color1);
			setTimeout(function() {
				window.location.href = 'https://testquest.app/'; // Redirect to the specified URL after 1 second
			}, 150);
		}

		//Clear the Cut Screen
		if (!this.endingScreen && !this.cutCleared && this.transitionReady && ig.input.released('click') && !this.deathScreen || !this.endingScreen && !this.cutCleared && this.transitionReady && ig.input.released('action') && !this.deathScreen || !this.endingScreen && !this.cutCleared && this.transitionReady && ig.input.released('jump') && !this.deathScreen || !this.endingScreen && !this.cutCleared && this.transitionReady && ig.input.pressed('right') && !this.deathScreen){
			ig.game.sortEntitiesDeferred();
			this.cutCleared = true;
			ig.game.slideRightOut("","",3);
			setTimeout(function() {
				window.location.href = 'https://testquest.app/'; // Redirect to the specified URL after 1 second
			}, 150);
		}
		else if (this.cutCleared  && ig.input.released('click')){
			console.log('wont clear')
		} 
		//Clear the end screen
		if (this.endingScreen && !this.cutCleared && ig.game.flickerTotalCount >= this.maxFlickers && ig.input.released('click')  && this.transitionReady){
			ig.game.sortEntitiesDeferred();
			this.cutCleared = true;
			ig.game.fadeIn(0, this.colorRight);
			setTimeout(function() {
				window.location.href = 'https://testquest.app/'; // Redirect to the specified URL after 1 second
			}, 150);
		}
		if (ig.game.getEntityByName('player')){
			var player = ig.game.getEntityByName('player');
			
			//Move the Camera Up To Get out of the buttons Way
			this.cameraHeightFactorY = ig.ua.mobile ? 1 : 1;
			
			//Camera Follow
			if (!this.quiz){
				this.camera.follow( this.player );
			}
		}
	},
	drawClock: function() {
		var ctx = ig.system.context;
		var remainingTime = (this.survivalTimer.delta()) * -1;
		
		// Calculate minutes and seconds
		var minutes = Math.floor(remainingTime / 60);
		var seconds = Math.floor(remainingTime % 60);

		// Format the time as MM:SS
		var formattedTime = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);

		// Set the font and color for the timer
		ctx.font = 'bold 24px Arial';
		ctx.fillStyle = 'white';

		// Calculate the position to center the text at the top of the canvas
		var textWidth = ctx.measureText(formattedTime).width;
		var xPos = (ig.system.width / 2) - (textWidth / 2);
		var yPos = 30; // Position the text 30 pixels from the top
		
		if (this.wonTheLevel){
			formattedTime = "You did it!";
		}
		
		// Draw the formatted time
		ctx.fillText(formattedTime, xPos, yPos);
	},
	completeWave: function(){
		if (this.survivalTimer.delta() > 0 && !ig.game.wonTheLevel){
			this.gameOverScreen = true;
			//Set GameWon variable for switching transitions and endings and stuff if the game is over.
			if (ig.game.pData.lvl == ig.game.totalLevels){
				this.storeGold();
				ig.game.gameWon = true;
			}
			//Trigger Player Animation and Prepare for Transition
			var player = ig.game.getEntityByName('player');
			if (player.victoryDance != true && !this.triggered){
				ig.music.stop();
				ig.game.wonTheLevel = true;
				player.anims.win.rewind();
				player.victoryDance = true;
				player.victoryTimer.set(2.75);
					
				if (!ig.game.muteGame ){	
					ig.game.victorySound.volume = .2; 
					ig.game.victorySound.play();
				}
				ig.game.writeMsg = true;
				ig.game.msgTxt = "You have completed this quest successfully. WTG!";
				ig.game.msgClr = "#2ECC71";
			}
		}
	},
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
				
		//Draw Buttons on Mobile
		if( this.buttonSet && !this.quiz) {
					this.buttonSet.draw(); 
		}

		//Draw Mute Button and HUD
		if (!this.quiz){
			this.drawMuteButton();
			this.drawHUD();
			this.drawHoverBar();
			this.drawClock();
			/*
			if (ig.game.getEntityByName('player')){
				var player = ig.game.getEntityByName('player');
				if (player.attackCharging || player.attackCharged){
					this.drawChargeAttackBar();
				}
			}
			*/
			
		}
		if (this.writeMsg && !this.titleScreen){
			this.writeMessage(this.msgTxt, this.msgClr);
		}
		
		this.drawHealthBar();
		
		//Title
		if (this.titleScreen){
			this.drawTitleScreen();	
		}
		//Death - Cut - Transition ETC.
		if (this.transition){
			this.drawTransition();
		}
		else if (this.deathScreen){
			this.drawABox(0, ig.system.width, 0, ig.system.height, 0, "#E74C3C", true, "#E74C3C");
		}	
		
		if (this.gameOverScreen){
			this.drawABox(0, ig.system.width, 0, ig.system.height, 0, "#FAFAFA", true, "#FAFAFA");
		}
			
		//Stats and Cut Screen Text
		if (this.playerDead){
			this.setCutScreenText("Ouch!", "Click anywhere to return home.", this.color3, this.color2, this.color3);	
			this.drawCutScreenText();
		}
		else if (ig.game.endingScreen){
			this.setCutScreenText("You Are Winner!", "Click Anywhere to Play Again...",this.color3, this.color2, this.color3);		
		}
		else if (ig.game.levelCleared){
			
			var endMsg = "Congratulations! You earned " + this.pData.tokens + "gold coins!";

			this.setCutScreenText(endMsg, "Click anywhere to continue", "#4d4d4e", "#F4D03F",  "#4d4d4e");	
			this.drawCutScreenText();
		}

		//Flash Screen for various purposes
		this.flashScreenCheck();
		
		
		//You Win Screen
		if (this.endingScreen == true){
			this.drawEndingScreen();
			this.drawCutScreenText();
		}
	},
	storeGold: function() {
		var account = window['userAccountNumber'];
		var tokens = ig.game.goldCoins;
		console.log(' tokens= ' +  tokens);

		fetch('/code/php/store-gold-coins.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `account=${encodeURIComponent(account)}&tokens=${encodeURIComponent(tokens)}`
		})
		.then(response => response.text())
		.then(data => {
			console.log(data); // Log the response from the PHP script
			//window.location.href = 'https://testquest.app/';
		})
		.catch((error) => {
			console.error('Error:', error);
			//window.location.href = 'https://testquest.app/';
		});
	},

	drawHealthBar: function(){
		var ctx = ig.system.context;
		var bLeft = ig.system.width - 204;
		var bTop = 20;
		var barWidth = 100;
		var barHeight = 10;
		var innerBarWidth = barWidth;
		var bOuterColor = "#FFFFFF";
		var bInnerColor = "#32CD32";
		
		if (ig.game.getEntityByName('player')){
			var player = ig.game.getEntityByName('player');
			innerBarWidth = barWidth * (player.health / 100);
			if (player.health <= 0){
				bInnerColor = "#000000";
				bOuterColor = "#000000";
				innerBarWidth = 1;
			}
			else if (player.health < 20){
				bInnerColor = "#880808";
				bOuterColor = "#FFCCCB";
			}
			else if (player.health < 50){
				bInnerColor = "#f5f50a";
				bOuterColor = "#880808";
			}
			else if (player.health < 75){
				bOuterColor = "#898976";
			}
			
		}
		this.drawABox(bLeft, bLeft + barWidth, bTop, bTop + barHeight, 2, bOuterColor, true, bOuterColor);
		this.drawABox(bLeft +2, bLeft + innerBarWidth - 2, bTop + 2, bTop + barHeight - 2, 2, bInnerColor, true, bInnerColor);
		
		this.font.draw( "HEALTH", bLeft + (barWidth /2), bTop + 3, ig.Font.ALIGN.CENTER );
		if (player.health <= 10){
			ig.system.context.globalAlpha = 0.2;
			this.drawABox(0, ig.system.width, 0, ig.system.height, 2, "#ff161c", true, "#ff161c");
			ig.system.context.globalAlpha = 1;
		}
		else if (player.health <= 20){
			ig.system.context.globalAlpha = 0.1;
			this.drawABox(0, ig.system.width, 0, ig.system.height, 2, "#ff161c", true, "#ff161c");
			ig.system.context.globalAlpha = 1;
		}

	},
	LoadLevelBro: function(currentLvlNum){
		this.yellowKey = false;
		this.redKey = false;
		ig.game.flowerCount = 0;
		ig.game.wonTheLevel = false;
		if (currentLvlNum <= this.totalLevels){
			ig.game.pause = true;
			//Get level string
			//var whichLvl =  parseInt(currentLvlNum);
			var whichLvl = Math.floor(Math.random() * 4) + 1; // Random Level
			//Turn string into object reference
			var lvlStr = eval("LevelL" + whichLvl);
			//Load the level
			ig.game.muteButtonAlive = false;
			this.loadLevel( lvlStr );
			this.setupCamera();
			this.readyToLoad = false;
			this.spawnButtons();
		}
		else{
			ig.game.victorySound.stop();
			if (!ig.game.muteGame){	
				ig.game.youWinSound.play();
			}
			ig.game.pData.timesPassed++;
			window.localStorage.setItem("timesPassed", ig.game.pData.timesPassed);
			ig.game.pData.lvl = 1;
			this.saveGame();
			ig.game.endingScreen = true;
			ig.game.muteButtonAlive = false;
			var whichLvl = Math.floor(Math.random() * 4) + 1; // Random Level
			this.LoadLevelBro(whichLvl);	
			this.setupCamera();
			this.readyToLoad = false;
			this.spawnButtons();
			this.goldCoins = 0;
		}
	},
	spawnButtons: function(){
		//Spawn mute button if not in worldmaker
		if( !ig.game.muteButtonAlive ) { 
			ig.game.spawnEntity( EntityMutebutton, 0, 0);	
		}
	},
	setupCamera: function() {
		// Set up the camera. The camera's center is at a third of the screen
		// size, i.e. somewhat shift left and up. Damping is set to 3px.		
		this.camera = new Camera( ig.system.width/2.15, ig.system.height/3, 5 );		
		this.camera.trap.size.x = ig.system.width/10;
				this.camera.trap.size.y = ig.system.height/5;
				this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;
		
		// Set camera's screen bounds and reposition the trap on the player
				this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
				this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
		if (ig.game.getEntityByName('fish')){
			var player = ig.game.getEntityByName('fish');
			this.camera.set( player );	
		}
	},
	
	//Use for calculating how many tokens player acquired in a level prior to dying.
	lastTokens: null,
	
	pData: {
		"tokens":0,
		//Level Total
		"tokensLT":0,
		//Game Total
		"tokensGT":0,
		"lvl":1,
		"deaths":0,
		"qRight":0,
		"qWrong":0,
		"timesPassed": 0,
		"deadGuys": 0,
	},

	playMusicBro: function(){
		//Stop any sounds that might be playing when music is called
		ig.game.deadSound.stop();
		ig.game.victorySound.stop();
		
		if(ig.game.pData.lvl == 1){
			ig.game.musicLevel = .25;
			ig.music.play(01);	
		}
		else if(ig.game.pData.lvl == 2){
			ig.game.musicLevel = .25;
			ig.music.play(02);	
		}
		else if(ig.game.pData.lvl == 3){
			ig.game.musicLevel = .25;
			ig.music.play(03);	
		}
		else if(ig.game.pData.lvl == 4){
			ig.game.musicLevel = .25;
			ig.music.play(04);	
		}
	
		if (!ig.game.muteGame){
			ig.music.volume = ig.game.musicLevel;
		}
		else{
			ig.music.volume = 0;
		}
		
	},
	stingerNoise: function(){
		if (!ig.game.muteGame && !ig.game.wonTheLevel){
			this.stingerSound.volume = .1;
			this.stingerSound.play();
		}
	},
	switchBlockNoise1: function(){
		if (!ig.game.muteGame && !ig.game.wonTheLevel){
			this.switchBlockSound1.volume = .1;
			this.switchBlockSound1.play();
		}
	},
	switchBlockNoise2: function(){
		if (!ig.game.muteGame){
			this.switchBlockSound2.volume = .1;
			this.switchBlockSound2.play();
		}
	},
	pokeNoise: function(){
		if (!ig.game.muteGame){
			this.pokeSound.volume = .2;
			this.pokeSound.play();
		}
	},
	mosquitoNoise: function(){
		if (!ig.game.muteGame && !ig.game.wonTheLevel){
			this.mosquitoSound.volume = .2;
			this.mosquitoSound.play();
		}
	},
	cricketHitNoise: function(){
		if (!ig.game.muteGame){
			this.cricketSound.volume = .2;
			this.cricketSound.play();
		}
	},
	grasshopperHitNoise: function(){
		if (!ig.game.muteGame){
			this.grasshopperSound.volume = .2;
			this.grasshopperSound.play();
		}
	},
	flowerNoise: function(){
		if (!ig.game.muteGame){
			this.flowerSound.volume = .1;
			this.flowerSound.play();
		}
	},
	rainOnNoise: function(){
		if (!ig.game.muteGame && !ig.game.wonTheLevel){
			this.rainOnSound.volume = .25;
			this.rainOnSound.play();
		}
	},
	clockBlockOnNoise: function(){
		if (!ig.game.muteGame){
			this.clockBlockOnSound.volume = .1;
			this.clockBlockOnSound.play();
			this.tickingNoise();
		}
	},
	clockBlockOffNoise: function(){
		this.tickingSound.stop();
		if (!ig.game.muteGame){
			this.clockBlockOffSound.volume = .1;
			this.clockBlockOffSound.play();
		}
	},
	tickingNoise: function(){
		if (!ig.game.muteGame){
			this.tickingSound.volume = .2;
			this.tickingSound.loop = true;
			this.tickingSound.play();
		}
	},
	rainDropNoise: function(which){
		if (!ig.game.muteGame && !ig.game.wonTheLevel){
			if (which == 1){
				this.rainDropSound1.volume = .2;
				this.rainDropSound1.play();
			}
			else if (which == 2){
				this.rainDropSound2.volume = .2;
				this.rainDropSound2.play();
			}
			else if (which == 3 || which == 7){
				this.rainDropSound3.volume = .2;
				this.rainDropSound3.play();
			}
			else if (which == 4 || which == 8){
				this.rainDropSound4.volume = .2;
				this.rainDropSound4.play();
			}
			else if (which == 5){
				this.rainDropSound5.volume = .2;
				this.rainDropSound5.play();
			}
			else if (which == 6 || which == 9){
				this.rainDropSound6.volume = .2;
				this.rainDropSound6.play();
			}
		}
	},
	teleportNoise1: function(){
		if (!ig.game.muteGame && !ig.game.wonTheLevel){
			this.teleportSound1.volume = .2;
			this.teleportSound1.play();
		}
	},
	teleportNoise2: function(){
		if (!ig.game.muteGame && !ig.game.wonTheLevel){
			this.teleportSound2.volume = .2;
			this.teleportSound2.play();
		}
	},
	spikeJumpNoise1: function(){
		if (!ig.game.muteGame){
			this.spikeJumpSound1.volume = .2;
			this.spikeJumpSound1.play();
		}
	},
	spikeJumpNoise2: function(){
		if (!ig.game.muteGame){
			this.spikeJumpSound2.volume = .2;
			this.spikeJumpSound2.play();
		}
	},
	faucetOffNoise: function(){
		if (!ig.game.muteGame){
			this.faucetOffSound.volume = .15;
			this.faucetOffSound.play();
		}
	},
	drawHUD: function(){
		var ctx = ig.system.context;
		
		ctx.textBaseline = 'alphabetic';
		//Token HUD
		this.flowerHUD.draw(30, 30);
		this.setFontSizeHUD();
		ig.system.context.fillStyle = '#ffffff';
		ctx.fillText(this.goldCoins, 20 + this.flowerHUD.width * 1.5, 20 + this.flowerHUD.height);
		
	},
	setFontSizeHUD: function(size){
		var ctx = ig.system.context;
		
		if ( ig.system.width <= 500){
			this.dFonts.setTxtSizeHUD(ctx, 1.2);
		}
		else{
			this.dFonts.setTxtSizeHUD(ctx, .75);
		}
		
		if (size == "smaller"){
			this.dFonts.setTxtSizeHUD(ctx, .5);
		}
		else if (size == "smallest"){
			this.dFonts.setTxtSizeHUD(ctx, .25);
		}
	},
	drawCutScreenText: function (headline, bottomline, headerColor, statColor, CTAColor){
		
		var ctx = ig.system.context;
		ig.game.storedBaseline = ctx.textBaseline;
		ctx.textBaseline="hanging"; 
		
		var height = ig.system.height;
		var width = ig.system.width;
		var xMargin = width * .05;
		var yMargin = height * .05;
		var writableAreaX = width - (xMargin * 2);
		
		var addToX = 0;
		var addToY = 0;
		
		//Set Alphas for Fading
		if (this.transition){
			//**************FadeIn*************
			if (this.transitionType == "fadeIn" ){
				var curOpacity = 0;
				if (this.transitionTimer.delta() < 0){
						curOpacity = this.transitionTimer.delta() * -1;
				}			
				ctx.globalAlpha = curOpacity;
			}
			//*************FadeOut*************
			else if (this.transitionType == "fadeOut"){ 
				var curOpacity = 1;
				if (this.transitionTimer.delta() < 1){
					curOpacity = this.transitionTimer.delta();
				}
				ctx.globalAlpha = curOpacity;
			}
			else if (this.transitionType == "slideDownOut" || this.transitionType == "slideUpOut"  || this.transitionType == "slideDownIn" || this.transitionType == "slideUpIn"){
				addToY = this.slideAddToY;
			}
			else if (this.transitionType == "slideRightIn" || this.transitionType == "slideRightOut"){
				addToX = this.slideAddToX;
			}
		}
			
		var statLines = this.calculateStatLines() + 2; // Add to for the call to action
		var statsToDisplay = this.calculateStatLines();
		var yMarginCount = statLines + 1; //add the headline bottom to the margin count
		var yMarginTotalSize = yMarginCount * yMargin;
		//pick a big size for the headline
		this.dFonts.changeFont(ctx, 5);
		//Portrait
		if (height > width){
			this.dFonts.changeFont(ctx, 7);
		}
		//Set Color
		if (headerColor){
			ctx.fillStyle = headerColor;
		}
		else if (this.csHdrClr){
			ctx.fillStyle = this.csHdrClr;
		}
		else{
			ctx.fillStyle = this.defaultStatTextColor;	
		}
		//Set Headline
		var header  = "Enter a headline." ;
		if (headline){
			header =  headline;
		}
		else if (this.csHdrTxt){
			header = this.csHdrTxt
		}
		//Set Cursor Pos
		var xPos = xMargin;
		var yPos = yMargin;
		//Write the headline
		this.dFonts.wrapTheText(ctx, header, xPos + addToX, yPos + addToY, writableAreaX, this.dFonts.style5LineHeight);
		//Reset Cursor Pos
		yPos = this.dFonts.cursorPosYNewLine + yMargin;
		
		this.dFonts.changeFont(ctx, 3);
		//Portrait
		if (height > width){
			this.dFonts.changeFont(ctx, 5);
		}
		//Set Color
		if (statColor){
			ctx.fillStyle = statColor;
		}
		else if (this.csTxtClr){ 
			ctx.fillStyle = this.csTxtClr;
		}
		else{
			ctx.fillStyle = this.defaultStatTextColor;	
		}
		
		//Find how much space we have
		var remainingY = height - yPos; 
		var slotSizeY = remainingY / statLines;
		var ctaYmultiplier = 3;
		if (ig.game.endingScreen){
			this.dFonts.wrapTheText(ctx, "You beat all " + this.totalLevels + " levels!", xPos + addToX, yPos + addToY, writableAreaX, this.dFonts.style3LineHeight); 
		}
		else{
			this.dFonts.wrapTheText(ctx, "Your quest has concluded.", xPos + addToX, yPos + addToY, writableAreaX, this.dFonts.style3LineHeight); 
		}
		this.dFonts.wrapTheText(ctx, "Gold Coins Collected: " +  ig.game.goldCoins, xPos + addToX, yPos + addToY + slotSizeY, writableAreaX, this.dFonts.style3LineHeight);		
		this.dFonts.wrapTheText(ctx, "Wojacks Killed: " + ig.game.pData.deadGuys, xPos + addToX, yPos + addToY + slotSizeY * 2, writableAreaX, this.dFonts.style3LineHeight);
		this.dFonts.wrapTheText(ctx, "Times You've Perished: " + ig.game.pData.deaths, xPos + addToX, yPos + addToY + slotSizeY * 3, writableAreaX, this.dFonts.style3LineHeight); 
		
		//Add one to square it
		ctaYmultiplier += 1.5;
		//Set Color
		if (CTAColor){
			ctx.fillStyle = CTAColor;
		}
		else if (this.csCtaClr){
			ctx.fillStyle = this.csCtaClr;	
		}
		else{
			ctx.fillStyle = this.defaultStatTextColor;	
		}
		
		var bottomlineTxt = "Click anywhere to continue."
		if (bottomline){
			bottomlineTxt = bottomline;
		}
		else if (this.csCtaTxt){
			//Dont display CTA text at the end of the game until flicker stops
			if (this.endingScreen && ig.game.flickerTotalCount < this.maxFlickers){
				bottomlineTxt = "";
			}
			else{
				bottomlineTxt = this.csCtaTxt;
			}
		}
		
		//Flash the CTA when it is time
		if (this.flashMsg){
			this.dFonts.wrapTheText(ctx, bottomlineTxt, xPos + addToX, yPos + addToY + slotSizeY * ctaYmultiplier, writableAreaX, this.dFonts.style3LineHeight);
			if (this.flashMessageTimer.delta() > 0){
				this.flashMsg = false;
				this.flashMessageTimer.set(this.flashMsgOffTime);
			}
		}
		else{
			if (this.flashMessageTimer.delta() > 0){
				this.flashMsg = true;
				this.flashMessageTimer.set(this.flashMsgOnTime);
			}
		}
	
		
		//Headline
		//Tokens Collected
		//Max Level
		//Questions Right
		//Questions Wrong
		//Times Passed
		//Click to start Line = 2
		//Restore Alpha
		ctx.globalAlpha = 1;	
		//Restore Baseline
		ctx.textBaseline=ig.game.storedBaseline; 
	},
	drawChargeAttackBar: function(){
		
		var theWidth = ig.system.width;
		var theHeight = ig.system.height;
		
		var ctx = ig.system.context;
		var player = ig.game.getEntityByName('player');
		var cBarWidth = theWidth * .2;
		var cBarHeight = theHeight * .01;
		var cBar1Height = theHeight * .025;
		

		if (theWidth > theHeight){
			cBarWidth = theWidth * .15;
			cBarHeight = theHeight * .02;
			cBar1Height = theHeight * .05;
		}

		//Old position (under other bar)
		//var cBarPosX = 10; //theWidth - cBarWidth - (cBarWidth / 4); <--Right side
		//var cBarPosY = (theHeight * .05) + (cBar1Height * 1.25);
		
		var cBarPosX = ig.system.width / 2 - cBarWidth / 2; //Middle
		var cBarPosY = theHeight * .05;
		
		var cBarBorder = theWidth * .0025;
		var cBarFill = theWidth * .68;
		
		this.acBarRightX = cBarPosX + cBarWidth;
	
		this.acBarBottomY = cBarPosY + (cBarHeight * 2) + (cBarBorder * 2);
		this.acBarTopY = cBarPosY +  cBarHeight;
		
		this.setFontSizeHUD('smallest');
		
		var myTxt = "Charge Attack";
		var myTxtWidth = ctx.measureText(myTxt).width;
				var fontHeight = ctx.measureText(myTxt).fontBoundingBoxAscent + ctx.measureText(myTxt).fontBoundingBoxDescent;
					
		
		//Reduce Opacity
		ig.system.context.globalAlpha = 0.5;
		
		//Bar full outline color
		if (player.attackCharged){
			ig.system.context.fillStyle ="#FFFFFF";
		}
		//Not full outline color
		else{
			ig.system.context.fillStyle ="#ff0000";	
		}

		//Fill Bar Outline
		ig.system.context.fillRect(cBarPosX, cBarPosY, cBarWidth, cBarHeight);
		
		//Draw Innerbar Color
		ig.system.context.fillStyle ="#FFFFFF";
		ig.system.context.fillRect(cBarPosX + cBarBorder, cBarPosY + cBarBorder, cBarWidth - (cBarBorder * 2), cBarHeight - (cBarBorder * 2));

		//Calculate Charge Width
		var maxWidthOfCharge =  cBarWidth - (cBarBorder * 3);
		var widthOfCharge = null;
		
		ig.system.context.fillStyle ="#eb8155";
		widthOfCharge = maxWidthOfCharge;	
		
		//Full Bar
		if (player.attackCharged && !player.chargeAttacking){
			if (this.chargeBarColor == 1){
				ig.system.context.fillStyle ="#ff0000";
				this.chargeBarColor = 2;
			}
			else{
				ig.system.context.fillStyle ="#FFFFFF";
				this.chargeBarColor = 1;
			}
			ig.system.context.fillRect(cBarPosX + cBarBorder, cBarPosY + cBarBorder, widthOfCharge, cBarHeight - (cBarBorder * 2));	
		}
		//Show Charge
		else{
			
			ig.system.context.fillStyle ="#FFA500";
			
			//Divide 100 by our boosttime to find the right factor
			var baseMultiplyToFind100 = 100 / player.attackChargeTime;
			
			var numerator = (player.attackChargeTimer.delta()) * baseMultiplyToFind100;
			var denominator = player.attackChargeTime * baseMultiplyToFind100;
			
			
			
			if (player.chargeAttacking){
				console.log('charge attacking!!!!')
				//Divide 100 by our boosttime to find the right factor
				baseMultiplyToFind100 = 100 / player.attackChargeTime;
			
				numerator = (player.chargeAttackTimer.delta() * -1) * baseMultiplyToFind100;
				denominator = player.chargeAttackTime * baseMultiplyToFind100;
			}
			
			//This calculation will give us a number between 1 and 100 from whatever the boost mode timer says
			var boostTimeRemaining = numerator * .01;
					
			moreToCharge = maxWidthOfCharge * boostTimeRemaining;
			widthOfCharge = moreToCharge;
			if (player.chargeAttacking){
				ig.system.context.fillRect(cBarPosX + cBarBorder, cBarPosY + cBarBorder, widthOfCharge, cBarHeight - (cBarBorder * 2));
			}
			else{
				ig.system.context.fillRect(cBarPosX + cBarBorder + cBarWidth, cBarPosY + cBarBorder, widthOfCharge, cBarHeight - (cBarBorder * 2));
			}		
		}
		
		//Attack Charge Text
		ctx.fillStyle  = '#FFFFFF';
		ctx.fillText(myTxt, (cBarPosX +  cBarWidth / 2) - (myTxtWidth / 2), cBarPosY + cBarHeight * .75);
		
		//Restore Opacity
		ig.system.context.globalAlpha = 1;
	},
	//Draw Hover Bar
	drawHoverBar: function(){
		var theWidth = ig.system.width;
		var theHeight = ig.system.height;
		
		var ctx = ig.system.context;
		var player = ig.game.getEntityByName('player');
		
		var cBarWidth = theWidth * .2;
		var cBarHeight = theHeight * .025;

		if (theWidth > theHeight){
			cBarWidth = theWidth * .15;
			cBarHeight = theHeight * .05;
		}

		var cBarPosX = 10; //theWidth - cBarWidth - (cBarWidth / 4); <--Right side
		var cBarPosY = 100;
		var cBarBorder = theWidth * .0025;
		var cBarFill = theWidth * .68;
		
		this.cBarRightX = cBarPosX + cBarWidth;
	
		this.cBarBottomY = cBarPosY + (cBarHeight * 2) + (cBarBorder * 2);
		this.cBarTopY = cBarPosY +  cBarHeight;
		
		this.setFontSizeHUD('smaller');
		
		var myTxt = "Hover";
		var myTxtWidth = ctx.measureText(myTxt).width;
				var fontHeight = ctx.measureText(myTxt).fontBoundingBoxAscent + ctx.measureText(myTxt).fontBoundingBoxDescent;
					
		
		//Reduce Opacity
		ig.system.context.globalAlpha = 0.5;
		
		//Bar full outline color
		if (player.hoverTankFull){
			ig.system.context.fillStyle ="#FFFFFF";
		}
		//Not full outline color
		else{
			ig.system.context.fillStyle ="#1a32ff";	
		}

		//Fill Bar Outline
		ig.system.context.fillRect(cBarPosX, cBarPosY, cBarWidth, cBarHeight);
		
		//Draw Innerbar Color
		ig.system.context.fillStyle ="#FFFFFF";
		ig.system.context.fillRect(cBarPosX + cBarBorder, cBarPosY + cBarBorder, cBarWidth - (cBarBorder * 2), cBarHeight - (cBarBorder * 2));

		//Calculate Charge Width
		var maxWidthOfCharge =  cBarWidth - (cBarBorder * 2);
		var widthOfCharge = null;
		
		ig.system.context.fillStyle ="#BFEB55";
		widthOfCharge = maxWidthOfCharge;	
			
		//Full Bar
		if (player.hoverTankFull){
			ig.system.context.fillStyle ="#BFEB55";
			
			ig.system.context.fillRect(cBarPosX + cBarBorder, cBarPosY + cBarBorder, widthOfCharge, cBarHeight - (cBarBorder * 2));	
		}
		//Out of juice
		else if (player.outOfHoverJuice ||player.hoverTimer.delta() > 0 ){
			//Do nothing because bar is empty	
		}
		//Show Attack Drain
		else{
			
			ig.system.context.fillStyle ="#ffe71a";
			
			//Divide 100 by our boosttime to find the right factor
			var baseMultiplyToFind100 = 100 / player.hoverTime;
			
			var numerator = (player.hoverTimer.delta() * -1) * baseMultiplyToFind100;
			var denominator = player.hoverTime * baseMultiplyToFind100;
			
			//This calculation will give us a number between 1 and 100 from whatever the boost mode timer says
			var boostTimeRemaining = numerator * .01;
			
					
			moreToCharge = maxWidthOfCharge * boostTimeRemaining;
			widthOfCharge = moreToCharge;
			ig.system.context.fillRect(cBarPosX + cBarBorder, cBarPosY + cBarBorder, widthOfCharge, cBarHeight - (cBarBorder * 2));
			
		}
		//Hover Text
		ctx.fillStyle  = '#FFFFFF';
		ctx.fillText(myTxt, (cBarPosX +  cBarWidth / 2) - (myTxtWidth / 2), cBarPosY + cBarHeight * .75);
		
		//Restore Opacity
		ig.system.context.globalAlpha = 1;
		
	},
	calculateStatLines: function(){
		var statLines = 0;
		//Display tokens?
		statLines++;
		//Display levels?
		statLines++;
		//Display deaths?
		//statLines++;
		//Question Right?
		statLines++;
		//Question Wrong?
		statLines++;
		//Times Passed?
		if (ig.game.pData.timesPassed){
			statLines++;
		}
		return statLines;
	},
	drawABox: function(lx, rx, ty, by, lineWidth, lineColor, fill, fillcolor){
		var ctx = ig.system.context;
		ctx.beginPath();	
		
		ctx.moveTo(lx, ty);
		ctx.lineTo(rx, ty);
		ctx.lineTo(rx, by);
		ctx.lineTo(lx, by);
		ctx.lineTo(lx, ty);
		
		ctx.closePath();
		
		if(lineWidth){
			ctx.lineWidth = lineWidth;
		}
		if (lineColor){
			ctx.strokeStyle = lineColor;
		}
		
		ctx.stroke();
		
		if (fillcolor){
			ig.system.context.fillStyle = fillcolor;
		}
		if (fill == true){
			ctx.fill();	
		}
	},
	drawTitleScreen: function(){
		var ctx = ig.system.context;
		this.drawABox(0, ig.system.width, 0, ig.system.height, 0, this.color1, true, this.color1);
		
		//Draw Title Text Image
		var logoWidth = ig.system.width * .8;
		var logoMargin = ig.system.width * .1;
		var logoHeight = logoWidth / 10;
				
		//Draw Title Image Image
		var imageWidth = ig.system.height * .4;
		var imageHeight = imageWidth;
		var imageX = ig.system.width / 2 - (imageWidth / 2);
		var imageY = ig.system.height * .35;

		var butWidth = 0;
		var butHeight = 0;
		
		var imageY = ig.system.height * .025;
		var buffer = ig.system.height * .025;
		//Portrait
		if (ig.system.height > ig.system.width){
			
			imageY = ig.system.height * .05;
			
			logoWidth = ig.system.width * .7; 
			logoHeight = logoWidth;
			
			butWidth = ig.system.width * .425;
			butHeight = butWidth / 4;
			
			this.ngbX = (ig.system.width / 2) - (butWidth / 1.75);
			this.ngbY = imageY + logoHeight + buffer; // add another imageY as a buffer.
			
			this.ctbX = this.ngbX;
			
			if (ig.system.height > ig.system.width * 1.75){
				this.ctbY = this.ngbY + butHeight + (buffer * 4)
			}
			else{	
				this.ctbY = this.ngbY + butHeight + (buffer * 2);
			}
		}
		//Landscape
		else{
			
			logoWidth = ig.system.height * .7; 
			logoHeight = logoWidth;
			
			butWidth = ig.system.height * .45;
			butHeight = butWidth / 4;
			//We have a continue button because a save file exists
			if (butWidth){
				this.ctbX = (ig.system.width / 2) - (butWidth + buffer );
				this.ngbY = buffer + logoHeight + buffer; 
				
				this.ngbX = (ig.system.width / 2) + buffer * 3;
				//If there is a saved game, we are only drawing one button, so center this one.
				if (!this.savedGame ){	
					if (ig.system.width < this.logoWidthThresh){
						this.ngbX =  (ig.system.width / 2) - (butWidth / 1.75);
					}
					else{
						this.ngbX =  (ig.system.width / 2) - (butWidth / 2.1);
					}
				}
				
				this.ctbY = this.ngbY
			}
			//No save file exists. Start a new game.			
			else{
				this.ngbX = (ig.system.width / 2) - (butWidth / 2);
				this.ngbY = buffer + logoHeight + buffer; 
			
				this.ctbX = this.ngbX;
				this.ctbY = this.ctbY
			}
		}
		
		this.tsButtonWidth = butWidth;
		this.tsButtonHeight = butHeight;
		
		imageX = (ig.system.width / 2) - (logoWidth / 2);
		
		ctx.drawImage(this.tsImage, imageX, imageY, logoWidth, logoHeight );
		ctx.drawImage(this.newGameButton, this.ngbX, this.ngbY, butWidth, butHeight );
		if (this.savedGame ){	
			ctx.drawImage(this.continueButton, this.ctbX, this.ctbY, butWidth, butHeight );
		}
		
		
		//this.dFonts.changeFont(ctx, 5);
		ctx.fillStyle = this.color2;

		/*var txt =  'Click Anywhere to Start';
		var xPos = logoMargin * 1.2;
		var yPos = imageY + imageHeight * 1.25;
		//this.dFonts.wrapTheText(ctx, txt,  ig.system.width * .1, ig.system.width * .8, ig.system.width * .5, this.vmin * 6);
		this.dFonts.wrapTheText(ctx, txt, xPos, yPos, ig.system.width - (xPos * 2) , this.dFonts.vmin * 6);*/
		
	},
	antHitSound: function(){
		if (!this.muteGame){
			this.antHittingSound.volume = .15;
			this.antHittingSound.play();
		}
	},
	
	antPunchSound: function(){
		if (!this.muteGame && !this.quiz){
			this.antPunchingSound.volume = .025;
			this.antPunchingSound.play();
		}
	},
	checkForMessages: function(){
		//Display a message if certain conditions apply
		if (ig.game.pData.lvl == 1){
			//ig.game.flashThisText(ig.game.flMsgStartingTheGame, this.flMsgTime, ig.game.color4, 3);	
		}
	},
	flashThisText: function(txt, dur, color, size){
		var ctx = ig.system.context;
		
		this.flashingMessage = true;
		
		color ? this.flashMsgColor = color : this.flashMsgColor = this.color6;
		size ? this.flashMsgSize = size : this.flashMsgSize = 3;
		txt ? this.flashingText = txt : this.flashingText = "You did not enter any text, Donzo.";
		dur ? this.flashingMessageTimer.set(dur) : this.flashingMessageTimer.set(3);
		
		this.flMsgDispSwitch = true;
		this.flashingMessageIntravelTimer.set(this.flMsgOnInt);
	},
	setCutScreenText(hdrTxt, ctaTxt, hdrClr, txtClr, ctaClr){
		this.csHdrTxt = hdrTxt;
		this.csCtaTxt = ctaTxt;
		if (hdrClr){
			this.csHdrClr = hdrClr;	
		}
		if (txtClr){
			this.csTxtClr = txtClr;	
		}
		if (ctaClr){
			this.csCtaClr = ctaClr;	
		}
	},
	managePlayerDeath: function(){
		this.gameOverScreen = true;
		ig.game.LoadLevelBro(ig.game.pData.lvl);
		this.managingPlayerDeath = true;
		this.deathScreen = true;
		this.deathScreenTimer.set(.25);
		this.flashMessageTimer.set(this.flashMsgOnTime / 2);
	},
	manageTransitionVariables: function(dir){
		//Figure out how to manage these better
		//Clear ending
		if (this.endingScreen && ig.game.endingOver){
			this.endingScreen = false;
			this.flickerTotalCount = 0;
			this.flickerCount = 0;
			this.flickerFreq = 1;
			ig.game.endingOver = false;
			ig.game.gameWon = false;
			this.levelCleared = false;
			console.log('this is getting called and flciker count resets');
		}
		//Player is dead.
		if (ig.game.playerDead && !this.managingPlayerDeath ){
			this.storeGold();
			this.managePlayerDeath();
		}
		//Level Clear
		if (this.levelCleared){
			this.levelCleared = false;
		}
	},
	drawTransition: function(){
		var ctx = ig.system.context;
				
		//**************FadeIn*************
		if (this.transitionType == "fadeIn"){
			var curOpacity = 0;
			if (this.transitionTimer.delta() < 0){
				curOpacity = this.transitionTimer.delta() * -1;
			}
			//Prepare Transition for Clear
			if (this.transitionTimer.delta() > 0){
				this.transition = false;
				this.transitionReady = false;
				ig.game.pause = false;
				this.manageTransitionVariables();
			}
			ctx.globalAlpha = curOpacity;
			this.drawABox(0, ig.system.width, 0, ig.system.height, 0, this.slideColor, true, this.fadeColor);
		}
		//*************FadeOut*************
		if (this.transitionType == "fadeOut"){
			var curOpacity = 1;
			if (this.transitionTimer.delta() < 1){
				curOpacity = this.transitionTimer.delta();
			}
			//Level is Ready to Load
			if (this.transitionTimer.delta() > 1){
				this.readyToLoad = true;
				this.manageTransitionVariables();
			}
			//Prepare Transition for Clear
			if (this.transitionTimer.delta() > 2){
				this.transitionReady = true;
				this.transition = false;
			}
			ctx.globalAlpha = curOpacity;
			this.drawABox(0, ig.system.width, 0, ig.system.height, 0, this.slideColor, true, this.fadeColor);
		}
		//***************SlideDownIn*************
		if (this.transitionType == "slideDownIn"){
			
			this.slideAddToY = 0;
			if (this.transitionTimer.delta() < 0){
				this.slideAddToY = this.transitionTimer.delta()  *  ig.system.height;
			}
			//Level is Ready to Load
			if (this.transitionTimer.delta() > 0){
				this.readyToLoad = true;
				if (ig.Timer.timeScale != 1){
					ig.Timer.timeScale = 1;
				}
			}
			//Prepare Transition for Clear
			if (this.transitionTimer.delta() > 1){
				this.transitionReady = true;
			}
			
			//USE SLIDE ADD TO Y to ADD to SCORES OR OTHER TEXT ON DROPS DOWN
			this.drawABox(0, ig.system.width, 0, ig.system.height + this.slideAddToY, 0, this.slideColor, true, this.slideColor);
		}
		//***************SlideUpIn*************
		if (this.transitionType == "slideUpIn"){
			
			this.slideAddToY = 0;
			if (this.transitionTimer.delta() < 0){
				this.slideAddToY = (this.transitionTimer.delta() *-1)  *  ig.system.height;
			}
			//Level is Ready to Load
			if (this.transitionTimer.delta() > 0){
				this.readyToLoad = true;
				if (ig.Timer.timeScale != 1){
					ig.Timer.timeScale = 1;
				}
			}
			//Prepare Transition for Clear
			if (this.transitionTimer.delta() > 1){
				this.transitionReady = true;
			}
			console.log('this.slideAddToY = ' + this.slideAddToY);
			//USE SLIDE ADD TO Y to ADD to SCORES OR OTHER TEXT ON DROPS DOWN
			this.drawABox(0, ig.system.width, this.slideAddToY,  ig.system.height + this.slideAddToY ,0, this.slideColor, true, this.slideColor);
		}
		//***************SlideUpOut*************
		if (this.transitionType == "slideUpOut"){
			
			this.slideAddToY = ig.system.height;
			if (this.transitionTimer.delta() < 1){
				this.slideAddToY = this.transitionTimer.delta()  *  ig.system.height;
			}
			else if (this.transitionTimer.delta() < 0){
				this.slideAddToY = 0;
			}
			//Transition is Clear
			if (this.transitionTimer.delta() > 1){
				if (ig.Timer.timeScale != 1){
					ig.Timer.timeScale = 1;
				}
				this.transition = false;
				this.transitionReady = false;
				ig.game.pause = false;
				this.manageTransitionVariables();
			}

			//USE SLIDE ADD TO Y to ADD to SCORES OR OTHER TEXT ON DROPS DOWN
			this.drawABox(0, ig.system.width, 0, ig.system.height - this.slideAddToY, 0, this.slideColor, true, this.slideColor);
		}
		//***************SlideDownOut*************
		if (this.transitionType == "slideDownOut"){
			
			this.slideAddToY = ig.system.height;
			if (this.transitionTimer.delta() < 1){
				this.slideAddToY = (this.transitionTimer.delta())  *  ig.system.height;
			}
			else if (this.transitionTimer.delta() < 0){
				this.slideAddToY = ig.system.height;
			}
			//Transition is Clear
			if (this.transitionTimer.delta() > 1){
				if (ig.Timer.timeScale != 1){
					ig.Timer.timeScale = 1;
				}
				this.transition = false;
				this.transitionReady = false;
				ig.game.pause = false;
				this.manageTransitionVariables();
			}
			//USE SLIDE ADD TO Y to ADD to SCORES OR OTHER TEXT ON DROPS DOWN
			this.drawABox(0, ig.system.width, 0 + this.slideAddToY, ig.system.height, 0, this.slideColor, true, this.slideColor);
		}
		//***************SlideRightIn*************
		if (this.transitionType == "slideRightIn"){
			
			this.slideAddToX = 0;
			if (this.transitionTimer.delta() < 0){
				this.slideAddToX = this.transitionTimer.delta()  *  ig.system.width;
			}
			//Level is Ready to Load
			if (this.transitionTimer.delta() > 0){
				//Level is loaded from this transition
				this.readyToLoad = true;
				if (ig.Timer.timeScale != 1){
					ig.Timer.timeScale = 1;
				}
			}
			//Prepare Transition for Clear
			if (this.transitionTimer.delta() > 1){
				this.transitionReady = true;
			}
			
			//USE SLIDE ADD TO Y to ADD to SCORES OR OTHER TEXT ON DROPS DOWN
			this.drawABox(0, ig.system.width + this.slideAddToX, 0, ig.system.height, 0, this.slideColor, true, this.slideColor);
		}
		//***************SlideRightOut*************
		if (this.transitionType == "slideRightOut"){
			this.slideAddToX = ig.system.width;
			if (this.transitionTimer.delta() < 1){
				this.slideAddToX = (this.transitionTimer.delta())  *  ig.system.width;
			}
			else if (this.transitionTimer.delta() > 1){
				this.slideAddToX = ig.system.width;
			}
			//Transition is Clear
			if (this.transitionTimer.delta() > 1){
				if (ig.Timer.timeScale != 1){
					ig.Timer.timeScale = 1;
				}
				this.transition = false;
				this.transitionReady = false;
				ig.game.pause = false;
				this.manageTransitionVariables();
			}
			//USE SLIDE ADD TO Y to ADD to SCORES OR OTHER TEXT ON DROPS DOWN
			this.drawABox(0 + this.slideAddToX, ig.system.width, 0 , ig.system.height, 0, this.slideColor, true, this.slideColor);
		}
		
		//Restore Alpha
		ctx.globalAlpha = 1;	
	},
	fadeIn: function(delay, color){
		if (!delay){
			ig.game.transitionTimer.set(1);
		}
		else{
			ig.game.transitionTimer.set(delay);	
		}
		ig.game.transitionType = "fadeIn";
		ig.game.transition = true;
		if (color){
			ig.game.fadeColor = color;	
		}
		else{
			ig.game.fadeColor =  this.color3;	
		}
	},
	fadeOut: function(delay, color){
		if (!delay){
			ig.game.transitionTimer.set(0);
		}
		else{
			ig.game.transitionTimer.set(delay);	
		}

		ig.game.transitionType = "fadeOut";
		ig.game.transition = true;	
		
		if (color){
			ig.game.fadeColor = color;	
		}
		else{
			ig.game.fadeColor =  this.color3;	
		}
	},
	slideDownIn: function(delay, color, speed){
		if (!delay){
			ig.game.transitionTimer.set(1);
		}
		else{
			ig.game.transitionTimer.set(delay);	
		}
		if (color){
			this.slideColor = color;
		}
		else{
			this.slideColor = this.color3;
		}
		if (speed){
			if (ig.Timer.timeScale != speed){
				ig.Timer.timeScale = speed;
			}
		}
		else{
			if (ig.Timer.timeScale != 3){
				ig.Timer.timeScale = 3;
			}
		}
		
		ig.game.transitionType = "slideDownIn";
		ig.game.transition = true;

	},
	slideUpIn: function(delay, color, speed){
		if (!delay){
			ig.game.transitionTimer.set(1);
		}
		else{
			ig.game.transitionTimer.set(delay);	
		}
		if (color){
			this.slideColor = color;
		}
		else{
			this.slideColor = this.color3;
		}
		if (speed){
			if (ig.Timer.timeScale != speed){
				ig.Timer.timeScale = speed;
			}
		}
		else{
			if (ig.Timer.timeScale != 3){
				ig.Timer.timeScale = 3;
			}
		}
		ig.game.transitionType = "slideUpIn";
		ig.game.transition = true;
	},
	slideDownOut: function(delay, color, speed){
		if (!delay){
			ig.game.transitionTimer.set(1);
		}
		else{
			ig.game.transitionTimer.set(delay);	
		}
		if (color){
			this.slideColor = color;
		}
		else{
			this.slideColor = this.color3;
		}
		if (speed){
			if (ig.Timer.timeScale != speed){
				ig.Timer.timeScale = speed;
			}
		}
		else{
			if (ig.Timer.timeScale != 3){
				ig.Timer.timeScale = 3;
			}
		}
		ig.game.transitionType = "slideDownOut";
		ig.game.transition = true;
	},
	slideUpOut: function(delay, color, speed){
		if (!delay){
			ig.game.transitionTimer.set(0);
		}
		else{
			ig.game.transitionTimer.set(delay);	
		}
		if (color){
			this.slideColor = color;
		}
		else{
			this.slideColor = this.color3;
		}
		if (speed){
			if (ig.Timer.timeScale != speed){
				ig.Timer.timeScale = speed;
			}
		}
		else{
			if (ig.Timer.timeScale != 3){
				ig.Timer.timeScale = 3;
			}
		}
		ig.game.transitionType = "slideUpOut";
		ig.game.transition = true;
	},
	//slideRightIn
	slideRightIn: function(delay, color, speed){
		if (!delay){
			ig.game.transitionTimer.set(1);
		}
		else{
			ig.game.transitionTimer.set(delay);	
		}
		if (color){
			this.slideColor = color;
		}
		else{
			this.slideColor = this.color3;
		}
		if (speed){
			if (ig.Timer.timeScale != speed){
				ig.Timer.timeScale = speed;
			}
		}
		else{
			if (ig.Timer.timeScale != 3){
				ig.Timer.timeScale = 3;
			}
		}	
		ig.game.transitionType = "slideRightIn";
		ig.game.transition = true;
	},
	//slideRightOut
	slideRightOut: function(delay, color, speed){
		if (!delay){
			ig.game.transitionTimer.set(0);
		}
		else{
			ig.game.transitionTimer.set(delay);	
		}
		if (color){
			this.slideColor = color;
		}
		else{
			this.slideColor = this.color3;
		}
		if (speed){
			if (ig.Timer.timeScale != speed){
				ig.Timer.timeScale = speed;
			}
		}
		else{
			if (ig.Timer.timeScale != 3){
				ig.Timer.timeScale = 3;
			}
		}
		ig.game.transitionType = "slideRightOut";
		ig.game.transition = true;
	},
	setButtons: function(){
		//Buttons for Mobile
		 if( ig.ua.mobile ) {
			 
			var buttonSizeY = null;
			var buttonPosY = null;
			var butRightX = null;
			var buttonRight = null;
			
			//Wide Screen - Regular Buttons
			console.log("Calculating button size... window.innerWidth = " + window.innerWidth);
			console.log("Checking height ... window.innerHeight = " + window.innerHeight);
			if ( window.innerWidth >300){
				butRightX = ig.system.width - 106;
				buttonRight = ig.system.width;
				console.log('use large buttons');
				this.buttonSet = new ig.TouchButtonCollection([
					new ig.TouchButton( 'left', {left: 10, bottom: 10}, 96, 96, this.buttonLeft, 0 ),
					new ig.TouchButton( 'right', {left: 120, bottom: 10}, 96, 96, this.buttonRight, 0 ),
					new ig.TouchButton( 'jump', {left: butRightX, bottom: 10}, 96, 96, this.buttonJump, 0 ),
					new ig.TouchButton( 'action', {left: butRightX - 106, bottom: 10}, 96, 96, this.buttonA, 0 ),
				]);
			}
			//Small Size Buttons
			else if ( window.innerWidth >440){
				butRightX = ig.system.width - 90;
				buttonRight = ig.system.width;
				console.log('use small buttons');
				this.buttonSet = new ig.TouchButtonCollection([
					new ig.TouchButton( 'left', {left: 10, bottom: 10}, 80, 80, this.buttonLeftSmall, 0 ),
					new ig.TouchButton( 'right', {left: 100, bottom: 10}, 80, 80, this.buttonRightSmall, 0 ),
					new ig.TouchButton( 'jump', {left: butRightX, bottom: 10}, 80, 80, this.buttonJumpSmall, 0 ),
					new ig.TouchButton( 'action', {left: butRightX - 90, bottom: 10}, 80, 80, this.buttonASmall, 0 ),
				]);
			}
			//Smaller Size Buttons
			else{
				butRightX = ig.system.width - 70;
				buttonRight = ig.system.width;
				console.log('use smaller buttons');
				this.buttonSet = new ig.TouchButtonCollection([
					new ig.TouchButton( 'left', {left: 10, bottom: 10}, 60, 60, this.buttonLeftSmaller, 0 ),
					new ig.TouchButton( 'right', {left: 80, bottom: 10}, 60, 60, this.buttonRightSmaller, 0 ),
					new ig.TouchButton( 'jump', {left: butRightX, bottom: 10}, 60, 60, this.buttonJumpSmaller, 0 ),
					new ig.TouchButton( 'action', {left: butRightX - 70, bottom: 10}, 60, 60, this.buttonASmaller, 0 ),
				]);
			}

			this.buttonSet.align();
		}
	},
	punishPlayer: function(){
		if (ig.game.getEntityByName('player')){
			var player = ig.game.getEntityByName('player');
			//Fade out to red or colorwrong
			player.initDeathSeq("fallThrough");
			
		}
		
	},
	drawMuteButton: function(){
		var bRight = ig.system.width - 84;
		var bTop = 10;
			
		if (this.muteGame){
			if ( window.scale < .7){
				bRight = ig.system.width - 52;
				this.buttonMuted.draw(bRight, bTop);		
			}
			else{
				this.buttonMutedSmall.draw(bRight, bTop);		
			}
		}
		else{
			if ( window.scale < .7){
				bRight = ig.system.width - 52;
				this.buttonMute.draw(bRight, bTop);	
			}
			else{
				this.buttonMuteSmall.draw(bRight, bTop);	
			}
		}
	},
	writeMessage: function(txt,clr){
		var ctx = ig.system.context;
		var myTxt = "Set some text";
		if (txt){
			myTxt = txt;
		}
		var myTxtWidth = ctx.measureText(myTxt).width;
		ctx.fillStyle  = '#F2A900';
		if (clr){
			ctx.fillStyle  = clr;
		}
		ctx.fillText(myTxt, (ig.system.width / 2) - (myTxtWidth /2), 100);
	},

	flashScreenBro: function(color, time){
		this.flashScreen = true;
		//If time is provided, set the timer, else go to default time
		if (time){
			this.flashScreenTimer.set(time);
		}
		else{
			this.flashScreenTimer.set(.05);
		}
		this.flashScreenColor = color;
	},
	flashScreenCheck: function(){
		if (this.flashScreen){
			this.drawABox(0, ig.system.width, 0, ig.system.height, 0, this.flashScreenColor, true, this.flashScreenColor);
			//Turn off screen flash if flashtimer hits 0.
			if (this.flashScreenTimer.delta() > 0){
				this.flashScreen = false;
			}
		}
		
	},

	drawEndingScreen: function(){
		var ctx = ig.system.context;
		//Adjust alphas for fades
		//Set Alphas for Fading
		if (this.transition){
			//**************FadeIn*************
			if (this.transitionType == "fadeIn" ){
				var curOpacity = 0;
				if (this.transitionTimer.delta() < 0){
						curOpacity = this.transitionTimer.delta() * -1;
				}			
				ctx.globalAlpha = curOpacity;
			}
			//*************FadeOut*************
			else if (this.transitionType == "fadeOut"){ 
				var curOpacity = 1;
				if (this.transitionTimer.delta() < 1){
					curOpacity = this.transitionTimer.delta();
				}
				ctx.globalAlpha = curOpacity;
			}
		}
		if (ig.game.flickerColor){
			this.drawABox(0, ig.system.width, 0, ig.system.height, 0, this.color4, true, this.color4);
			ig.game.flickerCount++;
			if ( ig.game.flickerCount > this.flickerFreq ){
				ig.game.flickerCount = 0;	
				ig.game.flickerColor = false;
				ig.game.flickerTotalCount++;
			}
		}
		else{
			//Ends on this color
			this.drawABox(0, ig.system.width, 0, ig.system.height, 0, this.color1, true, this.color1);
			if (ig.game.flickerTotalCount < this.maxFlickers){	
				ig.game.flickerCount++;
				if ( ig.game.flickerCount > this.flickerFreq ){
					ig.game.flickerCount = 0;	
					ig.game.flickerColor = true;
					ig.game.flickerTotalCount++;
				}
				//slow the flicker
			 	if (ig.game.flickerTotalCount > 47){
					this.flickerFreq = Math.round(ig.game.flickerTotalCount );
				}
				else if (ig.game.flickerTotalCount > 44){
					this.flickerFreq = Math.round(ig.game.flickerTotalCount / 2);
				}
				else if (ig.game.flickerTotalCount > 38){
					this.flickerFreq = Math.round(ig.game.flickerTotalCount / 3);
				}
				else if (ig.game.flickerTotalCount > 31){
					this.flickerFreq = Math.round(ig.game.flickerTotalCount / 6);
				}
				else if (ig.game.flickerTotalCount > 22){
					this.flickerFreq = Math.round(ig.game.flickerTotalCount / 8);
				}
				else if (ig.game.flickerTotalCount > 10){
					this.flickerFreq = Math.round(ig.game.flickerTotalCount / 10);
				}			
			}
			else if (!ig.game.endingOver){
				ig.game.endingOver = true;
				console.log('ending is over - stop flicking');	
			}
		}
		ctx.globalAlpha = 1;
	},
	wipeData: function(){		
		window.localStorage.setItem("deaths", 0);
		window.localStorage.setItem("lvl", 1);
		window.localStorage.setItem("tokens", 0);
		window.localStorage.setItem("tokensLT", 0);
		window.localStorage.setItem("tokensGT", 0);
		window.localStorage.setItem("timesPassed", 0); 

	},
	saveGame: function(){		
		window.localStorage.setItem("deaths", ig.game.pData.deaths);
		window.localStorage.setItem("lvl", ig.game.pData.lvl);
		window.localStorage.setItem("tokens", ig.game.pData.tokens);
		window.localStorage.setItem("tokensLT", ig.game.pData.tokensLT);
		window.localStorage.setItem("tokensGT", ig.game.pData.tokensGT);
		window.localStorage.setItem("timesPassed", ig.game.pData.timesPassed); 

	},
	loadGame: function(){
		if (window.localStorage.getItem("deaths")){
			ig.game.pData.deaths = JSON.parse(window.localStorage.getItem("deaths"));
		}
		if (window.localStorage.getItem("lvl")){
			ig.game.pData.lvl = JSON.parse(window.localStorage.getItem("lvl"));
		}
		if (window.localStorage.getItem("tokens")){
			ig.game.pData.tokens = JSON.parse(window.localStorage.getItem("tokens"));	
		}
		if (window.localStorage.getItem("tokensLT")){
			ig.game.pData.tokensLT = JSON.parse(window.localStorage.getItem("tokensLT"));	
		}
		if (window.localStorage.getItem("tokensGT")){
			ig.game.pData.tokensGT = JSON.parse(window.localStorage.getItem("tokensGT"));	
		}
		if (window.localStorage.getItem("timesPassed")){
			ig.game.pData.timesPassed = JSON.parse(window.localStorage.getItem("timesPassed"));
		}
		if (window.localStorage.getItem("gameMuted")){
			this.muteGame = JSON.parse(window.localStorage.getItem("gameMuted"));
		}
	},

	loadTSImages: function(){
		this.tsImage = new Image();
		this.tsImage.src = window.tsImage.src;
		
		this.newGameButton = new Image();
		this.newGameButton.src = window.ngbut.src;
		
		this.continueButton = new Image();
		this.continueButton.src = window.conbut.src;
	},
	resizeYo: function(){
		//Look for ads
		var taHeight = 0;
		var saWidth = 0;
		var lsaWidth = 0;
		
		//Look Up
		if (document.getElementById("ad-unit")){
			if ( document.getElementById("ad-unit").clientHeight ){
				taHeight = document.getElementById("ad-unit").clientHeight;
			}
		}
		//Look Right
		if ( document.getElementById("side-ad-unit-container")){
			if ( document.getElementById("side-ad-unit-container").clientWidth ){
				saWidth = document.getElementById("side-ad-unit-container").clientWidth;
			}
		}
		//Look Left
		if (document.getElementById("left-side-ad-unit-container")){
			if ( document.getElementById("left-side-ad-unit-container").clientWidth ){
				lsaWidth = document.getElementById("left-side-ad-unit-container").clientWidth;
			}
		}
		
		var combinedSideColumnAdWidth = saWidth + lsaWidth;
		var theWidthToMeasure = window.innerWidth - combinedSideColumnAdWidth;
		
		var scale = 1.5;
		
		//Mobile Phones in Landscape
		if (window.innerHeight < 450){
			scale = 1.5;
		}
		//Mobile Phones in Portrait
		else if (theWidthToMeasure < 400){
			scale = 1.5;
		}
		else if (theWidthToMeasure < 500){
			scale = 1.25;
		}
		else if (theWidthToMeasure< 650){
			scale = 1.15;
		}
		else if (theWidthToMeasure< 800){
			scale = 1;
		}
		else if (theWidthToMeasure < 1000){
			scale = 1;
		}
		else if (theWidthToMeasure < 1600){
			scale = .9;
		}
		else if (theWidthToMeasure < 2000){
			scale = .8;
		}
		else if (theWidthToMeasure < 2400){
			scale = .7;
		}
		else if (theWidthToMeasure < 2800){
			scale = .6;
		}
		else if (theWidthToMeasure< 3200){
			scale = .5;
		}
		//Smaller than 3600 but greater than 3200
		else if (theWidthToMeasure< 3600){
			scale = .45;
		}
		else{
			scale = .35;
		}
		
		//Also check height for crazy tall devices
		if (window.innerHeight > 2000){
			scale = .5;
		}
		
		
		window.scale = scale;
		
		//Set Canvas Width Minus Ads
		this.cWidth = window.innerWidth - combinedSideColumnAdWidth;
		this.cHeight = window.innerHeight - taHeight;
		
		// Resize the canvas style and tell Impact to resize the canvas itself;
		canvas.style.width = this.cWidth + 'px';
		canvas.style.height = this.cHeight + 'px';
		
		ig.system.resize( this.cWidth * scale, this.cHeight * scale);
		//SET FONTS
		ig.game.dFonts.setVs();
		
		// Re-center the camera - it's dependend on the screen size.
		if( ig.game && ig.game.setupCamera ) {
			//SET CAMERA
			ig.game.setupCamera();
		}
		//REVERT THESE FOR FONT FINDING
		this.dFonts.headerSizeKnown = false;
		this.dFonts.questionSizeKnown = false;
		this.dFonts.tinyQuestionSizeKnown = false;
		this.dFonts.buttonOneSizeKnown = false;
		this.dFonts.buttonTwoSizeKnown = false;
		this.dFonts.buttonThreeSizeKnown = false;
		this.dFonts.buttonFourSizeKnown = false;
		this.dFonts.buttonFiveSizeKnown = false;
		this.dFonts.buttonSixSizeKnown = false;
		this.dFonts.correctionSizeKnown = false;
		
		//DON'T FORGET TO SET BUTTONS TOO	
		ig.game.setButtons();
		
	}
	//END ig.game
	});

//Look for ads
var taHeight = 0;
var saWidth = 0;
var lsaWidth = 0;

//Look Up
if ( document.getElementById("ad-unit")){
	if ( document.getElementById("ad-unit").clientHeight ){
		taHeight = document.getElementById("ad-unit").clientHeight;
	}
}
//Look Right
if ( document.getElementById("side-ad-unit-container")){
	if ( document.getElementById("side-ad-unit-container").clientWidth ){
		saWidth = document.getElementById("side-ad-unit-container").clientWidth;
	}
}
//Look Left
if ( document.getElementById("left-side-ad-unit-container")){
	if ( document.getElementById("left-side-ad-unit-container").clientWidth ){
		lsaWidth = document.getElementById("left-side-ad-unit-container").clientWidth;
	}
}
	
var combinedSideColumnAdWidth = saWidth + lsaWidth;
var theWidthToMeasure = window.innerWidth - combinedSideColumnAdWidth;

//Mobile Phones in Landscape
if (window.innerHeight < 450){
	scale = 1.5;
}
//Mobile Phones in Portrait
else if (theWidthToMeasure < 400){
	scale = 1.5;
}
else if (theWidthToMeasure < 500){
	scale = 1.25;
}
else if (theWidthToMeasure< 650){
	scale = 1.15;
}
else if (theWidthToMeasure< 800){
	scale = 1;
}
else if (theWidthToMeasure < 1000){
	scale = 1;
}
else if (theWidthToMeasure < 1600){
	scale = .9;
}
else if (theWidthToMeasure < 2000){
	scale = .8;
}
else if (theWidthToMeasure < 2400){
	scale = .7;
}
else if (theWidthToMeasure < 2800){
	scale = .6;
}
else if (theWidthToMeasure< 3200){
	scale = .5;
}
//Smaller than 3600 but greater than 3200
else if (theWidthToMeasure< 3600){
	scale = .45;
}
else{
	scale = .35;
}

//Also check height for crazy tall devices
if (window.innerHeight > 2000){
	scale = .5;
}

//console.log('MYSCALE = ' + scale + ' window.innerWidth = ' + window.innerWidth + ' window.innerHeight = ' + window.innerHeight);

window.scale = scale;

//Look Up
if ( document.getElementById("ad-unit")){
	if ( document.getElementById("ad-unit").clientHeight ){
		taHeight = document.getElementById("ad-unit").clientHeight;
	}
}
//Look Right
if ( document.getElementById("side-ad-unit-container")){
	if ( document.getElementById("side-ad-unit-container").clientWidth ){
		saWidth = document.getElementById("side-ad-unit-container").clientWidth;
	}
}
//Look Left
if (document.getElementById("left-side-ad-unit-container")){
	if ( document.getElementById("left-side-ad-unit-container").clientWidth ){
		lsaWidth = document.getElementById("left-side-ad-unit-container").clientWidth;
	}
}

window.screenHeightMinusAd = window.innerHeight - taHeight;
window.screenWidthMinusAd =  window.innerWidth - saWidth - lsaWidth;
canvas.style.width = window.screenWidthMinusAd + 'px';
canvas.style.height = window.screenHeightMinusAd+ 'px';

window.addEventListener('resize', function(){

// If the game hasn't started yet, there's nothing to do here
if( !ig.system ) { return; }
	if (ig.game){
		ig.game.resizeYo();	
	}
}, false);

var width = window.screenWidthMinusAd * scale,
height = window.screenHeightMinusAd * scale;
ig.main( '#canvas', MyGame, 60, width, height, 1 );

});

