import React from "react";
import Image from "next/image";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();

  return (
    <Flex flexDir="column">
      <Flex justifyContent="center">
        <Image src="/Assets/logos/main.png" height="800px" width="800px" />
      </Flex>
      <Flex justifyContent="center">
        <Button onClick={() => router.push("/home")}>Enter</Button>
      </Flex>
    </Flex>
  );
}
