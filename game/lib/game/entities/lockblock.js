ig.module(
	'game.entities.lockblock'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityLockblock= ig.Entity.extend({
	size: {x: 32, y: 32},
	maxVel: {x: 0, y: 0},
	offset: {x: 0, y: 0},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE, 
	collides: ig.Entity.COLLIDES.NEVER,
	locked: true,
	zIndex: 1,
	
	animSheets: {
		grey: new ig.AnimationSheet( 'media/blocks/lockblock.png', 32, 32 ),
		red: new ig.AnimationSheet( 'media/blocks/lockblockred.png', 32, 32 ),
		yellow: new ig.AnimationSheet( 'media/blocks/lockblockyellow.png', 32, 32 )
	},
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(192, 192, 192, .8)',
	
	color: "yellow",
	setBricks: false,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.anims.greyUnlocked = new ig.Animation( this.animSheets.grey,  0.1, [0,1,2,3,4,5,6,7,8,9], true);
		this.anims.redUnlocked = new ig.Animation( this.animSheets.red,  0.1, [0,1,2,3,4,5,6,7,8,9], true);
		this.anims.yellowUnlocked = new ig.Animation( this.animSheets.yellow,  0.1, [0,1,2,3,4,5,6,7,8,9], true);
		
		this.anims.greyLocked = new ig.Animation( this.animSheets.grey, 1, [0], true );
		this.anims.redLocked = new ig.Animation( this.animSheets.red, 1, [0], true );
		this.anims.yellowLocked = new ig.Animation( this.animSheets.yellow, 1, [0], true );

		this.unlockTimer = new ig.Timer(0);
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.locked = true;
		this.setBricks = false;
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
	clearMe: function(){
		this.removeCollisionTiles();
		this.kill();
	},
	update: function() {		
		if (!this.setBricks && ig.game.collisionMap){
			this.setBricks = true;	
			this.spawnCollisionTiles();
		}
		//Activate
		if (ig.game.yellowKey && this.color == "yellow" && this.locked){
			this.locked = false;
			this.unlockTimer.set(1.2);
			this.anims.yellowUnlocked.rewind();
		}
		else if (ig.game.redKey && this.color == "red" && this.locked){
			this.locked = false;
			this.unlockTimer.set(1.2);
			this.anims.redUnlocked.rewind();
		}
		//Kill
		if (!this.locked && this.unlockTimer.delta() > 0){
			this.clearMe();	
		}
		//Set animation
		if (!this.locked){
			if (this.color == "red"){
				this.currentAnim = this.anims.redUnlocked;
			}
			else if (this.color == "yellow"){
				this.currentAnim = this.anims.yellowUnlocked;
			}
		}
		else {
			if (this.color == "red"){
				this.currentAnim = this.anims.redLocked;
			}
			else if (this.color == "yellow"){
				this.currentAnim = this.anims.yellowLocked;
			}
		}
		this.parent();
	},
	
	kill: function(){
		this.parent();
	}
	
});
	ig.EntityPool.enableFor( EntityLockblock );
});