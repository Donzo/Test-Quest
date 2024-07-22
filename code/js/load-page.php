<script>
	async function loadView(){
		var isConnected = await checkMyConnection();
		if (isConnected){
			//Load view 2 (options menu 1)
			var onNetwork = await reportProvider();
			if (onNetwork){
				checkUserAccount();
				//poofGone("coverAll", "view-03", false);
			}
			else{
				poofGone("coverAll", "view-02", false);
			}
		}
		else{
			//Load view 1 (connect button)
			poofGone("coverAll", "view-01", false);
		}	
	}
	loadView();
</script>