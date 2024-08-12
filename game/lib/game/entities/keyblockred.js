ig.module(
	'game.entities.keyblockred'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityKeyblockred = ig.Entity.extend({
	size: {x: 32, y: 36},
	maxVel: {x: 0, y: 0},
	offset: {x: 0, y: -4},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.NONE,
	active: false,
	activating: false,
	deactivating: false,
	animSheet: new ig.AnimationSheet( 'media/blocks/keyblock-red.png', 32, 32 ),
	rightFrame: null,
	zIndex: -1,
	setBricks: false,
	
	unlockSound: new ig.Sound( 'media/sounds/red-key.*' ),
	
	activated: function(){
		if (!ig.game.muteGame){
			this.unlockSound.volume = .25;
			this.unlockSound.play();
		}
		this.active = true;
		ig.game.redKey = true;
		//this.kill();
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
	findRightFrame: function(curFrame){
		//Currently Activating - switching to deactive
			if (curFrame == 9){
				this.rightFrame = 0;
			}
			else if (curFrame == 8){
				this.rightFrame = 1;
			}
			else if (curFrame == 7){
				this.rightFrame = 2;
			}
			else if (curFrame == 6){
				this.rightFrame = 3;
			}
			else if (curFrame == 5){
				this.rightFrame = 4;
			}
			else if (curFrame == 4){
				this.rightFrame = 5;
			}
			else if (curFrame == 3){
				this.rightFrame = 6;
			}
			else if (curFrame == 2){
				this.rightFrame = 7;
			}
			else if (curFrame == 1){
				this.rightFrame = 8;
			}
			else if (curFrame == 0){
				this.rightFrame = 9;
			}
			if (this.currentAnim == this.anims.deactivate){
				this.anims.activate.gotoFrame(this.rightFrame );
			}
			else if (this.currentAnim == this.anims.activate){
				this.anims.deactivate.gotoFrame(this.rightFrame );
			}
	},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		ig.game.blueKey = false;
		this.addAnim( 'inactive', 1, [0] );
		this.addAnim( 'activate', 0.1, [0,1,2,3,4,5,6,7,8,9] );
		this.addAnim( 'deactivate', 0.1, [9,8,7,6,5,4,3,2,1,0], true );
		this.addAnim( 'active', 1, [9] );
		this.activateTimer = new ig.Timer(0);
		this.proximityCheckTimer = new ig.Timer(0);
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.active = false;
		ig.game.blueKey = false;
		this.activating = false;
		this.deactivating = false;
		this.setBricks = false;
	},
	paused: function(){
		this.activateTimer.pause();
		//Get pause frame
		this.pauseFrame = this.currentAnim.frame;
		this.pause = true;
	},
	unpaused: function(){
		this.activateTimer.unpause();
		this.currentAnim.gotoFrame(this.pauseFrame);
		this.pause = false;
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
		if (!this.active && this.activating && this.activateTimer.delta() > 0){
			this.activated();
		}
		//Proximity Check
		if (!this.active && this.activating && this.proximityCheckTimer.delta() > 0.01){
			this.activating  = false;
			this.deactivating = true;
			this.findRightFrame(this.currentAnim.frame);
			if (this.currentAnim.frame == 9){
				this.activateTimer.set(.1);
			}
			else if (this.currentAnim.frame == 8){
				this.activateTimer.set(.2);
			}
			else if (this.currentAnim.frame == 7){
				this.activateTimer.set(.3);
			}
			else if (this.currentAnim.frame == 6){
				this.activateTimer.set(.4);
			}
			else if (this.currentAnim.frame == 5){
				this.activateTimer.set(.5);
			}
			else if (this.currentAnim.frame == 4){
				this.activateTimer.set(.6);
			}
			else if (this.currentAnim.frame == 3){
				this.activateTimer.set(.7);
			}
			else if (this.currentAnim.frame == 2){
				this.activateTimer.set(.8);
			}
			else if (this.currentAnim.frame == 1){
				this.activateTimer.set(.9);
			}
			else if (this.currentAnim.frame == 0){
				this.activateTimer.set(1);
			}
		}
		
		if (this.currentAnim == this.anims.deactivate && this.currentAnim.frame == 9){
			this.deactivating = false;
		}
		
		//Set animation
		if (this.pause && this.currentAnim){
			this.currentAnim.gotoFrame(this.pauseFrame);	
		}
		else if (this.active == true){
			this.currentAnim = this.anims.active;
		}
		else if (this.deactivating == true){
			this.currentAnim = this.anims.deactivate;
		}
		else if (this.activating == true){
			this.currentAnim = this.anims.activate;
		}
		else {
			this.currentAnim = this.anims.inactive;
		}
		
		this.parent();
	},
	kill: function(){
		ig.game.blueKey = false;
		this.parent();
	},
	
	check: function( other ) {
		// The instanceof should always be true, since the player is
		// the only entity with TYPE.A - and we only check against A.
		if( other instanceof EntityPlayer && !other.dying  ) {
			if (this.deactivating){
				this.activating = true;
				this.deactivating = false;
				this.findRightFrame(this.currentAnim.frame);
			}
			else if ( !this.activating ){
				 this.activating = true;
				 this.anims.activate.rewind();
				 this.activateTimer.set(1);
				 this.proximityCheckTimer.set(.1);
			}
			if (this.proximityCheckTimer.delta() > -.05){
				this.proximityCheckTimer.set(.1);
			}
		}
	}
});
ig.EntityPool.enableFor( EntityKeyblockred );
});