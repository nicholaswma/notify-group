import { Flex, Box, Text, Image, Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../context";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
const NFTCon: string = "0xdf72c3098c6a69e1d1540a00432c4bd0d81a11cd";
const NGTCon: string = "0x2F1549B5E1bE74b8b4d6311858d3e25f7D9c82Bf";

export default function () {
  const [remaining, setRemaining] = useState<number>(0);
  const account = useContext(AccountContext);

  const getRemaining = async () => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftCon = new ethers.Contract(NFTCon, NFT.abi, signer);
        let remainder = await nftCon.getMintCount();
        remainder = remainder.toString();
        setRemaining(remainder);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const mint = async () => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftCon = new ethers.Contract(NFTCon, NFT.abi, signer);
        let txn = await nftCon.mint({ value: ethers.utils.parseEther("0.05") });
        await txn.wait();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRemaining();
  }, []);

  return (
    <Flex justifyContent="center">
      <Flex flexDir="column" justifyContent="center">
        <Image src="/Assets/nft-image.png" width="400px" height="auto" />
        <Box textAlign="center" width="400px">
          <Text textAlign={"center"}>
            Join NotifyGroup by minting a membership! 200 NGT Airdropped at mint
          </Text>
          <Text>{remaining}/5000 Remaining</Text>
        </Box>
        <Button onClick={mint}>Mint Now</Button>
      </Flex>
    </Flex>
  );
}
