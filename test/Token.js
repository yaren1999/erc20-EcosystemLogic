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
});