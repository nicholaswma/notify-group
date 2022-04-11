//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    uint256 public cost = 0.005 ether;
    mapping(address => bool) claimedAirDrop;
    address[] public requested;
    address public owner;

    Counters.Counter public _tokenIds;

    constructor() ERC721 ('Notify  test Group NFT', 'NOTIFY') {
        owner = msg.sender;
        console.log('Creating NOTIFY NFT');
    }

    function mint() public payable {
        // capacity capped at 5000
        require(_tokenIds.current() < 5001, 'Capacity reached');
        require(msg.value >= cost, 'no money');
        uint256 itemId = _tokenIds.current();
        claimedAirDrop[msg.sender] = false;
        _safeMint(msg.sender, itemId);
        _setTokenURI(itemId, 'data:application/json;base64,eyJuYW1lIjoiTk9USUZZIEdST1VQIE5GVCIsImRlc2NyaXB0aW9uIjoiMSB5ZWFyIG1lbWJlcnNoaXAgdG8gTm90aWZ5IENvb2sgR3JvdXAiLCJpbWFnZSI6Imh0dHBzOi8vaS5pbWd1ci5jb20vV2QybElwci5wbmcifQ==');
        _tokenIds.increment();
    }

    function requestAirDrop() public {
        require(claimedAirDrop[msg.sender] == false);
        requested.push(msg.sender);
    }

    function getRequested() public view returns(address[] memory) {
        require(msg.sender == owner);
        return requested;
    }

    function getMintCount() public view returns(uint) {
        return _tokenIds.current();
    }
}