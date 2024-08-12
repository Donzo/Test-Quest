<?php
	
	/*if(!defined('AmServerSide')) {
		die('Direct access not permitted');
	}*/
	//https://github.com/drlecks/Simple-Web3-Php
	require_once dirname($_SERVER['DOCUMENT_ROOT']) . '/secrets-test-quest.php';
	require_once ($_SERVER['DOCUMENT_ROOT'] . "/web3-serverside/vendor/autoload.php");
	
	use stdClass; 
	use Exception;
	use SWeb3\SWeb3;
	use SWeb3\Utils;
	use SWeb3\SWeb3_Contract;
	use phpseclib3\Math\BigInteger as BigNumber;
	
	$providerUrl = "https://lb.drpc.org/ogrpc?network=open-campus-codex-sepolia&dkey=AtPl6nKywkMVruCp112eU8LfAnSdRD8R76tzUgWAgP__"; 

	//Create an instance of SWeb3 with the provider URL
	$sweb3 = new SWeb3($providerUrl);

	$from_address = '0x00f8306c110058b12c00b478986bc3627346671c';
	$from_address_private_key = $sysWalletPrivateKey;
	$sweb3->setPersonalData($from_address, $from_address_private_key);
	
	$sweb3->chainId = '656476';	//Open Campus EDU 
	
	$gasPriceResponse = $sweb3->call('eth_gasPrice', []);
	$gasPriceHex = $gasPriceResponse->result; //This should be in hexadecimal format like '0x123abc'

	//Convert hexadecimal to decimal
	$gasPriceDecimal = hexdec($gasPriceHex);

	//Calculate the adjusted gas price (increase by 30%)
	$increaseFactor = '1.30'; //30% increase
	$adjustedGasPrice = bcmul($gasPriceDecimal, $increaseFactor);

	//Format as a hexadecimal string for the transaction
	$adjustedGasPriceHex = '0x' . dechex($adjustedGasPrice);
	
	try {
		$sendParams = [ 
			'from' => $from_address,  
			'to' => '0x44f751ead3D88b04a57C298789FCC26632e8179b', //$walletAddress, 
			'gasLimit' => 2100000,
			'gasPrice' => $adjustedGasPriceHex, //Make sure to use the adjustedGasPriceHex variable
			'value' => Utils::toWei('0.01', 'ether'), //Converting 0.001 ETH to Wei
			//'nonce' => $sweb3->personal->getNonce() //Fetching the nonce
			'nonce' => $sweb3->personal->getNonce()  
		];

		$result = $sweb3->send($sendParams);

		if (isset($result->result)) {
			//If the transaction was successful, update the database
			/*$stmt = $my_Db_Connection->prepare("UPDATE users SET arbi_test_eth_sent = TRUE WHERE account = :wallet");
			$stmt->bindParam(':wallet', $walletAddress );
			$stmt->execute();

			//Check if the update was successful
			if ($stmt->rowCount() > 0) {
				$response = [
					'success' => true,
					'message' => "Transaction successful and database updated!",
					'hash' => $result->result
				];
			}
			else{
				$response = [
					'success' => false,
					'message' => "Transaction successful but failed to update database.",
					'hash' => $result->result
				];
			}

			header('Content-Type: application/json');
			echo json_encode($response);*/
			echo 'success!';
		}
		else{
			print_r($result); //If the transaction failed, print the result for debugging
			echo "gasPriceDecimal = " . $gasPriceDecimal;
		}
	}
	catch (Exception $e) {
		$response = [
			'success' => false,
			'message' => "Error sending transaction: adjustedGasPrice = " . $adjustedGasPrice . " " . $e->getMessage()
		];
		header('Content-Type: application/json');
		echo json_encode($response);
	}

?>

	