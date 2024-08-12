<?php
	
	//Check if wallet is provided
	if (isset($_GET['wallet'])) {
		$walletAddress = $_GET['wallet'];
		$goldCoins = 0;
		
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php');

		// Prepare and execute the SELECT statement
		$stmt = $my_Db_Connection->prepare(
			"SELECT account, goldCoins
			 FROM users WHERE account = :wallet");
		$stmt->bindParam(':wallet', $walletAddress);
		$stmt->execute();

		// Fetch the result
		if ($row = $stmt->fetch()){
			if ($row['goldCoins'] > 0) {
				$goldCoins = $row['goldCoins'];
				// Call the GOLD minting script here
				//echo json_encode(['message' => 'Conditions ARE met for minting GOLD']);
				define('AmServerSide', TRUE);
				require_once($_SERVER['DOCUMENT_ROOT'] . "/code/php/transaction-mint-gold.php");
			}
			else{
				echo json_encode(['message' => 'Conditions not met for minting GOLD']);
			}
		}
		else{
			echo json_encode(['message' => 'No user found']);
		}
	}
	else{
		die('Invalid request parameters.');
	}
?>