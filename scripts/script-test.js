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
  let request = await nftContract
    .connect(address2, address2.address)
    .requestAirDrop();
  await request.wait();
  txn = await nftContract
    .connect(address3, address3.address)
    .mint({ value: 5000000000000000 });
  await txn.wait();
  request = await nftContract
    .connect(address3, address3.address)
    .requestAirDrop();
  await request.wait();
  txn = await nftContract
    .connect(address4, address4.address)
    .mint({ value: 5000000000000000 });
  await txn.wait();
  request = await nftContract
    .connect(address4, address4.address)
    .requestAirDrop();
  await request.wait();

  // console.log(txn);
  let getReq = await nftContract.getRequested();
  console.log(address4.address);
  let getIdx = await nftContract.index(address4.address);
  console.log(getIdx);
  let update = await nftContract.completeAirDrop(getIdx);
  await update.wait();
  getReq = await nftContract.getRequested();
  console.log(getReq);
  let remaining = await nftContract.getMintCount();
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
