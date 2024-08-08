# TestQuest Smart Contracts Overview

This document provides an overview of the smart contracts used in the TestQuest project, specifically `Gold.sol`, `Equipment1155`, `Characters.sol`, the deprecated initial draft contract `testquest.sol`, and the Tippi's hackathon masterpiece `TestQuestApp.sol`. These contracts are integral to the functioning of the TestQuest ecosystem on EduChain / Open Campus Codex, enabling secure and decentralized management of digital assets and user interactions. We began by focusing on elevating the Learner experience, but hope to soon integrate features that empower Teachers with curated Quiz & Test sets, as well as custom GPT prompts.

### Deployed Addresses

Gold.sol: 0xc2BC0B330D39F4380946a6bEAf951829B31FF887
Equipment.sol: [Deployed Address]
Characters.sol: [Deployed Address]
testquest.sol: 0xbedc4032AAf4d431DD781128d48cFb6b95312244
TestQuestApp.sol: [Deployed Address]

## Gold.sol

> We want to incentivize learning with our own token, but also plan to integrate and airdrop the native EDU token to our users for seamless UX.

The `Gold.sol` contract is an ERC20 token contract that represents the in-game currency, GOLD. It is built using OpenZeppelin's ERC20, AccessControl, and ERC20Permit extensions to ensure security and flexibility.

### Key Features:
- **ERC20 Token**: Implements the standard ERC20 interface for fungible tokens.
- **Access Control**: Uses OpenZeppelin's AccessControl to manage roles and permissions.
- **ERC20 Permit**: Allows for gasless approvals using signatures.
- **Minting**: The contract includes a mint function that can only be called by addresses with the MINTER_ROLE.

### Roles:
- **DEFAULT_ADMIN_ROLE**: The default admin role, which has permission to grant and revoke other roles. The deployed Gold v0.1 (0xc2BC0B330D39F4380946a6bEAf951829B31FF887 on Open Campus Codex) has Donzo and my two addresses added to this role. To add additional DEFAULT_ADMIN_ROLE, call the grantRole function for role = 0x0000000000000000000000000000000000000000000000000000000000000000 and account as whatever address you want, assuming you are using an already approved address to call this function.

- **MINTER_ROLE**: Addresses with this role can mint new GOLD tokens. Currently, only Donzo, Tippi, and the TestQuest.sol contract have the right to mint new GOLD tokens.

### Deployment:
- The contract is deployed at `0xc2BC0B330D39F4380946a6bEAf951829B31FF887` on the Open Campus Codex.

## DEPRECATED testquest.sol

> V 0.1: Register users and mint GOLD. 

The `testquest.sol` was the original first draft for TestQuestApp. The contract manages user registration and interaction with the GOLD token. It ensures that only authorized addresses can register new users and mint GOLD tokens for them.

### Key Features:
- **User Registration**: Allows authorized addresses to register new users.
- **Minting GOLD**: Mints a predefined amount of GOLD tokens for newly registered users.
- **Authorization**: Uses a modifier to restrict certain functions to authorized addresses only.

### Roles:
- **authorizedWallet**: The address that is authorized to register new users and mint GOLD tokens.

### Deployment:
- This contract was deployed and tested by Tippi at `0xbedc4032AAf4d431DD781128d48cFb6b95312244`.
- The contract interacts with the GOLD token contract deployed at `0xc2BC0B330D39F4380946a6bEAf951829B31FF887`.

## TestQuestApp.sol

> V 0.1: Register User and mint them GOLD
> V 0.2: Allow user to buy equipment from Equipment.sol
> V 0.3: Register User, mint GOLD, and handle equipment purchases
> V 0.4: Implement batch purchase discount and abstract repeated code

The `TestQuestApp.sol` contract extends the functionality of `testquest.sol` by adding equipment purchase capabilities and batch purchase discounts.

### Key Features:
- **User Registration**: Allows admin addresses to register new users.
- **Minting GOLD**: Mints a predefined amount of GOLD tokens for newly registered users.
- **Equipment Purchase**: Allows users to buy equipment using GOLD tokens.
- **Batch Purchase Discount**: Provides a 25% discount when purchasing all three equipment items of the same tier in one transaction.

### Roles:
- **ADMIN_ROLE**: The address that is authorized to perform administrative functions.
- **REGISTERED_USER_ROLE**: The address that is authorized to interact with the contract as a registered user.

### Deployment:
- The contract interacts with the GOLD token contract deployed at `0xc2BC0B330D39F4380946a6bEAf951829B31FF887`.

## Characters.sol

> V 0.1: Define and manage characters.

The `Characters.sol` contract is responsible for defining and managing characters within the TestQuest ecosystem. It allows for the creation of different character types with specific attributes and provides functionality to retrieve and update character information.

### Key Features:
- **Character Definition**: Allows the definition of various character types with attributes such as typeName, species, health, attack, magic, etc.
- **Character Management**: Provides functions to get and update character information.
- **Access Control**: Uses OpenZeppelin's AccessControl to manage roles and permissions.

### Roles:
- **DEFAULT_ADMIN_ROLE**: The default admin role, which has permission to grant and revoke other roles.
- **DEFINER_ROLE**: Addresses with this role can define new characters and update existing ones.

### Deployment:
- The contract is deployed at `[Deployed Address]` on the Open Campus Codex.

## Equipment.sol

> V 0.1: Define and manage equipment items. (In progress)

The `Equipment.sol` contract is responsible for defining and managing equipment items within the TestQuest ecosystem. It allows for the creation of different equipment items with specific attributes and provides functionality to retrieve and update equipment information. Note that this contract is still in progress at the time of writing.

### Key Features:
- **Equipment Definition**: Allows the definition of various equipment items with attributes such as itemId, tier costs, etc.
- **Equipment Management**: Provides functions to get and update equipment information.
- **Access Control**: Uses OpenZeppelin's AccessControl to manage roles and permissions.

### Roles:
- **DEFAULT_ADMIN_ROLE**: The default admin role, which has permission to grant and revoke other roles.
- **MINTER_ROLE**: Addresses with this role can mint new equipment items.

### Deployment:
- The contract is deployed at `[Deployed Address]` on the Open Campus Codex.

## Project Context

The TestQuest project aims to elevate learners and teachers by integrating AI-powered tests, games, and blockchain-enabled digital assets. The smart contracts play a crucial role in managing the in-game currency (GOLD), characters, equipment, and user interactions securely and transparently.

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

