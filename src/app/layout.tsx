import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import Head from "next/head";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const balmy = localFont({
  src: "./fonts/Balmy-Beta.ttf",
  display:"swap",
  variable:"--font-balmy",
})

const montserrat = localFont({
  src: "./fonts/Montserrat-Regular.ttf",
  display:"swap",
  variable:"--font-montserrat",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gbc-ubt-2024.vercel.app/'),
  title: {
    default: "GBC UBT 2024",
    template: `%s | GBC UBT 2024`
  },
  description:"Turnamen Ganesha Badminton Championship 2024 yang diadakan oleh Unit Bulu Tangkis ITB",
  keywords: [
    "gbc ubt",
    "gbc ubt 2024",
    "gbc ubt itb 2024",
    "gbc ubt itb",
    "gbc",
    "ubt",
    "GBC UBT 2024",
    "Ganesha Badminton Championsip",
    "GBC",
    "UBT",
    "GBC 2024",
  ],
  manifest: "https://gbc-ubt-2024.vercel.app/manifest.webmanifest",
  openGraph:{
    title: "GBC UBT 2024",
    description: "Turnamen Ganesha Badminton Championship 2024 yang diadakan oleh Unit Bulu Tangkis ITB",
    type: "website",
    locale: "en",
    url: "https://gbc-ubt-2024.vercel.app/",
    siteName: "GBC UBT 2024"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(montserrat.variable, balmy.variable)}>
      <body>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar/>
          <div className="relative w-full min-h-screen overflow-auto">
          <div className="absolute bg-colorr w-full h-full"></div>
            <span className="relative">{children}</span>
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
