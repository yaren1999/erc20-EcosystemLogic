const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SecureToken: Detaylı Fonksiyon Testleri", function () {
    let token, owner, addr1, addr2;
    const INITIAL_SUPPLY = ethers.parseEther("1000");

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("SecureToken");
        token = await Token.deploy(INITIAL_SUPPLY);
    });

    describe("1. Yetkilendirme (Ownable) Testleri", function () {
        it("Kontratın sahibi (owner) doğru atanmalı", async function () {
            expect(await token.owner()).to.equal(owner.address);
        });

        it("Sahibi olmayan biri mint yapmaya çalışırsa hata vermeli", async function () {
            const mintAmount = ethers.parseEther("500");
            await expect(
                token.connect(addr1).mint(addr1.address, mintAmount)
            ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
        });
    });

    describe("2. Mint (Para Basma) Testleri", function () {
        it("Patron yeni token basabilmeli", async function () {
            const mintAmount = ethers.parseEther("500");
            await token.mint(addr1.address, mintAmount);
            
            expect(await token.balanceOf(addr1.address)).to.equal(mintAmount);
            expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY + mintAmount);
        });
    });

    describe("3. Burn (Para Yakma) Testleri", function () {
        it("Kullanıcı kendi tokenlarını yakabilmeli", async function () {
            const burnAmount = ethers.parseEther("100");
            await token.burn(burnAmount);

            expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY - burnAmount);
        });

        it("Bakiye yetersizse yakma işlemi hata vermeli", async function () {
            const highAmount = ethers.parseEther("2000"); 
            await expect(
                token.connect(addr1).burn(highAmount)
            ).to.be.reverted; 
        });
    });
});