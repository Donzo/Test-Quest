// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
This contract has been deployed [x] and verified [x] on Open Campus Codex at 0x8875054C87E0AD3848bd25e3e92d74147cC053fE.
This contract has granted MINTER access to [x] TestQuestApp.sol at 0x1BB300F5A90cf8AaF4C11800883dEF22432912ee.
This contract has the following functions:
[x] - Add new items and tier costs
[x] - Get tier costs
[x] - Mint single token
[x] - Mint multiple tokens
[x] - Set URI. Allow updatable URI so we can put on IPFS etc
[x] - Use totalSupply to track existing items and support adding new ones.
[x] - Use balanceOf or balanceOfBatch to find out what items the user has
[x] - getUserTestQuestBalance will give us an array of that address balance of the 15 NFT.

Version History:
V1.0: Initial version with fixed IDs and tiers.
V2.0: Added support for dynamic addition of new items and tiers.
V2.1: Added getter function for querying tier costs.
V2.2: Initialized with 15 predefined items and tier costs, with support for adding new items.
V2.3: Replaced `existingItems` mapping with `totalSupply` check for item existence, streamlined item addition.
V2.4: Verified all functions, added getUserTestQuestBalance to return a users balance of the initial items
*/

// Allow the contract to give minting permission to TestQuestApp and us during testing.
import "@openzeppelin/contracts/access/AccessControl.sol";
// https://docs.openzeppelin.com/contracts/5.x/api/token/erc1155#ERC1155Supply
// Extension of ERC1155 that adds tracking of total supply per id.
// Useful for scenarios where Fungible and Non-fungible tokens have to be clearly identified.
// Since we plan to have some unique items eventually, this is a good choice.
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/**
 * @title Equipment1155
 * @dev ERC1155 contract for minting and managing equipment items for the TestQuest app.
 */
contract Equipment1155 is ERC1155Supply, AccessControl {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    mapping(uint256 => mapping(uint256 => uint256)) public tierCosts; // Cost of each tier for each item

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
     * @param minter The address to be assigned the minter role.
     * @param baseURI The base URI for metadata.
     */
    constructor(address minter, string memory baseURI) ERC1155(baseURI) {
        // Donzo mints from 0x00F8306C110058b12c00b478986bc3627346671C
        // https://www.testquest.app/nft/
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender); // revoke this role after initial minting?
        _grantRole(MINTER_ROLE, minter);
        _grantRole(URI_SETTER_ROLE, msg.sender);

        // Set predefined tier costs for each item
        _initializeTierCosts();

        _mintInitialItems();
    }

    /**
     * @dev Internal function to mint initial items for testing.
     */
    function _mintInitialItems() internal {
        // Mint initial batch of wands
        uint256[] memory wandIds = new uint256[](5);
        uint256[] memory wandAmounts = new uint256[](5);
        for (uint256 i = 0; i < 5; i++) {
            wandIds[i] = i + 1;
            wandAmounts[i] = 5;
        }
        mintBatch(msg.sender, wandIds, wandAmounts, "");

        // Mint initial batch of armors
        uint256[] memory armorIds = new uint256[](5);
        uint256[] memory armorAmounts = new uint256[](5);
        for (uint256 i = 0; i < 5; i++) {
            armorIds[i] = i + 6;
            armorAmounts[i] = 5;
        }
        mintBatch(msg.sender, armorIds, armorAmounts, "");

        // Mint initial batch of wings
        uint256[] memory wingIds = new uint256[](5);
        uint256[] memory wingAmounts = new uint256[](5);
        for (uint256 i = 0; i < 5; i++) {
            wingIds[i] = i + 11;
            wingAmounts[i] = 5;
        }
        mintBatch(msg.sender, wingIds, wingAmounts, "");
    }

    /**
     * @dev Internal function to set predefined tier costs.
     */
    function _initializeTierCosts() internal {
        // Wand tier costs
        // tierCosts[WAND_TIER_1][1] = 10;
        // tierCosts[WAND_TIER_2][2] = 20;
        // tierCosts[WAND_TIER_3][3] = 40;
        // tierCosts[WAND_TIER_4][4] = 80;
        // tierCosts[WAND_TIER_5][5] = 160;

        // // Armor tier costs
        // tierCosts[ARMOR_TIER_1][1] = 10;
        // tierCosts[ARMOR_TIER_2][2] = 20;
        // tierCosts[ARMOR_TIER_3][3] = 40;
        // tierCosts[ARMOR_TIER_4][4] = 80;
        // tierCosts[ARMOR_TIER_5][5] = 160;

        // // Wings tier costs
        // tierCosts[WINGS_TIER_1][1] = 10;
        // tierCosts[WINGS_TIER_2][2] = 20;
        // tierCosts[WINGS_TIER_3][3] = 40;
        // tierCosts[WINGS_TIER_4][4] = 80;
        // tierCosts[WINGS_TIER_5][5] = 160;
        for (uint256 i = 1; i <= 15; i++) {
            for (uint256 j = 1; j <= 5; j++) {
                uint256 cost = 10 * (2 ** (j - 1)); // 10, 20, 40, 80, 160
                tierCosts[i][j] = cost;
            }
        }
    }

    /**
     * @dev Returns a given user's balance batch for the initial 15 equipment items.
     * @param user The address of the user to check balance of.
     * @return balance15 array of 15 values representing the user's balance for the first 15 item IDs.
     */
    function getUserTestQuestBalance(address user) external view returns (uint256[15] memory balance15) {
        address[] memory accounts = new address[](15);
        uint256[] memory ids = new uint256[](15);
        for (uint8 i = 0; i < 15; i++) {
            accounts[i] = user;
            ids[i] = i + 1;
        }
        uint256[] memory balances = balanceOfBatch(accounts, ids);
        uint256[15] memory result;
        for (uint8 i = 0; i < 15; i++) {
            result[i] = balances[i];
        }
        return result;
    }

    /**
     * @dev Adds a new item with its tier costs.
     * @param itemId The ID of the new item.
     * @param costs The costs for each tier of the new item.
     */
    function addNewItem(uint256 itemId, uint256[] memory costs) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(totalSupply(itemId) == 0, "Item already exists"); // Check if item exists by using totalSupply
        require(costs.length == 5, "Must provide exactly 5 tier costs");

        for (uint256 i = 0; i < costs.length; i++) {
            tierCosts[itemId][i + 1] = costs[i];
        }
    }

    /**
     * @dev Returns the tier cost for a given item and tier.
     * @param itemId The ID of the item.
     * @param tier The tier of the item.
     * @return The cost of the specified tier for the item.
     */
    function getTierCost(uint256 itemId, uint256 tier) public view returns (uint256) {
        require(totalSupply(itemId) > 0, "Item does not exist"); // Check if item exists by using totalSupply
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

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}