ig.module(
	'game.entities.clockblock'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityClockblock= ig.Entity.extend({
	size: {x: 32, y: 32},
	maxVel: {x: 0, y: 0},
	offset: {x: 0, y: 0},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE, 
	collides: ig.Entity.COLLIDES.NEVER,
	zIndex: 1,
	pauseFrame: false,
	pause: false,
	letter: "A",
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 174, 66, .8)',
	
	animSheets: {
		cb1: new ig.AnimationSheet( 'media/blocks/clockblock.png', 32, 32 ),
		cb2: new ig.AnimationSheet( 'media/blocks/clockblock-02.png', 32, 32 ),
		cb3: new ig.AnimationSheet( 'media/blocks/clockblock-03.png', 32, 32 ),
	},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.anims.activecb1 = new ig.Animation( this.animSheets.cb1,  1, [10], true);
		this.anims.activecb2 = new ig.Animation( this.animSheets.cb2,  1, [10], true);
		this.anims.activecb3 = new ig.Animation( this.animSheets.cb3,  1, [10], true);
		
		this.anims.inactivecb1 = new ig.Animation( this.animSheets.cb1,  1, [0], true);
		this.anims.inactivecb2 = new ig.Animation( this.animSheets.cb2,  1, [0], true);
		this.anims.inactivecb3 = new ig.Animation( this.animSheets.cb3,  1, [0], true);
		
		this.anims.activatecb1 = new ig.Animation( this.animSheets.cb1,  0.05, [1,2,3,4,5,6,7,8,9,10], true);
		this.anims.activatecb2 = new ig.Animation( this.animSheets.cb2,  0.05, [1,2,3,4,5,6,7,8,9,10], true);
		this.anims.activatecb3 = new ig.Animation( this.animSheets.cb3,  0.05, [1,2,3,4,5,6,7,8,9,10], true);
		
		this.anims.deactivatecb1 = new ig.Animation( this.animSheets.cb1, 0.05, [9,8,7,6,5,4,3,2,1,0], true );
		this.anims.deactivatecb2 = new ig.Animation( this.animSheets.cb2, 0.05, [9,8,7,6,5,4,3,2,1,0], true );
		this.anims.deactivatecb3 = new ig.Animation( this.animSheets.cb3, 0.05, [9,8,7,6,5,4,3,2,1,0], true );
		this.currentAnim = this.anims.inactivecb1; 
		this.actionTimer = new ig.Timer(0);
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.letter = "A";
		this.currentAnim = this.anims.inactivecb1; 
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
		
		while (xTiles < 4){
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
		if (!this.deactivate){
			if (!ig.game.clockBlockA && this.letter == "A" || !ig.game.clockBlockB && this.letter == "B" || !ig.game.clockBlockC && this.letter == "C" || !ig.game.clockBlockD && this.letter == "D" || !ig.game.clockBlockE && this.letter == "E" || !ig.game.clockBlockF && this.letter == "F" ){
				this.deactivate = true;
				this.deactivated = false;
				this.deactivating = true;
				this.actionTimer.set(.5);
				this.anims.deactivatecb1.rewind();
				this.anims.deactivatecb2.rewind();
				this.anims.deactivatecb3.rewind();
			}
		}
		//Deactivated
		if (this.deactivate && !this.deactivated && this.actionTimer.delta() > 0){
			this.deactivateMe();
		}
		
		//Activate
		if (!this.activate ){
			if (ig.game.clockBlockA && this.letter == "A" || ig.game.clockBlockB && this.letter == "B" || ig.game.clockBlockC && this.letter == "C" || ig.game.clockBlockD && this.letter == "D" || ig.game.clockBlockE && this.letter == "E" || ig.game.clockBlockF && this.letter == "F"){
				this.activate = true;
				this.activated = false;
				this.activating = true;
				this.actionTimer.set(.5);
				this.anims.activatecb1.rewind();
				this.anims.activatecb2.rewind();
				this.anims.activatecb3.rewind();
			}
		}

		//Activated
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
			if (this.letter == "A" || this.letter == "D"){
				this.currentAnim = this.anims.activatecb1; 
			}
			else if (this.letter == "B" || this.letter == "E"){
				this.currentAnim = this.anims.activatecb2; 
			}
			else if (this.letter == "C" || this.letter == "F"){
				this.currentAnim = this.anims.activatecb3; 
			}	
		}
		else if (this.deactivating){
			if (this.letter == "A" || this.letter == "D"){
				this.currentAnim = this.anims.deactivatecb1; 
			}
			else if (this.letter == "B" || this.letter == "E"){
				this.currentAnim = this.anims.deactivatecb2; 
			}
			else if (this.letter == "C" || this.letter == "F"){
				this.currentAnim = this.anims.deactivatecb3; 
			}
		}
		else if (this.activated){
			if (this.letter == "A" || this.letter == "D"){
				this.currentAnim = this.anims.activecb1; 
			}
			else if (this.letter == "B" || this.letter == "E"){
				this.currentAnim = this.anims.activecb2; 
			}
			else if (this.letter == "C" || this.letter == "F"){
				this.currentAnim = this.anims.activecb3; 
			}
		}
		else if (this.deactivated){
			if (this.letter == "A" || this.letter == "D"){
				this.currentAnim = this.anims.inactivecb1; 
			}
			else if (this.letter == "B" || this.letter == "E"){
				this.currentAnim = this.anims.inactivecb2; 
			}
			else if (this.letter == "C" || this.letter == "F"){
				this.currentAnim = this.anims.inactivecb3; 
			}
		}
		
	},
	kill: function(){
		this.parent();
	}
	
});
	ig.EntityPool.enableFor( EntityClockblock );
});