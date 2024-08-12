// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "./Gold.sol";

contract Equipment is ERC1155, AccessControl, ERC1155Supply {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    mapping(uint256 => uint256[5]) public tierCosts; // cost of each tier for each item
    mapping(address => mapping(uint256 => uint8)) public userTiers; // user's current tier for each item

    uint256 public constant WAND = 1;
    uint256 public constant ARMOR = 2;
    uint256 public constant WINGS = 3;

    GOLD public goldToken;

    event ItemPurchased(address indexed user, uint256 itemId, uint8 tier);

    // gold currently at 0xc2BC0B330D39F4380946a6bEAf951829B31FF887
    constructor(address defaultAdmin, address minter, address goldTokenAddress) ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        // for testing, i want to quickly check if the minter can mint first
        _grantRole(MINTER_ROLE, msg.sender);
        // I'll send in Donzo's address 0x00F8306C110058b12c00b478986bc3627346671C
        _grantRole(MINTER_ROLE, minter);
        
        // set the tier costs for each item
        tierCosts[WAND] = [1, 2, 4, 8, 16];
        tierCosts[ARMOR] = [1, 2, 4, 8, 16];
        tierCosts[WINGS] = [1, 2, 4, 8, 16];

        goldToken = GOLD(goldTokenAddress);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
    {
        _mintBatch(to, ids, amounts, data);
    }

    // this should abstracted into testquest.sol 
    function purchaseItem(uint256 itemId, uint8 tier) public {
        require(tier > 0 && tier <= 5, "Invalid tier");
        require(userTiers[msg.sender][itemId] == tier - 1, "Must purchase previous tiers first");

        uint256 cost = tierCosts[itemId][tier - 1];

        // deduct the required amount of GOLD from the user
        require(goldToken.balanceOf(msg.sender) >= cost, "Not enough GOLD");
        goldToken.transferFrom(msg.sender, address(this), cost);

        userTiers[msg.sender][itemId] = tier;
        _mint(msg.sender, itemId, 1, "");

        emit ItemPurchased(msg.sender, itemId, tier);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}