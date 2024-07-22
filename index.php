<!DOCTYPE html>
<html>
<head>
	<?php
		//META TAGS 
		//Page Title, Description, Social Images, Favicons, and Web Fonts 
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/meta-tags.php";
		
		//CSS
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/css/style.php";
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/css/sys-msgs.php";
		
		//JS
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/globals.php";
	?>
	
	<script>
		<?php
			//WEB3JS INTERFACE CODE
			require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/web3js/web3.min.js";
		?>
	</script>
</head>
<body>
	<?php
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/banner.php";
	?>
	<div id="coverAll"></div>
	<?php
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/view-01.php";
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/view-02.php";
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/view-03a.php";
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/view-03b.php";
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/view-03c.php";
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/view-03d.php";
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/view-03e.php";
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/view-04.php";
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/view-05.php";
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/view-06.php";
	?>
	
	<?php
		//System Messages HTML - Alert Boxes and Such
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/system-messages.php";
			
		//Custom Alert and Sys Message Boxes Called Like This:
		//popAlert(1);
		//popConfirm(1);
		//popMiningBox(1, "0x0x0x0x0x0x")
		//popInputBox(1);
	?>
	<div id='userAcctNum'></div>
	<footer>
		<?php
			//More JS
			require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/app-functions.php";
			require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/wallet-connect.php";
			require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/sys-msgs.php";
			require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/page-change-handler.php"; 
			require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/load-page.php";
			require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/chatgpt.php";
			
			//Functions for Interacting with Smart Contracts
			//require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-01.php');
		?>
	</footer>
</body>

</html>
