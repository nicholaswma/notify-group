import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { verifyNFT } from "../utils/Operations";
import { AccountContext } from "../context";

export default function Discord() {
  const account = useContext(AccountContext);
  const [own, setOwn] = useState(false);
  const verify = async () => {
    if (account) {
      let request = await verifyNFT(account);
      setOwn(request);
    }
  };

  return (
    <>
      <Flex justifyContent="center">
        <Flex flexDir="column">
          <Image
            src="/Assets/logos/discord-logo.svg"
            width="200px"
            height="200px"
            alt="discordlogo"
          ></Image>
          <Box width="150px" textAlign="center" justifyContent={"center"}>
            <Text>
              To gain membership to Discord, please be sure to mint an NFT
              Membership to NotifyGroup
            </Text>
            <Button onClick={verify}>
              {own ? "Verified!" : "Verify NFT Ownership"}
            </Button>
            {own ? (
              <Link href="https://discord.com" isExternal>
                <Button>Join Discord</Button>
              </Link>
            ) : (
              <></>
            )}
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
