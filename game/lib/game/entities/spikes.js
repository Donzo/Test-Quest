ig.module(
    'game.entities.spikes'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
   
EntitySpikes = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(155,50,155,0.6)',
	_wmScalable: true,
	size:{x:8,y:8},
	maxVel: {x: 000, y: 000},
   
	checkAgainst: ig.Entity.TYPE.BOTH,
   
	pokeSound: new ig.Sound( 'media/sounds/spike.*' ),
   
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	update: function() {
		this.parent();
	},
   
	check:function(other){
		if( other instanceof EntityPlayer ) {
			other.onSpikesTimer.set(.05);
			if (!other.invin) {
				ig.game.pokeNoise();
				ig.game.playerOnSpikes = true;
				ig.game.quizbox.quiz(1, "spikes");
				ig.game.spikePosY = this.pos.y;
				ig.game.spikePosX = this.pos.x;

			}
		}
		//Kill enemies that don't fly
		else if (other.bounceTimer && other.knockMeOutTheBox){ 
			if (!other.kOTB && !other.flyingEnemy){
				if (other.name ){
					console.log(other.name + " killed by spikes");
				}
				else{
					console.log( "unnamed entity killed by spikes");	
				}
				other.knockMeOutTheBox();
			}
		}
	}
});
	ig.EntityPool.enableFor( EntitySpikes );
});