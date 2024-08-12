<script>
	//Determine if NEW or RETURNING USER and grab values
	async function checkUserAccount() {
		
		const account = window['userAccountNumber'];

		const response = await fetch('/code/php/user-login.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: 'account=' + encodeURIComponent(account)
		});

		const data = await response.json();

		if (data.status === 'new_user') {
			console.log("This is a new user.");
			newUsr = true;
		}
		else if (data.status === 'existing_user') {
			console.log("This is a returning user.");
			usrDataExpPoints = data.expPoints;
			usrDataGoldCoins = data.goldCoins
			usrDataNumOfTsts = data.numberOfTestsTaken;
			usrCredits =  data.gameCredits;
			
			if (data.gradeLevel == 0) {
				usrGradeLvl = 'K';
			}
			else if (data.gradeLevel == 13) {
				usrGradeLvl = '12+';
			}
			else{
				usrGradeLvl = data.gradeLevel;	
			}
			
			usrGradeLvlNum = data.gradeLevel;
			newUsr = false;
		}
		else {
			console.error("Unexpected response:", data);
		}
		userChecked = true;
		
		truncUsrAcct();
		updateUIData();
		//User has gone through connection process so remove current view
		if (currentView){
			poofGone(currentView, "view-03a", false);
		}
		else{
			//User is already logged in and connected so just remove cover
			poofGone("coverAll", "view-03a", false);
		}
	}
	function loadStudentView(clear){
		if (clear){
			resetGlobals();
			poofGone("view-06", "view-03c", false);
		}
		else if (newUsr){
			poofGone("view-03a", "view-03b", false);
		}
		else{
			poofGone("view-03a", "view-03c", false);
		}
		checkGoldTokenBalance();
	}
	function resetGlobals(){

		currentStudyDiv1 = false;
		currentStudyDiv2 = false;
		currentStudyDiv3 = false;
		subjectSelection = 1;
		
		currentQuestionNumber = 1;
		
		///////////////////////////////<---------------------
		//Dont forget to change this
		//When you change it in the globals file, bro.
		///////////////////////////////<---------------------
		totalQuestions = 3;
		
		correctAnswers = 0;
	
		userInput = "";
		botPrompt = ""
		curClass = false;
		subject = false;
		topic = false;
		subtopic = false;
		gettingQuestion = false;
		lastQuestion = false;
		studentAnswer = false;
		agentCorrectionResponse = false;
		displayingQuestion = false;
		formattedQuestion = false;
	}
	function editUserDetails(){
		poofGone(currentView, "view-03b", false);
	}
	function selectTests(){
		poofGone(currentView, "view-04", false);
	}
	//Truncate User Account Number and replace all spans with class .usrAddress
	function truncUsrAcct() {
		var slicedObj = window['userAccountNumber'].slice(0, 6);
		//slicedObj += "...";
		truncUsrNum = slicedObj;

		//Find all spans with the class .usrAddress
		var addressSpans = document.querySelectorAll('.usrAddress');
		//Replace the innerHTML of each span
		addressSpans.forEach(function(span) {
				span.innerHTML = truncUsrNum;
		});
	}
	//Functions to Update Data Values in UI
	function updateExpPointSpans() {
		var expPointsSpans = document.querySelectorAll('.usrExpPoints');
		expPointsSpans.forEach(function(span) {
				span.innerHTML = usrDataExpPoints == false ? 0 : usrDataExpPoints;
		});
	}
	function updateGameCreditSpans() {
		var gameCreditSpans = document.querySelectorAll('.usrGameCredits');
		gameCreditSpans.forEach(function(span) {
				span.innerHTML = usrCredits == false ? 0 : usrCredits;
		});
	}
	function updateGoldCoinSpans() {
		var goldCoinsSpans = document.querySelectorAll('.usrGoldCoins');
		goldCoinsSpans.forEach(function(span) {
				span.innerHTML = usrDataGoldCoins == false ? 0 : usrDataGoldCoins;
		});
	}
	function updateNumOfTestsTakenSpans() {
		var numOfTestsTakenSpans = document.querySelectorAll('.usrNumOfTsts');
		numOfTestsTakenSpans.forEach(function(span) {
				span.innerHTML = usrDataNumOfTsts == false ? 0 : usrDataNumOfTsts;
		});
	}
	
	function updateGradeLevelDisp() {
		var gradeLvlSpans = document.querySelectorAll('.usrGradeLvl');
		gradeLvlSpans.forEach(function(span) {
				span.innerHTML = usrGradeLvl;
		});
	}
	//Update UI showing Coins Minted in Wallet
	function updateCoinsInWalletDisp(tb){
		const spans = document.querySelectorAll('.usrGoldCoinsMinted');
		spans.forEach(span => {
			span.textContent = tb;
		});
	}
	function saveGradeLevel() {
		var slider = document.getElementById('gradeLevelSlider');
		var grade = slider.value;
				
		usrGradeLvlNum = grade;
		
		if (grade == 0) {
			grade = 'K';
		}
		else if (grade == 13) {
			grade = '12+';
		}
		usrGradeLvl = grade;
		var account = window['userAccountNumber']; 
		
		fetch('/code/php/save-grade-level.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				'account': account,
				'grade_level': grade
			})
		})
		.then(response => response.text())
		.then(data => {
			updateGradeLevelDisp();
			poofGone(currentView, "view-03c", false);
		})
		.catch(error => {
				console.error('Error:', error);
		});
	}
	function updateUIData(){
		updateExpPointSpans();
		updateGoldCoinSpans();
		updateNumOfTestsTakenSpans();
		updateGradeLevelDisp();
		updateGameCreditSpans();
	}
	function updateTestInfo(){
				var testInfoText = `<div id='test-info-hdr-01'><strong>Grade ${usrGradeLvl} ${curClass} / ${subject} Test on ${topic}</strong>`;
			
				if (subtopic) {
			testInfoText += `<strong>: ${subtopic}</strong>`;
		}
		testInfoText += `</div>`;
		
		var correctStr = ` | ${correctAnswers} Questions Answered Correctly`;

		if (currentQuestionNumber == 1){
			correctStr = "";
		}
		
		//Add the question number information
		testInfoText += `<div id='test-info-hdr-02'><strong>Question #${currentQuestionNumber} of ${totalQuestions} ${correctStr}</strong>`;
			
		//Update the innerHTML of the test-info div
		document.getElementById('test-info').innerHTML = testInfoText;
	}
	async function launchTest(){
		poofGone("view-04", "view-05", false);
		updateTestInfo();
		makeDisappear("agentResponseDiv");
		poofGone('advanceQuizDiv', 'submitResponseDiv', false); //Switch Buttons
		disableButton();
		botPrompt = getQuestionPrompt();
		userInput = "The student is not sending input. The student is waiting for your question.";
		sendInputToServer(userInput, botPrompt);
	}
	async function submitResponse() {
		disableButton();
		setLoadingGif('agentResponse'); //Set Loading Gif
		makeAppear("agentResponseDiv");
		userInput = document.getElementById('studentAnswer').value;
		botPrompt = getQuestionCorrectionPrompt();
		sendInputToServer(userInput, botPrompt);
	}
	async function getTestQuestion(){
		gettingQuestion = true;
		botPrompt = getQuestionPrompt();
		userInput = "The student is not sending input. The student is waiting for your question.";
		sendInputToServer(userInput, botPrompt);
	}
	function showReportDiv(isCorrect) {
		var reportDiv = document.getElementById('reportDiv');
		reportDiv.innerHTML = '';

		var message = document.createElement('p');
		var img = document.createElement('img');

		if (isCorrect) {
			message.textContent = 'CORRECT';
			message.style.color = '#2ECC71'; //Green color
			img.src = '/images/check-mark.gif';
		}
		else{
			message.textContent = 'INCORRECT';
			message.style.color = '#E74C3C'; //Red color
			img.src = '/images/cross-mark.gif';
		}

		message.className = 'report-message';
		img.className = 'report-image';

		reportDiv.appendChild(message);
		reportDiv.appendChild(img);

		reportDiv.classList.remove('gone');
		reportDiv.classList.add('visible');
	}
	function hideReportDiv() {
		var reportDiv = document.getElementById('reportDiv');
		reportDiv.classList.add('gone');
		reportDiv.classList.remove('visible');
	}
	function calculatePercentage(correct, total) {
			return Math.round((correct / total) * 100);
	}
	function updateResultsSlide() {
		var gradeLevelText = usrGradeLvl === "K" ? "Kindergarten" : (usrGradeLvlNum === 13 ? "Grade 12+" : `Grade ${usrGradeLvl}`);
		var percentageScore = calculatePercentage(correctAnswers, totalQuestions);
		var passingThreshold = 66;
		var resultsHeader = percentageScore >= passingThreshold ? `Congratulations, User ${truncUsrNum}!<br/>You passed the test!` : `So Close, User ${truncUsrNum}!<br/>You did not pass the test but feel free to try again!` ;
		var resultsDetails = `
			<strong>Grade Level:</strong> ${gradeLevelText} <br>
			<strong>Class:</strong> ${curClass} <br>
			<strong>Subject:</strong> ${subject} <br>
			<strong>Topic:</strong> ${topic} <br>
		`;
		if (subtopic) {
			resultsDetails += `<strong>Subtopic:</strong> ${subtopic} <br>`;
		}
		var resultsSummary = `You answered ${correctAnswers} out of ${totalQuestions} questions correctly (${percentageScore}%).`;

		document.getElementById('results-header').innerHTML = resultsHeader;
		document.getElementById('results-details').innerHTML = resultsDetails;
		document.getElementById('results-summary').innerHTML = resultsSummary;
		
		var addCredit = false;
		
		if (percentageScore >= passingThreshold){
			addCredit = true;
		}
		usrDataNumOfTsts++;
		
		//Fetch request to update the database
		fetch('/code/php/report-test.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `account=${encodeURIComponent(window['userAccountNumber'])}&passed=${encodeURIComponent(addCredit)}`
		})
		.then(response => response.json())
		.then(data => {
			if (data.status === 'updated') {
				console.log(`User record updated. Number of tests taken: ${data.numberOfTestsTaken}, Credits: ${data.credits}`);
				usrCredits = data.credits;
				usrDataNumOfTsts = data.numberOfTestsTaken;
				updateUIData();
			}
			else{
				console.error('Error:', data.message);
			}
		})
		.catch(error => {
				console.error('Error:', error);
		});
		
	}
	function confirmQuest(){
		if (usrCredits > 0){
			popConfirm(2);
		}
		else{
			popAlert(7);
		}
	}
	function startQuest() {
		var url = "/code/php/start-quest.php?wallet=" + window['userAccountNumber'];
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				window.location.href = '/game/';
			}
			else{
				alert(data.message || 'Failed to start quest.');
			}
		})
		.catch(error => {
			console.error('Error:', error);
			alert('An unexpected error occurred.');
		});
	}
	function buyItems(){
		poofGone(currentView, "view-03f", false);
	}
	function buyItem(which){
		alert('buy item 1');
	}
	async function mintGold() {
		if (1 > usrDataGoldCoins){
			popAlert(9);
			return;
		}
		var url = "/code/php/mint-gold.php?wallet=" + window['userAccountNumber'];
		popMiningBox(1, "0x0x0x0x0x");
		
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: 'account=' + encodeURIComponent(window['userAccountNumber'])
			});

			const data = await response.json();

			if (data.success) {
				popMiningBox(2, data.message);
				usrDataGoldCoins = 0;
				updateGoldCoinSpans();
			}
			else{
				closeMiningBoxBox();
				//alert('Error: ' + data.message + '\nPlease try the transaction again.'); //Show error message
				popAlert(8, data.message);
			}
		}
		catch(error) {
			closeMiningBoxBox()
			popAlert(8);
		}
	}
	async function checkGoldTokenBalance() {
		//Ensure Web3 is injected (e.g., by MetaMask)
		if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
			//Create Web3 instance
			let web3 = new Web3(Web3.givenProvider || window.web3.currentProvider);

			//ABI for ERC20 contract (only includes the necessary 'balanceOf' method)
			const abi = [
				{
					"constant": true,
					"inputs": [{"name": "_owner", "type": "address"}],
					"name": "balanceOf",
					"outputs": [{"name": "balance", "type": "uint256"}],
					"type": "function"
				}
			];

			try {
				const goldTokenContract = new web3.eth.Contract(abi, goldContractAddress);
				const userAccount = window['userAccountNumber'];
				const balance = await goldTokenContract.methods.balanceOf(userAccount).call();
				const tokenBalance = web3.utils.fromWei(balance, 'ether');
				updateCoinsInWalletDisp(tokenBalance)				
			}
			catch (error){
				console.error('Error checking token balance:', error);
				alert('An error occurred while checking your token balance.');
			}
		}
		else{
			alert('Web3 provider is not detected. Please install MetaMask or another Web3 provider.');
		}
	}


</script>