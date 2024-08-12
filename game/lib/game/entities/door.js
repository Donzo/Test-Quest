ig.module(
	'game.entities.door'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityDoor = ig.Entity.extend({
	size: {x: 32, y: 32},
	maxVel: {x: 0, y: 0},
	offset: {x: 0, y: 0},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.NONE,
	whichWay: "in",
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(253, 73, 63, .2)',
 	_wmScalable: true,
	

	zIndex: -1,
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
	},

	update: function() {		

		this.parent();
	},

	check: function( other ) {
		// The instanceof should always be true, since the player is
		// the only entity with TYPE.A - and we only check against A.
		if( other instanceof EntityPlayer   ) {
			if (whichWay == "in"){
				this.loadLevel(LevelHouse);
			}
			else{
				this.loadLevel(LevelLvl1);	
			}
		}
	}
});

ig.EntityPool.enableFor( EntityDoor );
});