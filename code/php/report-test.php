<?php
	require_once $_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php';

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$account = $_POST['account'];
		$passed = $_POST['passed'] === 'true' ? true : false;

		//Check if the user exists
		$sql = "SELECT expPoints, goldCoins, numberOfTestsTaken, grade_level, credits FROM users WHERE account = :account";
		$stmt = $my_Db_Connection->prepare($sql);
		$stmt->bindParam(':account', $account, PDO::PARAM_STR);
		$stmt->execute();

		if ($stmt->rowCount() > 0) {
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			$numberOfTestsTaken = $row['numberOfTestsTaken'] + 1;
			$credits = $row['credits'];
			if ($passed) {
				$credits += 1;
			}

			// Update the user record
			$updateSql = "UPDATE users SET numberOfTestsTaken = :numberOfTestsTaken, credits = :credits WHERE account = :account";
			$updateStmt = $my_Db_Connection->prepare($updateSql);
			$updateStmt->bindParam(':numberOfTestsTaken', $numberOfTestsTaken, PDO::PARAM_INT);
			$updateStmt->bindParam(':credits', $credits, PDO::PARAM_INT);
			$updateStmt->bindParam(':account', $account, PDO::PARAM_STR);

			if ($updateStmt->execute()) {
				echo json_encode(['status' => 'updated', 'numberOfTestsTaken' => $numberOfTestsTaken, 'credits' => $credits]);
			}
			else{
				echo json_encode(['status' => 'error', 'message' => 'Failed to update user record']);
			}
		}

	}
?>
