<script>
	
		//Called at start to see if user is already connected.
		async function checkMyConnection(){ 
			if (typeof ethereum !== 'undefined') {
				const accounts = await ethereum.request({method: 'eth_accounts'});       
				if (accounts.length) {
					account = accounts[0];
					window['userAccountNumber'] = account;
					console.log(`You're connected to: ${account}`);
					document.getElementById("userAcctNum").innerHTML = `Connected As User: ${window['userAccountNumber'] }`;
					
					return true;
				}
				else{
					console.log("Not connected");
					return false;
				}
			}
			else{
				console.log("Not connected");
				return false;
			}
		}
		
		
		//User Presses Connect Button
		async function connectMyWallet(){	//Called ingame
		
			try {
				await ethereum.request({ method: 'eth_requestAccounts' });
			}
			catch(error){
				//Handle Connection Errors
				if (error.code == 4001){
					popAlert(1); //Connection Declined	
				}
				else if (error.code == -32002){
					popAlert(3); //Request Pending / Check Wallet
				}
				else{
					console.log('Something is wrong with your wallet.');
				}
				return;
			}
			
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			
			if (accounts.length){
				console.log(`You're connected to: ${accounts[0]}`);	
			}
			
			account = accounts[0];
			window['userAccountNumber'] = account;
			
			if (account){
				document.getElementById("userAcctNum").innerHTML = `Connected As User: ${window['userAccountNumber'] }`;
			}
			else{
				console.log('no account num.')
			}
			
			if (!window['userAccountNumber']){
				popAlert(1); //Connection Declined
			}
			else{
			
				//Create Web3 Object
				let web3 = new Web3(Web3.givenProvider);
				const chain = await web3.eth.getChainId();
						
				//Get Provider
				web3.eth.net.getId().then(
					function(value){
						provider = value;
						if (provider){
		  					reportProvider(true);
		  				}
  					}	
  				);
  			}
		}
		async function reportProvider(oneClick){
			
			if (window.ethereum){
  		 		chainId = await window.ethereum.request({
					"method": "eth_chainId",
					"params": []
				});
  		 	}
			console.log('chainId = ' + chainId);
			//Get networkName
			if (chainId == "0xa045c" ){
  				networkName = "Open Campus Codex";
  				if (oneClick){
  					switchNetwork();
  				}
  				return true;
  			}
  			else{
  				if (oneClick){
  					switchNetwork();
  				}
  				return false;
  			}
			
		}
		async function switchNetwork(){
			var theChainID = false;
			
			theChainID = preferredNetworkChainID;
			theRPCURL = preferredRPC;
			nn = preferredNetworkName;
			
			try {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: theChainID }],
				});
				
				//User is Connected to the Site and On the Right Network
				checkUserAccount();
			}
			catch (switchError){
  				//This error code indicates that the chain has not been added to MetaMask.
				if (switchError.code == 4902){

					try {
						
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [{ chainId: theChainID, 
										chainName: preferredNetworkName,
										rpcUrls: [theRPCURL],
										nativeCurrency:{
											name: "EDU",
											symbol: "EDU",
											decimals: 18,
										},
									}],
						});
						checkAgain();
					}
					catch (addError){
						if (addError.code == 4001 ){
							popAlert(5); //Decline Switch
						}
					}
				}
				else if (switchError.code == -32002){
					popAlert(6); //Request Pending / Check Wallet
				}
				else if (switchError.code == 4001){
					popAlert(5); //Connection Declined
				}
				else{
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [{ chainId: theChainID, 
										chainName: preferredNetwork1,
										rpcUrls: [theRPCURL],
										nativeCurrency:{
											name: "EDU",
											symbol: "EDU",
											decimals: 18,
										},
									}],
						});
						checkAgain();
					}
					catch (addError){
						if (addError.code == 4001){
							popAlert(2); //Connection Declined
						}
					}
				}
				checkAgain();
			}
		}
		async function checkAgain(){
			if (window.ethereum){
  		 		chainId = await window.ethereum.request({
					"method": "eth_chainId",
					"params": []
				});
				
				if (chainId == preferredNetworkChainID && !userChecked){
					//User is Connected to the Site and On the Right Network
					//Check user and load view.
					checkUserAccount();
				}
				
  		 	}  		 	
		}
	</script>