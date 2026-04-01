const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace: Satın Alma Testi", function () {
    let token, marketplace, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy(1000); 

        const Marketplace = await ethers.getContractFactory("Marketplace");
        marketplace = await Marketplace.deploy(await token.getAddress());

        await token.transfer(addr1.address, 100);
    });

    it("Müşteri ürün satın alabilmeli", async function () {
       
        await token.connect(addr1).approve(await marketplace.getAddress(), 50);
        await marketplace.connect(addr1).buyItem();

        expect(await marketplace.myInventory(addr1.address)).to.equal(1);
        expect(await token.balanceOf(addr1.address)).to.equal(50);
    });
});