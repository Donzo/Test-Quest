<?php
	//Start the session
	session_start();

	
	// Check if the user has spent a credit to play
	if (!isset($_SESSION['readyToPlay']) || $_SESSION['readyToPlay'] !== true) {
		//If not show the error message and redirect after 5 seconds
		echo '<!DOCTYPE html>
				<html>
					<head>
						<title>Access Denied</title>
						<meta http-equiv="refresh" content="5;url=https://testquest.app">
						<style>
							html,body {
								background-color: #34495E;
								color: #E74C3C;
								font-family: helvetica, arial, sans-serif;
								margin: 0;
								padding: 0;
								font-size: 16pt;
								display: flex;
								justify-content: center;
								align-items: center;
								height: 100vh;
								text-align: center;
								flex-direction: column;
							}
							h1 {
								margin-bottom: 10px;
							}
							p {
								margin: 0;
							}
						</style>
					</head>
					<body>
						<h1>Please spend a credit to play.</h1>
						<br/>
						<br/>
						<p>You will be redirected to the <a href="https://testquest.app/">main page</a> in 5 seconds.</p>
					</body>
				</html>';
		exit;
	}
	//Clear the spent credit.
	unset($_SESSION['readyToPlay']);
	//Set game session variables
	$_SESSION['gameLive'] = true;
	$_SESSION['gameTime'] = time();

