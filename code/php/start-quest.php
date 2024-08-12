<?php
	session_start();
	require_once $_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php';

	$userAccount = $_GET['wallet'];

	try{
		//Query to check current credits
		$sql = "SELECT credits FROM users WHERE account = :account";
		$stmt = $my_Db_Connection->prepare($sql);
		$stmt->bindParam(':account', $userAccount, PDO::PARAM_STR);
		$stmt->execute();
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
		if ($row && $row['credits'] > 0) {
			
			// Subtract 1 credit
			$newCredits = $row['credits'] - 1;
			$updateSql = "UPDATE users SET credits = :credits WHERE account = :account";
			$updateStmt = $my_Db_Connection->prepare($updateSql);
			$updateStmt->bindParam(':credits', $newCredits, PDO::PARAM_INT);
			$updateStmt->bindParam(':account', $userAccount, PDO::PARAM_STR);
			$updateStmt->execute();

			//Set session variable
			$_SESSION['readyToPlay'] = true;
			$_SESSION['account'] = $userAccount;
			
			echo json_encode(['success' => true]);
			
			//echo "Credits: " . ($row ? $row['credits'] : 'No result');
		}
		else{
			echo json_encode(['success' => false, 'message' => 'Not enough credits']);
		}
	}
	catch (Exception $e) {
		echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
	}
?>