const { expect } = require("chai");
const { ethers } = require("hardhat"); 

describe("Token Contract: Kimlik", function () {
    let token;

    beforeEach(async function () {
        const Token = await ethers.getContractFactory("Token");
        
        token = await Token.deploy();
        await token.waitForDeployment();
    });

    it("İsim ve Sembol doğru olmalı", async function () {
        const name = await token.name();
        const symbol = await token.symbol();

        expect(name).to.equal("Mytoken");
        expect(symbol).to.equal("MTK");
    });
});