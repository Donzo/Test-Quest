<?php
	
	ini_set('display_errors', '1');
	ini_set('display_startup_errors', '1');
	
	require_once ($_SERVER['DOCUMENT_ROOT'] . "/web3-serverside/vendor/autoload.php");
	
	use stdClass; 
	use Exception;
	use SWeb3\SWeb3;
	use SWeb3\Utils;
	use SWeb3\SWeb3_Contract;
	use phpseclib3\Math\BigInteger as BigNumber;
	
	$providerUrl = "https://arbitrum-sepolia.infura.io/v3/e63d894b4f264efea727585246a0ac1c"; 

	//Create an instance of SWeb3 with the provider URL
	$sweb3 = new SWeb3($providerUrl);

	$from_address = '0x006295696e67c5b65cf76f8bc7ab28be54d3a36a';
	$from_address_private_key = '0f5b9ec631d94b1400dd58b41f5c24b4b9e9d36511513d3af4ce857617a0b9a3';
	$sweb3->setPersonalData($from_address, $from_address_private_key);
	
	$sweb3->chainId = '421614';	//Arbi Sepolia 
	
	$gasPriceResponse = $sweb3->call('eth_gasPrice', []);
	$gasPriceHex = $gasPriceResponse->result; //This should be in hexadecimal format like '0x123abc'

	//Convert hexadecimal to decimal
	$gasPriceDecimal = hexdec($gasPriceHex);

	//Calculate the adjusted gas price (increase by 20%)
	$increaseFactor = '1.20'; //20% increase
	$adjustedGasPrice = bcmul($gasPriceDecimal, $increaseFactor);

	//Format as a hexadecimal string for the transaction
	$adjustedGasPriceHex = '0x' . dechex($adjustedGasPrice);
	
	
	try {
		$sendParams = [ 
			'from' => $from_address,  
			'to' => '0x44f751ead3D88b04a57C298789FCC26632e8179b', 
		   	'gasLimit' => 	210000,
			'gasPrice' => $adjustedGasPrice, 
			'value' => Utils::toWei('0.001', 'ether'), //Converting 0.001 ETH to Wei
			'nonce' => $sweb3->personal->getNonce() //Fetching the nonce
		];
		

		$result = $sweb3->send($sendParams);

		if (isset($result->result)) {
			$response = [
				'success' => true,
				'message' => "Transaction successful!",
				'hash' => $result->result
			];
			header('Content-Type: application/json');
			echo json_encode($response);
		}
		else{
			print_r($result); 
		}
	}
	catch (Exception $e) {
		$response = [
			'success' => false,
			'message' => "Error sending transaction: " . $e->getMessage()
		];
		header('Content-Type: application/json');
		echo json_encode($response);
	}
?>

	