// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
This contract has been deployed [x] and verified [x] on Open Campus Codex at 0x1BB300F5A90cf8AaF4C11800883dEF22432912ee.
This contract has been granted MINTER access to [x] TestGold ERC20 at 0xc2BC0B330D39F4380946a6bEAf951829B31FF887 
This contract has been granted Allowance to spend TestGold [x]
This contract has been granted MINTER access to [x] Equipment1155 at 0x8875054C87E0AD3848bd25e3e92d74147cC053fE
This contract has the following functions:
[x] Register User and mint them GOLD
[x] Allow user to buy equipment from Equipment1155.sol
[x] Register User, mint GOLD, and handle equipment purchases individually or in batches
[x] Users can upgrade their tier if they have all equipment of the current tier
[x] Allow ADMIN to distribute EDU (This chain's native gas token) to newly registered users.

// TestQuest App Version History:
// V 0.1 : Register User and mint them GOLD
// V 0.2 : Allow user to buy equipment from Equipment.sol
// V 0.3 : Register User, mint GOLD, and handle equipment purchases
// V 0.4 : Implement batch purchase and abstract repeated code
// V 0.5 : Update to Equipment1155.sol and add EDU distribution mechanism for registering new users.
// V 0.6 : Implement tiered upgrade system with rewards, use ERC1155 mintBatch for batch operations
// V 0.7 : Remove tier input in purchase functions, add helper functions for tier checking and cost calculation with decimals
// V 0.8 : Bug fixes
*/

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Gold.sol";
import "./nft/Equipment1155.sol";

contract TestQuestApp is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant REGISTERED_USER_ROLE = keccak256("REGISTERED_USER_ROLE");

    GOLD public goldToken;
    Equipment1155 public equipment1155;

    mapping(address => uint8) public userTiers; // user's current overall tier

    event UserRegistered(address indexed user);
    event UserTierUp(address indexed user, uint8 tier);
    event ItemPurchased(address indexed user, uint256 itemId, uint8 tier);
    event FundReceived(address indexed sender, uint256 amount);
    event GasDistributed(address indexed user, uint256 amount);

    constructor(address goldAddress, address equipAddress, address admin) {
        // 0xc2BC0B330D39F4380946a6bEAf951829B31FF887
        goldToken = GOLD(goldAddress);
        // 0x8875054C87E0AD3848bd25e3e92d74147cC053fE
        equipment1155 = Equipment1155(equipAddress);
        // ability to add roles restricted to deployer
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        // special admin rights (register, free mint, withdraw) given to donzo's server wallet:
        // 0x00F8306C110058b12c00b478986bc3627346671C  
        _grantRole(ADMIN_ROLE, admin);
    }

    receive() external payable {
        emit FundReceived(msg.sender, msg.value);
    }

    function registerUser(address user) external onlyRole(ADMIN_ROLE) {
        require(!hasRole(REGISTERED_USER_ROLE, user), "User already registered");
        _grantRole(REGISTERED_USER_ROLE, user);
        // goldToken.mint(user, 100 * (10 ** goldToken.decimals()));
        goldToken.mint(user, convertToDecimal(100));
        emit UserRegistered(user);

        uint256 gasAmount = 0.025 ether;
        require(address(this).balance >= gasAmount, "Insufficient funds for gas");
        payable(user).transfer(gasAmount);

        emit GasDistributed(user, gasAmount);
    }

    function upgradeTier() public onlyRole(REGISTERED_USER_ROLE) {
        uint8 currentTier = userTiers[msg.sender];
        require(currentTier < 5, "Maximum tier reached");

        uint256[] memory requiredItems = new uint256[](3);
        requiredItems[0] = currentTier + 1; // Wand
        requiredItems[1] = currentTier + 6; // Armor
        requiredItems[2] = currentTier + 11; // Wings

        for (uint256 i = 0; i < 3; i++) {
            require(equipment1155.balanceOf(msg.sender, requiredItems[i]) > 0, "Missing required equipment");
        }

        userTiers[msg.sender] = currentTier + 1;

        // Reward user with GOLD and EDU
        // uint256 goldReward = 50 * (currentTier + 1) * (10 ** goldToken.decimals());
        // goldToken.mint(msg.sender, goldReward);
        goldToken.mint(msg.sender, convertToDecimal(50 * (currentTier + 1)));

        uint256 eduReward = 0.01 ether;
        require(address(this).balance >= eduReward, "Insufficient funds for EDU reward");
        payable(msg.sender).transfer(eduReward);

        emit UserTierUp(msg.sender, currentTier + 1);
    }

    // anyone with GOLD can purchase an item
    // function purchaseItem(uint256 itemId, uint8 tier) external {
    //     _purchaseItem(msg.sender, itemId, tier, 1);
    // }
    function purchaseItem(uint256 itemId) external {
        uint8 tier = getTierFromItemId(itemId);
        _purchaseItem(msg.sender, itemId, tier, 1);
    }

    function purchaseItemsBatch(uint256[] memory itemIds) external {
        uint256[] memory amounts = new uint256[](itemIds.length);
        uint256 totalCost = 0;

        for (uint256 i = 0; i < itemIds.length; i++) {
            uint8 tier = getTierFromItemId(itemIds[i]);
            require(tier <= userTiers[msg.sender] + 1, "Tier too high for user");

            totalCost += convertToDecimal(equipment1155.getTierCost(itemIds[i], tier));
            amounts[i] = 1;
        }

        require(goldToken.balanceOf(msg.sender) >= totalCost, "Not enough GOLD");
        require(goldToken.transferFrom(msg.sender, address(this), totalCost), "GOLD transfer failed");

        equipment1155.mintBatch(msg.sender, itemIds, amounts, "");

        for (uint256 i = 0; i < itemIds.length; i++) {
            emit ItemPurchased(msg.sender, itemIds[i], getTierFromItemId(itemIds[i]));
        }
    }

    function _purchaseItem(address user, uint256 itemId, uint8 tier, uint256 quantity) internal {
        require(tier > 0 && tier <= 5, "Invalid tier");
        require(tier <= userTiers[user] + 1, "Tier too high for user");

        // uint256 cost = equipment1155.getTierCost(itemId, tier) * quantity;
        uint256 cost = convertToDecimal(equipment1155.getTierCost(itemId, tier) * quantity);
        require(goldToken.balanceOf(user) >= cost, "Not enough GOLD");

        require(goldToken.transferFrom(user, address(this), cost), "GOLD transfer failed");

        equipment1155.mint(user, itemId, quantity, "");

        emit ItemPurchased(user, itemId, tier);
    }

    function mintEquipmentBatch(address account, uint256[] memory ids, uint256[] memory amounts, bytes memory data) external onlyRole(ADMIN_ROLE) {
        equipment1155.mintBatch(account, ids, amounts, data);
    }

    function setEquipmentURI(string memory newuri) external onlyRole(ADMIN_ROLE) {
        equipment1155.setURI(newuri);
    }

    function withdraw(uint256 amount) external onlyRole(ADMIN_ROLE) {
        require(address(this).balance >= amount, "Insufficient funds");
        payable(msg.sender).transfer(amount);
    }

    // helper function
    function convertToDecimal(uint256 amount) public view returns (uint256) {
        return amount * (10 ** goldToken.decimals());
    }

    function getTierFromItemId(uint256 itemId) internal pure returns (uint8) {
        require(itemId > 0, "Item ID must be greater than 0");
        return uint8(((itemId - 1) % 5) + 1);
    }
}