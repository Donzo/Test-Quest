<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	include $_SERVER['DOCUMENT_ROOT']  . "/vendor/autoload.php";
	
	$yourApiKey = "INSERTKEY";

	use Orhanerday\OpenAi\OpenAi;
	
	$open_ai_key = $yourApiKey;
	$open_ai = new OpenAi($open_ai_key);

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$userInput = $_POST['userInput'];
		$agentPrompt = $_POST['agentPrompt'];

		// Build the chat array
		$chat = $open_ai->chat([
			'model' => 'gpt-4o',//GPT-4o //gpt-3.5-turbo
			'messages' => [
				[
					"role" => "system",
					"content" => $agentPrompt
				],
				[
					"role" => "user",
					"content" => $userInput // Using the user input
				],
			],
			'temperature' => 0.5,
			'max_tokens' => 300,
			'frequency_penalty' => 0.8,
			'presence_penalty' => 0.5,
		]);

		// Process the chat response
		$d = json_decode($chat);

		// Send JSON response
		header('Content-Type: application/json');
		echo json_encode($d);
		exit;
	
	}
?>