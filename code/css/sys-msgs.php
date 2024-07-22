<style>
		/******************************************
					SYSTEM MESSAGE BOXES CSS
		*******************************************/
		
		#sysMsgBoxBG{
			position: absolute;
			top: 0;
			height: 100%;
			left: 0;
			width: 100%;
			background: rgba(0, 0, 0, 0.75); 
			opacity: .85;
			display: none;
		}
		.sysMsgBox{
			position: absolute;
			background: #FAFAFA;
			color:  #34495E; 
			border: 5px solid #2ECC71; 
			border-radius: 10px;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 

			top: 20%;
			height: 60%;
			width: 60%;
			margin-left: auto;
			margin-right: auto;
			left: 0;
			right: 0;
			text-align: left;
		}
		.sysMsgBoxTitle{
			font-family: "Teachers", sans-serif;
			font-size: 2.25em;
			font-weight: 700;
			margin: 1.25em .25em .25em;
			text-align: center;
			z-index: 101;
		}
		.sysMsgBoxBody{
			margin: 1.5em 2em .25em;
			font-family: "Teachers", sans-serif;
			font-weight: 400;
			font-size: 1.5em;
			z-index: 100;
		}
		#alertBox{
			display: none;
		}
		#confirmBox{
			display: none;
		}
		#inputBox{
			display: none;
		}
		#miningInfoBox{
			display: none;
			background: #FFFFFF;
		}
		#miningInfoLoadingWheelDiv{
			max-height: 25vh;
			z-index: -100;
		}
		#miningInfoLoadingWheelDiv img{
			max-height: 25vh;
			z-index: -99;
		}
		#eth-input-field{
			margin-bottom: 3em;
		}
		#eth-input{
			width: 20%;
			height: 2em;
			font-size: 1.75em;
			padding: .5em;
		}
		#address-input{
			width: 90%;
			height: 2em;
			font-size: 1.5em;
			padding: .5em;
			text-align: center;
		}
		.sysMsgBoxButtons{
			position: absolute;
			bottom: 20px;
			margin-left: auto;
			margin-right: auto;
			left: 0;
			right: 0;
			text-align: center;
		}
		.sysMsgButton{
			font-family: "Teachers", sans-serif;
			background-color: #3498DB;
			color: #FAFAFA;
			border: none;
			border-radius: 20px; 
			padding: .5em 2em;
			font-size: 2em;
			margin: 1em 2em;
			cursor: pointer;
			transition: background-color 0.2s; 
		}
		.sysMsgButton:hover {
			background-color: #2980B9; /* Darker shade on hover */
		}
	/******************************************
				RESPONSIVE CSS
	*******************************************/
	
	/*Mobile (Thin) Screens*/
	@media screen and (max-width: 900px) { 		
		.sysMsgBox{
			height: 70%;
			width: 80%;
		}
		.sysMsgBoxTitle{
			margin: .5em .1em .1em;
			font-size: 1.5em;
		}
		.sysMsgBoxBody{
			margin: .5em .2em .1em;
			font-size: 1.1em;
		}
		.sysMsgButton{
			font-size: 1em;
			margin: .5em 1em;
		}
	}
	</style>