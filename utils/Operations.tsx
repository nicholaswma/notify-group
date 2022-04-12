import { ethers } from "ethers";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NGT from "../artifacts/contracts/NGT.sol/NGToken.json";

const NFTCon: string = "0xdf72c3098c6a69e1d1540a00432c4bd0d81a11cd";
const NGTCon: string = "0x2F1549B5E1bE74b8b4d6311858d3e25f7D9c82Bf";

export const requestAirdrop = async () => {
  const { ethereum } = window;
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftCon = new ethers.Contract(NFTCon, NFT.abi, signer);
      let request = await nftCon.requestAirDrop();
      console.log("requesting....");
      await request.wait();
      console.log("requested, tx:", request.hash);
    }
  } catch (err) {
    console.log(err);
  }
};

export const checkOwner = async () => {
  const { ethereum } = window;
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftCon = await new ethers.Contract(NFTCon, NFT.abi, signer);
      let owner = await nftCon.owner();
      return owner;
    }
  } catch (err) {
    console.log(err);
  }
};

export const approveAirdrop = async (address: string) => {
  const { ethereum } = window;
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const ngtCon = await new ethers.Contract(NGTCon, NGT.abi, signer);
      let txn = await ngtCon.claimAirdrop(address);
      console.log("requesting....");
      await txn.wait();
      console.log("TXN Approved: ", txn.hash);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getRequested = async (): Promise<string[] | any> => {
  const { ethereum } = window;
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftCon = await new ethers.Contract(NFTCon, NFT.abi, signer);
      let requested = await nftCon.getRequested();
      return requested;
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const updateRequested = async (address: string): Promise<void> => {
  const { ethereum } = window;
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftCon = await new ethers.Contract(NFTCon, NFT.abi, signer);
      const index = await nftCon.index[address];
      let txn = await nftCon.completeAirdDrop(index);
      console.log("updating Array");
      await txn.wait();
      console.log("completed...", txn.hash);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getBalanceOf = async (address: string): Promise<number | any> => {
  const { ethereum } = window;
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const ngtCon = await new ethers.Contract(NGTCon, NGT.abi, signer);
      let balance = await ngtCon.balanceOf(address);
      //need to format here
      return balance;
    }
  } catch (err) {
    console.log(err);
  }
};

export const verifyNFT = async (address: string): Promise<boolean | any> => {
  const { ethereum } = window;
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftCon = await new ethers.Contract(NFTCon, NFT.abi, signer);
      let balance = await nftCon.balanceOf(address);
      return balance >= 1;
    }
  } catch (err: any) {
    return err.message;
  }
};

export const mintNFT = async (): Promise<boolean | any> => {
  const { ethereum } = window;
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftCon = new ethers.Contract(NFTCon, NFT.abi, signer);
      let txn = await nftCon.mint({ value: ethers.utils.parseEther("0.05") });
      await txn.wait();
      return txn.hash;
    }
  } catch (err: any) {
    return err.message;
  }
};

export const getRemaining = async (): Promise<string | void> => {
  const { ethereum } = window;
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftCon = new ethers.Contract(NFTCon, NFT.abi, signer);
      let remainder = await nftCon.getMintCount();
      return remainder.toString();
    }
  } catch (err) {
    console.log(err);
  }
};

export const checkIfClaimed = async (
  address: string
): Promise<number | any> => {
  const { ethereum } = window;
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const ngtCon = await new ethers.Contract(NGTCon, NGT.abi, signer);
      let claimed = await ngtCon.claimed(address);
      return claimed;
    }
  } catch (err) {
    console.log(err);
  }
};
