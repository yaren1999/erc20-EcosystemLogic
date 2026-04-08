const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`🚀 Dağıtımı başlatan cüzdan: ${deployer.address}`);


  const INITIAL_SUPPLY = hre.ethers.parseEther("1000000"); 
  const Token = await hre.ethers.getContractFactory("SecureToken"); 
  const token = await Token.deploy(INITIAL_SUPPLY);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log(`📍 SecureToken Adresi: ${tokenAddress}`);

  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(tokenAddress);
  await marketplace.waitForDeployment();
  console.log(`📍 Marketplace Adresi: ${await marketplace.getAddress()}`);

  const Staking = await hre.ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(tokenAddress);
  await staking.waitForDeployment();
  console.log(`📍 Staking Adresi: ${await staking.getAddress()}`);

  const rewardPool = hre.ethers.parseEther("100000");
  await token.transfer(await staking.getAddress(), rewardPool);
  console.log(`💰 Staking kontratına ${hre.ethers.formatEther(rewardPool)} ödül tokenı aktarıldı.`);

  console.log("\n✅ Tüm ekosistem başarıyla kuruldu!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});