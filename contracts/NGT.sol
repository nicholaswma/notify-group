//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract NGToken is ERC20 {

    address public owner;
    mapping(address => bool) public claimed;

    constructor () ERC20("Notify Token", "NGT") {
        console.log("creating NGT");
        owner = msg.sender;
        _mint(msg.sender, 1000000000000000000000000);
    }
    function claimAirdrop(address to) public returns(bool) {
        require(!claimed[to], 'Already Claimed');
        transfer(to, 200000000000000000000);
        claimed[to] = true;
        return true;
    }
}

// 000000000000000000