ig.module(
    'game.entities.ice'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
   
EntityIce = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0,0,255,0.5)',
	_wmScalable: true,
	size:{x:8,y:8},
	maxVel: {x: 000, y: 000},
   
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
	type: ig.Entity.TYPE.NONE, 
	//splashSound: new ig.Sound ('media/sounds/water-snakes.*'),
   
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	update: function() {
		this.parent();
	},
   
	check:function(other){
		if( other instanceof EntityPlayer && other.iceTimer.delta() > -.06) {
			other.iceTimer.set(.1);
			if (!other.onIce){
				console.log('player was off ice, now on ice');	
			}
			other.onIce = true;
		}
	}
});
	ig.EntityPool.enableFor( EntityIce );
});