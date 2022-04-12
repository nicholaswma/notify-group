import React, { useState, useContext, useEffect } from "react";
import { Flex, Image, Text, Box, Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { AccountContext } from "../context";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import {
  requestAirdrop,
  checkOwner,
  getRequested,
  checkIfClaimed,
  approveAirdrop,
  updateRequested,
} from "../utils/Operations";

export default function Airdrop() {
  const account = useContext(AccountContext);
  let [isOwner, setIsOwner] = useState<boolean>(false);
  let [requested, setRequested] = useState<any[]>([]);
  let [claimed, setClaimed] = useState<boolean>(false);

  const getOwner = async () => {
    let owner = await checkOwner();
    setIsOwner(owner === account);
  };
  const getRequest = async () => {
    let request = await getRequested();
    setRequested(request);
  };
  const checkClaimed = async () => {
    if (account) {
      let claimed = await checkIfClaimed(account);
      setClaimed(claimed);
    }
  };
  const completeAirDrop = async (address: string) => {
    await updateRequested(address);
    await checkClaimed();
  };

  useEffect(() => {
    checkClaimed();
    getOwner();
  }, []);

  return (
    <Flex justifyContent="center">
      <Flex flexDir="column" justifyContent="center">
        <Box textAlign="center">
          <Text textAlign={"center"}>Claim Airdrop!</Text>
          <Button onClick={requestAirdrop} disabled={claimed}>
            Claim
          </Button>
          {isOwner ? (
            <>
              <Button onClick={getRequest}>Get Requested</Button>
              <Flex flexDir="column" padding="1em">
                {requested.map((ele, idx) => (
                  <Box border={"1px solid"} padding="1em">
                    <Text key={idx}>{ele}</Text>
                    <Button
                      onClick={() => {
                        completeAirDrop(ele);
                      }}
                    >
                      Complete
                    </Button>
                    <Button
                      onClick={() => {
                        approveAirdrop(ele);
                      }}
                    >
                      Approve Airdrop (As Owner)
                    </Button>
                  </Box>
                ))}
              </Flex>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
