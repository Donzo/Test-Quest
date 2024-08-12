ig.module(
	'game.entities.nohanging'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityNohanging = ig.Entity.extend({
	size: {x: 32, y: 32},

	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 165, 0, .8)',
	_wmScalable: true,
	gravityFactor: 0,
	
	type: ig.Entity.TYPE.NONE, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.NEVER,
	
	
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
		if (ig.game.getEntityByName('player')){
			var player = ig.game.getEntityByName('player');
			if (other == player ){
				player.noHanging = true;
				player.noHangingTimer.set(.05);
			}
		}	
	}
});

	ig.EntityPool.enableFor( EntityNohanging );
});