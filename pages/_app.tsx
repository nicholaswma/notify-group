import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useState } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import Navbar from "../components/Navbar";
import { AccountContext } from "../context";

const colors = {
  brand: {
    900: "#D3D3D3",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const navigation: String[] = ["Mint", "Airdrop", "Discord", "Account"];

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({ colors });
  const [account, setAccount] = useState<any>(null);
  const connectWeb3Modal = () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "017bb1607b9742aebf2fa5a5f4f9eac5",
          },
        },
      },
    });
    return web3Modal;
  };
  const connect = async () => {
    try {
      const web3Modal = await connectWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ChakraProvider theme={theme}>
      <AccountContext.Provider value={account}>
        <Box height="100vh" bg="brand.900">
          <Navbar navigation={navigation} connect={connect} account={account} />
          <Component {...pageProps} />
        </Box>
      </AccountContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