?>
<!DOCTYPE html>
<html>
<head>
	<title>Test Quest | Game</title>
	
	<!--?php  //Cookie Consent for EU
		$europe = array('AD', 'AL', 'AT', 'AX', 'BA', 'BE', 'BG', 'BY', 'CH', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FO', 'FR', 'GB', 'GG', 'GI', 'GR', 'HR', 'HU', 'IE', 'IM', 'IS', 'IT', 'JE', 'LI', 'LT', 'LU', 'LV', 'MC', 'MD', 'ME', 'MK', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'RS', 'RU', 'SE', 'SI', 'SJ', 'SK', 'SM', 'UA', 'VA');
		
		$country_code = $_SERVER["HTTP_CF_IPCOUNTRY"];
		
		if(in_array($country_code, $europe)) {
			  echo'<script type="text/javascript">
				window.cookieconsent_options = {"message":"This website uses cookies from Google to analyze traffic and personalize advertisements. Information about your use of this site is shared with Google.","dismiss":"Got it!","learnMore":"More info","link":"http://www.ereadingworksheets.com/e-reading-worksheets/privacy-policy/","theme":"dark-top"};
			</script>
			
			<script type="text/javascript" src="//s3.amazonaws.com/cc.silktide.com/cookieconsent.latest.min.js"></script>';
		} 
	
	?-->
	<?php
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/php/globals.php";		
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/globals.php";
	?>
	<script>
		<?php
			//WEB3JS INTERFACE CODE
			require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/web3js/web3.min.js";
		?>
	</script>
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
	<style type="text/css">
		html,body {
			background-color: #4d4d4e;
			color: #fff;
			font-family: 'Press Start 2P', cursive;
			margin: 0;
			padding: 0;
			font-size: 12pt;
			
		}
		
		#canvas {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
		}
		
		
		@font-face {
			font-family: 'Press Start 2P';
			font-style: normal;
			font-weight: 400;
			src: url('/font/press-start-2p-v14-latin-regular.eot'); /* IE9 Compat Modes */
			src: local(''),
				url('/font/press-start-2p-v14-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
				url('/font/press-start-2p-v14-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
				url('/font/press-start-2p-v14-latin-regular.woff') format('woff'), /* Modern Browsers */
				url('/font/press-start-2p-v14-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
				url('/font/press-start-2p-v14-latin-regular.svg#PressStart2P') format('svg'); /* Legacy iOS */
		}
		
	</style>

	
	<script type="text/javascript">
		/*Preload Title Screen Images*/
		var tsImage = new Image();
		tsImage.src = 'media/buttons-and-logos/title-screen-main.png';
		
		var conbut = new Image();
		conbut.src = 'media/buttons-and-logos/continue-button.png';
		
		var ngbut = new Image();
		ngbut.src = 'media/buttons-and-logos/new-game-button.png';
	</script>
	
	<script type="text/javascript" src="lib/impact/impact.js"></script>
	<script type="text/javascript" src="lib/game/main.js"></script>
	
	<!--Disable the Backspace Button-->
	<script type="text/javascript">
			function killBackSpace(e) {
			   e = e ? e : window.event;
			   var t = e.target ? e.target : e.srcElement ? e.srcElement : null;
			   if (t && t.tagName && (t.type && /(password)|(text)|(file)/.test(t.type.toLowerCase())) || t.tagName.toLowerCase() == 'textarea')
				  return true;
			   var k = e.keyCode ? e.keyCode : e.which ? e.which : null;
			   if (k == 8) {
				  if (e.preventDefault)
					 e.preventDefault();
				  return false;
			   };
			   return true;
			};
		 
			if (typeof document.addEventListener != 'undefined')
			   document.addEventListener('keydown', killBackSpace, false);
			else if (typeof document.attachEvent != 'undefined')
			   document.attachEvent('onkeydown', killBackSpace);
			else {
			   if (document.onkeydown != null) {
				  var oldOnkeydown = document.onkeydown;
				  document.onkeydown = function(e) {
				  oldOnkeydown(e);
				  killBackSpace(e);
				  };
			   }
		 
			   else
				  document.onkeydown = killBackSpace;
			}
	</script>
	
	<link href="https://fonts.googleapis.com/css?family=Fredoka" rel="stylesheet">
	
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	
	<meta name="description" content="A ChatGPT powered learning game with a blockchain-based rewards and incentives system.">
	<meta property="og:url" content="https://testquest.app" />
	<meta property="og:title" content="Test Quest | AI Powered, Blockchain-Based Learning Game" />
	<meta property="og:description" content="ChatGPT powered learning game with a blockchain-based rewards and incentives system." /> 
	<meta property="og:image" content="https://testquest.app/images/social-img-fb.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

	<meta name="twitter:image" content="https://testquest.app/images/social-img-tw.png">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:creator" content="@donzomortini">
	<meta name="twitter:title" content="Test Quest | AI Powered, Blockchain-Based Learning Game">
	<meta name="twitter:description" content="ChatGPT powered learning game with a blockchain-based rewards and incentives system.">
	
	<!--Favicons -->
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2ecc71">
	<meta name="msapplication-TileColor" content="#2ecc71">
	<meta name="theme-color" content="#ffffff">

	
</head>
<body>
	<canvas id="canvas"><font color="#FEFF04"><center>You are using an outdated browser. Why don't you download <a href='http://www.google.com/chrome'>Chrome</a>?</center></font></canvas>
</body>
<script>
	// Get the user account number from the PHP session and set it in the JavaScript variable
	window['userAccountNumber'] = "<?php echo $_SESSION['account']; ?>";
	console.log('User Account:', window['userAccountNumber']);
	
	console.log('NFT Contract Address:', nftItemsContractAddress);
	
	async function checkUserEquipmentBalance() {
		if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
			let web3 = new Web3(Web3.givenProvider || window.web3.currentProvider);

			const abi = [
				{
					"constant": true,
					"inputs": [
						{"name": "user", "type": "address"}
					],
					"name": "getUserTestQuestBalance",
					"outputs": [
						{
							"name": "balance15",
							"type": "uint256[15]"
						}
					],
					"type": "function",
					"stateMutability": "view"
				}
			];

			try {
				const equipmentContract = new web3.eth.Contract(abi, nftItemsContractAddress);
				const userAccount = window['userAccountNumber'];

				// Call getUserTestQuestBalance to get the balance array for all 15 items
				const balanceArray = await equipmentContract.methods.getUserTestQuestBalance(userAccount).call();

				// Assuming we want to check for the first three items (Wand, Armor, Wings)
				const hasItems = [
					balanceArray[0] > 0, // Wand
					balanceArray[5] > 0, // Armor
					balanceArray[10] > 0 // Wings
				];

				console.log(`User has items: ${hasItems}`);
				return hasItems; // Example: [true, true, false] if the user has wand, armor, but no wings
			}
			catch(error){
				console.error('Error checking equipment balance:', error);
				return [false, false, false]; // Default to false if an error occurs
			}
		}
		else{
			alert('Web3 provider is not detected. Please install MetaMask or another Web3 provider.');
			return [false, false, false]; // Default to false if Web3 is not detected
		}
	}
	
	async function setGameUpgrades() {
		const equipmentStatus = await checkUserEquipmentBalance();

		if (equipmentStatus.length === 3) {
			ig.game.wandUpgrade = equipmentStatus[0];
			ig.game.armorUpgrade = equipmentStatus[1];
			ig.game.wingUpgrade = equipmentStatus[2];
		}
		else{
			console.error('Unexpected result from checkUserEquipmentBalance');
		}
	}

	setTimeout(setGameUpgrades, 1000);

</script>


</html>
