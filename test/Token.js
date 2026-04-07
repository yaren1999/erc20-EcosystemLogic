const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract: Arz ve Dağıtım", function () {
    let token, owner, addr1;
    const INITIAL_SUPPLY = ethers.parseEther("1000");

   beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        
        const Token = await ethers.getContractFactory("SecureToken");  
        token = await Token.deploy(INITIAL_SUPPLY); 
    });

    it("Toplam arz belirlenen rakama eşit olmalı", async function () {
        expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY);
    });

    it("Tüm para (Arz) kontratı kuran kişinin (Owner) cüzdanında olmalı", async function () {
        const ownerBalance = await token.balanceOf(owner.address);
        expect(ownerBalance).to.equal(INITIAL_SUPPLY);
    });

    it("Token transferi başarılı bir şekilde gerçekleşmeli", async function () {
        const transferAmount = ethers.parseEther("100");
        await token.transfer(addr1.address, transferAmount);
        
        expect(await token.balanceOf(addr1.address)).to.equal(transferAmount);
    });
});