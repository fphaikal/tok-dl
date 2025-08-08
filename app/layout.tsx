import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import "./globals.css";
import Navbar from "@/components/navbar";
import Head from "next/head";
import Script from "next/script";

const poppins = Poppins({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://tokdl.vercel.app'),
  title: "TokDL - TikTok Video Downloader HD | Download TikTok Videos Free",
  description: "Download TikTok videos in HD quality for free. Fast, safe, and easy TikTok video downloader without watermark. Save TikTok videos instantly to your device.",
  keywords: [
    "TikTok downloader",
    "download TikTok video",
    "TikTok video downloader HD",
    "free TikTok downloader",
    "TikTok no watermark",
    "save TikTok video",
    "TikTok MP4 download",
    "TikTok video saver",
    "download video TikTok",
    "TikTok downloader online"
  ],
  authors: [{ name: "TokDL Team" }],
  creator: "TokDL",
  publisher: "TokDL",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tokdl.vercel.app',
    siteName: 'TokDL - TikTok Video Downloader',
    title: 'TokDL - Download TikTok Videos in HD Quality Free',
    description: 'Fast and free TikTok video downloader. Download TikTok videos in HD quality without watermark. Safe, secure, and easy to use.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'TokDL - TikTok Video Downloader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TokDL - Download TikTok Videos HD Free',
    description: 'Fast and free TikTok video downloader. Download videos in HD quality without watermark.',
    images: ['/og-image.svg'],
    creator: '@tokdl',
  },
  alternates: {
    canonical: 'https://tokdl.vercel.app',
  },
  verification: {
    google: '4Xd2Ovxlgo5M1oEwPzz0CbHiP7-JozMr7kVZQ6t5_Es',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="google-adsense-account" content="ca-pub-5378094744483048" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TokDL" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'TokDL - TikTok Video Downloader',
              url: 'https://tokdl.vercel.app',
              description: 'Download TikTok videos in HD quality for free. Fast, safe, and easy TikTok video downloader without watermark.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://tokdl.vercel.app/?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              },
              author: {
                '@type': 'Organization',
                name: 'TokDL Team'
              }
            })
          }}
        />
      </Head>
      
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <body
        className={`${poppins.className} antialiased`}
      >
        <Navbar />
        <main>
          {children}
        </main>

        <footer className="backdrop-blur-lg bg-white/70 border-t border-white/20">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:max-w-4xl xl:max-w-6xl mx-auto py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  TokDL
                </span>
              </div>
              
              <div className="text-sm text-blue-900/70">
                &copy; {new Date().getFullYear()} TokDL. All rights reserved.
              </div>
              
              <div className="flex gap-3">
                <a href="#" className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
