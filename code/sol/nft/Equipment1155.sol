// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
This contract has been deployed [x] on Open Campus Codex at 0x3A5a60bc87170AeC94e5DbFA1E7FC1395CE78bB0].
This contract has granted MINTER access to [] TestQuestApp.sol at [].
This contract has the following functions:
[x] - Add new items and tier costs
[x] - Get tier costs
[x] - Mint single token
[x] - Mint multiple tokens
[] - Set URI
*/

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/**
 * @title Equipment1155
 * @dev ERC1155 contract for minting and managing equipment items for the TestQuest app.
 * Version History:
 * V1.0: Initial version with fixed IDs and tiers.
 * V2.0: Added support for dynamic addition of new items and tiers.
 * V2.1: Added getter function for querying tier costs.
 * V2.2: Initialized with 15 predefined items and tier costs, with support for adding new items.
 */
contract Equipment1155 is ERC1155Supply, AccessControl {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    mapping(uint256 => mapping(uint256 => uint256)) public tierCosts; // Cost of each tier for each item
    mapping(uint256 => bool) public existingItems; // Track existing items

    // Item types (Equipment IDs)
    uint256 public constant WAND_TIER_1 = 1;
    uint256 public constant WAND_TIER_2 = 2;
    uint256 public constant WAND_TIER_3 = 3;
    uint256 public constant WAND_TIER_4 = 4;
    uint256 public constant WAND_TIER_5 = 5;

    uint256 public constant ARMOR_TIER_1 = 6;
    uint256 public constant ARMOR_TIER_2 = 7;
    uint256 public constant ARMOR_TIER_3 = 8;
    uint256 public constant ARMOR_TIER_4 = 9;
    uint256 public constant ARMOR_TIER_5 = 10;

    uint256 public constant WINGS_TIER_1 = 11;
    uint256 public constant WINGS_TIER_2 = 12;
    uint256 public constant WINGS_TIER_3 = 13;
    uint256 public constant WINGS_TIER_4 = 14;
    uint256 public constant WINGS_TIER_5 = 15;

    /**
     * @dev Constructor to set up the contract with default admin and minter roles.
     * @param defaultAdmin The address to be assigned the default admin role.
     * @param minter The address to be assigned the minter role.
     * @param baseURI The base URI for metadata.
     */
    constructor(address defaultAdmin, address minter, string memory baseURI) ERC1155(baseURI) {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, minter);
        _grantRole(URI_SETTER_ROLE, defaultAdmin);

        // Set predefined tier costs for each item
        _initializeTierCosts();
    }

    /**
     * @dev Internal function to set predefined tier costs.
     */
    function _initializeTierCosts() internal {
        // Wand tier costs
        tierCosts[WAND_TIER_1][1] = 10;
        tierCosts[WAND_TIER_2][2] = 20;
        tierCosts[WAND_TIER_3][3] = 40;
        tierCosts[WAND_TIER_4][4] = 80;
        tierCosts[WAND_TIER_5][5] = 160;

        // Armor tier costs
        tierCosts[ARMOR_TIER_1][1] = 10;
        tierCosts[ARMOR_TIER_2][2] = 20;
        tierCosts[ARMOR_TIER_3][3] = 40;
        tierCosts[ARMOR_TIER_4][4] = 80;
        tierCosts[ARMOR_TIER_5][5] = 160;

        // Wings tier costs
        tierCosts[WINGS_TIER_1][1] = 10;
        tierCosts[WINGS_TIER_2][2] = 20;
        tierCosts[WINGS_TIER_3][3] = 40;
        tierCosts[WINGS_TIER_4][4] = 80;
        tierCosts[WINGS_TIER_5][5] = 160;

        // Mark existing items
        for (uint256 i = 1; i <= 15; i++) {
            existingItems[i] = true;
        }
    }

    /**
     * @dev Sets a new URI for all token types, by relying on the token type ID substitution mechanism.
     * @param newuri The new URI string.
     */
    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    /**
     * @dev Adds a new item with its tier costs.
     * @param itemId The ID of the new item.
     * @param costs The costs for each tier of the new item.
     */
    function addNewItem(uint256 itemId, uint256[] memory costs) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!existingItems[itemId], "Item already exists");
        require(costs.length == 5, "Must provide exactly 5 tier costs");

        for (uint256 i = 0; i < costs.length; i++) {
            tierCosts[itemId][i + 1] = costs[i];
        }

        existingItems[itemId] = true;
    }

    /**
     * @dev Returns the tier cost for a given item and tier.
     * @param itemId The ID of the item.
     * @param tier The tier of the item.
     * @return The cost of the specified tier for the item.
     */
    function getTierCost(uint256 itemId, uint256 tier) public view returns (uint256) {
        require(existingItems[itemId], "Item does not exist");
        require(tier > 0 && tier <= 5, "Invalid tier");
        return tierCosts[itemId][tier];
    }

    /**
     * @dev Mints a specific amount of a specific token to a specific address.
     * @param account The address to receive the tokens.
     * @param id The ID of the token type.
     * @param amount The amount of tokens to mint.
     * @param data Additional data with no specified format.
     */
    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyRole(MINTER_ROLE) {
        _mint(account, id, amount, data);
    }

    /**
     * @dev Mints multiple amounts of multiple tokens to a specific address.
     * @param to The address to receive the tokens.
     * @param ids The IDs of the token types.
     * @param amounts The amounts of tokens to mint.
     * @param data Additional data with no specified format.
     */
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public onlyRole(MINTER_ROLE) {
        _mintBatch(to, ids, amounts, data);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}