import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import "./globals.css";
import Navbar from "@/components/navbar";
import Head from "next/head";

const poppins = Poppins({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TokDL",
  description: "Tiktok HD Video Downloader",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5378094744483048"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body
        className={`${poppins.className} antialiased`}
      >
        <Navbar />
        {children}

        <footer className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl mx-auto p-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="text-center">
              &copy; 2024 TokDL. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
