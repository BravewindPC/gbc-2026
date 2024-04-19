import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import Head from "next/head";



export const metadata: Metadata = {
  icons: "/Logo.png",
  title: "GBC UBT 2024",
  description: "Ganesha Badminton Championship 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Head>
          <link rel="icon" href="/Logo.png" />
        </Head>
        <Navbar/>
          <div className="relative w-full min-h-screen bg-blueGray overflow-auto">
            <span className="relative z-10">{children}</span>
            <div className="absolute w-full h-full bottom-0 bg-top"></div>
            <div className="absolute w-full h-full bottom-0 aspect-[1/2] bg-cloud"></div>
            <div className="absolute w-full h-full bottom-0 bg-star"></div>
            <div className="absolute w-full h-full bottom-0 bg-blur"></div>
            <div className="absolute w-full h-full bottom-0 bg-blur2"></div>
          </div>
        <Footer/>
      </body>
    </html>
  );
}
