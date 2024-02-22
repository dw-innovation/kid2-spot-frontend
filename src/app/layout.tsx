import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "allotment/dist/style.css";
import "react-toastify/dist/ReactToastify.css";
import "react-resizable/css/styles.css";

import { type Viewport, Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "black",
};

export const metadata: Metadata = {
  title: "Spot - The easy way to find locations",
  description:
    "Spot is a tool for finding combinations of objects in the public space world-wide.",
  icons: [
    {
      url: "/icon?<generated>",
      sizes: "32x32",
      type: "image/png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
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
