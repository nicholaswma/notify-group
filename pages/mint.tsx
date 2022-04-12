import { Flex, Box, Text, Image, Button, Spinner } from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";
import { mintNFT, getRemaining } from "../utils/Operations";

export default function Mint() {
  const [remaining, setRemaining] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const update = async (): Promise<void> => {
    const { ethereum } = window;
    try {
      let val = await getRemaining();
      if (val) {
        setRemaining(parseInt(val));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const mint = async (): Promise<void> => {
    try {
      setLoading(true);
      let hash = await mintNFT();
      console.log("TXN: ", hash);
      setLoading(false);
      await update();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <Flex justifyContent="center">
      <Flex flexDir="column" justifyContent="center">
        <Image
          src="/Assets/nft-image.png"
          width="400px"
          height="auto"
          alt="nft"
        />
        <Box textAlign="center" width="400px">
          <Text textAlign={"center"}>
            Join NotifyGroup by minting a membership! 200 NGT Airdropped at mint
          </Text>
          <Text>{5000 - remaining}/5000 Remaining</Text>
        </Box>
        <Button onClick={mint}>{loading ? <Spinner /> : "Mint Now"}</Button>
      </Flex>
    </Flex>
  );
}
