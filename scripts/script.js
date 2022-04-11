const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("NFT");
  const tokenContractFactory = await hre.ethers.getContractFactory("NGToken");
  const nftContract = await nftContractFactory.deploy();
  const ngtContract = await tokenContractFactory.deploy();
  const [address1, address2, address3, address4] =
    await hre.ethers.getSigners();
  await nftContract.deployed();
  await ngtContract.deployed();
  console.log("NFT Contract deployed to:", nftContract.address);
  console.log("Token Contract deployed to:", ngtContract.address);

  let txn = await nftContract
    .connect(address2, address2.address)
    .mint({ value: 5000000000000000 });
  await txn.wait();
  console.log(txn);

  let remaining = await nftContract.getMintCount();
  console.log(remaining);
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
