<?php
	require_once $_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/code/php/globals.php';
	require_once ($_SERVER['DOCUMENT_ROOT'] . "/web3-serverside/vendor/autoload.php");

	use stdClass;
	use Exception;
	use SWeb3\SWeb3;
	use SWeb3\Utils;
	use SWeb3\SWeb3_Contract;
	use phpseclib3\Math\BigInteger as BigNumber;

	//Node endpoint
	$providerUrl = "https://lb.drpc.org/ogrpc?network=open-campus-codex-sepolia&dkey=AtPl6nKywkMVruCp112eU8LfAnSdRD8R76tzUgWAgP__";

	//Initialize SWeb3 object
	$sweb3 = new SWeb3($providerUrl);

	//Set personal data
	$from_address = '0x00f8306c110058b12c00b478986bc3627346671c';
	
	$from_address_private_key = $sysWalletPrivateKey;
	$sweb3->setPersonalData($from_address, $from_address_private_key);

	//Set chain ID for the Open Campus network
	$sweb3->chainId = '656476'; // Open Campus EDU

	//Define the contract address and ABI
	$contractAddress = $goldContractAddress;
	$contractABI = '[{"inputs":[{"internalType":"address","name":"defaultAdmin","type":"address"},{"internalType":"address","name":"minter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"sender","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"}]';

	//Create the contract instance
	$contract = new SWeb3_Contract($sweb3, $contractAddress, $contractABI);

	//Set the mint parameters
	$toAddress = $walletAddress;
	$goldCoinsToStr = strval($goldCoins);
	$amount = Utils::toWei($goldCoinsToStr, 'ether'); // Adjust the amount as needed


	$gasPriceResponse = $sweb3->call('eth_gasPrice', []);
	$gasPriceHex = $gasPriceResponse->result; 

	//Convert hexadecimal to decimal
	$gasPriceDecimal = hexdec($gasPriceHex);

	//Calculate the adjusted gas price (increase by 30%)
	$increaseFactor = '2'; //200% increase
	$adjustedGasPrice = bcmul($gasPriceDecimal, $increaseFactor);

	//Format as a hexadecimal string for the transaction
	$adjustedGasPriceHex = '0x' . dechex($adjustedGasPrice);

	try{
		//Fetch nonce
		$nonce = $sweb3->call('eth_getTransactionCount', [$from_address, 'latest']);
		$nonceValue = hexdec($nonce->result);
	
		$sendParams = [
			'from' => $from_address,
			'to' => $contractAddress,
			'gasLimit' => 2100000,
			'gasPrice' => $adjustedGasPriceHex,
			'nonce' => '0x' . dechex($nonceValue)
		];

		$result = $contract->send('mint', [$toAddress, $amount], $sendParams);

		if (isset($result->result)) {
			
			//Transaction successful, update the database
			$sql = "UPDATE users SET goldCoins = 0 WHERE account = :account";
			$stmt = $my_Db_Connection->prepare($sql);
			$stmt->bindParam(':account', $toAddress, PDO::PARAM_STR);
			$stmt->execute();
        
			echo json_encode([
				'success' => true,
				'message' => $result->result
			]);
		}
		else{
			echo json_encode([
				'success' => false,
				'message' => 'Transaction failed.',
				'result' => $result
			]);
		}
	}
	catch (Exception $e) {
		echo 'Error sending transaction: ' . $e->getMessage();
	}
?>
