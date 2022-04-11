import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

export default function discord() {
  return (
    <>
      <Flex justifyContent="center">
        <Flex flexDir="column">
          <Image
            src="/Assets/logos/discord-logo.svg"
            width="200px"
            height="200px"
          ></Image>
          <Box width="150px" textAlign="center" justifyContent={"center"}>
            <Text>
              To gain membership to Discord, please be sure to mint an NFT
              Membership to NotifyGroup
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
