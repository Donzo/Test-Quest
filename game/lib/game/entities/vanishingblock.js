ig.module(
	'game.entities.vanishingblock'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityVanishingblock= ig.Entity.extend({
	size: {x: 32, y: 32},
	maxVel: {x: 0, y: 0},
	offset: {x: 0, y: 0},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE, 
	collides: ig.Entity.COLLIDES.NEVER,
	locked: true,
	zIndex: 1,
	stayTime: 2,
	delay: 0,
	vanish: false,
	vanished: false,
	reappear: false,
	exist: false,
	beGoneTime:5,
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 255, 255, 1)',
	
	pause: false,
	pauseFrame: false,
	
	animSheets: {
		vBlock: new ig.AnimationSheet( 'media/blocks/vanishingblock.png', 32, 32 ),
	},
	
	setBricks: false,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.anims.gone = new ig.Animation( this.animSheets.vBlock,  1, [0], true);
		this.anims.here = new ig.Animation( this.animSheets.vBlock,  1, [10], true);
		this.anims.vanish = new ig.Animation( this.animSheets.vBlock,  0.1, [9,8,7,6,5,4,3,2,1,0], true);
		this.anims.reappear = new ig.Animation( this.animSheets.vBlock,  0.05, [0,1,2,3,4,5,6,7,8,9], true);

		this.stayTimer = new ig.Timer(0);
		this.vanishTimer = new ig.Timer(0);
		this.reappearTimer = new ig.Timer(0);
		this.beGoneTimer = new ig.Timer(0);
		if( !ig.global.wm ) { 
			this.setState();
		}
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.locked = true;
		this.setBricks = false;
		this.setState();
	},
	paused: function(){
		//Get pause frame
		if (this.currentAnim){
			this.pauseFrame = this.currentAnim.frame;
		}
		this.pauseTimers();
		this.pause = true;
	},
	unpaused: function(){
		this.currentAnim.gotoFrame(this.pauseFrame);
		this.unpauseTimers();
		this.pause = false;
	},
	pauseTimers: function(){
		this.stayTimer.pause();
		this.vanishTimer.pause();
		this.reappearTimer.pause();
		this.beGoneTimer.pause();
	},
	unpauseTimers: function(){
		this.stayTimer.unpause();
		this.vanishTimer.unpause();
		this.reappearTimer.unpause();
		this.beGoneTimer.unpause();
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
	setState: function(){
		this.exist = false;
		this.vanish = true;
		this.vanished = true;
		this.reappear = false;
		this.beGoneTimer.set(this.delay);
	},
	
	samsara: function(){
		//Begin Vanish
		if (!this.vanish && this.stayTimer.delta() > 0){
			this.vanish = true;
			this.vanished = false;
			this.anims.vanish.rewind();
			this.vanishTimer.set(1);
		}
		//Vanish
		else if (this.vanish && !this.vanished && this.vanishTimer.delta() > 0){
			this.vanished = true;
			this.reappear = false;
			this.removeCollisionTiles();
			this.beGoneTimer.set(this.beGoneTime);
		}
		//Reappear
		else if (this.vanished && !this.reappear && this.beGoneTimer.delta() > 0 ){
			this.reappear = true;
			this.exist = false;
			this.anims.reappear.rewind();
			this.reappearTimer.set(.5);
		}
		//Exist
		else if (this.reappear && !this.exist && this.reappearTimer.delta() > 0){
			this.exist = true;
			this.vanish = false;
			this.stayTimer.set(this.stayTime);
			this.spawnCollisionTiles();
		}
	},
	
	update: function() {
		
		//Pause and Unpause
		if ( ig.game.pause && !this.pause){
			this.paused();
		}
		else if (this.pause && !ig.game.pause){
			this.unpaused();	
		}
		
		/*Cycle of Birth, Death, and Rebirth*/
		this.samsara();
		this.animMe();
		this.parent();
	},
	animMe: function(){
		if (this.pause && this.currentAnim){
			this.currentAnim.gotoFrame(this.pauseFrame);	
		}
		//Set animation
		else if (this.vanish && !this.vanished){
			this.currentAnim = this.anims.vanish;
		}
		else if (this.vanished && !this.reappear){
			this.currentAnim = this.anims.gone;
		}
		else if (this.reappear && !this.exist){
			this.currentAnim = this.anims.reappear;
		}
		else{
			this.currentAnim = this.anims.here;
		}

	},
	kill: function(){
		this.parent();
	}
	
});
	ig.EntityPool.enableFor( EntityVanishingblock );
});