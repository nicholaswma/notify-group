import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function Account() {
  //get token balance
  //get nft ownership
  return (
    <>
      <Flex justifyContent="center">
        <Text fontSize="1.5rem" fontWeight={800}>
          Account Details
        </Text>
      </Flex>
      <Flex paddingX={"20em"} paddingTop="5em" justifyContent="space-around">
        <Text>MemberShip Status:</Text>
        <Text>Active</Text>
      </Flex>
      <Flex paddingX={"20em"} paddingTop="5em" justifyContent="space-around">
        <Text>NGT Token:</Text>
        <Text>200</Text>
      </Flex>
    </>
  );
}
