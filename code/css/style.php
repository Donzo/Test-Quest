<style type="text/css">
		html,body {
			background-color: #34495E;
			color: #FAFAFA;
			font-family: helvetica, arial, sans-serif;
			margin: 0;
			padding: 0;
			font-size: 16pt;
			/*overflow: hidden; /* Hide scrollbars */
		}
		img{
			max-width: 100%;
		}
		#banner{
			max-height: 160px;
			min-width: 100%;
			background-color: #2ECC71;
			display: flex;
				-webkit-box-align: center;
			align-items: center;
			box-shadow: rgba(242, 243, 247, 0.16) 0px -1px 0px inset;
			padding:10px 0;
		}
		#logo{
			margin: auto;
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.logo-img{
			height: 140px;
		}
		.teachers-regular {
			font-family: "Teachers", sans-serif;
			font-optical-sizing: auto;
			font-weight: 400;
			font-style: normal;
		}
		.teachers-italic {
			font-family: "Teachers", sans-serif;
			font-optical-sizing: auto;
			font-weight: 400;
			font-style: italic;
		}
		.teachers-bold {
			font-family: "Teachers", sans-serif;
			font-optical-sizing: auto;
			font-weight: 700;
			font-style: normal;
		}
		.teachers-bold-italic{
			font-family: "Teachers", sans-serif;
			font-optical-sizing: auto;
			font-weight: 700;
			font-style: italic;
		}
		#coverAll {
			position: absolute;
			top: 170px; /*Banner Height + padding*/
			left: 0px;
			width: 100vw;
			height: calc(100vh - 170px);
			margin: 0;
			padding: 0;
			background: #34495E;
			z-index: 9999;
			opacity: 1;
		}
		.content{
			font-family: "Teachers", sans-serif;
			font-optical-sizing: auto;
			font-weight: 400;
			font-style: normal;
			background-color: #FAFAFA;
			border-radius: 50px;
			padding: 20px;
			margin: 20px;
			color: #34495E;
			font-size: 1.1em;
			min-height: 50vh;
		}
		.centerTxt{
			text-align: center;
		}
		/* holds connect button */
		.content-center {
			display: flex;
			justify-content: center;
			align-items: end;
			margin-top: 3em;
		}
		.bigButton, .biggerButton {
			background-color: #2ECC71; /* Chalkboard Green */
			color: #FAFAFA; /* Paper White */
			font-size: 20px;
			padding: 15px 30px;
			border: none;
			border-radius: 50px;
			cursor: pointer;
			transition: background-color 0.3s, box-shadow 0.3s;
			text-shadow: 2px 2px 4px #34495E;
			margin-top:1em;
		}
		.smallButton {
			font-size: 10px;
			padding: 10px 20px;
			color: #FAFAFA; /* Paper White */
			border: none;
			border-radius: 50px;
			cursor: pointer;
			transition: background-color 0.3s, box-shadow 0.3s;
			text-shadow: 2px 2px 4px #34495E;
			margin:20px;
		}
		.bigButton:hover, .biggerButton:hover {
			background-color: #27AE60;
			box-shadow: 0 4px 8px rgba(0,0,0,0.2);
		}
		.biggerButton{
			font-size: 32px;
			padding: 25px 40px;
		}
		.bigButton:disabled {
			background-color: #7F8C8D;
			cursor: not-allowed;
			box-shadow: none;
		}
		#userAcctNum{
			position: absolute;
			font-size: .6em;
			width: 100%;
			text-align: right;
			bottom: 10px;
			right: 10px;
		}
		#lessonSelector {
			display: flex;
			justify-content: center;
			gap: 20px;
			flex-wrap: wrap;
		}
		.subjectButton {
			background-color: #2ECC71; /* Chalkboard Green */
			color: #FAFAFA; /* Paper White */
			font-size: 20px;
			padding: 15px 30px;
			border: none;
			border-radius: 50px;
			cursor: pointer;
			transition: background-color 0.3s, box-shadow 0.3s;
			text-shadow: 2px 2px 4px #34495E; 
			margin: 10px;
		}
		/* Subject Button Colors */
		.subjectButton:hover {
			box-shadow: 0 4px 8px rgba(0,0,0,0.2); 
		}
		.red {
			background-color: #E74C3C; 
		}
		.red:hover {
			background-color: #F1948A;
		}
		.green {
			background-color: #2ECC71; 
		}
		.green:hover {
			background-color: #82E0AA;
		}
		.blue {
			background-color: #3498DB; 
		}
		.blue:hover {
			background-color: #85C1E9;
		}
		.yellow {
			background-color: #F4D03F; 
		}
		.yellow:hover {
			background-color: #F9E79F;
		}
		.pink {
			background-color: #FF00FF; 
		}
		.pink:hover {
			background-color: #FF99FF;
		}
		.orange {
			background-color: #E67E22;
		}
		.orange:hover {
			background-color: #F0B27A;
		}
		.purple {
			background-color: #8E44AD;
		}
		.purple:hover {
			background-color: #D2B4DE;
		}
		.teal {
			background-color: #1ABC9C;
		}
		.teal:hover {
			background-color: #76D7C4;
		}
		.brown {
			background-color: #8C564B;
		}
		.brown:hover {
			background-color: #C39B77;
		}
		.grey {
			background-color: #7F8C8D;
		}	
		.grey:hover {
			background-color: #B2BABB; 
		}
		.heading{
			font-size: 1.3em;
			font-weight: 700;
			margin: .9em 0;
		}
		/* User profile styling */
		.user-profile {
			border: 1px solid #ccc;
			padding: 20px;
			margin: 20px;
			border-radius: 10px;
			background-color: #f9f9f9;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		}
		.user-profile .heading {
			font-size: 24px;
			font-weight: bold;
			margin-bottom: 20px;
		}
		#usrProfileData {
			font-size: 18px;
		}
		#usrProfileData p {
			margin: 10px 0;
		}
		#usrProfileData span {
			font-weight: bold;
		}
		.user-profile p {
			font-size: 16px;
			margin-top: 20px;
		}

		
		/* Slider styling */
		.slider-container {
			margin-top: 20px;
			width: 80%;
			margin-left: auto;
			margin-right: auto;
		}
		#gradeLevelSlider {
			width: 100%;
			margin: 10px 0;
		}
		.grade-labels {
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			width: 100%;
			margin-left: auto;
			margin-right: auto;
		}
		.grade-labels span {
			width: 20px;
			text-align: center;
		}
		#test-info {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: flex-start;
			font-size: 14px;
			color: #2C3E50;
			text-align: right;
			margin-bottom: 20px;
		}

		/* Style for the question text */
		#question {
			font-size: 24px;
			font-weight: bold; 
			color: #2C3E50; 
			padding: 20px; 
			margin-bottom: 20px;
			border: 2px solid #BDC3C7; 
			border-radius: 10px; 
			background-color: #ECF0F1; 
			text-align: left;
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
					display: flex;
			justify-content: center;
			align-items: center;
		}
		#loading-gif {
			width: 150px;
			height: 150px;
		}
		.styled-input {
			width: 80%;
			padding: 15px;
			font-size: 16px;
			border: 2px solid #2ECC71;
			border-radius: 25px;
			margin: 20px 0;
			box-sizing: border-box;
			transition: all 0.3s ease-in-out;
		}
		.styled-input:focus {
			border-color: #27AE60;
			outline: none;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		}
		.response {
			font-size: 18px;
			color: #2C3E50;
			padding: 20px;
			margin-top: 20px;
			border: 2px solid #BDC3C7;
			border-radius: 10px;
			background-color: #ECF0F1;
			text-align: left;
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
			display: flex;
			justify-content: center;
			align-items: center;
		}
		#reportDiv {
			display: none;
			margin-top: 20px;
			text-align: center;
		}
		#reportDiv.visible {
			display: block;
		}
		.report-message {
			font-size: 24px;
			font-weight: bold;
			margin-bottom: 10px;
		}
		.report-image {
			width: 100px;
			height: 100px;
		}
		#view-06 .content {
			text-align: center;
			padding: 20px;
		}
		.heading-02 {
			font-size: 32px;
			font-weight: bold;
			color: #2C3E50;
			margin-bottom: 20px;
		}

		#results-content p {
			font-size: 24px;
			color: #34495E;
			margin: 10px 0;
			line-height:1.75em;
		}
		#results-header{
			font-size: 1.25em !important;
		}
		#results-summary {
			font-size: 24px;
			font-weight: bold;
			color: #27AE60; /* Green color for positive feedback */
		}
		/******************************************
					RESPONSIVE CSS
		*******************************************/
	
		/*Mobile (Thin) Screens*/
		@media screen and (max-width: 900px) { 		
			#userAcctNum{
				display: none;			
			}
		}
		/******************************************
			TRANSITION ANIMATIONS (GO AT THE BOTTOM)
		*******************************************/
		.visible {
			opacity: 1;
			transition: opacity 0.5s ease-in-out;
			pointer-events: auto;
		}

		.visible-no-block {
			opacity: 1;
			transition: opacity 0.5s ease-in-out;
			pointer-events: auto;
		}

		.invisible {
			opacity: 0;
			transition: opacity 0.5s ease-in-out;
			pointer-events: none;
		}

		.invisible-no-block {
			opacity: 0;
			transition: opacity 0.5s ease-in-out;
			pointer-events: none;
		}

		.gone {
			display: none !important;
			pointer-events: none;
		}
	</style>