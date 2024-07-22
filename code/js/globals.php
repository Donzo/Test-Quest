	
<script>
		//GLOBAL VARIABLES	
		var currentView = false;
		//Need these for functioning back button on nested class, subject, topic divs
		var currentStudyDiv1 = false;
		var currentStudyDiv2 = false;
		var currentStudyDiv3 = false;
		var subjectSelection = 1;
		
		var currentQuestionNumber = 1;
		var totalQuestions = 3;
		var correctAnswers = 0;
		
		//Wallet Connection Variables
		var onPreferredNetwork = false;
		var preferredNetworkName = "Open Campus Codex";
		var preferredNetworkChainID = "0xa045c";
		var preferredNetworkSwitchCode = 9;
		var preferredProviderNumber = 656476;
		var preferredRPC = "https://rpc.open-campus-codex.gelato.digital";
		var chain = false;
		var chainId = false;
		var account = false;
		var userChecked = false;
		var truncUsrNum = false;
		
		//Sys Msgs
		var miningBoxActive = false;
		
		//ChatGPT
		var userInput = "What is the capital of Illinois?";
		var botPrompt = "You are a deranged travel guide. Respond to questions with angst."
		var curClass = false;
		var subject = false;
		var topic = false;
		var subtopic = false;
		var gettingQuestion = false;
		var lastQuestion = false;
		var studentAnswer = false;
		var agentCorrectionResponse = false;
		var displayingQuestion = false;
		var formattedQuestion = false;
		
		//User Data
		var usrDataExpPoints = false;
		var usrDataGoldCoins = false;
		var usrDataNumOfTsts = false;
		var usrCredits = 0;
		var usrGradeLvl = 5;
		var usrGradeLvlNum = 5;
		var newUsr = false;
	</script>