// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IToken {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function transfer(address to, uint256 value) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Staking {
    IToken public token;
    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public stakingTimestamp;

    constructor(address _tokenAddress) {
        token = IToken(_tokenAddress);
    }

 
    function stake(uint256 amount) public {
        require(amount > 0, "Sifir miktar yatirilamaz");
        bool success = token.transferFrom(msg.sender, address(this), amount);
        require(success, "Stake islemi basarisiz");

        stakedBalance[msg.sender] += amount;
        stakingTimestamp[msg.sender] = block.timestamp; 
    }

    function calculateReward(address account) public view returns (uint256) {
        if (stakedBalance[account] == 0) return 0;
        
        uint256 timePassed = block.timestamp - stakingTimestamp[account];
        return (stakedBalance[account] * timePassed) / 100;
    }

    function withdraw() public {
        uint256 amount = stakedBalance[msg.sender];
        require(amount > 0, "Hic token kilitlememissiniz");
        uint256 reward = calculateReward(msg.sender);
        
        stakedBalance[msg.sender] = 0;
        stakingTimestamp[msg.sender] = 0;
        token.transfer(msg.sender, amount);
        token.transfer(msg.sender, reward);
    }
}