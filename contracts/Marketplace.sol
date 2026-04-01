// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IToken {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function balanceOf(address account) external view returns (uint256) ;
}

contract Marketplace {
    IToken public token;
    uint256 public itemPrice = 50; 
    mapping(address => uint256) public myInventory;

    constructor(address _tokenAddress) {
        token = IToken(_tokenAddress);
    }

    function buyItem() public {
        require(token.balanceOf(msg.sender) >= itemPrice, "Yetersiz bakiye");
        bool success = token.transferFrom(msg.sender, address(this), itemPrice);
        require(success, "Transfer basarisiz");

        myInventory[msg.sender] += 1;
    }
}