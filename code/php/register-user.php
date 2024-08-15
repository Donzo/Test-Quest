<?php
	require_once $_SERVER['DOCUMENT_ROOT'] . '/code/php/globals.php';
	require_once ($_SERVER['DOCUMENT_ROOT'] . "/web3-serverside/vendor/autoload.php");
	
	use SWeb3\SWeb3;
	use SWeb3\SWeb3_Contract;
	use SWeb3\Utils;
	
	// Node endpoint
	$providerUrl = "https://lb.drpc.org/ogrpc?network=open-campus-codex-sepolia&dkey=AtPl6nKywkMVruCp112eU8LfAnSdRD8R76tzUgWAgP__";
	
	// Initialize SWeb3 object
	$sweb3 = new SWeb3($providerUrl);
	
	// Set personal data
	$from_address = '0x00f8306c110058b12c00b478986bc3627346671c';
	$from_address_private_key = $sysWalletPrivateKey;
	$sweb3->setPersonalData($from_address, $from_address_private_key);
	
	// Set chain ID for the Open Campus network
	$sweb3->chainId = '656476'; // Open Campus EDU
	
	// Define the contract address and ABI for registerUser method only
	$contractAddress = "0x1BB300F5A90cf8AaF4C11800883dEF22432912ee";
	$contractABI = '[
	    {
	        "inputs": [
	            {
	                "internalType": "address",
	                "name": "user",
	                "type": "address"
	            }
	        ],
	        "name": "registerUser",
	        "outputs": [],
	        "stateMutability": "nonpayable",
	        "type": "function"
	    }
	]';
	
	// Create the contract instance
	$contract = new SWeb3_Contract($sweb3, $contractAddress, $contractABI);
	
	if ($account) {
	    try {
	        // Fetch nonce
	        $nonce = $sweb3->call('eth_getTransactionCount', [$from_address, 'latest']);
	        $nonceValue = hexdec($nonce->result);
	        
	        $sendParams = [
	            'from' => $from_address,
	            'to' => $contractAddress,
	            'gasLimit' => 2100000,
	            'nonce' => '0x' . dechex($nonceValue)
	        ];
	
	        // Call the registerUser function on the contract
	        $result = $contract->send('registerUser', [$account], $sendParams);
	
	        if (isset($result->result)) {
	            echo json_encode(['success' => true, 'message' => $result->result]);
	        } else {
	            echo json_encode(['success' => false, 'message' => 'Transaction failed.', 'result' => $result]);
	        }
	    } catch (Exception $e) {
	        echo json_encode(['success' => false, 'message' => 'Error sending transaction: ' . $e->getMessage()]);
	    }
	} else {
	    echo json_encode(['success' => false, 'message' => 'Account address is required.']);
	}
?>
	