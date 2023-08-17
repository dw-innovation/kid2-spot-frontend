import "@/styles/globals.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "allotment/dist/style.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>KID2 X</title>
      <meta name="description" content="KID2 X" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <Component {...pageProps} />
  </>
);

export default App;
