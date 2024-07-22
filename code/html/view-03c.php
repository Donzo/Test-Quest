<!-- Returning Student User / Show Profile -->
	<div id='view-03c' class='gone'>
		<div class='content'>
			<div class='content centerTxt'>
				<div class='intro-txt'>
					<p>
						<strong>Welcome to Test Quest, User <span class='usrAddress'></span>!</strong>
					</p>

					<div class="user-profile">
						<div class="heading">
							User <span class="usrAddress"></span>'s Profile
						</div>
						<div id="usrProfileData">
							<p>Experience Points: <span class="usrExpPoints">0</span></p>
							<p>Gold Coins: <span class="usrGoldCoins">0</span></p>
							<p>Number of Tests Taken: <span class="usrNumOfTsts">0</span></p>
							<p>Game Credits: <span class="usrGameCredits">0</span></p>
							<p>Grade Level: <span class="usrGradeLvl">5</span></p>
						</div>
						<div>
							<button class="bigButton green" onclick="selectTests()">Take a Test</button>
						</div>
						<div>
							<button class="bigButton blue" onclick="confirmQuest()">Go On a Quest</button>
						</div>
						<div>
							<button class="smallButton grey" onclick="editUserDetails()">Edit Profile</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>