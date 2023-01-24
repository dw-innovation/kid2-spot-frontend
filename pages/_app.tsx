import type { AppProps } from "next/app";
import Head from "next/head";
import "../src/styles/globals.css";
import "leaflet/dist/leaflet.css";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>KID2 Overpass Turbo Prototype</title>
      <meta name="description" content="KID2 Overpass Turbo Prototype" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
