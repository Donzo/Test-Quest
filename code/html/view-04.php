<!-- Test Selection View -->
	<div id='view-04' class='gone'>
		<div class='content'>
			<div class='content centerTxt'>
				<div id='test-desc'>	
					<p>
						<strong>Welcome to Test Quest!</strong>
					</p>
					<p>
						Select a Class.
					</p>
				</div>
				<div id='lessonSelector'>
					<?php
						require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/classes.php";
						require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/subjects/english.php";
						require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/subjects/math.php";
						require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/subjects/social-studies.php";
						require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/subjects/science.php";
						require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/subjects/art.php";
					?>
				</div>
				<div id='testLaunchButtonDiv'class='gone'>
					<div id='test-launch-prompt' class="heading">
						Ready to start <span class="classArticle">a</span> <span class="class"></span> test on <span class="topic"></span><span class="subtopic"></span>?
					</div>
					<button class="biggerButton" onclick="launchTest()">Start Test</button>
				</div>
			</div>
		</div>
	</div>