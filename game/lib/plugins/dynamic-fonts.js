ig.module( 
    'plugins.dynamic-fonts' 
)
.requires(
    'impact.impact'
)
.defines(function(){

DynamicFonts = ig.Class.extend({ 
	
	defaultFontColor: "#000000",
	defaultFontName: "Fredoka",
	dynamicFontSize: null,
	dynamicFontSize2: null,
	dynamicFontSize3: null,
	dynamicFontSize4: null,
	dynamicFontSize5: null,
	dynamicFontSize6: null,
	dynamicFontSize7: null,
	dynamicFontSizeHeader: null,
	dynamicFontSizeHeaderTLH: null,
	dynamicFontSizeQuestion: null,
	dynamicFontSizeQuestionShrunk: null,
	dynamicFontSizeTinyQuestion: null,
	dynamicFontSizeCorrection: null,
	dynamicFontSizeCorrectionShrunk: null,
	dynamicFontSizeButtonOne: null,
	dynamicFontSizeButtonTwo: null,
	dynamicFontSizeButtonThree: null,
	dynamicFontSizeButtonFour: null,
	dynamicFontSizeButtonFive: null,
	dynamicFontSizeButtonSix: null,
	
	vh: null,
	vw: null,
	vmin: null,
	vmax: null,
	fontSizeY: null,
	cursorPosX: null,
	cursorPosY: null,
	cursorPosYNewLine: null,
	lastLineHeight: null,
	//Don't forget to reset known line size variable after using it
	headerSizeKnown: false,
	questionSizeKnown: false,
	tinyQuestionSizeKnown: false,
	buttonOneSizeKnown: false,
	buttonTwoSizeKnown: false,
	buttonThreeSizeKnown: false,
	buttonFourSizeKnown: false,
	buttonFiveSizeKnown: false,
	buttonSixSizeKnown: false,
	correctionSizeKnown: false,
	
	ac1LSN: false,
	ac2LSN: false,
	ac3LSN: false,
	ac4LSN: false,
	clHeightKnown: false,
	dynamicLineHeightHeader: null,
	dynamicLineHeightHeaderTLH: null,
	dynamicLineHeightTinyQuestion: null, 
	dynamicLineHeightCorrection: null,
	dynamicLineHeightCorrectionShrunk: null,
	dynamicLineHeightQuestion: null, 
	dynamicLineHeightQuestionShrunk: null,
	dynamicLineHeightButtonOne: null,
	dynamicLineHeightButtonTwo: null,
	dynamicLineHeightButtonThree: null,
	dynamicLineHeightButtonFour: null,
	dynamicLineHeightButtonFive: null,
	dynamicLineHeightButtonSix: null,
	shrinkFactor1: .75,
	shrinkFactor2: .9,
	shrinkFactor3: .8,
	
	init: function( ) {
		this.setVs();
	},
	dynamicFontChange: function(context, style, size, unit, fillColor){
		
		if (window.scale > .8){
			if (window.innerHeight < window.innerWidth){
				size *= 1 + window.scale;
			}
			else{
				size *= 1 + (window.scale / 3);
			}
		}
		
		this.dfsPx = size;
		//Header font
		if (style == "header"){
			context.font =  size + 'px ' + this.defaultFontName; 
			this.dynamicFontSizeHeader = size + 'px ' + this.defaultFontName; 
			//Set a smaller font size for two line headers
			this.dynamicFontSizeTLH = (size * this.shrinkFactor1) + 'px ' + this.defaultFontName; 
		}
		else if (style == "question"){
			context.font =  size + 'px ' + this.defaultFontName; 
			this.dynamicFontSizeQuestion = size + 'px ' + this.defaultFontName; 
			//Set a smaller font size for two line headers
			this.dynamicFontSizeQuestionShrunk = (size * this.shrinkFactor1) + 'px ' + this.defaultFontName; 
		}
		else if (style == "buttonOne"){
			context.font =  size + 'px ' + this.defaultFontName; 
			this.dynamicFontSizeButtonOne = size + 'px ' + this.defaultFontName; 
		}
		else if (style == "buttonTwo"){
			context.font =  size + 'px ' + this.defaultFontName; 
			this.dynamicFontSizeButtonTwo = size + 'px ' + this.defaultFontName; 
		}
		else if (style == "buttonThree"){
			context.font =  size + 'px ' + this.defaultFontName; 
			this.dynamicFontSizeButtonThree = size + 'px ' + this.defaultFontName; 
		}
		else if (style == "buttonFour"){
			context.font =  size + 'px ' + this.defaultFontName; 
			this.dynamicFontSizeButtonFour = size + 'px ' + this.defaultFontName; 
		}
		else if (style == "buttonFive"){
			context.font =  size + 'px ' + this.defaultFontName; 
			this.dynamicFontSizeButtonFive = size + 'px ' + this.defaultFontName; 
		}
		else if (style == "buttonSix"){
			context.font =  size + 'px ' + this.defaultFontName; 
			this.dynamicFontSizeButtonSix = size + 'px ' + this.defaultFontName; 
		}
		else if (style == "tinyQuestion"){
			context.font =  size + 'px ' + this.defaultFontName; 
			this.dynamicFontSizeTinyQuestion = size + 'px ' + this.defaultFontName; 
		}
		else if (style == "correction"){
			context.font =  size + 'px ' + this.defaultFontName; 
			this.dynamicFontSizeCorrection = size + 'px ' + this.defaultFontName; 
			//Set a smaller font size in the event of neccessary shrink
			this.dynamicFontSizeCorrectionShrunk = (size * this.shrinkFactor1) + 'px ' + this.defaultFontName; 
		}
		//Color
		if (fillColor){
			ig.system.context.fillStyle = fillColor;
		}
		else{
			ig.system.context.fillStyle = this.defaultFontColor;
		}
	},
	//We need to set viewport units for dynamic font setting
	setVs: function(){
		this.vh = document.documentElement.clientHeight * .01;
		this.vw = document.documentElement.clientWidth * .01;
		if (document.documentElement.clientWidth > document.documentElement.clientHeight){
			this.vmin = this.vh ;
			this.vmax = this.vw;
		}
		else{
			this.vmax = this.vh ;
			this.vmin = this.vw;
		}
	},
	getVminFontSizeY: function(vMin){
		vMin *= .01;
		//Portrait
		if (document.documentElement.clientHeight > document.documentElement.clientWidth){
			this.fontSizeY = document.documentElement.clientWidth * vMin;
		}
		//landscape
		else{
			this.fontSizeY = document.documentElement.clientHeight * vMin;	
		}
	},
	changeFont: function(context, style, alteration){
		
		if (style == 1){
			var vmin1 = this.vmin * 1;
			context.font= vmin1 + 'px ' + this.defaultFontName;
			ig.system.context.fillStyle = this.defaultFontColor;
			this.getVminFontSizeY(1);
		}
		//HUD Font
		else if (style == 2){
			var vmin2 = this.vmin * 2;
			context.font= vmin2 + 'px ' + this.defaultFontName;
			ig.system.context.fillStyle = this.defaultFontColor;
			this.getVminFontSizeY(2);
		}
		else if (style == 3){
			var vmin3 = this.vmin * 3;
			context.font= vmin3 + 'px ' + this.defaultFontName;
			ig.system.context.fillStyle = this.defaultFontColor;
			this.getVminFontSizeY(3);
		}
		else if (style == 4){
			var vmin4 = this.vmin * 4;
			context.font= vmin4 + 'px ' + this.defaultFontName;
			ig.system.context.fillStyle = this.defaultFontColor;
			this.getVminFontSizeY(4);
			//Set Line Height
			this.style4LineHeight  = (vmin4 * 1.05);
		}
		else if (style == 5){
			var vmin5 = this.vmin * 5;
			context.font= vmin5 + 'px ' + this.defaultFontName;
			ig.system.context.fillStyle = this.defaultFontColor;
			this.getVminFontSizeY(5);
			//Set Line Height
			this.style5LineHeight  = (vmin5 * 1.05);
		}
		else if (style == 6){
			var vmin6 = this.vmin * 6;
			context.font= vmin6 + 'px ' + this.defaultFontName;
			ig.system.context.fillStyle = this.defaultFontColor;
			this.getVminFontSizeY(6);
		}
		else if (style == 7){
			var vmin7 = this.vmin * 7;
			context.font= vmin7 + 'px ' + this.defaultFontName;
			ig.system.context.fillStyle = this.defaultFontColor;
			this.getVminFontSizeY(7);
		}
		else if (style == 8){
			var vmin8 = this.vmin * 8;
			context.font= vmin8 + 'px ' + this.defaultFontName;
			ig.system.context.fillStyle = this.defaultFontColor;
			this.getVminFontSizeY(8);
		}
		else if (style == 9){
			var vmin9 = this.vmin * 9;
			context.font= vmin9 + 'px ' + this.defaultFontName;
			ig.system.context.fillStyle = this.defaultFontColor;
			this.getVminFontSizeY(9);
		}
		else if (style == 10){
			var vmin10 = this.vmin * 10;
			context.font= vmin10 + 'px ' + this.defaultFontName;
			ig.system.context.fillStyle = this.defaultFontColor;
			this.getVminFontSizeY(10);
		}
	},
    wrapTheText: function(context, text, x, y, maxWidth, lineHeight) {
		
		if (window.scale > .8 && ig.game.quiz){
			if (window.innerHeight < window.innerWidth){
				lineHeight *= 1 + window.scale;
			}
			else{
				lineHeight *= 1 + (window.scale / 3);
			}
		}
		
		if (text != null){
			//Split turns text into an array.
			var words = text.split(" ");
			//initialize line
			var line = "";
			//continue looping if there are still words in the words array.
			for(var n = 0; n < words.length; n++) {
				//create a test line with all of the words.
				var testLine = line + words[n] + " ";
				//measure text measures in pixels so all of this must be done in pixels.
				var metrics = context.measureText(testLine);
				//use the object created by measure text and get it's width
				var testWidth = metrics.width;
				//If the object is wider than defined maxwidth
				if(testWidth > maxWidth) {
					context.fillText(line, x, y);	
					line = words[n] + " ";
					//Move down a line
					y += lineHeight;
				}
				else {
					line = testLine;
				}
			}
			context.fillText(line, x, y);
			this.cursorPosX = x;
			this.cursorPosY =y;
			this.cursorPosYNewLine = y + lineHeight;
			this.lastLineHeight = lineHeight;
		}
		else{
			text = "null";	
			context.fillText(text, x, y);
		}
	},
	setTxtSizeHUD: function(context, size){
		//Set Fontsize
		var sizeCalc  = (ig.system.width * .05 ) * size;
		//Store Line Height
		ig.game.lineHeightHUD = sizeCalc * 1.15;
		//Change Font
		context.font=  sizeCalc + 'px ' + this.defaultFontName; 
		//Store Font
		this.fontSizeHUD = sizeCalc + 'px ' + this.defaultFontName; 	
	},
	calcLineSize: function(context, text, x, y, maxWidth, maxNumberOfLines) {
		if (text != null){
			//Initalize default sizes and increments
			var defaultFontSize = this.vh * 4;
			var increment =  this.vh  * .1;
			var lineHeight = defaultFontSize * 1.125;
			var lineCount = null;
			//////The do...while statement creates a loop that executes a specified statement until the test condition evaluates to false.
			do {
				lineCount = 0;
				var words = text.split(" ");
				var line = "";
				//Set Header Size
				if (!this.headerSizeKnown && ig.game.qHead){
					this.dynamicFontChange(context, "header", defaultFontSize, "px");
				}
				else if (!this.questionSizeKnown){
					this.dynamicFontChange(context, "question", defaultFontSize, "px");	
				}
				else if (!this.buttonOneSizeKnown){
					this.dynamicFontChange(context, "buttonOne", defaultFontSize, "px");	
				}
				else if (!this.buttonTwoSizeKnown){
					this.dynamicFontChange(context, "buttonTwo", defaultFontSize, "px");	
				}
				else if (ig.game.ansNum >= 3 && !this.buttonThreeSizeKnown){
					this.dynamicFontChange(context, "buttonThree", defaultFontSize, "px");	
				}
				else if (ig.game.ansNum >= 4 && !this.buttonFourSizeKnown){
					this.dynamicFontChange(context, "buttonFour", defaultFontSize, "px");	
				}
				else if (ig.game.ansNum >= 5 && !this.buttonFiveSizeKnown){
					this.dynamicFontChange(context, "buttonFive", defaultFontSize, "px");	
				}
				else if (ig.game.ansNum >= 6 && !this.buttonSixSizeKnown){
					this.dynamicFontChange(context, "buttonSix", defaultFontSize, "px");	
				}
				else if (!ig.game.tinyQuestionSizeKnown){
					this.dynamicFontChange(context, "tinyQuestion", defaultFontSize, "px");		
				}
				else if (!ig.game.correctionSizeKnown){
					this.dynamicFontChange(context, "correction", defaultFontSize, "px");		
				}

				for(var n = 0; n < words.length; n++) {
					var testLine = line + words[n] + " ";
					var metrics = context.measureText(testLine);
					var testWidth = metrics.width;

					if(testWidth > maxWidth) {					
						line = words[n] + " ";
						lineCount++;
					}
					else {
						line = testLine;
					}
				}
				//We have more lines than allowed or we have exceeded the allotted Y space
				if (lineCount >= maxNumberOfLines){
					//Lower the default font size by increment
					defaultFontSize = defaultFontSize- increment;
					//update line height
					lineHeight = defaultFontSize * 1.1;
					//initialize words again
					words.length = 0;
					var words = text.split(" ");
				}
			}
			//Once this statement is false, loop will end.
			while (lineCount >= maxNumberOfLines);
			
			//Run That Same Shit and Check Against Total Height
			//////The do...while statement creates a loop that executes a specified statement until the test condition evaluates to false.
			do {
				lineCount = 0;
				var words = text.split(" ");
				var line = "";
				//Make Sure Header Size Fits Within Alloted Space
				var allotedSpaceY = null;
				if (!this.headerSizeKnown && ig.game.qHead){
					this.dynamicFontChange(context, "header", defaultFontSize, "px");
					//This is the header. Set Y Max to Max Header Height
					allotedSpaceY =  ig.game.maxHeaderHeight;
				}
				else if (!this.questionSizeKnown){
					this.dynamicFontChange(context, "question", defaultFontSize, "px");	
					allotedSpaceY =  ig.game.maxQuestionHeight;
				}
				else if (!this.buttonOneSizeKnown){
					this.dynamicFontChange(context, "buttonOne", defaultFontSize, "px");	
					allotedSpaceY =  ig.game.buttonWritableY;
				}
				else if (!this.buttonTwoSizeKnown){
					this.dynamicFontChange(context, "buttonTwo", defaultFontSize, "px");	
					allotedSpaceY =  ig.game.buttonWritableY;
				}
				else if (ig.game.ansNum >= 3 && !this.buttonThreeSizeKnown){
					this.dynamicFontChange(context, "buttonThree", defaultFontSize, "px");	
					allotedSpaceY =  ig.game.buttonWritableY;
				}
				else if (ig.game.ansNum >= 4 && !this.buttonFourSizeKnown){
					this.dynamicFontChange(context, "buttonFour", defaultFontSize, "px");	
					allotedSpaceY =  ig.game.buttonWritableY;
				}
				else if (ig.game.ansNum >= 5 && !this.buttonFiveSizeKnown){
					this.dynamicFontChange(context, "buttonFive", defaultFontSize, "px");	
					allotedSpaceY =  ig.game.buttonWritableY;
				}
				else if (ig.game.ansNum >= 6 && !this.buttonSixSizeKnown){
					this.dynamicFontChange(context, "buttonSix", defaultFontSize, "px");	
					allotedSpaceY =  ig.game.buttonWritableY;
				}
				else if (!this.tinyQuestionSizeKnown){
					this.dynamicFontChange(context, "tinyQuestion", defaultFontSize, "px");	
					allotedSpaceY =  ig.game.maxTinyQuestionHeight;
				}
				else if (!this.correctionSizeKnown){
					this.dynamicFontChange(context, "correction", defaultFontSize, "px");	
					allotedSpaceY =  ig.game.maxCorrectionHeight;
				}
				
				for(var n = 0; n < words.length; n++) {
					var testLine = line + words[n] + " ";
					var metrics = context.measureText(testLine);
					var testWidth = metrics.width;

					if(testWidth > maxWidth) {					
						line = words[n] + " ";
						lineCount++;
					}
					else {
						line = testLine;
					}
				}
				//If we exceed the space allotment, shrink the font.
				if ( lineHeight * lineCount  > allotedSpaceY){
					//Lower the default font size by increment
					defaultFontSize = defaultFontSize- increment;
					//update line height
					lineHeight = defaultFontSize * 1.1;
					//initialize words again
					words.length = 0;
					var words = text.split(" ");
				}
				
			}
			//Once this statement is false, loop will end.
			while (lineHeight * lineCount  > allotedSpaceY);
			
			//We can proceed now that the conditions have been satisfied.
			
			//The Sizes are Now Known
			if (!this.headerSizeKnown){
				this.headerSizeKnown = true;
				this.headerLineCount = lineCount + 1;
				//Update Line Height - Make it Smaller if We Need To
				this.dynamicLineHeightHeader = lineHeight;
				this.dynamicLineHeightHeaderTLH = lineHeight * this.shrinkFactor1;
				
			}
			else if (!this.questionSizeKnown){
				this.questionSizeKnown = true;
				this.questionLineCount = lineCount + 1;
				//Update Line Height
				this.dynamicLineHeightQuestion = lineHeight;
				this.dynamicLineHeightQuestionShrunk = lineHeight * this.shrinkFactor1;
			}
			else if (!this.buttonOneSizeKnown){
				this.buttonOneSizeKnown = true;
				this.buttonOneLineCount = lineCount + 1;
				//Update Line Height
				this.dynamicLineHeightButtonOne = lineHeight;
			}
			else if (!this.buttonTwoSizeKnown){
				this.buttonTwoSizeKnown = true;
				this.buttonTwoLineCount = lineCount + 1;
				//Update Line Height
				this.dynamicLineHeightButtonTwo = lineHeight;
			}
			else if (ig.game.ansNum >= 3 && !this.buttonThreeSizeKnown){
				this.buttonThreeSizeKnown = true;
				this.buttonThreeLineCount = lineCount + 1;
				//Update Line Height
				this.dynamicLineHeightButtonThree = lineHeight;
			}
			else if (ig.game.ansNum >= 4 && !this.buttonFourSizeKnown){
				this.buttonFourSizeKnown = true;
				this.buttonFourLineCount = lineCount + 1;
				//Update Line Height
				this.dynamicLineHeightButtonFour = lineHeight;
			}
			else if (ig.game.ansNum >= 5 && !this.buttonFiveSizeKnown){
				this.buttonFiveSizeKnown = true;
				this.buttonFiveLineCount = lineCount + 1;
				//Update Line Height
				this.dynamicLineHeightButtonFive = lineHeight;
			}
			else if (ig.game.ansNum >= 6 && !this.buttonSixSizeKnown){
				this.buttonSixSizeKnown = true;
				this.buttonSixLineCount = lineCount + 1;
				//Update Line Height
				this.dynamicLineHeightButtonSix = lineHeight;
			}
			else if (!this.tinyQuestionSizeKnown){
				if (!this.finalTinyQuestionSize){
					this.finalTinyQuestionSize = this.dynamicFontSizeTinyQuestion;
				}
				this.tinyQuestionSizeKnown = true;
				this.tinyQuestionLineCount = lineCount + 1;
				//Update Line Height
				this.dynamicLineHeightTinyQuestion = lineHeight;	
			}
			else if (!this.correctionSizeKnown){
				this.correctionSizeKnown = true;
				this.correctionLineCount = lineCount + 1;
				//Update Line Height
				this.dynamicLineHeightCorrection = lineHeight;	
				this.dynamicLineHeightCorrectionShrunk = lineHeight  * this.shrinkFactor1;
			}
		}	
		else{
			console.log('you are sending a NULL to the line counter.');	
		}
	},
});
});