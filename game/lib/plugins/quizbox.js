ig.module( 
    'plugins.quizbox' 
)
.requires(
    'impact.impact'
)
.defines(function(){

Quizbox = ig.Class.extend({ 

	init: function( ) {
		//Total number of questions
        this.numOfAllQs = 4;
		
		//Load Used Qs
		if (window.localStorage.getItem("qsAxed")){
			var qsAxed = JSON.parse(window.localStorage.getItem("qsAxed"));
			this.usedQs = qsAxed;
		}
    },
	usedQs:{
		numbers:[0]	    
	},
	answers:{
		a:[],
		b:[],
		c:[],
		d:[],
		e:[],
		f:[],
	},
	isInArray: function(value, array) {
  		//If the randomly generated value is in the used number array, return true.
		return array.indexOf(value) > -1;
	},
	getQNum: function(){
		var qToAssign = null;
		var whichType = null;
		ig.game.questionY = 0;
		
		while (qToAssign == null || this.isInArray(qToAssign, this.usedQs.numbers) != false){
			qToAssign = 1+Math.floor(Math.random()* this.numOfAllQs);
		}
		this.usedQs.numbers.push(qToAssign); 
		//console.log('this.usedQs.numbers.length = ' + this.usedQs.numbers.length + ' this.numOfAllQs = ' + this.numOfAllQs);
		//All Questions Have Been Used - Empty Used Questions Array (Reshuffle)
		if (this.usedQs.numbers.length >= this.numOfAllQs){
			this.usedQs.numbers.length = 0;
		}
		//Ask the question
		console.log('Question number = ' + qToAssign);
		this.question(qToAssign);
		
		/*/Sometimes on game reloads, the variables need to be created again or something so do this test
		if (typeof ig.game.theWord == 'undefined'){
			this.getQNum();
		}*/
		
	},
    quiz: function(damage) {
		console.log('calling quiz');
		var player = ig.game.getEntityByName('player');
		
		//Call quiz box once if player is not invincible
		if (!ig.game.quiz && !player.invin && !player.dying && player.amReady ){
			
			ig.game.potentialDamage = damage;
			//Flash Red So Question Can Calculate
			ig.game.flashScreenBro(this.colorWrong);  //Red
			
			//Randomize Questions
			ig.game.quiz = true;
			ig.game.buttonSet = null;
			ig.game.correctionOn = false;
			ig.game.questionOn = true;
			ig.game.pause = true;
			console.log('paused');
			//Get Random Question and execute it
			this.getQNum();
			this.formatQuestionHeading();
			//Spawn Answer Choices
			ig.game.spawnEntity(EntityAnswer,0,0, {buttonNumber: 1});
			ig.game.spawnEntity(EntityAnswer,0,0, {buttonNumber: 2});
			if ( ig.game.ansNum > 2){
				ig.game.spawnEntity(EntityAnswer,0,0, {buttonNumber: 3});
			}
			if ( ig.game.ansNum > 3){
				ig.game.spawnEntity(EntityAnswer,0,0, {buttonNumber: 4});
			}
			if ( ig.game.ansNum > 4){
				ig.game.spawnEntity(EntityAnswer,0,0, {buttonNumber: 5});
			}
			if ( ig.game.ansNum > 5){
				ig.game.spawnEntity(EntityAnswer,0,0, {buttonNumber: 6});
			}
		}
    },
	formatQuestionHeading: function(){
		ig.game.qHead = false;
	},
	clearAnswers: function(){
		ig.game.ac1 = null;
		ig.game.ac2 = null;
		ig.game.ac3 = null;
		ig.game.ac4 = null;
		ig.game.ac5 = null;
		ig.game.ac6 = null;
		ig.game.ca = null;
	},
	/*****************************************************************
										 QUE5TI0N5
	*****************************************************************/
	q1: function( ) {
		ig.game.questionText = "Juan went home already. Can I go _____?";
		this.setAnswers("too", "to", "two", "2");
	},
	q2: function( ) {
		ig.game.questionText = "Kelly and Janice feel sneaky but _____ going to get caught.";
		this.setAnswers("they're", "their", "there");
	},
	q3: function( ) {
		ig.game.questionText = "I heard it was a lot of fun. I should _____ went.";
		this.setAnswers("have", "of", "a");
	},
	q4: function( ) {
		ig.game.questionText = "Do you want to go to the park with Devin and _____?";
		this.setAnswers("me", "I", "myself");
	},
	
	
	/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'''
						END QUESTIONS
	&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
	
	setAnswers: function(corans, dista, distb, distc, distd, diste){
		this.clearAnswers();
		//Set the correct answer
		ig.game.ca = corans;
		
		//Set Correction Text
		ig.game.theCorrection = 'The answer was ' + '"' + corans + '."';
		
		//Figure out how many answers we need.
		ig.game.ansNum = 2;
		ig.game.answerChoices = 2,
		ig.game.answerColumns = 2;
		if (distb){
			ig.game.ansNum++;
			ig.game.answerChoices++;
			ig.game.answerColumns = 3;	
		}
		if (distc){
			ig.game.ansNum++;
			ig.game.answerChoices++;
			ig.game.answerColumns = 2;
		}
		if (distd){
			ig.game.ansNum++;
			ig.game.answerChoices++;
			ig.game.answerColumns = 3;
		}
		if (diste){
			ig.game.ansNum++;
			ig.game.answerChoices++;
			ig.game.answerColumns = 2;
		}
		var ansNum = ig.game.ansNum;
		//Pull a random number
		var correct = 1 + Math.floor(Math.random()* 1000);
		var order = 1 + Math.floor(Math.random()* 1000);
		var ansRange = Math.floor(1000 / ansNum);
		
		//There are only 2 answer choices
		if (ansNum == 2){
			if (correct <= ansRange){
				ig.game.ac1 = corans;
				ig.game.ac2 = dista;
			}
			else{
				ig.game.ac1 = dista;
				ig.game.ac2 = corans;	
			}
		}
		//There are 3 answer choices
		else if (ansNum == 3){
			if (correct <= ansRange){
				//Answer is A
				ig.game.ac1 = corans;
				if (order <= 500){
					ig.game.ac2 = dista;
					ig.game.ac3 = distb;
				}
				else{
					ig.game.ac2 = distb;
					ig.game.ac3 = dista;	
				}
			}
			else if (correct <= ansRange * 2){
				//Answer is B
				ig.game.ac2 = corans;
				if (order <= 500){
					ig.game.ac1 = dista;
					ig.game.ac3 = distb;
				}
				else{
					ig.game.ac1 = distb;
					ig.game.ac3 = dista;	
				}
			}
			else{
				//Answer is C
				ig.game.ac3 = corans;
				if (order <= 500){
					ig.game.ac1 = dista;
					ig.game.ac2 = distb;
				}
				else{
					ig.game.ac1 = distb;
					ig.game.ac2 = dista;	
				}
			}
		}
		//There are 4 answer choices
		else if (ansNum == 4){
			if (correct <= ansRange){
				//Answer is A
				ig.game.ac1 = corans;
				if (order <= 250){
					ig.game.ac2 = dista;
					ig.game.ac3 = distb;
					ig.game.ac4 = distc;
				}
				else if (order <= 500){
					ig.game.ac2 = distb;
					ig.game.ac3 = distc;
					ig.game.ac4 = dista;
				}
				else if (order <= 750) {
					ig.game.ac2 = dista;
					ig.game.ac3 = distc;
					ig.game.ac4 = distb;
				}
				else{
					ig.game.ac2 = distc;
					ig.game.ac3 = dista;
					ig.game.ac4 = distb;
				}
			}
			else if (correct <= ansRange * 2){
				//Answer is B
				ig.game.ac2 = corans;
				if (order <= 250){
					ig.game.ac1 = dista;
					ig.game.ac3 = distb;
					ig.game.ac4 = distc;
				}
				else if (order <= 500){
					ig.game.ac1 = distb;
					ig.game.ac3 = distc;
					ig.game.ac4 = dista;
				}
				else if (order <= 750) {
					ig.game.ac1 = dista;
					ig.game.ac3 = distc;
					ig.game.ac4 = distb;
				}
				else{
					ig.game.ac1 = distc;
					ig.game.ac3 = dista;
					ig.game.ac4 = distb;
				}
			}
			else if (correct <= ansRange * 3){
				//Answer is C
				ig.game.ac3 = corans;
				if (order <= 250){
					ig.game.ac1 = dista;
					ig.game.ac2 = distb;
					ig.game.ac4 = distc;
				}
				else if (order <= 500){
					ig.game.ac1 = distb;
					ig.game.ac2 = distc;
					ig.game.ac4 = dista;
				}
				else if (order <= 750) {
					ig.game.ac1 = dista;
					ig.game.ac2 = distc;
					ig.game.ac4 = distb;
				}
				else{
					ig.game.ac1 = distc;
					ig.game.ac2 = dista;
					ig.game.ac4 = distb;
				}
			}
			else{
				//Answer is D
				ig.game.ac4 = corans;
				if (order <= 250){
					ig.game.ac1 = dista;
					ig.game.ac2 = distb;
					ig.game.ac3 = distc;
				}
				else if (order <= 500){
					ig.game.ac1 = distb;
					ig.game.ac2 = distc;
					ig.game.ac3 = dista;
				}
				else if (order <= 750) {
					ig.game.ac1 = dista;
					ig.game.ac2 = distc;
					ig.game.ac3 = distb;
				}
				else{
					ig.game.ac1 = distc;
					ig.game.ac2 = dista;
					ig.game.ac3 = distb;
				}
			}
		}
		//There are 5 answer choices
		else if (ansNum == 5){
			if (correct <= ansRange){
				//Answer is A
				ig.game.ac1 = corans;
				if (order <= 125){
					ig.game.ac2 = dista;
					ig.game.ac3 = distb;
					ig.game.ac4 = distc;
					ig.game.ac5 = distd;
				}
				else if (order <= 250){
					ig.game.ac2 = distb;
					ig.game.ac3 = distc;
					ig.game.ac4 = distd;
					ig.game.ac5 = dista;
				}
				else if (order <= 375) {
					ig.game.ac2 = distc;
					ig.game.ac3 = distd;
					ig.game.ac4 = dista;
					ig.game.ac5 = distb;
				}
				else if (order <= 500) {
					ig.game.ac2 = distd;
					ig.game.ac3 = dista;
					ig.game.ac4 = distb;
					ig.game.ac5 = distc;
				}
				else if (order <= 625) {
					ig.game.ac2 = distd;
					ig.game.ac3 = distc;
					ig.game.ac4 = distb;
					ig.game.ac5 = dista;
				}
				else if (order <= 750) {
					ig.game.ac2 = dista;
					ig.game.ac3 = distd;
					ig.game.ac4 = distc;
					ig.game.ac5 = distb;
				}
				else if (order <= 875) {
					ig.game.ac2 = distb;
					ig.game.ac3 = dista;
					ig.game.ac4 = distd;
					ig.game.ac5 = distc;
				}
				else {
					ig.game.ac2 = distc;
					ig.game.ac3 = distb;
					ig.game.ac4 = dista;
					ig.game.ac5 = distd;
				}
			}
			else if (correct <= ansRange * 2){
				//Answer is B
				ig.game.ac2 = corans;
				if (order <= 125){
					ig.game.ac1 = dista;
					ig.game.ac3 = distb;
					ig.game.ac4 = distc;
					ig.game.ac5 = distd;
				}
				else if (order <= 250){
					ig.game.ac1 = distb;
					ig.game.ac3 = distc;
					ig.game.ac4 = distd;
					ig.game.ac5 = dista;
				}
				else if (order <= 375) {
					ig.game.ac1 = distc;
					ig.game.ac3 = distd;
					ig.game.ac4 = dista;
					ig.game.ac5 = distb;
				}
				else if (order <= 500) {
					ig.game.ac1 = distd;
					ig.game.ac3 = dista;
					ig.game.ac4 = distb;
					ig.game.ac5 = distc;
				}
				else if (order <= 625) {
					ig.game.ac1 = distd;
					ig.game.ac3 = distc;
					ig.game.ac4 = distb;
					ig.game.ac5 = dista;
				}
				else if (order <= 750) {
					ig.game.ac1 = dista;
					ig.game.ac3 = distd;
					ig.game.ac4 = distc;
					ig.game.ac5 = distb;
				}
				else if (order <= 875) {
					ig.game.ac1 = distb;
					ig.game.ac3 = dista;
					ig.game.ac4 = distd;
					ig.game.ac5 = distc;
				}
				else {
					ig.game.ac1 = distc;
					ig.game.ac3 = distb;
					ig.game.ac4 = dista;
					ig.game.ac5 = distd;
				}
			}
			else if (correct <= ansRange * 3){
				//Answer is C
				ig.game.ac3 = corans;
				if (order <= 125){
					ig.game.ac1 = dista;
					ig.game.ac2 = distb;
					ig.game.ac4 = distc;
					ig.game.ac5 = distd;
				}
				else if (order <= 250){
					ig.game.ac1 = distb;
					ig.game.ac2 = distc;
					ig.game.ac4 = distd;
					ig.game.ac5 = dista;
				}
				else if (order <= 375) {
					ig.game.ac1 = distc;
					ig.game.ac2 = distd;
					ig.game.ac4 = dista;
					ig.game.ac5 = distb;
				}
				else if (order <= 500) {
					ig.game.ac1 = distd;
					ig.game.ac2 = dista;
					ig.game.ac4 = distb;
					ig.game.ac5 = distc;
				}
				else if (order <= 625) {
					ig.game.ac1 = distd;
					ig.game.ac2 = distc;
					ig.game.ac4 = distb;
					ig.game.ac5 = dista;
				}
				else if (order <= 750) {
					ig.game.ac1 = dista;
					ig.game.ac2 = distd;
					ig.game.ac4 = distc;
					ig.game.ac5 = distb;
				}
				else if (order <= 875) {
					ig.game.ac1 = distb;
					ig.game.ac2 = dista;
					ig.game.ac4 = distd;
					ig.game.ac5 = distc;
				}
				else {
					ig.game.ac1 = distc;
					ig.game.ac2 = distb;
					ig.game.ac4 = dista;
					ig.game.ac5 = distd;
				}
			}
			else if (correct <= ansRange * 4){
				//Answer is D
				ig.game.ac4 = corans;
				if (order <= 125){
					ig.game.ac1 = dista;
					ig.game.ac2 = distb;
					ig.game.ac3 = distc;
					ig.game.ac5 = distd;
				}
				else if (order <= 250){
					ig.game.ac1 = distb;
					ig.game.ac2 = distc;
					ig.game.ac3 = distd;
					ig.game.ac5 = dista;
				}
				else if (order <= 375) {
					ig.game.ac1 = distc;
					ig.game.ac2 = distd;
					ig.game.ac3 = dista;
					ig.game.ac5 = distb;
				}
				else if (order <= 500) {
					ig.game.ac1 = distd;
					ig.game.ac2 = dista;
					ig.game.ac3 = distb;
					ig.game.ac5 = distc;
				}
				else if (order <= 625) {
					ig.game.ac1 = distd;
					ig.game.ac2 = distc;
					ig.game.ac3 = distb;
					ig.game.ac5 = dista;
				}
				else if (order <= 750) {
					ig.game.ac1 = dista;
					ig.game.ac2 = distd;
					ig.game.ac3 = distc;
					ig.game.ac5 = distb;
				}
				else if (order <= 875) {
					ig.game.ac1 = distb;
					ig.game.ac2 = dista;
					ig.game.ac3 = distd;
					ig.game.ac5 = distc;
				}
				else {
					ig.game.ac1 = distc;
					ig.game.ac2 = distb;
					ig.game.ac3 = dista;
					ig.game.ac5 = distd;
				}
			}
			else{
				//Answer is E
				ig.game.ac5 = corans;
				if (order <= 125){
					ig.game.ac1 = dista;
					ig.game.ac2 = distb;
					ig.game.ac3 = distc;
					ig.game.ac4 = distd;
				}
				else if (order <= 250){
					ig.game.ac1 = distb;
					ig.game.ac2 = distc;
					ig.game.ac3 = distd;
					ig.game.ac4 = dista;
				}
				else if (order <= 375) {
					ig.game.ac1 = distc;
					ig.game.ac2 = distd;
					ig.game.ac3 = dista;
					ig.game.ac4 = distb;
				}
				else if (order <= 500) {
					ig.game.ac1 = distd;
					ig.game.ac2 = dista;
					ig.game.ac3 = distb;
					ig.game.ac4 = distc;
				}
				else if (order <= 625) {
					ig.game.ac1 = distd;
					ig.game.ac2 = distc;
					ig.game.ac3 = distb;
					ig.game.ac4 = dista;
				}
				else if (order <= 750) {
					ig.game.ac1 = dista;
					ig.game.ac2 = distd;
					ig.game.ac3 = distc;
					ig.game.ac4 = distb;
				}
				else if (order <= 875) {
					ig.game.ac1 = distb;
					ig.game.ac2 = dista;
					ig.game.ac3 = distd;
					ig.game.ac4 = distc;
				}
				else {
					ig.game.ac1 = distc;
					ig.game.ac2 = distb;
					ig.game.ac3 = dista;
					ig.game.ac4 = distd;
				}
			}
		}
		//There are 6 answer choices
		else if (ansNum == 6){
			if (correct <= ansRange){
				//Answer is A
				ig.game.ac1 = corans;
				if (order <= 100){
					ig.game.ac2 = dista;
					ig.game.ac3 = distb;
					ig.game.ac4 = distc;
					ig.game.ac5 = distd;
					ig.game.ac6 = diste;
				}
				else if (order <= 200){
					ig.game.ac2 = distb;
					ig.game.ac3 = distc;
					ig.game.ac4 = distd;
					ig.game.ac5 = diste;
					ig.game.ac6 = dista;
				}
				else if (order <= 300) {
					ig.game.ac2 = distc;
					ig.game.ac3 = distd;
					ig.game.ac4 = diste;
					ig.game.ac5 = dista;
					ig.game.ac6 = distb;
				}
				else if (order <= 400) {
					ig.game.ac2 = distd;
					ig.game.ac3 = diste;
					ig.game.ac4 = dista;
					ig.game.ac5 = distb;
					ig.game.ac6 = distc;
				}
				else if (order <= 500) {
					ig.game.ac2 = diste;
					ig.game.ac3 = dista;
					ig.game.ac4 = distb;
					ig.game.ac5 = distc;
					ig.game.ac6 = distd;
				}
				else if (order <= 600) {
					ig.game.ac2 = diste;
					ig.game.ac3 = distd;
					ig.game.ac4 = distc;
					ig.game.ac5 = distb;
					ig.game.ac6 = dista;
				}
				else if (order <= 700) {
					ig.game.ac2 = distd;
					ig.game.ac3 = distc;
					ig.game.ac4 = distb;
					ig.game.ac5 = dista;
					ig.game.ac6 = diste;
				}
				else if (order <= 800) {
					ig.game.ac2 = distc;
					ig.game.ac3 = distb;
					ig.game.ac4 = dista;
					ig.game.ac5 = diste;
					ig.game.ac6 = distd;
				}
				else if (order <= 900) {
					ig.game.ac2 = distb;
					ig.game.ac3 = dista;
					ig.game.ac4 = diste;
					ig.game.ac5 = distd;
					ig.game.ac6 = distc;
				}
				else {
					ig.game.ac2 = dista;
					ig.game.ac3 = diste;
					ig.game.ac4 = distd;
					ig.game.ac5 = distc;
					ig.game.ac6 = distb;
				}
			}
			else if (correct <= ansRange * 2){
				//Answer is B
				ig.game.ac2 = corans;
				if (order <= 100){
					ig.game.ac1 = dista;
					ig.game.ac3 = distb;
					ig.game.ac4 = distc;
					ig.game.ac5 = distd;
					ig.game.ac6 = diste;
				}
				else if (order <= 200){
					ig.game.ac1 = distb;
					ig.game.ac3 = distc;
					ig.game.ac4 = distd;
					ig.game.ac5 = diste;
					ig.game.ac6 = dista;
				}
				else if (order <= 300) {
					ig.game.ac1 = distc;
					ig.game.ac3 = distd;
					ig.game.ac4 = diste;
					ig.game.ac5 = dista;
					ig.game.ac6 = distb;
				}
				else if (order <= 400) {
					ig.game.ac1 = distd;
					ig.game.ac3 = diste;
					ig.game.ac4 = dista;
					ig.game.ac5 = distb;
					ig.game.ac6 = distc;
				}
				else if (order <= 500) {
					ig.game.ac1 = diste;
					ig.game.ac3 = dista;
					ig.game.ac4 = distb;
					ig.game.ac5 = distc;
					ig.game.ac6 = distd;
				}
				else if (order <= 600) {
					ig.game.ac1 = diste;
					ig.game.ac3 = distd;
					ig.game.ac4 = distc;
					ig.game.ac5 = distb;
					ig.game.ac6 = dista;
				}
				else if (order <= 700) {
					ig.game.ac1 = distd;
					ig.game.ac3 = distc;
					ig.game.ac4 = distb;
					ig.game.ac5 = dista;
					ig.game.ac6 = diste;
				}
				else if (order <= 800) {
					ig.game.ac1 = distc;
					ig.game.ac3 = distb;
					ig.game.ac4 = dista;
					ig.game.ac5 = diste;
					ig.game.ac6 = distd;
				}
				else if (order <= 900) {
					ig.game.ac1 = distb;
					ig.game.ac3 = dista;
					ig.game.ac4 = diste;
					ig.game.ac5 = distd;
					ig.game.ac6 = distc;
				}
				else {
					ig.game.ac1 = dista;
					ig.game.ac3 = diste;
					ig.game.ac4 = distd;
					ig.game.ac5 = distc;
					ig.game.ac6 = distb;
				}
			}
			else if (correct <= ansRange * 3){
				//Answer is C
				ig.game.ac3 = corans;
				if (order <= 100){
					ig.game.ac1 = dista;
					ig.game.ac2 = distb;
					ig.game.ac4 = distc;
					ig.game.ac5 = distd;
					ig.game.ac6 = diste;
				}
				else if (order <= 200){
					ig.game.ac1 = distb;
					ig.game.ac2 = distc;
					ig.game.ac4 = distd;
					ig.game.ac5 = diste;
					ig.game.ac6 = dista;
				}
				else if (order <= 300) {
					ig.game.ac1 = distc;
					ig.game.ac2 = distd;
					ig.game.ac4 = diste;
					ig.game.ac5 = dista;
					ig.game.ac6 = distb;
				}
				else if (order <= 400) {
					ig.game.ac1 = distd;
					ig.game.ac2 = diste;
					ig.game.ac4 = dista;
					ig.game.ac5 = distb;
					ig.game.ac6 = distc;
				}
				else if (order <= 500) {
					ig.game.ac1 = diste;
					ig.game.ac2 = dista;
					ig.game.ac4 = distb;
					ig.game.ac5 = distc;
					ig.game.ac6 = distd;
				}
				else if (order <= 600) {
					ig.game.ac1 = diste;
					ig.game.ac2 = distd;
					ig.game.ac4 = distc;
					ig.game.ac5 = distb;
					ig.game.ac6 = dista;
				}
				else if (order <= 700) {
					ig.game.ac1 = distd;
					ig.game.ac2 = distc;
					ig.game.ac4 = distb;
					ig.game.ac5 = dista;
					ig.game.ac6 = diste;
				}
				else if (order <= 800) {
					ig.game.ac1 = distc;
					ig.game.ac2 = distb;
					ig.game.ac4 = dista;
					ig.game.ac5 = diste;
					ig.game.ac6 = distd;
				}
				else if (order <= 900) {
					ig.game.ac1 = distb;
					ig.game.ac2 = dista;
					ig.game.ac4 = diste;
					ig.game.ac5 = distd;
					ig.game.ac6 = distc;
				}
				else {
					ig.game.ac1 = dista;
					ig.game.ac2 = diste;
					ig.game.ac4 = distd;
					ig.game.ac5 = distc;
					ig.game.ac6 = distb;
				}
			}
			else if (correct <= ansRange * 4){
				//Answer is D
				ig.game.ac4 = corans;
				if (order <= 100){
					ig.game.ac1 = dista;
					ig.game.ac2 = distb;
					ig.game.ac3 = distc;
					ig.game.ac5 = distd;
					ig.game.ac6 = diste;
				}
				else if (order <= 200){
					ig.game.ac1 = distb;
					ig.game.ac2 = distc;
					ig.game.ac3 = distd;
					ig.game.ac5 = diste;
					ig.game.ac6 = dista;
				}
				else if (order <= 300) {
					ig.game.ac1 = distc;
					ig.game.ac2 = distd;
					ig.game.ac3 = diste;
					ig.game.ac5 = dista;
					ig.game.ac6 = distb;
				}
				else if (order <= 400) {
					ig.game.ac1 = distd;
					ig.game.ac2 = diste;
					ig.game.ac3 = dista;
					ig.game.ac5 = distb;
					ig.game.ac6 = distc;
				}
				else if (order <= 500) {
					ig.game.ac1 = diste;
					ig.game.ac2 = dista;
					ig.game.ac3 = distb;
					ig.game.ac5 = distc;
					ig.game.ac6 = distd;
				}
				else if (order <= 600) {
					ig.game.ac1 = diste;
					ig.game.ac2 = distd;
					ig.game.ac3 = distc;
					ig.game.ac5 = distb;
					ig.game.ac6 = dista;
				}
				else if (order <= 700) {
					ig.game.ac1 = distd;
					ig.game.ac2 = distc;
					ig.game.ac3 = distb;
					ig.game.ac5 = dista;
					ig.game.ac6 = diste;
				}
				else if (order <= 800) {
					ig.game.ac1 = distc;
					ig.game.ac2 = distb;
					ig.game.ac3 = dista;
					ig.game.ac5 = diste;
					ig.game.ac6 = distd;
				}
				else if (order <= 900) {
					ig.game.ac1 = distb;
					ig.game.ac2 = dista;
					ig.game.ac3 = diste;
					ig.game.ac5 = distd;
					ig.game.ac6 = distc;
				}
				else {
					ig.game.ac1 = dista;
					ig.game.ac2 = diste;
					ig.game.ac3 = distd;
					ig.game.ac5 = distc;
					ig.game.ac6 = distb;
				}
			}
			else if (correct <= ansRange * 5){
				//Answer is E
				ig.game.ac5 = corans;
				if (order <= 100){
					ig.game.ac1 = dista;
					ig.game.ac2 = distb;
					ig.game.ac3 = distc;
					ig.game.ac4 = distd;
					ig.game.ac6 = diste;
				}
				else if (order <= 200){
					ig.game.ac1 = distb;
					ig.game.ac2 = distc;
					ig.game.ac3 = distd;
					ig.game.ac4 = diste;
					ig.game.ac6 = dista;
				}
				else if (order <= 300) {
					ig.game.ac1 = distc;
					ig.game.ac2 = distd;
					ig.game.ac3 = diste;
					ig.game.ac4 = dista;
					ig.game.ac6 = distb;
				}
				else if (order <= 400) {
					ig.game.ac1 = distd;
					ig.game.ac2 = diste;
					ig.game.ac3 = dista;
					ig.game.ac4 = distb;
					ig.game.ac6 = distc;
				}
				else if (order <= 500) {
					ig.game.ac1 = diste;
					ig.game.ac2 = dista;
					ig.game.ac3 = distb;
					ig.game.ac4 = distc;
					ig.game.ac6 = distd;
				}
				else if (order <= 600) {
					ig.game.ac1 = diste;
					ig.game.ac2 = distd;
					ig.game.ac3 = distc;
					ig.game.ac4 = distb;
					ig.game.ac6 = dista;
				}
				else if (order <= 700) {
					ig.game.ac1 = distd;
					ig.game.ac2 = distc;
					ig.game.ac3 = distb;
					ig.game.ac4 = dista;
					ig.game.ac6 = diste;
				}
				else if (order <= 800) {
					ig.game.ac1 = distc;
					ig.game.ac2 = distb;
					ig.game.ac3 = dista;
					ig.game.ac4 = diste;
					ig.game.ac6 = distd;
				}
				else if (order <= 900) {
					ig.game.ac1 = distb;
					ig.game.ac2 = dista;
					ig.game.ac3 = diste;
					ig.game.ac4 = distd;
					ig.game.ac6 = distc;
				}
				else {
					ig.game.ac1 = dista;
					ig.game.ac2 = diste;
					ig.game.ac3 = distd;
					ig.game.ac4 = distc;
					ig.game.ac6 = distb;
				}
			}
			else{
				//Answer is F
				ig.game.ac6 = corans;
				if (order <= 100){
					ig.game.ac1 = dista;
					ig.game.ac2 = distb;
					ig.game.ac3 = distc;
					ig.game.ac4 = distd;
					ig.game.ac5 = diste;
				}
				else if (order <= 200){
					ig.game.ac1 = distb;
					ig.game.ac2 = distc;
					ig.game.ac3 = distd;
					ig.game.ac4 = diste;
					ig.game.ac5 = dista;
				}
				else if (order <= 300) {
					ig.game.ac1 = distc;
					ig.game.ac2 = distd;
					ig.game.ac3 = diste;
					ig.game.ac4 = dista;
					ig.game.ac5 = distb;
				}
				else if (order <= 400) {
					ig.game.ac1 = distd;
					ig.game.ac2 = diste;
					ig.game.ac3 = dista;
					ig.game.ac4 = distb;
					ig.game.ac5 = distc;
				}
				else if (order <= 500) {
					ig.game.ac1 = diste;
					ig.game.ac2 = dista;
					ig.game.ac3 = distb;
					ig.game.ac4 = distc;
					ig.game.ac5 = distd;
				}
				else if (order <= 600) {
					ig.game.ac1 = diste;
					ig.game.ac2 = distd;
					ig.game.ac3 = distc;
					ig.game.ac4 = distb;
					ig.game.ac5 = dista;
				}
				else if (order <= 700) {
					ig.game.ac1 = distd;
					ig.game.ac2 = distc;
					ig.game.ac3 = distb;
					ig.game.ac4 = dista;
					ig.game.ac5 = diste;
				}
				else if (order <= 800) {
					ig.game.ac1 = distc;
					ig.game.ac2 = distb;
					ig.game.ac3 = dista;
					ig.game.ac4 = diste;
					ig.game.ac5 = distd;
				}
				else if (order <= 900) {
					ig.game.ac1 = distb;
					ig.game.ac2 = dista;
					ig.game.ac3 = diste;
					ig.game.ac4 = distd;
					ig.game.ac5 = distc;
				}
				else {
					ig.game.ac1 = dista;
					ig.game.ac2 = diste;
					ig.game.ac3 = distd;
					ig.game.ac4 = distc;
					ig.game.ac5 = distb;
				}	
			}
		}
		/*Debug Questions
		console.log('ig.game.ac1 = ' + ig.game.ac1); 
		console.log('ig.game.ac2 = ' + ig.game.ac2); 
		if (ig.game.ac3){
			console.log('ig.game.ac3 = ' + ig.game.ac3); 
		}
		if (ig.game.ac4){
			console.log('ig.game.ac4 = ' + ig.game.ac4); 
		}
		if (ig.game.ac5){
			console.log('ig.game.ac5 = ' + ig.game.ac5); 
		}
		if (ig.game.ac6){
			console.log('ig.game.ac6 = ' + ig.game.ac6); 
		}
		console.log('Correct Answer = ' + corans);
		*/
		
	},
	question: function( n ) {
		console.log('calling question ' + n);
		switch(n) {
		case 1:
			this.q1();
			break;
		case 2:
			this.q2();
			break;
		case 3:
			this.q3();
			break;
		case 4:
			this.q4();
			break;
		case 5:
			this.q5();
			break;
		case 6:
			this.q6();
			break;
		case 7:
			this.q7();
			break;
		case 8:
			this.q8();
			break;
		case 9:
			this.q9();
			break;
		case 10:
			this.q10();
			break;
		case 11:
			this.q11();
			break;
		case 12:
			this.q12();
			break;
		case 13:
			this.q13();
			break;
		case 14:
			this.q14();
			break;
		case 15:
			this.q15();
			break;
		case 16:
			this.q16();
			break;
		case 17:
			this.q17();
			break;
		case 18:
			this.q18();
			break;
		case 19:
			this.q19();
			break;
		case 20:
			this.q20();
			break;
		case 21:
			this.q21();
			break;
		case 22:
			this.q22();
			break;
		case 23:
			this.q23();
			break;
		case 24:
			this.q24();
			break;
		case 25:
			this.q25();
			break;
		case 26:
			this.q26();
			break;
		case 27:
			this.q27();
			break;
		case 28:
			this.q28();
			break;
		case 29:
			this.q29();
			break;
		case 30:
			this.q30();
			break;
		case 31:
			this.q31();
			break;
		case 32:
			this.q32();
			break;
		case 33:
			this.q33();
			break;
		case 34:
			this.q34();
			break;
		case 35:
			this.q35();
			break;
		case 36:
			this.q36();
			break;
		case 37:
			this.q37();
			break;
		case 38:
			this.q38();
			break;
		case 39:
			this.q39();
			break;
		case 40:
			this.q40();
			break;
		case 41:
			this.q41();
			break;
		case 42:
			this.q42();
			break;
		case 43:
			this.q43();
			break;
		case 44:
			this.q44();
			break;
		case 45:
			this.q45();
			break;
		case 46:
			this.q46();
			break;
		case 47:
			this.q47();
			break;
		case 48:
			this.q48();
			break;
		case 49:
			this.q49();
			break;
		case 50:
			this.q50();
			break;
		case 51:
			this.q51();
			break;
		case 52:
			this.q52();
			break;
		case 53:
			this.q53();
			break;
		case 54:
			this.q54();
			break;
		case 55:
			this.q55();
			break;
		case 56:
			this.q56();
			break;
		case 57:
			this.q57();
			break;
		case 58:
			this.q58();
			break;
		case 59:
			this.q59();
			break;
		case 60:
			this.q60();
			break;
		case 61:
			this.q61();
			break;
		case 62:
			this.q62();
			break;
		case 63:
			this.q63();
			break;
		case 64:
			this.q64();
			break;
		case 65:
			this.q65();
			break;
		case 66:
			this.q66();
			break;
		case 67:
			this.q67();
			break;
		case 68:
			this.q68();
			break;
		case 69:
			this.q69();
			break;
		case 70:
			this.q70();
			break;
		case 71:
			this.q71();
			break;
		case 72:
			this.q72();
			break;
		case 73:
			this.q73();
			break;
		case 74:
			this.q74();
			break;
		case 75:
			this.q75();
			break;
		case 76:
			this.q76();
			break;
		case 77:
			this.q77();
			break;
		case 78:
			this.q78();
			break;
		case 79:
			this.q79();
			break;
		case 80:
			this.q80();
			break;
		case 81:
			this.q81();
			break;
		case 82:
			this.q82();
			break;
		case 83:
			this.q83();
			break;
		case 84:
			this.q84();
			break;
		case 85:
			this.q85();
			break;
		case 86:
			this.q86();
			break;
		case 87:
			this.q87();
			break;
		case 88:
			this.q88();
			break;
		case 89:
			this.q89();
			break;
		case 90:
			this.q90();
			break;
		case 91:
			this.q91();
			break;
		case 92:
			this.q92();
			break;
		case 93:
			this.q93();
			break;
		case 94:
			this.q94();
			break;
		case 95:
			this.q95();
			break;
		case 96:
			this.q96();
			break;
		case 97:
			this.q97();
			break;
		case 98:
			this.q98();
			break;
		case 99:
			this.q99();
			break;
		case 100:
			this.q100();
			break;
		case 101:
			this.q101();
			break;
		case 102:
			this.q102();
			break;
		case 103:
			this.q103();
			break;
		case 104:
			this.q104();
			break;
		case 105:
			this.q105();
			break;
		case 106:
			this.q106();
			break;
		case 107:
			this.q107();
			break;
		case 108:
			this.q108();
			break;
		case 109:
			this.q109();
			break;
		case 110:
			this.q110();
			break;
		case 111:
			this.q111();
			break;
		case 112:
			this.q112();
			break;
		case 113:
			this.q113();
			break;
		case 114:
			this.q114();
			break;
		case 115:
			this.q115();
			break;
		case 116:
			this.q116();
			break;
		case 117:
			this.q117();
			break;
		case 118:
			this.q118();
			break;
		case 119:
			this.q119();
			break;
		case 120:
			this.q120();
			break;
				case 121:
			this.q121();
			break;
		case 122:
			this.q122();
			break;
		case 123:
			this.q123();
			break;
		case 124:
			this.q124();
			break;
		case 125:
			this.q125();
			break;
		case 126:
			this.q126();
			break;
		case 127:
			this.q127();
			break;
		case 128:
			this.q128();
			break;
		case 129:
			this.q129();
			break;
		case 130:
			this.q130();
			break;
		case 131:
			this.q131();
			break;
		case 132:
			this.q132();
			break;
		case 133:
			this.q133();
			break;
		case 134:
			this.q134();
			break;
		case 135:
			this.q135();
			break;
		case 136:
			this.q136();
			break;
		case 137:
			this.q137();
			break;
		case 138:
			this.q138();
			break;
		case 139:
			this.q139();
			break;
		case 140:
			this.q140();
			break;
		case 141:
			this.q141();
			break;
		case 142:
			this.q142();
			break;
		case 143:
			this.q143();
			break;
		case 144:
			this.q144();
			break;
		case 145:
			this.q145();
			break;
		case 146:
			this.q146();
			break;
		case 147:
			this.q147();
			break;
		case 148:
			this.q148();
			break;
		case 149:
			this.q149();
			break;
		case 150:
			this.q150();
			break;
		case 151:
			this.q151();
			break;
		case 152:
			this.q152();
			break;
		case 153:
			this.q153();
			break;
		case 154:
			this.q154();
			break;
		case 155:
			this.q155();
			break;
		case 156:
			this.q156();
			break;
		case 157:
			this.q157();
			break;
		case 158:
			this.q158();
			break;
		case 159:
			this.q159();
			break;
		case 160:
			this.q160();
			break;
		case 161:
			this.q161();
			break;
		case 162:
			this.q162();
			break;
		case 163:
			this.q163();
			break;
		case 164:
			this.q164();
			break;
		case 165:
			this.q165();
			break;
		case 166:
			this.q166();
			break;
		case 167:
			this.q167();
			break;
		case 168:
			this.q168();
			break;
		case 169:
			this.q169();
			break;
		case 170:
			this.q170();
			break;
		case 171:
			this.q171();
			break;
		case 172:
			this.q172();
			break;
		case 173:
			this.q173();
			break;
		case 174:
			this.q174();
			break;
		case 175:
			this.q175();
			break;
		case 176:
			this.q176();
			break;
		case 177:
			this.q177();
			break;
		case 178:
			this.q178();
			break;
		case 179:
			this.q179();
			break;
		case 180:
			this.q180();
			break;
		case 181:
			this.q181();
			break;
		case 182:
			this.q182();
			break;
		case 183:
			this.q183();
			break;
		case 184:
			this.q184();
			break;
		case 185:
			this.q185();
			break;
		case 186:
			this.q186();
			break;
		case 187:
			this.q187();
			break;
		case 188:
			this.q188();
			break;
		case 189:
			this.q189();
			break;
		case 190:
			this.q190();
			break;
		case 191:
			this.q191();
			break;
		case 192:
			this.q192();
			break;
		case 193:
			this.q193();
			break;
		case 194:
			this.q194();
			break;
		case 195:
			this.q195();
			break;
		case 196:
			this.q196();
			break;
		case 197:
			this.q197();
			break;
		case 198:
			this.q198();
			break;
		case 199:
			this.q199();
			break;
		case 200:
			this.q200();
			break;
		case 201:
			this.q201();
			break;
		case 202:
			this.q202();
			break;
		case 203:
			this.q203();
			break;
		case 204:
			this.q204();
			break;
		case 205:
			this.q205();
			break;
		case 206:
			this.q206();
			break;
		case 207:
			this.q207();
			break;
		case 208:
			this.q208();
			break;
		case 209:
			this.q209();
			break;
		case 210:
			this.q210();
			break;
		case 211:
			this.q211();
			break;
		case 212:
			this.q212();
			break;
		case 213:
			this.q213();
			break;
		case 214:
			this.q214();
			break;
		case 215:
			this.q215();
			break;
		case 216:
			this.q216();
			break;
		case 217:
			this.q217();
			break;
		case 218:
			this.q218();
			break;
		case 219:
			this.q219();
			break;
		case 220:
			this.q220();
			break;
			case 221:
			this.q221();
			break;
		case 222:
			this.q222();
			break;
		case 223:
			this.q223();
			break;
		case 224:
			this.q224();
			break;
		case 225:
			this.q225();
			break;
		case 226:
			this.q226();
			break;
		case 227:
			this.q227();
			break;
		case 228:
			this.q228();
			break;
		case 229:
			this.q229();
			break;
		case 230:
			this.q230();
			break;
		case 231:
			this.q231();
			break;
		case 232:
			this.q232();
			break;
		case 233:
			this.q233();
			break;
		case 234:
			this.q234();
			break;
		case 235:
			this.q235();
			break;
		case 236:
			this.q236();
			break;
		case 237:
			this.q237();
			break;
		case 238:
			this.q238();
			break;
		case 239:
			this.q239();
			break;
		case 240:
			this.q240();
			break;
		case 241:
			this.q241();
			break;
		case 242:
			this.q242();
			break;
		case 243:
			this.q243();
			break;
		case 244:
			this.q244();
			break;
		case 245:
			this.q245();
			break;
		case 246:
			this.q246();
			break;
		case 247:
			this.q247();
			break;
		case 248:
			this.q248();
			break;
		case 249:
			this.q249();
			break;
		case 250:
			this.q250();
			break;
		case 251:
			this.q251();
			break;
		case 252:
			this.q252();
			break;
		case 253:
			this.q253();
			break;
		case 254:
			this.q254();
			break;
		case 255:
			this.q255();
			break;
		case 256:
			this.q256();
			break;
		case 257:
			this.q257();
			break;
		case 258:
			this.q258();
			break;
		case 259:
			this.q259();
			break;
		case 260:
			this.q260();
			break;
		case 261:
			this.q261();
			break;
		case 262:
			this.q262();
			break;
		}
    }
});
});