ig.module(
	'game.entities.button'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityButton=ig.Entity.extend({
	size: {x: 1, y: 1},
	maxVel: {x: 000, y: 000},
	name: null,
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	clicked: false,
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(245, 66, 212, 1)',
	
	//clickSound: new ig.Sound( 'media/sounds/new-game.*' ),
	
	init: function( x, y, settings ) {
		this.parent(x, y, settings);	
		this.giveMeASecond = new ig.Timer(.33);
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.giveMeASecond.set(.33);
		this.clicked = false;
    },
	
	update: function() {
		if (this.name == "start"){
			this.size.x =  ig.game.tsButtonWidth ;
			this.size.y =  ig.game.tsButtonHeight; 
			this.pos.x =ig.game.ngbX + ig.game.screen.x;
			this.pos.y = ig.game.ngbY + ig.game.screen.y;
			//console.log('start button exists and is located at ' + this.pos.x + " X, and " + this.pos.y + " Y.");
			//console.log("ig.game.ngbX = " + ig.game.ngbX);
			//console.log("ig.game.ngbY = " + ig.game.ngbY);
		}
		if (this.name == "continue"){
			this.size.x =  ig.game.tsButtonWidth ;
			this.size.y =  ig.game.tsButtonHeight; 
			this.pos.x =ig.game.ctbX + ig.game.screen.x;
			this.pos.y = ig.game.ctbY + ig.game.screen.y ;
		}
		if (!ig.game.titleScreen){
			this.kill();
		}
		
		//Click me
		if (ig.input.released('click') && this.inFocus() && this.giveMeASecond.delta() > 0 && ig.game.getEntityByName('player') && !ig.game.socbClicked) {
			
			//Click Start Button
			if (this.name == "start"){
				//I have a saved game. Clear globals and give me a fresh start.
				if (ig.game.savedGame){
					ig.game.socbClicked = true;
					this.resetGameData();
					ig.game.teleportNoise1();
					ig.game.LoadLevelBro(ig.game.pData.lvl);
					ig.game.titleScreen = false;
					ig.game.socbClicked = true;
					//1 is the same as 0 - must be more than one or player sees camera adjustment
					ig.game.fadeIn(1.25, "#FFFFFF");
					ig.game.transitionReady = false;
					//ig.game.checkForMessages();
				}
				//I have no save game. Let's start it up.
				else{
					//Start Game
					ig.game.titleScreen = false;
					ig.game.pause = false;
					ig.game.socbClicked = true;
					ig.game.checkForMessages();
					ig.game.teleportNoise1();
					if (ig.game.getEntityByName('continue')){
						var otherButton = ig.game.getEntityByName('continue');
						otherButton.kill();
						this.kill();
					}
					else{
						this.kill();
					}
				}
			}
			//Click Continue Button
			if (this.name == "continue"){
				//Continue Game
				ig.game.titleScreen = false;
				ig.game.pause = false;
				ig.game.socbClicked = true;
				
				ig.game.checkForMessages();
				
				if (!ig.game.muteGame ){
					//this.clickSound.volume = .3;
					//this.clickSound.play();
				}
				
				var otherButton = ig.game.getEntityByName('startButton');
				if (otherButton){
					otherButton.kill();
				}
				this.kill();
			}
		}
		this.parent();
	},
	resetGameData: function(){
		ig.game.pData.deaths = 0;
		ig.game.pData.qRight = 0;
		ig.game.pData.qWrong = 0;
		ig.game.pData.lvl = 1;
		ig.game.pData.timesPassed = 0;
		if (ig.game.quiz.usedQs){
			ig.game.quiz.usedQs.numbers.length = 0;
		}
	},
	kill: function(){
		this.parent();
	},
	inFocus: function() {
    return (
       (this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
       ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
       (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
       ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
    );
 	}
		
});
ig.EntityPool.enableFor( EntityButton );
});