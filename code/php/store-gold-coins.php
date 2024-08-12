<?php
	session_start(); // Start the session
	
	require_once $_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php';
	
	// Get account and tokens from POST request
	$account =  $_SESSION['account'];
	$tokens = (int) $_POST['tokens']; // Cast tokens to integer
	// Get account from session
	
	// Check if the session is valid
	if (!isset($_SESSION['gameLive']) || $_SESSION['gameLive'] !== true || !isset($_SESSION['gameTime'])) {
	    echo "Session is not valid or game is not live.";
	    exit;
	}
	
	$currentTime = time();
	$gameTime = $_SESSION['gameTime'];
	$timeDifference = $currentTime - $gameTime;
	
	// Check if the game time is within the allowed time range (e.g., 10 minutes)
	if ($timeDifference > 600) { // 600 seconds = 10 minutes
	    echo "Session has expired.";
	    exit;
	}
	
	// Update goldCoins in the database
	$sql = "UPDATE users SET goldCoins = goldCoins + :tokens WHERE account = :account";
	$stmt = $my_Db_Connection->prepare($sql);
	$stmt->bindParam(':tokens', $tokens, PDO::PARAM_INT);
	$stmt->bindParam(':account', $account, PDO::PARAM_STR);
	
	if ($stmt->execute()) {
	    echo $tokens . " Gold coins updated successfully for wallet:" . $account;
	    // Invalidate the game session
	    $_SESSION['gameLive'] = false;
	} else {
	    echo "Error updating gold coins: " . $stmt->errorInfo()[2];
	    // Log error info
	    error_log("Error updating gold coins: " . $stmt->errorInfo()[2]);
	}
	
	// Close connection
	$my_Db_Connection = null;
?>
