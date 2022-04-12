import React, { useContext, useState } from "react";
import Image from "next/image";
import { Box, Button, Flex, Link, Text, Spinner } from "@chakra-ui/react";

import { AccountContext } from "../context";

import { verifyNFT } from "../utils/Operations";
import discord from "../public/Assets/Logos/discord-logo.svg";

export default function Discord() {
  const account = useContext(AccountContext);
  const [own, setOwn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const verify = async () => {
    if (account) {
      setLoading(true);
      let request = await verifyNFT(account);

      setOwn(request);
      setLoading(false);
    }
  };

  return (
    <>
      <Flex justifyContent="center">
        <Flex flexDir="column">
          <Image
            src={discord}
            width="200px"
            height="200px"
            alt="discordlogo"
          ></Image>
          <Box
            width={"400px"}
            textAlign="center"
            justifyContent={"center"}
            margin="1em"
          >
            <Text marginBottom="1em">
              To gain membership to Discord, please be sure to mint an NFT
              Membership to NotifyGroup
            </Text>
            <Button
              onClick={verify}
              display={own ? "none" : "visible"}
              isDisabled={account ? false : true}
            >
              {loading ? <Spinner /> : "Verify NFT Ownership"}
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
