<script>

		function popAlert(which, positive){
			setAlertMsg(which);
			showAlertBox();
		}
		function popConfirm(which){
			setConfirmMsg(which);
			showConfirmBox();
		}
		function popMiningBox(which, data){
			setMiningBoxMsg(which, data);
			showMiningBoxBox();	
		}
		function popInputBox(which){
			setInputBoxMsg(which);
			showInputBox();
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
				alert('perform general action after closing mining box');
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
		function setAlertMsg(num){
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
			//Request Already Pending
			else if (num == 7){
				title.innerHTML = "You Have No Credits";
				body.innerHTML = "You cannot go on a quest until you have a game credit. Pass tests to earn game credits.";
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
				title.innerHTML = "Borrowing GHO and Sending it Across Chain";
				var slicedObj = data.slice(0, 10);
				slicedObj += "...";
				var link = "https://sepolia.etherscan.io/tx/" + data;
				body.innerHTML = `You are borrowing GHO from AAVE and using CCIP to send it from Ethereum Sepolia to Arbitrum Sepolia...<br/><br/>Transaction <a href='${link}' target='_blank'>${slicedObj}</a> is mining.`;
				loadingWheel.innerHTML = loader;
			}
			
		}
	</script>