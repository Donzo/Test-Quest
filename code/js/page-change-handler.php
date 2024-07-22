<script>
	
	//View Changing Functions (For Smooth Transitions and Appearances)
	function makeAppear(id, which) {
		var thing = document.getElementById(id);
		thing.classList.remove('gone'); // Ensure element is visible in the layout
		if (which == 1) { // Large Buttons
			thing.className = "invisible button largeButton";
		}
		else {
			thing.className = "invisible";
		}
		window.setTimeout(function () {
				appear(thing, false, 1);
		}, 10); // Small delay to ensure visibility before transition
	}

	function makeDisappear(id, which) {
		var thing = document.getElementById(id);
		if (which == 1) { // Large Buttons
			thing.className = "invisible button largeButton";
		}
		else{
			thing.className += " " + "invisible";
		}
		window.setTimeout(function () {
			thing.className += " " + "gone";
		}, 500); // Delay to match the transition duration
	}

	function poofGone(eID, neID, noBlock) {
		var leaving = document.getElementById(eID);
		var coming = document.getElementById(neID);

		leaving.classList.add('invisible');
		if (noBlock) {
			coming.classList.add('invisible-no-block');
		}
		else{
			coming.classList.add('invisible');
		}
		coming.classList.remove('gone'); // Ensure element is visible in the layout
		window.setTimeout(function () {
			leaving.classList.add('gone');
			if (noBlock) {
				appear(coming, true);
				document.getElementById('thin-header').style.position = "sticky";
			}
			else{
				appear(coming);
			}
		}, 10); // Small delay to ensure visibility before transition

		currentView = neID;
	}
	function appear(e, noBlock, which) {
		if (which == 1) {
		e.className = "visible button largeButton";
		}
		else if (noBlock) {
			e.className = "visible-no-block";
		}
		else{
			e.className = "visible";
		}
	}
	function refreshTest() {
		var testContent = document.getElementById('test-content');

		//Fade out
		testContent.classList.add('invisible');
		window.setTimeout(function () {
			//Clear content after fade out
			makeDisappear("agentResponseDiv", 0);
			document.getElementById('studentAnswer').value = "";
			document.getElementById('question').innerHTML = ''; // Clear
			document.getElementById('agentResponse').innerHTML = ''; // Clear
			hideReportDiv(); //Get rid of check mark box
			//Ensure the div is still in the layout but hidden
			testContent.classList.add('gone');

			//After clearing, fade in
			window.setTimeout(function () {
				testContent.classList.remove('gone');
				testContent.classList.remove('invisible');
				testContent.classList.add('visible'); // Add class for fade-in
			}, 500); // Delay to match the transition duration
		}, 500); // Delay to match the transition duration
	}
	function selectStudy(whichDiv, buttonText, furtherNesting) {
		//CLASS
		if (subjectSelection == 1){
			curClass = buttonText;
			currentStudyDiv1 = whichDiv;
			poofGone('classes', whichDiv, false);
			//Change Intro Text
			setTimeout(function() {
				document.getElementById('test-desc').innerHTML = introTxt2;
			}, 500);
			subjectSelection++;
		}
		//SUBJECT
		else if (subjectSelection == 2){
			subject = buttonText;
			poofGone(currentStudyDiv1, whichDiv, false);
			currentStudyDiv2 = whichDiv;
			//Change Intro Text
			setTimeout(function() {
				document.getElementById('test-desc').innerHTML = introTxt3;
			}, 500);
			subjectSelection++;
		}
		//TOPIC
		else if (subjectSelection == 3){
			topic = buttonText;
			if (furtherNesting){
				poofGone(currentStudyDiv2, whichDiv, false);
				currentStudyDiv3 = whichDiv;
				//Change Intro Text
				setTimeout(function() {
					document.getElementById('test-desc').innerHTML = introTxt4;
				}, 500);
				subjectSelection++;
			}
			else{
				showTestLaunchButton();
			}
			
		}
		//SUB-TOPIC
		else if (subjectSelection == 4){
			subtopic = buttonText;
			showTestLaunchButton();
		}
	}

	function goBack(fromWhere){
		if (subjectSelection == 2){
			poofGone(fromWhere, "classes", false); //Leaving Current Subject, Pulling up Classes Menu
			setTimeout(function() {
				document.getElementById('test-desc').innerHTML = introTxt;
			}, 500);
			subjectSelection = 1;
			curClass = false;
		}
		else if (subjectSelection == 3){
			poofGone(fromWhere, currentStudyDiv1, false); //Leaving Current Topic, Pulling up Subjects Menu
			setTimeout(function() {
				document.getElementById('test-desc').innerHTML = introTxt2;
			}, 500);
			subjectSelection = 2;
			subject = false;
		}
		else if (subjectSelection == 4){
			poofGone(fromWhere, currentStudyDiv2, false); //Leaving Current Subtopic, Pulling up Topic Menu
			setTimeout(function() {
				document.getElementById('test-desc').innerHTML = introTxt3;
			}, 500);
			subjectSelection = 3;
			topic = false;
		}
		hideTestLaunchButton();
	}
	function resetSelectionValues(){
		curClass = false;
		subjectSelection = 1;
		subject = false;
		topic = false;
		subtopic = false;
		currentStudyDiv1 = false;
		currentStudyDiv2 = false;
		currentStudyDiv3 = false;
	}
	function showTestLaunchButton(){
		//Format Heading
		var article = curClass == "English" ? "an" : "a";
		var txt = `Ready to start ${article} ${curClass} test about ${topic}?`;
		if (subtopic){
			txt = `Ready to start ${article} ${curClass} test about ${topic}: ${subtopic}?`;
		}
		var promptTxt = 
		`<div class="heading">
						${txt}
					</div>`;
		document.getElementById('test-launch-prompt').innerHTML = promptTxt;
		//Make Button and Heading Appear:
		makeAppear('testLaunchButtonDiv');
	}
	function hideTestLaunchButton(){
		//document.getElementById('testLaunchButtonDiv').innerHTML = "";		
		//Make Button and Heading Disappear:
		makeDisappear('testLaunchButtonDiv');
	}
	function disableButton(){
		var button = document.getElementById('submitResponseButton');
		button.disabled = true;
	}
	function enableButton(){
		var button = document.getElementById('submitResponseButton');
		button.disabled = false;
	}
	function readyToAdvance(){
		window.setTimeout(function () {
			poofGone('submitResponseDiv', 'advanceQuizDiv', false); //Switch Buttons
		}, 1001);
	}
	function setLoadingGif(e){
		var loader = "<img src='/images/loading.gif'/ id='loading-gif'>";
		var element = document.getElementById(e);
		element.innerHTML = loader;
	}
	function advanceQuiz(){
		refreshTest();

		window.setTimeout(function () {
			if (currentQuestionNumber < totalQuestions){
				botPrompt = getQuestionPrompt();
				userInput = "The student is not sending input. The student is waiting for your question.";
				sendInputToServer(userInput, botPrompt);
				poofGone('advanceQuizDiv', 'submitResponseDiv', false); //Switch Buttons
				currentQuestionNumber++;
				updateTestInfo();
			}
			else{
				endTest();
			}
		}, 777);
	}
	function endTest(){
		alert('test over');
		poofGone("view-05", "view-06", false);
		updateResultsSlide();
	}
	function typeEffect(element, text, speed, callback) {
		var i = 0;

		function typeWriter() {
			if (i < text.length) {
				if (text.charAt(i) === '\n') {
					element.innerHTML += '<br>';
				}
				else{
					element.innerHTML += text.charAt(i);
				}
				i++;
				setTimeout(typeWriter, speed);
			}
			else if (callback) {
				callback();
			}
		}

		element.innerHTML = ''; // Clear the element before starting
		typeWriter();
	}
	//Display the question
	function displayQuestionWithEffect() {
		displayingQuestion = true;
		var questionElement = document.getElementById('question');
		questionElement.innerHTML = ''; // Clear
		typeEffect(questionElement, formattedQuestion, 10, enableButton);
	}
	//Display the correction
	function displayCorrectionWithEffect(){
		displayingQuestion = false;
		var responseElement = document.getElementById('agentResponse');
		responseElement.innerHTML = ''; // Clear
		typeEffect(responseElement, agentCorrectionResponse, 10, readyToAdvance);
	}
	var introTxt = `<div id='desc'>	
				<p>
					<strong>Welcome to Test Quest!</strong>
				</p>
				<p>
					Select a Class.
				</p>
			</div>`;
			
	var introTxt2 = `<div id='desc'>	
				<p>
					<strong>Welcome to Test Quest!</strong>
				</p>
				<p>
					Choose a Subject.
				</p>
			</div>`;
	
	var introTxt3 = `<div id='desc'>	
				<p>
					<strong>Welcome to Test Quest!</strong>
				</p>
				<p>
					Choose a Topic.
				</p>
			</div>`;
	
	var introTxt4 = `<div id='desc'>	
				<p>
					<strong>Welcome to Test Quest!</strong>
				</p>
				<p>
					Choose a Subtopic.
				</p>
			</div>`;
	
</script>