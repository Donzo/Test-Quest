ig.module(
	'game.entities.answer'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityAnswer=ig.Entity.extend({
	size: {x: 1, y: 1},
	maxVel: {x: 000, y: 000},
	name:'answerButton',
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	buttonNumber: null,
	
	init: function( x, y, settings ) {
		this.parent(x, y, settings);	
		this.giveMeASecond = new ig.Timer(.33);
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.giveMeASecond.set(.33);
    },
	
	
	update: function() {

		this.size.x =  ig.game.buttonWidth;
		this.size.y =  ig.game.buttonHeight; 
		
		if (this.buttonNumber ==1){
			this.pos.x =ig.game.ac1X + ig.game.screen.x;
			this.pos.y = ig.game.ac1Y + ig.game.screen.y;
		}
		else if (this.buttonNumber == 2){
			this.pos.x =ig.game.ac2X + ig.game.screen.x;
			this.pos.y = ig.game.ac2Y + ig.game.screen.y;
		}
		else if (this.buttonNumber == 3){
			this.pos.x =ig.game.ac3X + ig.game.screen.x;
			this.pos.y = ig.game.ac3Y + ig.game.screen.y;
		}
		else if (this.buttonNumber == 4){
			this.pos.x =ig.game.ac4X + ig.game.screen.x;
			this.pos.y = ig.game.ac4Y + ig.game.screen.y;
		}
		else if (this.buttonNumber == 5){
			this.pos.x =ig.game.ac5X + ig.game.screen.x;
			this.pos.y = ig.game.ac5Y + ig.game.screen.y;
		}
		else if (this.buttonNumber == 6){
			this.pos.x =ig.game.ac6X + ig.game.screen.x;
			this.pos.y = ig.game.ac6Y + ig.game.screen.y;
		}
		//Click me
		if (ig.input.pressed('click') && this.inFocus() && this.giveMeASecond.delta() > 0 && !ig.game.whichAnswer ) {
			if (this.buttonNumber == 1){
				console.log('button 1 clicked');
				if ( ig.game.ac1 == ig.game.ca){
					ig.game.right();
				}
				else {
					ig.game.wrong();
				}
			}
			if (this.buttonNumber == 2){
				console.log('button 2 clicked');
				if ( ig.game.ac2 == ig.game.ca){
					ig.game.right();
				}
				else {
					ig.game.wrong();
				}
			}
			if (this.buttonNumber == 3){
				console.log('button 3 clicked');
				if ( ig.game.ac3 == ig.game.ca){
					ig.game.right();
				}
				else {
					ig.game.wrong();
				}
			}
			if (this.buttonNumber == 4){
				console.log('button 4 clicked');
				if ( ig.game.ac4 == ig.game.ca){
					ig.game.right();
				}
				else {
					ig.game.wrong();
				}
			}
			if (this.buttonNumber == 5){
				console.log('button 5 clicked');
				if ( ig.game.ac5 == ig.game.ca){
					ig.game.right();
				}
				else {
					ig.game.wrong();
				}
			}
			if (this.buttonNumber == 6){
				console.log('button 6 clicked');
				if ( ig.game.ac6 == ig.game.ca){
					ig.game.right();
				}
				else {
					ig.game.wrong();
				}
			}
			ig.game.answerChoiceBN = this.buttonNumber; 
			ig.game.whichAnswer = this.buttonNumber;
		}
		//Kill
		if (ig.game.whichAnswer){
			this.buttonNumber = null;
			this.kill();	
		}
		
		this.parent();
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
ig.EntityPool.enableFor( EntityAnswer );
});