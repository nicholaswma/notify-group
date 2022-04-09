import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#D3D3D3",
    800: "#153e75",
    700: "#2a69ac",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({ colors });
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
