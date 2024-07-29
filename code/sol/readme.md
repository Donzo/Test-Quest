# TestQuest Smart Contracts Overview

This document provides an overview of the smart contracts used in the TestQuest project, specifically `Gold.sol` and `testquest.sol`. These contracts are integral to the functioning of the TestQuest ecosystem on EduChain / Open Campus Codex, enabling secure and decentralized management of digital assets and user interactions.  We began by focusing on elevating the Learner experience, but hope to soon integrate features that empower Teachers with curated Quiz & Test sets, as well as custom GPT prompts.

## Gold.sol

> We want to incentivize learning with our own token, but also plan to integrate and airdrop the native EDU token to our users for seamless UX.

The `Gold.sol` contract is an ERC20 token contract that represents the in-game currency, GOLD. It is built using OpenZeppelin's ERC20, AccessControl, and ERC20Permit extensions to ensure security and flexibility.

### Key Features:
- **ERC20 Token**: Implements the standard ERC20 interface for fungible tokens.
- **Access Control**: Uses OpenZeppelin's AccessControl to manage roles and permissions.
- **ERC20 Permit**: Allows for gasless approvals using signatures.
- **Minting**: The contract includes a mint function that can only be called by addresses with the MINTER_ROLE.

### Roles:
- **DEFAULT_ADMIN_ROLE**: The default admin role, which has permission to grant and revoke other roles.
- **MINTER_ROLE**: Addresses with this role can mint new GOLD tokens.

### Deployment:
- The contract is deployed at `0xc2BC0B330D39F4380946a6bEAf951829B31FF887` on the Open Campus Codex.

## testquest.sol

> V 0.1: Register users and mint GOLD. 

The `testquest.sol` contract manages user registration and interaction with the GOLD token. It ensures that only authorized addresses can register new users and mint GOLD tokens for them.

### Key Features:
- **User Registration**: Allows authorized addresses to register new users.
- **Minting GOLD**: Mints a predefined amount of GOLD tokens for newly registered users.
- **Authorization**: Uses a modifier to restrict certain functions to authorized addresses only.

### Roles:
- **authorizedWallet**: The address that is authorized to register new users and mint GOLD tokens.

### Deployment:
- The contract interacts with the GOLD token contract deployed at `0xc2BC0B330D39F4380946a6bEAf951829B31FF887`.

## Project Context

The TestQuest project aims to elevate learners and teachers by integrating AI-powered tests, games, and blockchain-enabled digital assets. The smart contracts play a crucial role in managing the in-game currency (GOLD) and user interactions securely and transparently.

## TODO List

1. **Implement Additional Smart Contracts**: Develop and deploy additional smart contracts for managing other in-game assets and interactions.
2. **Enhance Security**: Conduct thorough security audits and implement additional security measures as needed.
3. **User Interface Integration**: Integrate the smart contracts with the frontend UI to provide a seamless user experience.
4. **Testing and Debugging**: Perform extensive testing and debugging to ensure the contracts function as intended.

## [Future Considerations](./thoughts.md)

1. **Scalability**: Explore solutions for scaling the smart contracts to handle a larger number of users and transactions.
2. **Interoperability**: Consider integrating with other blockchain networks and protocols to enhance the functionality and reach of the TestQuest ecosystem.
3. **Governance**: Implement a decentralized governance model to allow the community to participate in decision-making processes.
4. **New Features**: Continuously explore and implement new features to enhance the user experience and keep the project innovative.

By following this roadmap, we can ensure that the TestQuest project remains secure, scalable, and user-friendly, providing a valuable platform for learners and teachers alike.
