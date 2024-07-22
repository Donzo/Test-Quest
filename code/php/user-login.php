<?php
	require_once $_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php';

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$account = $_POST['account'];

		//Check if the user exists
		$sql = "SELECT expPoints, goldCoins, numberOfTestsTaken, credits, grade_level FROM users WHERE account = :account";
		$stmt = $my_Db_Connection->prepare($sql);
		$stmt->bindParam(':account', $account, PDO::PARAM_STR);
		$stmt->execute();

		if ($stmt->rowCount() > 0) {
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			echo json_encode([
				'status' => 'existing_user',
				'expPoints' => $row['expPoints'],
				'goldCoins' => $row['goldCoins'],
				'numberOfTestsTaken' => $row['numberOfTestsTaken'],
				'gameCredits' => $row['credits'],
				'gradeLevel' => $row['grade_level']
			]);
		}
		else{
			//If the user does not exist, create a new user
			$sql = "INSERT INTO users (account) VALUES (:account)";
			$stmt = $my_Db_Connection->prepare($sql);
			$stmt->bindParam(':account', $account, PDO::PARAM_STR);

			if ($stmt->execute()) {
				echo json_encode(['status' => 'new_user']);
			}
			else{
				echo json_encode(['status' => 'error', 'message' => 'Failed to create new user']);
			}
		}
	}
?>
