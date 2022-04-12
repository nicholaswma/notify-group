import { ethers } from "ethers";
import NFT from "./ABI/NFT.json";
import NGT from "./ABI/NGToken.json";

// const NFTCon: string = "0xFe5255eeF9248F4871be993A20bd15387A4522A8";
// const NGTCon: string = "0xF4e9784aF87E2545f6dFd9a58E6Db3786d727ea0";
const NFTCon: string = "0xb8750bDda461cC12551Cb13E924E9d4329fdc3be";
const NGTCon: string = "0x09D29f77f2c082CE322F8eb94D803b6058Ee78dB";

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
      const index = await nftCon.index(address);
      console.log(index);
      let txn = await nftCon.completeAirDrop(index);
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
      console.log(ethers.utils.formatUnits(balance, 18));
      return ethers.utils.formatUnits(balance, 18);
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
      let verify = await verifyNFT(address);
      if (verify) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ngtCon = await new ethers.Contract(NGTCon, NGT.abi, signer);
        let claimed = await ngtCon.claimed(address);
        return claimed;
      }
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};
