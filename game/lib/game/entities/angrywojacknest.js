ig.module(
	'game.entities.angrywojacknest'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityAngrywojacknest = ig.Entity.extend({
	size: {x: 28, y: 108},
	offset: {x: 0, y: 0},
	maxVel: {x: 0, y: 0},
	storeMaxVel: {x: 0, y: 0},
	storeVel: {x: null, y: null},
	friction: {x: 0, y: 0},
	red: false,
	delay: 11,
	maxSpawn: 3,
	spawnCount: 0,
	zIndex: 1,
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 0, 255, .8)',
	_wmScalable: true,
	
	type: ig.Entity.TYPE.NONE, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.NONE, // Check against friendly
	collides: ig.Entity.COLLIDES.NEVER,
	
	health: 9999999,
	respawnTime: 11,

	pause: false,
	spawnInitated: false,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
			
		//Name me
		if( !ig.global.wm ) { 
			this.nameMe();
		}
		
		this.respawnTimer = new ig.Timer(this.delay);
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.antSpawned = false;
		this.spawnInitated = false;
		this.respawnTimer.set(this.delay);
		this.nameMe();
	},
	nameMe: function(){
		this.name = "angrywojackNest" + ig.game.angrywojackNestCount;
		ig.game.angrywojackNestCount++;
	},
	offScreen: function(){
		var xClear = false;
		var yClear = false;
		if (this.pos.x < ig.game.screen.x ||
			this.pos.x > ig.game.screen.x + ig.system.width 			
		){
			xClear = true;
		}
		if (this.pos.y < ig.game.screen.y ||
			this.pos.y > ig.game.screen.y + ig.system.height 			
		){
			yClear = true;
		}
		if (xClear && yClear){
			return true;
		}
		else{
			return false;
		}
	},
	spawnWojack: function(){
		//intiate spawn
		
		if (!this.pause && 
			this.respawnTimer.delta() >= 0 && 
			this.spawnCount < this.maxSpawn &&
			this.offScreen()
		){
			console.log('Angry wojack spawned' );	
			var whichFlip = this.pos.x < 0 ? true : false;
			ig.game.spawnEntity( EntityAngrywojack, this.pos.x, this.pos.y, {myNest: this.name, flip: whichFlip});
			this.setRespawnTime();
			this.spawnCount++;
		}
	},
	setRespawnTime: function(){
		this.respawnTimer.set(this.respawnTime);
	},
	pauseTimers: function(){
		this.respawnTimer.pause();
	},
	unpauseTimers: function(){
		this.respawnTimer.unpause();
	},
	paused: function(){
		this.pauseTimers();
		this.pause = true;
	},
	unpaused: function(){
		this.unpauseTimers();
		this.pause = false;
	},
	update: function() {
		//Pause and Unpause
		if ( ig.game.pause && !this.pause || ig.game.getEntityByName('player') && ig.game.getEntityByName('player').landed != true ){
			this.paused();
		}
		else if (this.pause && !ig.game.pause){
			this.unpaused();	
		}
		
		this.spawnWojack();		
		this.parent();
	}
});
ig.EntityPool.enableFor( EntityAngrywojacknest );
});