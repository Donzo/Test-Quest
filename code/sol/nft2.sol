// Deployed and mainly untested on Open Campus Codex at 0xba8D8fC1000C0Ff895F4534ba7498BE649e64b03
/*
Working functions:
- Mint seems to work, not sure how to verify its in the wallet
*/
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CharacterNFT is ERC721, AccessControl {
    using Strings for uint256;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    struct Character {
        string typeName;
        string species;
        string imageAltText;
        uint256 health;
        uint256 fly;
        uint8 attack;
        uint8 magic;
        uint8 range;
        uint8 defense;
        uint8 tier;
    }

    mapping(uint256 => Character) public characters;
    uint256 public currentTokenId;

    constructor(address defaultAdmin, address minter) ERC721("CharacterNFT", "CNFT") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, minter);
        currentTokenId = 0;
    }

    function mint(
        address to,
        string memory typeName,
        string memory species,
        string memory imageAltText,
        uint256 health,
        uint256 fly,
        uint8 attack,
        uint8 magic,
        uint8 range,
        uint8 defense,
        uint8 tier
    ) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = currentTokenId;
        characters[tokenId] = Character({
            typeName: typeName,
            species: species,
            imageAltText: imageAltText,
            health: health,
            fly: fly,
            attack: attack,
            magic: magic,
            range: range,
            defense: defense,
            tier: tier
        });
        _safeMint(to, tokenId);
        currentTokenId++;
    }

    function updateCharacterStats(
        uint256 tokenId,
        uint256 health,
        uint256 fly,
        uint8 attack,
        uint8 magic,
        uint8 range,
        uint8 defense
    ) public onlyRole(MINTER_ROLE) {
        // require(ERC721._exists(tokenId), "Update for nonexistent token");
        Character storage character = characters[tokenId];
        character.health = health;
        character.fly = fly;
        character.attack = attack;
        character.magic = magic;
        character.range = range;
        character.defense = defense;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        // require(ERC721._exists(tokenId), "URI query for nonexistent token");

        Character memory character = characters[tokenId];
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name":"', character.typeName,
                        '","description":"A unique character in the game"',
                        ',"attributes":[{"trait_type":"Attack","value":', uint2str(character.attack),
                        '},{"trait_type":"Magic","value":', uint2str(character.magic),
                        '},{"trait_type":"Range","value":', uint2str(character.range),
                        '},{"trait_type":"Defense","value":', uint2str(character.defense),
                        '},{"trait_type":"Health","value":', uint2str(character.health),
                        '},{"trait_type":"Fly","value":', uint2str(character.fly),
                        '},{"trait_type":"Species","value":"', character.species,
                        '"},{"trait_type":"Tier","value":', uint2str(character.tier),
                        '}],"image":"', character.imageAltText, '"}'
                    )
                )
            )
        );
        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

// Base64 library for encoding
library Base64 {
    bytes internal constant TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    function encode(bytes memory data) internal pure returns (string memory) {
        if (data.length == 0) return "";

        // load the table into memory
        bytes memory table = TABLE;

        // multiply by 4/3 rounded up
        uint256 encodedLen = 4 * ((data.length + 2) / 3);

        // add some extra buffer at the end required for the writing
        bytes memory result = new bytes(encodedLen + 32);

        assembly {
            // set the actual output length
            mstore(result, encodedLen)

            // prepare the lookup table
            let tablePtr := add(table, 1)

            // input ptr
            let dataPtr := data
            let endPtr := add(dataPtr, mload(data))

            // result ptr, jump over length
            let resultPtr := add(result, 32)

            // run over the input, 3 bytes at a time
            for {} lt(dataPtr, endPtr) {

            } {
                dataPtr := add(dataPtr, 3)

                // read 3 bytes
                let input := mload(dataPtr)

                // write 4 characters
                mstore(resultPtr, shl(232, mload(add(tablePtr, and(shr(18, input), 0x3F)))))
                resultPtr := add(resultPtr, 1)
                mstore(resultPtr, shl(232, mload(add(tablePtr, and(shr(12, input), 0x3F)))))
                resultPtr := add(resultPtr, 1)
                mstore(resultPtr, shl(232, mload(add(tablePtr, and(shr(6, input), 0x3F)))))
                resultPtr := add(resultPtr, 1)
                mstore(resultPtr, shl(232, mload(add(tablePtr, and(input, 0x3F)))))
                resultPtr := add(resultPtr, 1)
            }

            // padding with '='
            switch mod(mload(data), 3)
            case 1 { mstore(sub(resultPtr, 2), shl(240, 0x3d3d)) }
            case 2 { mstore(sub(resultPtr, 1), shl(248, 0x3d)) }
        }

        return string(result);
    }
}