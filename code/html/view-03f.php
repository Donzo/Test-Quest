<!-- Items Page -->
<div id='view-03f' class='gone'>
	<div class='content'>
		<div class='content centerTxt'>
			<div class='intro-txt'>
				<p>
					<strong>Buy Test Quest NFT Items!</strong>
				</p>
				<div class="user-profile">
					<div class="heading">
						Judge <span class="usrAddress"></span>'s Profile
					</div>
					<div id="usrProfileData">
						<strong>You have <span class="usrGoldCoinsMinted">0</span> Gold Coins in your wallet ready to spend.</strong>
						<br/>
						<br/>
						<strong>You have <span class="usrGoldCoins">0</span> coins <a onclick='mintGold()'>READY TO BE MINTED</a>.</strong>
						<br/>
						<br/>
						<div>
							<button class="bigButton yellow" onclick="mintGold()">Mint Gold Coins</button>
						</div>
						<br/>
						<br/>
						
						<div class="item-box">
							<img src="/images/wand.png" alt="Magic Wand" class="item-image">
							<div class="item-description">
								<h3>Magic Wand</h3>
								<p>The Magic Wand increases your attack power, allowing you to defeat enemies more easily.</p>
								<p>Cost: 10 GOLD</p>
								<button class="bigButton" onclick="mintEquipment('wand')">Buy</button>
							</div>
						</div>
						<div class="item-box">
							<img src="/images/armor.png" alt="Armor" class="item-image">
							<div class="item-description">
								<h3>Armor</h3>
								<p>The Armor increases your defense, providing you with greater protection from attacks.</p>
								<p>Cost: 10 GOLD</p>
								<button class="bigButton" onclick="mintEquipment('armor')">Buy</button>
							</div>
						</div>
						<div class="item-box">
							<img src="/images/wings.png" alt="Wings" class="item-image">
							<div class="item-description">
								<h3>Wings</h3>
								<p>The Wings increase your hover ability, allowing you to reach higher places and avoid ground obstacles.</p>
								<p>Cost: 10 GOLD</p>
								<button class="bigButton" onclick="mintEquipment('wings')">Buy</button>
							</div>
						</div>
					</div>
					<div>
						<button class="bigButton" onclick="poofGone(currentView, 'view-03c', false)">Go Back</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>