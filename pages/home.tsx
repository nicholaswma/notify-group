import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";

const navigation: String[] = [
  "Mint",
  "Home",
  "Discord",
  "Marketplace",
  "Account",
  "Connect Wallet",
];

const Home: NextPage = () => {
  const connectWeb3Modal = () => {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
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
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box height="100vh" bg="brand.900">
      <Navbar navigation={navigation} connect={connect} />
    </Box>
  );
};

export default Home;
