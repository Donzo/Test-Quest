ig.module(
	'game.entities.goal'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityGoal = ig.Entity.extend({
	size: {x: 132, y: 76},
	maxVel: {x: 0, y: 0},
	offset: {x: -50, y: 5},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.NONE,

	animSheet: new ig.AnimationSheet( 'media/flag-pole.png', 32, 100 ),

	zIndex: -1,
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0] );
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
	},

	update: function() {		

		this.currentAnim = this.anims.idle;
		this.parent();
	},

	check: function( other ) {
		// The instanceof should always be true, since the player is
		// the only entity with TYPE.A - and we only check against A.
		if( other instanceof EntityPlayer && !other.dying  ) {
			
			//Set GameWon variable for switching transitions and endings and stuff if the game is over.
			if (ig.game.pData.lvl == ig.game.totalLevels){
				ig.game.gameWon = true;
			}
			//Trigger Player Animation and Prepare for Transition
			var player = ig.game.getEntityByName('player');
			if (player.victoryDance != true){
				ig.game.processTokens("bank");
				player.anims.win.rewind();
				player.victoryDance = true;
				player.victoryTimer.set(2);
				ig.music.stop();
				if (!ig.game.muteGame ){	
					ig.game.victorySound.volume = .75; 
					ig.game.victorySound.play();
				}
			}
		}
	}
});

ig.EntityPool.enableFor( EntityGoal );
});