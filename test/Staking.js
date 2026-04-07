const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking: Para Kilitleme", function () {
    let token, staking, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("SecureToken");
        token = await Token.deploy(10000); 

        const Staking = await ethers.getContractFactory("Staking");
        staking = await Staking.deploy(await token.getAddress());

        await token.transfer(await staking.getAddress(), 5000);
        await token.transfer(addr1.address, 200);
    });

    it("Kullanıcı token kilitleyebilmeli (Stake)", async function () {
        const stakingAddress = await staking.getAddress();
        await token.connect(addr1).approve(stakingAddress, 100);
        await staking.connect(addr1).stake(100);
       
        expect(await staking.stakedBalance(addr1.address)).to.equal(100);
        expect(await token.balanceOf(addr1.address)).to.equal(100);
    });

    it("Kullanıcı zaman geçtikçe ödül kazanmalı ve çekebilmeli", async function () {
        const stakingAddress = await staking.getAddress();
        await token.connect(addr1).approve(stakingAddress, 100);
        await staking.connect(addr1).stake(100);
        await ethers.provider.send("evm_increaseTime", [100]);
        await ethers.provider.send("evm_mine"); 
        await staking.connect(addr1).withdraw();

        const finalBalance = await token.balanceOf(addr1.address);
        expect(finalBalance).to.be.greaterThan(200); 
    });
});