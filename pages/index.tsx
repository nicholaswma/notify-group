import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import EnterPage from "../components/EnterPage";

const Main: NextPage = () => {
  return (
    <Box height="100vh" bg="brand.900">
      <EnterPage />
    </Box>
  );
};

export default Main;
