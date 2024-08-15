<script>
		function scrollToTop() {
			window.scrollTo({
				top: 0, 
				behavior: 'smooth' // This makes the scrolling smooth
			});
		}
		function popAlert(which, dataMsg){
			if (dataMsg){
				setAlertMsg(which, dataMsg);
			}
			else{
				setAlertMsg(which);	
			}
			scrollToTop();
			showAlertBox();
		}
		function popConfirm(which){
			setConfirmMsg(which);
			showConfirmBox();
			scrollToTop();
		}
		function popMiningBox(which, data){
			setMiningBoxMsg(which, data);
			showMiningBoxBox();
			scrollToTop();
		}
		function popInputBox(which){
			setInputBoxMsg(which);
			showInputBox();
			scrollToTop();
		}
	
		//These Control Visibility of System Message Boxes
		function showAlertBox(){
			document.getElementById("sysMsgBoxBG").style.display = "block";
			document.getElementById("alertBox").style.display = "block";
		}
		function closeAlert(which){
			document.getElementById("sysMsgBoxBG").style.display = "none";
			document.getElementById("alertBox").style.display = "none";
		}
		function showConfirmBox(){
			document.getElementById("sysMsgBoxBG").style.display = "block";
			document.getElementById("confirmBox").style.display = "block";
		}
		function closeConfirm(which){
			document.getElementById("sysMsgBoxBG").style.display = "none";
			document.getElementById("confirmBox").style.display = "none";
			if (which == 1){
				connectMyWallet(); //Trying to load game but not connected
				//popAlert(1);
			}
			else if (which == 2){
				//Start Quest
				startQuest();
			}
			else if (which == 3){
				//Decline Network Change
				popAlert(4)
			}
	
		}
		function showInputBox(){
			document.getElementById("sysMsgBoxBG").style.display = "block";
			document.getElementById("inputBox").style.display = "block";
		}
		function closeInputBox(which){
			if (which == 1){
				var ethValue = document.getElementById('eth-input').value;	
				depositETHintoAAVE(ethValue);
			}
			
			document.getElementById("sysMsgBoxBG").style.display = "none";
			document.getElementById("inputBox").style.display = "none";
		}
		function showMiningBoxBox(){
			document.getElementById("sysMsgBoxBG").style.display = "block";
			document.getElementById("miningInfoBox").style.display = "block";
		}
		function delayCloseMiningBoxBox(){
			closeMiningBoxBox();
		}
		function closeMiningBoxBox(which){
			document.getElementById("sysMsgBoxBG").style.display = "none";
			document.getElementById("miningInfoBox").style.display = "none";
			if (which == 1){
				alert('perform action 1 after closing mining box');;
			}
			else{
				//alert('perform general action after closing mining box');
			}
			
			
		}
		//setTimeout("closeMiningBoxBox()", 3000); //Close mining box after 3 seconds.
	
		function hideLoadingWheel(){
			document.getElementById("miningInfoLoadingWheel").style.display = "none";;
		}
		function showLoadingWheel(){
			document.getElementById("miningInfoLoadingWheel").style.display = "block";;
		}
	
	
		//These Control Messages and Button Actions
		function setAlertMsg(num, data){
			var title = document.getElementById("alertBoxTitle");
			var body = document.getElementById("alertBoxBody");
			var button = document.getElementById("sysAlertButtonDiv");
		
			// Default is to close alert but we can set it to other things too.		
			button.innerHTML = `<button class='button sysMsgButton' onclick="closeAlert()">OK</button>`;
			
			//You rejected the request to connect.
			if (num == 1){
				title.innerHTML = "Connection Failed";
				body.innerHTML = "You declined the request to connect to the TestQuest website.";
			}
			//You rejected the request to connect.
			else if (num == 2){
				title.innerHTML = "Network Connection Failed";
				body.innerHTML = `You rejected the request to change the network. You must switch to the ${preferredNetworkName} to use this Dapp.`;
			}
			//Request Already Pending
			else if (num == 3){
				title.innerHTML = "Connection Waiting";
				body.innerHTML = "You already have a pending connection request. Check your wallet.";
			}
			//Network Change Declined
			else if (num == 4){
				title.innerHTML = "Network Change Declined";
				body.innerHTML = `That's fine, but you need to be on ${preferredNetworkName} to use this Dapp.`;
			}
			else if (num == 5){
				title.innerHTML = "Network Connection Failed";
				body.innerHTML = `You rejected the request to change the network. You must change to the ${preferredNetworkName} Network to use this Dapp.`;
			}
			//Request Already Pending
			else if (num == 6){
				title.innerHTML = "Request Waiting";
				body.innerHTML = "You already have a pending network change request. Check your wallet.";
			}
			else if (num == 7){
				title.innerHTML = "You Have No Credits";
				body.innerHTML = "You cannot go on a quest until you have a game credit. Pass tests to earn game credits.";
			}
			//Gold Minting Failed
			else if (num == 8){
				if (data){
					title.innerHTML = "Gold Minting Failed";
					body.innerHTML = data + "<br/><br/>Please try the transaction again...";
				}
				else{
					title.innerHTML = "Gold Minting Failed for Some Reason";
					body.innerHTML = "Please try the transaction again...";
				}
			}
			else if (num == 9){
				title.innerHTML = "You Have No Gold Coins";
				body.innerHTML = "You cannot MINT gold coins until you earn them. Try collecting some coins on a quest.";
			}
			else if (num == 10){
				title.innerHTML = "Approval Required";
				body.innerHTML = "You need to allow the NFT contract to spend your GOLD COINS.";
			}
			else if (num == 11){
				title.innerHTML = "Approval Successful";
				body.innerHTML = "Approve the next transaction to buy your NFT item.";
			}
			else if (num == 12){
				title.innerHTML = "ErMac";
				body.innerHTML = "An error occurred while checking or approving your token allowance.";
			}
			else if (num == 13){
				title.innerHTML = "ErMac";
				body.innerHTML = "Web3 provider is not detected. Please install MetaMask or another Web3 provider.";
			}
			else if (num == 14){
				title.innerHTML = "Success!";
				body.innerHTML = "You have successfully purchased " + data + " NFT!";
			}
			else if (num == 15){
				title.innerHTML = "ER MAC!";
				body.innerHTML = "Error in purchasing " + data + " NFT! Try again.";
			}
			else if (num == 16){
				title.innerHTML = "You Have Not Earned Enough Gold Coins";
				body.innerHTML = "Try collecting some coins on a quest.";
			}
			else if (num == 17){
				title.innerHTML = "You Need to MINT Your Coins";
				body.innerHTML = "You have earned enough coins but you haven't minted them. Try to mint them now by pressing the MINT button.";
			}
		}
		function setConfirmMsg(num){
			var title = document.getElementById("confirmBoxTitle");
			var body = document.getElementById("confirmBoxBody");
			var button = document.getElementById("sysConfirmButtonDiv");
		
			// Default is to close alert but we can set it to other things too.		
			button.innerHTML = `<button class='button sysMsgButton' onclick="closeConfirm(1)">Yes</button><button class='button sysMsgButton' onclick="closeConfirm(111)">No</button>`;

			if (num == 1){
				title.innerHTML = "You Are Not Connected To This Site";
				body.innerHTML = "Would you like to try to connect now?";
			}
			else if (num == 2){
				title.innerHTML = "Begin Quest?";
				body.innerHTML = `You must spend one credit to begin a quest. Are you sure you are ready?`;
				button.innerHTML = `<button class='button sysMsgButton' onclick="closeConfirm(2)">Yes</button><button class='button sysMsgButton' onclick="closeConfirm()">No</button>`;
			}
			else if (num == 3){
				title.innerHTML = "Add Network?";
				body.innerHTML = `You must add the ${preferredNetworkName} to your wallet to play this game. Would you like to do that now?`;
				button.innerHTML = `<button class='button sysMsgButton' onclick="closeConfirm(4)">Yes</button><button class='button sysMsgButton' onclick="closeConfirm(3)">No</button>`;
			}
		}
	
		function setInputBoxMsg(which){
			var title = document.getElementById("inputBoxTitle");
			var body = document.getElementById("inputBoxBody");
			var button = document.getElementById("inputBoxButtons");
			/*Example Prompt - not currently used */
			if (which == 1){
				title.innerHTML = "Deposit ETH";
				body.innerHTML = `<strong>How much ETH</strong> would you like to <strong>deposit</strong> into the <strong>AAVE</strong> lending pool? We recommend .05`;
				button.innerHTML = `
					<div id="eth-input-field">
						<input id="eth-input" class="input-field" type="number" min="0.01" step="0.01" max="99999999" value="0.05" />
					</div>
					<div id="eth-submit-button">
						<button class='button sysMsgButton' onclick="closeInputBox(1)">OK</button>
					</div>`;
			}
		}
		function setMiningBoxMsg(num, data){
			var title = document.getElementById("miningInfoBoxTitle");
			var body = document.getElementById("miningInfomBoxBody");
			var loadingWheel = document.getElementById("miningInfoLoadingWheelDiv");
			var loader = `<img src="/images/loading.gif"/>`
			var loaded = `<img src="/images/check-mark.gif"/>`
			
			/*Example Prompt - not currently used */
			
			if (num == 1){
				title.innerHTML = "Minting Gold Coins...";
				//var slicedObj = data.slice(0, 10);
				//slicedObj += "...";
				//var link = "https://sepolia.etherscan.io/tx/" + data;
				body.innerHTML = `You are MINTING your Gold Coins...<br/><br/>The transaction is mining.`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 2){
				var slicedObj = data.slice(0, 10);
				slicedObj += "...";
				var link = "https://opencampus-codex.blockscout.com/tx/" + data;
				title.innerHTML = "Gold Minted!";
				body.innerHTML = `Your Gold Coins have been minted and should now be in your wallet! <br/><br/>Transaction Hash: <a href='${link}' target='_blank'>${slicedObj}</a>`;
				loadingWheel.innerHTML = loaded;
				setTimeout("closeMiningBoxBox()", 4000); //Close mining box after 4 seconds.
			}
			else if (num == 3){
				var slicedObj = data.slice(0, 10);
				slicedObj += "...";
				var link = "https://opencampus-codex.blockscout.com/tx/" + data;
				title.innerHTML = "Gold Minted!";
				body.innerHTML = `Your Gold Coins have been minted and should now be in your wallet! <br/><br/>Transaction Hash: <a href='${link}' target='_blank'>${slicedObj}</a>`;
				loadingWheel.innerHTML = loaded;
				setTimeout("closeMiningBoxBox()", 4000); //Close mining box after 4 seconds.
			}
			else if (num == 4){
				closeAlert();
				title.innerHTML = "Success!";
				body.innerHTML = "You have successfully purchased " + data + " NFT!";
				loadingWheel.innerHTML = loaded;
				setTimeout("closeMiningBoxBox()", 4000); //Close mining box after 4 seconds.
			}
			
			
		}
	</script>