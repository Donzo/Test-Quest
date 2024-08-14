# TestQuest Smart Contracts Overview

This document provides an overview of the smart contracts used in the TestQuest project for the EDUChain * Open Campus. These contracts are for empowering our Learners and Teachers with secure and decentralized management of digital assets and user interactions. We began by focusing on elevating the Learner experience, but hope to soon integrate features that empower Teachers with curated Quiz & Test sets, as well as custom GPT prompts.

### Deployed Addresses

Gold.sol: 0xc2BC0B330D39F4380946a6bEAf951829B31FF887
Equipment1155.sol: 0x8875054C87E0AD3848bd25e3e92d74147cC053fE
Characters.sol: 0xD46262fDaf22E4f252c3707f3440C67e8c1b28f9
TestQuestApp.sol: 0x1BB300F5A90cf8AaF4C11800883dEF22432912ee

## Gold.sol

> Our main incentive mechanism is actual fun in playing the game, it doesn't hurt that the in-game currency is also an ownable asset.  In-game and in TestQuestApp.sol, they can spend GOLD to buy more items, to improve their gameplay.

The `Gold.sol` contract is an ERC20 token contract that represents the in-game currency, GOLD. It is built using OpenZeppelin's ERC20, AccessControl, and ERC20Permit extensions to ensure security and flexibility.

### Key Features:
- **ERC20 Token**: Implements the standard ERC20 interface for fungible tokens.
- **Access Control**: Uses OpenZeppelin's AccessControl to manage roles and permissions.
- **ERC20 Permit**: Allows for gasless approvals using signatures?!
- **Minting**: The contract includes a mint function that can only be called by addresses with the MINTER_ROLE.

### Roles:
- **DEFAULT_ADMIN_ROLE**: The default admin role, which has permission to grant and revoke other roles. The deployed Gold v0.1 (0xc2BC0B330D39F4380946a6bEAf951829B31FF887 on Open Campus Codex) has Donzo and my two addresses added to this role.

- **MINTER_ROLE**: Addresses with this role can mint new GOLD tokens. Currently, only Donzo, Tippi, and the TestQuestApp.sol contract have the right to mint new GOLD tokens.

### Deployment:
- The contract is deployed at `0xc2BC0B330D39F4380946a6bEAf951829B31FF887` on the Open Campus Codex.


## [TestQuestApp.sol](TestQuestApp.sol)

> No new web3 user ever wants to go to a faucet to do their first transaction, so this app allows Donzo's backend wallet to send them an airdrop of EDU for gas, and GOLD for fun. Even though one of the most important UX features of the https://TestQuest.app experience is that a user doesn't need to do any transactions until after they've experienced the full flywheel of learning and playing.  They've already passed at least one Test (an AI generated customized quiz), received feedback, and played a Quest. When they are inevitably overwhelmed by the hordes of enemies, all the in-game Gold coins they collected are saved. They can spend that (and the gift GOLD we sent them) to purchase Equipment (ERC1155) upgrades, and they've already got gas in their wallet.

The `TestQuestApp.sol` contract provides decentralized Security and Purchasing through OpenZeppelin AccessControl and integration with `Gold.sol` and `Equipment1155.sol`.

### Key Features:
- **User Registration**: Allows admin addresses to register new users, sending them GOLD and EDU coin as a welcome gift.
- **Minting GOLD**: Mints a predefined amount of GOLD tokens for newly registered users.
- **Equipment Purchase**: Allows users to buy equipment using GOLD tokens.
- **Upgrade User Tier**: By collecting all the equipment of a tier, they can level up!

### Roles:
- **ADMIN_ROLE**: The address that is authorized to perform administrative functions.
- **REGISTERED_USER_ROLE**: The address that is authorized to interact with the contract as a registered user.

### Deployment:
- The contract interacts with the GOLD token contract deployed at `0xc2BC0B330D39F4380946a6bEAf951829B31FF887`.
- The contract interacts with the Equipment contract deployed at `0x8875054C87E0AD3848bd25e3e92d74147cC053fE`.

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
- The contract is deployed at `0xD46262fDaf22E4f252c3707f3440C67e8c1b28f9` on the Open Campus Codex.

## Equipment1155.sol

> We plan to expand the gameplay mechanics with additional items, bonuses, levels, etc, so Tippi built Equipment as an ERC1155. At the end of the day, we want to empower users with Learning and fun gameplay, but if they are bored or need money and can find someone to buy their gear, it's theirs to own.

The `Equipment1155.sol` contract is responsible for defining and managing equipment items within the TestQuest ecosystem. It allows for the creation of different equipment items with specific attributes and provides functionality to retrieve and update equipment information. ID 1-5 are Wands Tier 1-5, 6-10 Armor (x 5 tiers) and 11-15 Wings.

### Key Features:
- **Equipment Definition**: Allows the definition of various equipment items with attributes such as itemId, tier costs, etc.
- **Equipment Management**: Provides functions to get and update equipment information.
- **Access Control**: Uses OpenZeppelin's AccessControl to manage roles and permissions.
- **Minting**: Allows minting of single and multiple tokens.
- **URI Management**: Allows setting a new URI for all token types.

### Roles:
- **DEFAULT_ADMIN_ROLE**: The default admin role, which has permission to grant and revoke other roles.
- **MINTER_ROLE**: Addresses with this role can mint new equipment items.
- **URI_SETTER_ROLE**: Addresses with this role can set the URI for the equipment metadata.

### Deployment:
- The contract is deployed at `0x8875054C87E0AD3848bd25e3e92d74147cC053fE` on the Open Campus Codex.
- Progressively decentralize the metadata, first our Github, then our hosted server, then NFT.Storage etc
- originally the baseURI was: "https://raw.githubusercontent.com/Donzo/Test-Quest/main/code/sol/nft/" now it's "https://www.testquest.app/nft/".

## Project Context

The TestQuest project aims to elevate learners and teachers by integrating AI-powered tests, games, and blockchain-enabled digital assets. The smart contracts play a crucial role in managing the in-game currency (GOLD), characters, equipment, and user interactions securely and transparently.

## TODO List

1. **Feedback from You!**: Get feedback from the judges, coaches, and mentors at OpenCampus, HackQuest, and EDUChain about what you think!
2. **Enhance Security**: Conduct thorough security audits and implement additional security measures as needed.
3. **User Interface Integration**: Integrate the smart contracts with the frontend UI to provide a seamless user experience.
4. **Testing and Debugging**: Perform extensive testing of the tokenomics and debugging to ensure the contracts function as intended.

## [Past and Future Considerations](./thoughts.md)

1. **Scalability**: Explore solutions for scaling the smart contracts to handle a larger number of users and transactions.
2. **Interoperability**: Consider integrating with other blockchain networks and protocols to enhance the functionality and reach of the TestQuest ecosystem.
3. **Governance**: Implement a decentralized governance model to allow the community to participate in decision-making processes.
4. **New Features**: Continuously explore and implement new features to enhance the user experience and keep the project innovative.

By following this roadmap, we can ensure that the TestQuest project remains secure, scalable, and user-friendly, providing a valuable platform for learners and teachers alike.