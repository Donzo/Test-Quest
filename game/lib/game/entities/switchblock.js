ig.module(
	'game.entities.switchblock'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntitySwitchblock= ig.Entity.extend({
	size: {x: 32, y: 32},
	maxVel: {x: 0, y: 0},
	offset: {x: 0, y: 0},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE, 
	collides: ig.Entity.COLLIDES.NEVER,
	zIndex: 1,
	pauseFrame: false,
	pause: false,
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 165, 0, .8)',
	
	animSheets: {
		red: new ig.AnimationSheet( 'media/blocks/redswitchblock.png', 32, 32 ),
		blue: new ig.AnimationSheet( 'media/blocks/blueswitchblock.png', 32, 32 ),
	},
	
	color: "blue",
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.anims.redActive = new ig.Animation( this.animSheets.red,  1, [10], true);
		this.anims.blueActive = new ig.Animation( this.animSheets.blue,  1, [10], true);
		this.anims.redInactive = new ig.Animation( this.animSheets.red,  1, [0], true);
		this.anims.blueInactive = new ig.Animation( this.animSheets.blue,  1, [0], true);
		
		this.anims.activateRed = new ig.Animation( this.animSheets.red,  0.05, [1,2,3,4,5,6,7,8,9,10], true);
		this.anims.activateBlue = new ig.Animation( this.animSheets.blue, 0.05, [1,2,3,4,5,6,7,8,9,10], true );
		this.anims.deactivateRed = new ig.Animation( this.animSheets.red, 0.05, [9,8,7,6,5,4,3,2,1,0], true );
		this.anims.deactivateBlue = new ig.Animation( this.animSheets.blue, 0.05, [9,8,7,6,5,4,3,2,1,0], true );

		this.actionTimer = new ig.Timer(0);
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.setBricks = false;
	},
	paused: function(){
		this.actionTimer.pause();
		if (this.currentAnim){
			this.pauseFrame = this.currentAnim.frame;
		}
		this.pause = true;
	},
	unpaused: function(){
		this.actionTimer.unpause();
		if (this.currentAnim){
			this.currentAnim.gotoFrame(this.pauseFrame);
		}
		this.pause = false;
	},
	spawnCollisionTiles: function(){
		var xTiles = 0;
		var xPos = 0;
		var yTiles = 0;
		
		while (xTiles < 5){
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y, 1 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 8, 1 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 16, 1 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 24, 1 );	
			xPos += 8;
			xTiles++;
		}
	},
	removeCollisionTiles: function(){
		var xTiles = 0;
		var xPos = 0;
		var yTiles = 0;
		
		while (xTiles < 4){
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 8, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 16, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 24, 0 );	
			xPos += 8;
			xTiles++;
		}
	},

	activateMe: function(){
		this.spawnCollisionTiles();
		this.deactivate = false;
		this.deactivated = false;
		this.activated = true;
		this.activating = false;
	},
	deactivateMe: function(){
		this.removeCollisionTiles();
		this.activate = false;
		this.activated = false;
		this.deactivated = true;
		this.deactivating = false;
	},
	update: function() {		
		
		
		if ( ig.game.pause && !this.pause){
			this.paused();
		}
		else if (this.pause && !ig.game.pause){
			this.unpaused();	
		}
		
		//Dectivate
		if (ig.game.switchBlock == "red" && this.color == "blue" && !this.deactivate || ig.game.switchBlock == "blue" && this.color == "red" && !this.deactivate ){
			this.deactivate = true;
			this.deactivated = false;
			this.deactivating = true;
			this.actionTimer.set(.5);
			this.anims.deactivateRed.rewind();
			this.anims.deactivateBlue.rewind();
		}
		//Deactivated
		if (this.deactivate && !this.deactivated && this.actionTimer.delta() > 0){
			this.deactivateMe();
		}
		
		//Activate
		if (ig.game.switchBlock == "red" && this.color == "red" && !this.activate || ig.game.switchBlock == "blue" && this.color == "blue" && !this.activate ){
			this.activate = true;
			this.activated = false;
			this.activating = true;
			this.actionTimer.set(.5);
			this.anims.activateRed.rewind();
			this.anims.activateBlue.rewind();
		}
		//Deactivated
		if (this.activate && !this.activated && this.actionTimer.delta() > 0){
			this.activateMe();
		}

		//Anim
		this.animMe();
		
		this.parent();
	},
	animMe: function(){
		//Set animation
		if (this.activating){
			this.currentAnim = this.color == "blue" ? this.anims.activateBlue : this.anims.activateRed;
		}
		else if (this.deactivating){
			this.currentAnim = this.color == "blue" ? this.anims.deactivateBlue : this.anims.deactivateRed;
		}
		else if (this.activated){
			this.currentAnim = this.color == "blue" ? this.anims.blueActive : this.anims.redActive;
		}
		else if (this.deactivated){
			this.currentAnim = this.color == "blue" ? this.anims.blueInactive : this.anims.redInactive;
		}
		

	},
	kill: function(){
		this.parent();
	}
	
});
	ig.EntityPool.enableFor( EntitySwitchblock );
});