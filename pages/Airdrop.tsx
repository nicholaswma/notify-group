import React, { useState, useContext, useEffect } from "react";
import { Flex, Image, Text, Box, Button } from "@chakra-ui/react";

import { AccountContext } from "../context";
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
      console.log(claimed);
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
          <Button onClick={requestAirdrop} disabled={claimed || !account}>
            Claim
          </Button>
          {isOwner ? (
            <>
              <Button onClick={getRequest}>Get Requested</Button>
              <Flex flexDir="column" padding="1em">
                {requested.map((ele, idx) => (
                  <Box border={"1px solid"} key={idx} padding="1em">
                    <Text>{ele}</Text>
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
