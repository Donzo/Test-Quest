ig.module(
	'game.entities.clockblockswitch'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityClockblockswitch= ig.Entity.extend({
	size: {x: 32, y: 36},
	maxVel: {x: 0, y: 0},
	offset: {x: 0, y: -4},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.NEVER,
	zIndex: -10,
	letter: "A",
	
	animSheet: new ig.AnimationSheet( 'media/blocks/clockblockswitch.png', 32, 32 ),
	
	setBricks: false,
	active: false,
	playerOff: false,
	timeOn: 10,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'inactive', 1, [0],true );
		this.addAnim( 'active', 1, [10], true );
		//this.addAnim( 'activate', .1, [1,1,1,1,1,1,7,8,9,10], true );
		this.addAnim( 'activate', .1, [1,2,3,4,5,6,7,8,9,10], true );
		this.addAnim( 'deactivate', .1, [9,8,7,6,5,4,3,2,1,0], true );
		this.addAnim( 'switchingOff', 0.05, [10,11] );
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
		this.pauseFrame = this.currentAnim.frame;
		this.pause = true;
		if (this.active){
			ig.game.tickingSound.stop();
		}
	},
	unpaused: function(){
		this.activateTimer.unpause();
		this.activatedTimer.unpause();
		this.proximityCheckTimer.unpause();
		this.currentAnim.gotoFrame(this.pauseFrame);
		this.pause = false;
		if (this.active){
			ig.game.tickingNoise();
		}
	},
	setActivationTimer: function(){
		var curFrame = this.currentAnim.frame;
		if (curFrame == 0){
			this.activateTimer.set(.1);
		}
		else if (curFrame == 1){
			this.activateTimer.set(.2);
		}
		else if (curFrame == 2){
			this.activateTimer.set(.3);
		}
		else if (curFrame == 3){
			this.activateTimer.set(.4);
		}
		else if (curFrame == 4){
			this.activateTimer.set(.5);
		}
		else if (curFrame == 5){
			this.activateTimer.set(.6);
		}
		else if (curFrame == 6){
			this.activateTimer.set(.7);
		}
		else if (curFrame == 7){
			this.activateTimer.set(.8);
		}
		else if (curFrame == 9){
			this.activateTimer.set(.9);
		}
		else if (curFrame == 10){
			this.activateTimer.set(1);
		}
	},
	findRightFrame: function(curFrame){
		//Currently Activating - switching to deactive
		if (curFrame == 10){
			this.rightFrame = 0;
		}
		else if (curFrame == 9){
			this.rightFrame = 1;
		}
		else if (curFrame == 8){
			this.rightFrame = 2;
		}
		else if (curFrame == 7){
			this.rightFrame = 3;
		}
		else if (curFrame == 6){
			this.rightFrame = 4;
		}
		else if (curFrame == 5){
			this.rightFrame = 5;
		}	
		else if (curFrame == 4){
			this.rightFrame = 6;
		}
		else if (curFrame == 3){
			this.rightFrame = 7;
		}
		else if (curFrame == 2){
			this.rightFrame = 8;
		}
		else if (curFrame == 1){
			this.rightFrame = 9;
		}
		else if (curFrame == 0){
			this.rightFrame = 10;
		}

		if (this.currentAnim == this.anims.activate){
			this.anims.deactivate.gotoFrame(this.rightFrame );
		}
		else if (this.currentAnim == this.anims.deactivate){
			this.anims.activate.gotoFrame(this.rightFrame );
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

		if (this.currentAnim == this.anims.deactivate && this.currentAnim.frame == 9){
			this.deactivating = false;
		}
		
		
		
		this.animMe();
		
		
		this.parent();
	},
	animMe: function(){
		//Set animation
		if (this.pause && this.currentAnim){
			this.currentAnim.gotoFrame(this.pauseFrame);	
		}
		else if (this.active && this.activatedTimer.delta() >= -3){
			this.currentAnim = this.anims.switchingOff;
		}
		else if (this.deactivating == true){
			this.currentAnim = this.anims.deactivate;
		}
		else if (this.activating == true){
			this.currentAnim = this.anims.activate;
		}
		else if (this.active){
			this.currentAnim = this.anims.active;
		}
		else {
			this.currentAnim = this.anims.inactive;
		}
	},
	activated: function(){
		this.active = true;
		this.activating = false;
		this.activatedTimer.set(this.timeOn);
		this.playerOff = false;
		if (this.letter == "A"){
			ig.game.clockBlockA = true;
		}
		else if (this.letter == "B"){
			ig.game.clockBlockB = true;
		}
		else if (this.letter == "C"){
			ig.game.clockBlockC = true;
		}
		else if (this.letter == "D"){
			ig.game.clockBlockD = true;
		}
		else if (this.letter == "E"){
			ig.game.clockBlockE = true;
		}
		else if (this.letter == "F"){
			ig.game.clockBlockF = true;
		}
		ig.game.clockBlockOnNoise();
	},
	deactivated: function(){
		this.active = false;
		this.activating = false;
		if (this.letter == "A"){
			ig.game.clockBlockA = false;
		}
		else if (this.letter == "B"){
			ig.game.clockBlockB = false;
		}
		else if (this.letter == "C"){
			ig.game.clockBlockC = false;
		}
		else if (this.letter == "D"){
			ig.game.clockBlockD = false;
		}
		else if (this.letter == "E"){
			ig.game.clockBlockE = false;
		}
		else if (this.letter == "F"){
			ig.game.clockBlockF = false;
		}
		ig.game.clockBlockOffNoise();
		
	},


	check: function( other ) {
		// The instanceof should always be true, since the player is
		// the only entity with TYPE.A - and we only check against A.
		if( other instanceof EntityPlayer && !other.dying  ) {
			if (this.deactivating){
				this.activating = true;
				this.deactivating = false;
				this.setActivationTimer();
				this.findRightFrame(this.currentAnim.frame);
			}
			else if ( !this.activating && this.playerOff){
				this.activating = true;
				this.anims.activate.rewind();
				this.activateTimer.set(1.05);
				this.proximityCheckTimer.set(.1);
			}
			if (this.proximityCheckTimer.delta() >= -.05){
				this.proximityCheckTimer.set(.1);
			}
		}
	}
	
});

	ig.EntityPool.enableFor( EntityClockblockswitch );
});