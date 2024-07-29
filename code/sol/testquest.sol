// This contract has been granted MINTER access to the TestGold ERC20 at 0xc2BC0B330D39F4380946a6bEAf951829B31FF887
/*  
Working functions:
- Test token "grant role, MINTER"
- Register User and mint them GOLD
- Sends the correct decimal amount of Test Gold.
*/
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./Gold.sol";

// TestQuest V 0.1 : Register User and mint them GOLD
// Next step, transfer EDU to the user so they can interact with the Open Campus Chain
// After this, integrate NFT Characters, Equipment & Tier Boost system
contract TestQuest {
    // address public authorizedWallet = 0x00F8306C110058b12c00b478986bc3627346671C;
    address public authorizedWallet = 0xbedc4032AAf4d431DD781128d48cFb6b95312244;
    GOLD public goldToken;

    mapping(address => bool) public registeredUsers;

    modifier onlyAuthorized() {
        require(msg.sender == authorizedWallet, "Not authorized");
        _;
        return;
    }

    constructor(address goldAddress) {
        goldToken = GOLD(goldAddress);
    }

    function registerUser(address user) external onlyAuthorized {
        require(!registeredUsers[user], "User already registered");
        registeredUsers[user] = true;
        goldToken.mint(user, (100 * (10 ** goldToken.decimals())));
    }

}