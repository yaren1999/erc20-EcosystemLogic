const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract: Arz ve Dağıtım", function () {
    let token;
    let owner; 
    const INITIAL_SUPPLY = 1000;

    beforeEach(async function () {
        const Token = await ethers.getContractFactory("Token");
        [owner] = await ethers.getSigners();
        token = await Token.deploy(INITIAL_SUPPLY);
        await token.waitForDeployment();
    });

    it("Toplam arz belirlenen rakama eşit olmalı", async function () {
        expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY);
    });

    it("Tüm para (Arz) kontratı kuran kişinin (Owner) cüzdanında olmalı", async function () {
        const ownerBalance = await token.balanceOf(owner.address);
        expect(ownerBalance).to.equal(INITIAL_SUPPLY);
    });

    it("Token transferi başarılı bir şekilde gerçekleşmeli", async function () {
        const [owner, addr1] = await ethers.getSigners();
        
        await token.transfer(addr1.address, 100);
      
        const addr1Balance = await token.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(100);

        const ownerBalance = await token.balanceOf(owner.address);
        expect(ownerBalance).to.equal(900);
    });
});