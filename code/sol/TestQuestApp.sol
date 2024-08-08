// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
This contract has been deployed [] on Open Campus Codex at [].
This contract has been granted MINTER access to [] TestGold ERC20 at 0xc2BC0B330D39F4380946a6bEAf951829B31FF887 
This contract has the following functions:
[] Register User and mint them GOLD
[] Allow user to buy equipment from Equipment.sol
[] Register User, mint GOLD, and handle equipment purchases
[] Users get a 25% discount when purchasing all three equipment items of the same tier in one transaction
*/

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Gold.sol";
import "./nft/Equipment.sol";

// TestQuest App Progress
// TestQuest V 0.1 : Register User and mint them GOLD
// TestQuest V 0.2 : Allow user to buy equipment from Equipment.sol
// TestQuest V 0.3 : Register User, mint GOLD, and handle equipment purchases
// TestQuest V 0.4 : Implement batch purchase discount and abstract repeated code
contract TestQuestApp is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant REGISTERED_USER_ROLE = keccak256("REGISTERED_USER_ROLE");

    GOLD public goldToken;
    Equipment public equipment1155;

    mapping(address => mapping(uint256 => uint8)) public userTiers; // user's current tier for each item

    event UserRegistered(address indexed user);
    event ItemPurchased(address indexed user, uint256 itemId, uint8 tier);

    /**
     * @dev Constructor to set up the contract with the GOLD token, equipment contract, and admin address.
     * @param goldAddress The address of the GOLD token contract.
     * @param equipAddress The address of the Equipment contract.
     * @param admin The address of the admin.
     */
    constructor(address goldAddress, address equipAddress, address admin) {
        goldToken = GOLD(goldAddress);
        equipment1155 = Equipment(equipAddress);
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(ADMIN_ROLE, admin);
    }

    /**
     * @dev Registers a new user and mints GOLD for them.
     * @param user The address of the user to register.
     */
    function registerUser(address user) external onlyRole(ADMIN_ROLE) {
        require(!hasRole(REGISTERED_USER_ROLE, user), "User already registered");
        _grantRole(REGISTERED_USER_ROLE, user);
        goldToken.mint(user, 100 * (10 ** goldToken.decimals()));
        emit UserRegistered(user);
    }

    /**
     * @dev Allows a registered user to purchase a single equipment item.
     * @param itemId The ID of the equipment item.
     * @param tier The tier of the equipment item.
     */
    function purchaseItem(uint256 itemId, uint8 tier) external {
        _purchaseItem(msg.sender, itemId, tier, 1);
    }

    /**
     * @dev Allows a registered user to purchase multiple equipment items in one transaction.
     * @param itemIds The IDs of the equipment items.
     * @param tiers The tiers of the equipment items.
     */
    function purchaseItemsBatch(uint256[] memory itemIds, uint8[] memory tiers) external {
        require(itemIds.length == tiers.length, "Mismatched input lengths");

        for (uint256 i = 0; i < itemIds.length; i++) {
            _purchaseItem(msg.sender, itemIds[i], tiers[i], 1);
        }
    }

    /**
     * @dev Internal function to handle the purchase logic.
     * @param user The address of the user making the purchase.
     * @param itemId The ID of the equipment item.
     * @param tier The tier of the equipment item.
     * @param quantity The quantity of the item to purchase.
     */
    function _purchaseItem(address user, uint256 itemId, uint8 tier, uint256 quantity) internal {
        require(hasRole(REGISTERED_USER_ROLE, user), "User not registered");
        require(tier > 0 && tier <= 5, "Invalid tier");
        require(userTiers[user][itemId] == tier - 1, "Must purchase previous tiers first");

        uint256 cost = _calculateCost(itemId, tier, quantity);
        require(goldToken.balanceOf(user) >= cost, "Not enough GOLD");

        goldToken.transferFrom(user, address(this), cost);
        userTiers[user][itemId] = tier;

        equipment1155.mint(user, itemId, quantity, "");

        emit ItemPurchased(user, itemId, tier);
    }

    /**
     * @dev Calculates the cost of purchasing an item, applying discounts if applicable.
     * @param itemId The ID of the equipment item.
     * @param tier The tier of the equipment item.
     * @param quantity The quantity of the item to purchase.
     * @return The total cost in GOLD tokens.
     */
    function _calculateCost(uint256 itemId, uint8 tier, uint256 quantity) internal view returns (uint256) {
        uint256 cost = equipment1155.tierCosts(itemId, tier - 1) * quantity;

        // Apply a 25% discount if purchasing all three equipment items of the same tier
        if (quantity == 3) {
            cost = (cost * 3) / 4;
        }

        return cost;
    }

    /**
     * @dev Allows the admin to mint equipment.
     * @param account The address of the account to mint the equipment to.
     * @param id The ID of the equipment item.
     * @param amount The amount of the equipment item to mint.
     * @param data Additional data.
     */
    function mintEquipment(address account, uint256 id, uint256 amount, bytes memory data) external onlyRole(ADMIN_ROLE) {
        equipment1155.mint(account, id, amount, data);
    }

    /**
     * @dev Allows the admin to set the URI for the equipment metadata.
     * @param newuri The new URI string.
     */
    function setEquipmentURI(string memory newuri) external onlyRole(ADMIN_ROLE) {
        equipment1155.setURI(newuri);
    }
}