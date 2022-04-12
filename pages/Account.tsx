import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../context";

import { getBalanceOf, verifyNFT } from "../utils/Operations";

export default function Account() {
  //get token balance
  //get nft ownership
  const account = useContext(AccountContext);
  const [status, setStatus] = useState<boolean>(false);
  const [tokenBal, setTokenBal] = useState<number>(0);

  const balance = async () => {
    if (account) {
      let bal = await getBalanceOf(account);
      setTokenBal(bal);
    }
  };
  const nft = async () => {
    if (account) {
      let active = await verifyNFT(account);
      setStatus(active);
    }
  };

  useEffect(() => {
    nft();
    balance();
  }, []);
  return (
    <>
      <Flex justifyContent="center">
        <Text fontSize="1.5rem" fontWeight={800}>
          Account Details
        </Text>
      </Flex>
      <Flex paddingX={"20em"} paddingTop="5em" justifyContent="space-around">
        <Text>MemberShip Status:</Text>
        <Text>{status ? "Active" : "Not Active"}</Text>
      </Flex>
      <Flex paddingX={"20em"} paddingTop="5em" justifyContent="space-around">
        <Text>NGT Token:</Text>
        <Text>{tokenBal}</Text>
      </Flex>
    </>
  );
}
