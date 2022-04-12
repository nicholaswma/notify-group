const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("NFT");
  const tokenContractFactory = await hre.ethers.getContractFactory("NGToken");
  const nftContract = await nftContractFactory.deploy();
  const ngtContract = await tokenContractFactory.deploy();
  await nftContract.deployed();
  await ngtContract.deployed();
  console.log("NFT Contract deployed to:", nftContract.address);
  console.log("Token Contract deployed to:", ngtContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
