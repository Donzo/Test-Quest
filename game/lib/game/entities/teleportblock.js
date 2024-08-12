ig.module(
	'game.entities.teleportblock'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityTeleportblock= ig.Entity.extend({
	size: {x: 32, y: 36},
	maxVel: {x: 0, y: 0},
	offset: {x: 0, y: -4},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.NEVER,
	zIndex: -10,
	output: false,
	outputName: "output1",
		
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(50, 205, 50, .8)',	
	
	animSheets: {
		tb1: new ig.AnimationSheet( 'media/blocks/teleportblock.png', 32, 32 ),
		tbo1: new ig.AnimationSheet( 'media/blocks/teleport-output.png', 32, 32 ),
		tb2: new ig.AnimationSheet( 'media/blocks/teleportblock-02.png', 32, 32 ),
		tbo2: new ig.AnimationSheet( 'media/blocks/teleport-output-02.png', 32, 32 ),
	},
	
	
	setBricks: false,
	active: false,
	playerOff: false,
	timeOn: 0.1,
	red: false,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.anims.inactiveTb1 = new ig.Animation( this.animSheets.tb1,  1, [0], true);
		this.anims.activateTb1 = new ig.Animation( this.animSheets.tb1,  0.05, [1,2,3,4,5,6,7,8,9,9,10,11], true);
		this.anims.deactivateTb1 = new ig.Animation( this.animSheets.tb1,  0.05, [9,8,7,6,5,4,3,2,1,0,0,0], true);
		this.anims.activeTb1 = new ig.Animation( this.animSheets.tb1,  1, [10], true);
		this.anims.deactivateTbo1 = new ig.Animation( this.animSheets.tbo1,  0.05, [10,9,10,9,10,9,10,9,10,9,10,9,10,9,10,9,8,8,7,7,6,6,5,5,4,4,3,2,1,0], true);
		this.anims.inactiveTbo1 = new ig.Animation( this.animSheets.tbo1,  1, [0], true);
		
		this.anims.inactiveTb2 = new ig.Animation( this.animSheets.tb2,  1, [0], true);
		this.anims.activateTb2 = new ig.Animation( this.animSheets.tb2,  0.05, [1,2,3,4,5,6,7,8,9,9,10,11], true);
		this.anims.deactivateTb2 = new ig.Animation( this.animSheets.tb2,  0.05, [9,8,7,6,5,4,3,2,1,0,0,0], true);
		this.anims.activeTb2 = new ig.Animation( this.animSheets.tb2,  1, [10], true);
		this.anims.deactivateTbo2 = new ig.Animation( this.animSheets.tbo2,  0.05, [10,9,10,9,10,9,10,9,10,9,10,9,10,9,10,9,8,8,7,7,6,6,5,5,4,4,3,2,1,0], true);
		this.anims.inactiveTbo2 = new ig.Animation( this.animSheets.tbo2,  1, [0], true);
		
		this.activateTimer = new ig.Timer(0);
		this.activatedTimer = new ig.Timer(0);
		this.proximityCheckTimer = new ig.Timer(0);
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.locked = true;
		this.setBricks = false;
		this.active = false;
		this.proximityCheckTimer.set(1);
		this.playerOff = false;
	},
	spawnCollisionTiles: function(){
		var xTiles = 0;
		var xPos = 0;
		var yTiles = 0;
		
		while (xTiles < 4){
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y +4, 1 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 8+4, 1 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 16+4, 1 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 24+4, 1 );	
			xPos += 8;
			xTiles++;
		}
	},
	paused: function(){
		this.activateTimer.pause();
		this.activatedTimer.pause();
		this.proximityCheckTimer.pause();
		if (this.currentAnim){
			this.pauseFrame = this.currentAnim.frame;
		}
		this.pause = true;

	},
	unpaused: function(){
		this.activateTimer.unpause();
		this.activatedTimer.unpause();
		this.proximityCheckTimer.unpause();
		this.currentAnim.gotoFrame(this.pauseFrame);
		this.pause = false;

	},
	setActivationTimer: function(){
		var curFrame = this.currentAnim.frame;
		if (curFrame == 0){
			this.activateTimer.set(.05);
		}
		else if (curFrame == 1){
			this.activateTimer.set(.1);
		}
		else if (curFrame == 2){
			this.activateTimer.set(.15);
		}
		else if (curFrame == 3){
			this.activateTimer.set(.2);
		}
		else if (curFrame == 4){
			this.activateTimer.set(.25);
		}
		else if (curFrame == 5){
			this.activateTimer.set(.3);
		}
		else if (curFrame == 6){
			this.activateTimer.set(.35);
		}
		else if (curFrame == 7){
			this.activateTimer.set(.4);
		}
		else if (curFrame == 9){
			this.activateTimer.set(.45);
		}
		else if (curFrame == 10){
			this.activateTimer.set(.5);
		}
		else if (curFrame == 11){
			this.activateTimer.set(.55);
		}
		else if (curFrame == 12){
			this.activateTimer.set(.6);
		}
	},
	findRightFrame: function(curFrame){
		//Currently Activating - switching to deactive
		if (curFrame == 12){
			this.rightFrame = 0;
		}
		else if (curFrame == 11){
			this.rightFrame = 1;
		}
		else if (curFrame == 10){
			this.rightFrame = 2;
		}
		else if (curFrame == 9){
			this.rightFrame = 3;
		}
		else if (curFrame == 8){
			this.rightFrame = 4;
		}
		else if (curFrame == 7){
			this.rightFrame = 5;
		}
		else if (curFrame == 6){
			this.rightFrame = 6;
		}
		else if (curFrame == 5){
			this.rightFrame = 7;
		}	
		else if (curFrame == 4){
			this.rightFrame = 8;
		}
		else if (curFrame == 3){
			this.rightFrame = 9;
		}
		else if (curFrame == 2){
			this.rightFrame = 10;
		}
		else if (curFrame == 1){
			this.rightFrame = 11;
		}
		else if (curFrame == 0){
			this.rightFrame = 12;
		}

		if (this.currentAnim == this.anims.activate){
			this.anims.deactivate.gotoFrame(this.rightFrame );
		}
		else if (this.currentAnim == this.anims.deactivate){
			this.anims.activate.gotoFrame(this.rightFrame );
		}
	},
	teleportPlayer: function(){
		if( ig.game.getEntityByName('player')) {			
			var player = ig.game.getEntityByName('player');
			var tPort = ig.game.getEntityByName(this.outputName);
			player.invincible(2);
			
			var toX = tPort.pos.x + 8;
			var toY = tPort.pos.y - (player.size.y * 1.25);
			
			player.pos.x = toX;
			player.pos.y = toY;
			
			tPort.tPorting();
			this.active = false;
		}
	},
	tPorting: function(){
		if (this.activateTimer.delta() > 0){
			if (this.red){
				this.anims.deactivateTbo2.rewind();
			}
			else{
				this.anims.deactivateTbo1.rewind();
			}
			this.activateTimer.set(1.5);
			if (this.red){
				ig.game.teleportNoise2();
			}
			else{
				ig.game.teleportNoise1();
			}
		}
	},
	update: function() {		
		if (!this.setBricks && ig.game.collisionMap){
			this.setBricks = true;	
			this.spawnCollisionTiles();
		}
		
		if ( ig.game.pause && !this.pause){
			this.paused();
		}
		else if (this.pause && !ig.game.pause){
			this.unpaused();	
		}
		if (!this.output){
			//Activate
			if (!this.active && this.activating && this.activateTimer.delta() > 0 && this.playerOff){
				this.activated();
			}
			//Deactivate
			if(this.active && this.activatedTimer.delta() > 0){
				this.deactivated();
			}
		
		
			//Proximity Check //Triggers when this is activating and player walks off
			if (!this.active && this.activating && this.proximityCheckTimer.delta() > 0.01){
				this.activating  = false;
				this.deactivating = true;
				this.findRightFrame(this.currentAnim.frame);
			}
			if (this.proximityCheckTimer.delta() > .1 && !this.playerOff && !this.active){
				this.playerOff = true;
			}

		
			this.animMe();
		}
		//Output Block
		else{
			this.animMeOutput();
		}
		
		
		
		this.parent();
	},
	animMeOutput: function(){
		if (this.red){
			//Set animation
			if (this.pause && this.currentAnim){
				this.currentAnim.gotoFrame(this.pauseFrame);	
			}
			else if (this.activateTimer.delta() < 0){
				this.currentAnim = this.anims.deactivateTbo2;
			}
			else {
				this.currentAnim = this.anims.inactiveTbo2;
			}
		
			if (this.currentAnim == this.anims.deactivateTbo2 && this.currentAnim.frame == 29){
				this.deactivating = false;
			}
		}
		else{
			//Set animation
			if (this.pause && this.currentAnim){
				this.currentAnim.gotoFrame(this.pauseFrame);	
			}
			else if (this.activateTimer.delta() < 0){
				this.currentAnim = this.anims.deactivateTbo1;
			}
			else {
				this.currentAnim = this.anims.inactiveTbo1;
			}
		
			if (this.currentAnim == this.anims.deactivateTbo1 && this.currentAnim.frame == 29){
				this.deactivating = false;
			}
		}
	},
	animMe: function(){
		if (this.red){
			//Set animation
			if (this.pause && this.currentAnim){
				this.currentAnim.gotoFrame(this.pauseFrame);	
			}
			else if (this.deactivating == true){
				this.currentAnim = this.anims.deactivateTb2;
			}
			else if (this.activating == true){
				this.currentAnim = this.anims.activateTb2;
			}
			else if (this.active){
				this.currentAnim = this.anims.activeTb2;
			}
			else {
				this.currentAnim = this.anims.inactiveTb2;
			}
		
			if (this.currentAnim == this.anims.deactivateTb2 && this.currentAnim.frame == 11){
				this.deactivating = false;
			}
		}
		else{
			//Set animation
			if (this.pause && this.currentAnim){
				this.currentAnim.gotoFrame(this.pauseFrame);	
			}
			else if (this.deactivating == true){
				this.currentAnim = this.anims.deactivateTb1;
			}
			else if (this.activating == true){
				this.currentAnim = this.anims.activateTb1;
			}
			else if (this.active){
				this.currentAnim = this.anims.activeTb1;
			}
			else {
				this.currentAnim = this.anims.inactiveTb1;
			}
		
			if (this.currentAnim == this.anims.deactivateTb1 && this.currentAnim.frame == 11){
				this.deactivating = false;
			}
		}
	},

	activated: function(){
		this.active = true;
		this.activating = false;
		this.playerOff = false;
		this.teleportPlayer();
		//this.kill();
	},


	check: function( other ) {
		// The instanceof should always be true, since the player is
		// the only entity with TYPE.A - and we only check against A.
		if( other instanceof EntityPlayer && !other.dying  && !this.output) {
			if (this.deactivating){
				this.activating = true;
				this.deactivating = false;
				this.setActivationTimer();
				this.findRightFrame(this.currentAnim.frame);
			}
			else if ( !this.activating ){
				this.activating = true;
				if (this.red){
					this.anims.activateTb2.rewind();
				}
				else{
					this.anims.activateTb1.rewind();
				}
				this.activateTimer.set(1.05);
				this.proximityCheckTimer.set(.1);
			}
			if (this.proximityCheckTimer.delta() >= -.05){
				this.proximityCheckTimer.set(.1);
			}
		}
	}
	
});

	ig.EntityPool.enableFor( EntityTeleportblock );
});