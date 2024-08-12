// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Characters is AccessControl {
    bytes32 public constant DEFINER_ROLE = keccak256("DEFINER_ROLE");

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
        uint8 typeId;
    }

    mapping(uint8 => Character) public definedCharacters;

    Character public wizard = Character({
        typeName: "Wizard",
        species: "Coin",
        imageAltText: "A coin wizard with a staff of one",
        health: 100,
        fly: 10,
        attack: 1,
        magic: 20,
        range: 10,
        defense: 5,
        tier: 1,
        typeId: 1
    });

    Character public warrior = Character({
        typeName: "Warrior",
        species: "Ape",
        imageAltText: "An ape warrior with a sword and shield",
        health: 100,
        fly: 5,
        attack: 20,
        magic: 1,
        range: 1,
        defense: 20,
        tier: 1,
        typeId: 2
    });

    Character public archer = Character({
        typeName: "Archer",
        species: "Elf",
        imageAltText: "An elf archer with a bow and arrow",
        health: 100,
        fly: 10,
        attack: 10,
        magic: 5,
        range: 20,
        defense: 10,
        tier: 1,
        typeId: 3
    });

    mapping(address => uint8) public currentCharacter;

    constructor() {
        definedCharacters[1] = wizard;
        definedCharacters[2] = warrior;
        definedCharacters[3] = archer;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DEFINER_ROLE, msg.sender);
    }

    function getCharacter(address user) public view returns (Character memory) {
        uint8 characterId = currentCharacter[user];
        if (characterId == 1) {
            return wizard;
        } else if (characterId == 2) {
            return warrior;
        } else if (characterId == 3) {
            return archer;
        } else if (characterId == 0) {
            return Character({
                typeName: "None",
                species: "None",
                imageAltText: "No character selected",
                health: 0,
                fly: 0,
                attack: 0,
                magic: 0,
                range: 0,
                defense: 0,
                tier: 0,
                typeId: 0
            });
        }
    }

    function defineCharacter(
        uint8 typeId,
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
    ) public onlyRole(DEFINER_ROLE) {
        definedCharacters[typeId] = Character({
            typeName: typeName,
            species: species,
            imageAltText: imageAltText,
            health: health,
            fly: fly,
            attack: attack,
            magic: magic,
            range: range,
            defense: defense,
            tier: tier,
            typeId: typeId
        });
    }
}
