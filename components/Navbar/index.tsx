import { Image, Flex, Button, HStack, chakra, Link } from "@chakra-ui/react";
import Logo from "../../public/Assets/Logos/main.png";

export default function index({ navigation, connect }: any) {
  return (
    <chakra.header>
      <Flex justifyContent="space-around" px="6" py="5">
        <Flex w="100%">
          <Image src={Logo.src} h="150px" />
        </Flex>
        <HStack as="nav" spacing="5" paddingRight={"20px"}>
          {navigation.map((item: string, i: number) => (
            <Link key={i}>
              {item === "Connect Wallet" ? (
                <Button variant="nav" onClick={connect}>
                  {item}
                </Button>
              ) : (
                <Button variant="nav"> {item} </Button>
              )}
            </Link>
          ))}
        </HStack>
      </Flex>
    </chakra.header>
  );
}
