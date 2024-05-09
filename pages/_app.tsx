import "@/styles/globals.css";
import "@/styles/aos.css"
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Web3ContextProvider from "@/context/Web3ContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </ChakraProvider>
  );
}
