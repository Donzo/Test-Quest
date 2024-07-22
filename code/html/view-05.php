<!-- Test View -->
	<div id='view-05' class='gone'>
		<div class='content'>
			<div class='content centerTxt' id='test-content'>
				<div id='test-info'></div>
				<div id='question'>
					<!-- Question will be displayed here -->
					<img src='/images/loading.gif'/>
				</div>
				<div id='student-input-field'>
					<input type="text" id="studentAnswer" placeholder="Type your answer here..." class="styled-input">
				</div>
				<!-- Report Div -->
				<div id='reportDiv' class='centerTxt gone'>
				</div>
				<!-- Agent's response will be displayed here -->
				<div class='centerTxt' id='agentResponseDiv' class='gone'>
					<div id='agentResponse' class='response'>
						<!-- RESPONSE -->
					</div>
				</div>
				<!-- Submit Button -->
				<div class='centerTxt' id='submitResponseDiv'>
					<button id='submitResponseButton' class="bigButton" onclick="submitResponse()">Submit Response</button>
				</div>
				<!-- Advance Quiz Button -->
				<div class='centerTxt' id='advanceQuizDiv' class='gone'>
					<button id='advanceQuizButton' class="bigButton" onclick="advanceQuiz()">Advance Quiz</button>
				</div>
			</div>
		</div>
	</div>