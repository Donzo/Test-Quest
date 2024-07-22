<?php
	require_once $_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php';

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$account = $_POST['account'];
		$grade_level = $_POST['grade_level'];

		//Convert 'K' and '12+' to appropriate numeric values
   		if ($grade_level == 'K') {
			$grade_level = 0;
		}
		else if ($grade_level == '12+') {
			$grade_level = 13;
		}

		$sql = "UPDATE users SET grade_level = :grade_level WHERE account = :account";
		$stmt = $my_Db_Connection->prepare($sql);
		$stmt->bindParam(':grade_level', $grade_level, PDO::PARAM_INT);
		$stmt->bindParam(':account', $account, PDO::PARAM_STR);

		if ($stmt->execute()) {
			echo "Grade level updated successfully.";
		}
		else{
			echo "Error updating grade level.";
		}
	}
?>
