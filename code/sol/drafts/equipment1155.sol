// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
This contract has been deployed [x] on Open Campus Codex at [0x713b8bd9120E1FD86190d2979194e9e56dE60382].
This contract has granted MINTER access to [] TestQuestApp.sol at [].
This contract has the following functions:
- Doesn't matter, it deployed.
*/

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/**
 * @title Equipment1155
 * @dev ERC1155 contract for minting and managing equipment items for the TestQuest app.
 */
contract Equipment1155 is ERC1155Supply, AccessControl {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    mapping(uint256 => uint256[5]) public tierCosts; // Cost of each tier for each item

    // Item types (Equipment IDs)
    uint256 public constant WAND = 1;
    uint256 public constant ARMOR = 2;
    uint256 public constant WINGS = 3;

    /**
     * @dev Constructor to set up the contract with default admin and minter roles, and initializes tier costs.
     * @param defaultAdmin The address to be assigned the default admin role.
     * @param minter The address to be assigned the minter role.
     */
    constructor(address defaultAdmin, address minter) ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, minter);

        // Set tier costs for each item
        tierCosts[WAND] = [10, 20, 40, 80, 160];
        tierCosts[ARMOR] = [10, 20, 40, 80, 160];
        tierCosts[WINGS] = [10, 20, 40, 80, 160];
    }

    /**
     * @dev Sets a new URI for all token types, by relying on the token type ID substitution mechanism.
     * @param newuri The new URI string.
     */
    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
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