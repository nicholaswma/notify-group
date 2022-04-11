import { Image, Flex, Button, HStack, chakra, Link } from "@chakra-ui/react";
import Logo from "../../public/Assets/Logos/main.png";
import { useRouter } from "next/router";

export default function index({ navigation, connect, account }: any) {
  const router = useRouter();
  return (
    <chakra.header>
      <Flex justifyContent="space-around" px="6" py="5">
        <Flex w="100%">
          <Image src={Logo.src} h="150px" />
        </Flex>
        <HStack as="nav" spacing="5" paddingRight={"20px"}>
          {navigation.map((item: string, i: number) => (
            <Link key={i}>
              <Button
                variant="nav"
                onClick={() => {
                  router.push(`/${item}`);
                }}
              >
                {item}
              </Button>
            </Link>
          ))}
          <Link>
            {account ? (
              <Button variant="nav">{account}</Button>
            ) : (
              <Button variant="nav" onClick={connect}>
                Connect Wallet
              </Button>
            )}
          </Link>
        </HStack>
      </Flex>
    </chakra.header>
  );
}
