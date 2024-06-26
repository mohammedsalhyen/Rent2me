import "@/styles/globals.css";
import "@/styles/aos.css"
import type { AppProps } from "next/app";
import { StateContext } from "@/context/StateContext";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rent2me</title>
        <link rel="icon" href="/asset/logo (2).png" />
      </Head>
      <StateContext>
            <Component {...pageProps} />
      </StateContext>
    </>
  );
}
