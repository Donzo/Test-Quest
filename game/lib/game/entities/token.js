ig.module(
	'game.entities.token'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityToken = ig.Entity.extend({
	size: {x: 44, y: 44},
	offset: {x: 0, y: 0},
	maxVel: {x: 0, y: 0},

	zIndex: -5,
	type: ig.Entity.TYPE.B, 
	checkAgainst: ig.Entity.TYPE.A, 
	collides: ig.Entity.COLLIDES.NEVER,
	
	health: 3000,
	name: "token",
	tokenSound: new ig.Sound( 'media/sounds/token.*' ),
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(192, 192, 192, .8)',
	_wmScalable: true,
	
	tokenAnim: new ig.AnimationSheet( 'media/token.png', 44, 44 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		//Anims
		this.anims.token = new ig.Animation( this.tokenAnim,  0.1, [0,0,0,0,0,0,0,0,0,1,2,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4]);
		this.anims.tokenPaused = new ig.Animation( this.tokenAnim,  0.1, [0]);
	},
	
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
	},

			
	update: function() {
		this.animMe();
		this.parent();
	},
	animMe: function(){
		//Paused
		if (ig.game.pause){
			this.currentAnim = this.anims.tokenPaused 
		}
		else{
			this.currentAnim = this.anims.token;
		}
	},
	check: function( other ) {
		if (ig.game.getEntityByName('player')){
			var player = ig.game.getEntityByName('player');
			if (other == player){
				//Increase token count
				ig.game.pData.tokens +=1;
				ig.game.goldCoins += 1;
				 //play sound if not muted
				 if (!ig.game.muteGame){
					 this.tokenSound.volume = .085; 
					 this.tokenSound.play();
				}
				 //Do other things if you want.
				 
				this.kill();
			}
		}
	}
});
ig.EntityPool.enableFor( EntityToken );
});