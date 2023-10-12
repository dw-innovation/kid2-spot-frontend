import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "allotment/dist/style.css";
import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

import { ToastContainer } from "react-toastify";

import ErrorAlert from "@/components/ErrorAlert";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/png"
          sizes="32x32"
        />
      </Head>
      <body>
        <ErrorAlert />
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
        {children}
      </body>
    </html>
  );
}
