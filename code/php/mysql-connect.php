<?php 
	require_once dirname($_SERVER['DOCUMENT_ROOT']) . '/secrets-test-quest.php';
	$my_Db_Connection = NULL;
	/*DB Credentials*/
	
	$sql = "mysql:host=$servername;dbname=$database;";
		
	$dsn_Options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
	
	try { 
  		$my_Db_Connection = new PDO($sql, $username, $password, $dsn_Options);
  		//echo "Connected successfully";
	} 
	catch (PDOException $error) {
  		echo 'Connection error: ' . $error->getMessage();
	}