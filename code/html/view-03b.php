<!-- New Student User / Set Grade Level -->
	<div id='view-03b' class='gone'>
		<div class='content'>
			<div class='content centerTxt'>
				<div class='intro-txt'>
					<p>
						<strong>Welcome to Test Quest, User <span class='usrAddress'></span>!</strong>
					</p>

					<div class="user-profile">
						<div class="heading">
							Creating Profile for User <span class="usrAddress"></span>
						</div>
						<div class="slider-container">
							<label for="gradeLevelSlider">Set Your Grade Level:</label>
							<input type="range" id="gradeLevelSlider" min="0" max="13" value="5">
							<div class="grade-labels">
								<span>K</span>
								<span>1</span>
								<span>2</span>
								<span>3</span>
								<span>4</span>
								<span>5</span>
								<span>6</span>
								<span>7</span>
								<span>8</span>
								<span>9</span>
								<span>10</span>
								<span>11</span>
								<span>12</span>
								<span>12+</span>
							</div>
						</div>
						<button class="bigButton" onclick="saveGradeLevel()">Save Grade Level</button>
					</div>
				</div>
			</div>
		</div>
	</div>