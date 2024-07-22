<script>

		async function sendInputToServer(input, agentPrompt) {
			try {
				const response = await fetch('/chat.php', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: 'userInput=' + encodeURIComponent(userInput) + '&agentPrompt=' + encodeURIComponent(botPrompt)
				});

				if (!response.ok) {
					throw new Error('Network response was not ok.');
				}

				const data = await response.json();

				if (data.choices && data.choices.length > 0 && data.choices[0].message) {
					var resp = data.choices[0].message.content;
					//Strip all asterisks from the response
					resp = resp.replace(/\*/g, '');
					console.log("Processed Server response: " + resp);
					processQuestionResponse(resp);
					
					if (gettingQuestion){
						lastQuestion = resp;
						displayQuestionWithEffect(); //Cool typewriter effect to display the question
					}
					else{
						
						if (resp.includes("Incorrect") || resp.includes("incorrect")) {
							showReportDiv(false);
						}
						else{
							correctAnswers++;
							showReportDiv(true);
						}
						agentCorrectionResponse = resp;
						displayCorrectionWithEffect(); //Cool typewrite effect for response
					}
					gettingQuestion = false;
				}
				else {
					console.error("An unexpected error occurred.");
				}
			}
			catch (error) {
				console.error('Error:', error);
				console.log("Error processing your request.");
			}
		}
		function processQuestionResponse(response) {
			//Regular expression to match answer options like A), B), C), etc.
			const optionRegex = /([A-D])\)/g;

			//Add line breaks before each answer option
			formattedQuestion = response.replace(optionRegex, '\n$1)');
		}
		function getQuestionPrompt() {
			setLoadingGif('question'); //Set Loading Gif
			var gradeLevelText = usrGradeLvl === "K" ? "Kindergarten" : (usrGradeLvlNum === 13 ? "Grade 12+" : `Grade ${usrGradeLvl}`);
			var theAgentPrompt = `Generate only a quiz question for a ${gradeLevelText} ${curClass} test in ${subject} about ${topic}`;
			if (subtopic) {
				theAgentPrompt += `, focusing on ${subtopic}`;
			}
			theAgentPrompt += `. The question should be clear, concise, and appropriately leveled for students. Do not include the answer or solution.`;
			gettingQuestion = true;
			return theAgentPrompt;
		}
		function getQuestionCorrectionPrompt() {
			var gradeLevelText = usrGradeLvl === "K" ? "Kindergarten" : (usrGradeLvlNum === 13 ? "Grade 12+" : `Grade ${usrGradeLvl}`);
			var theAgentPrompt = `You are a ${gradeLevelText} ${subject} teacher covering ${topic}`;
			if (subtopic) {
						theAgentPrompt += `: ${subtopic}`;
			}
			theAgentPrompt += `. The student is responding to a question you asked: "${lastQuestion}". If the student answers incorrectly, you must respond with the signal word 'incorrect' in your reply. Explain the answer but do not give them another chance.`;
			return theAgentPrompt;
		}

		
	</script>