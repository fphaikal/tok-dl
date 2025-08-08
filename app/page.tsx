import React from 'react';
import Head from 'next/head';
import TikTokDownloader from '@/components/TikTokDownloader';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TokDL - TikTok Video Downloader',
    description: 'Download TikTok videos in HD quality for free. Fast, safe, and easy TikTok video downloader without watermark.',
    url: 'https://tokdl.vercel.app',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'TokDL Team',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
    },
    featureList: [
      'HD Video Download',
      'No Watermark',
      'Fast Processing',
      'Free to Use',
      'Mobile Friendly',
      'Secure Download'
    ]
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="canonical" href="https://tokdl.vercel.app" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:site" content="@tokdl" />
        <meta name="theme-color" content="#3b82f6" />
      </Head>
      
      <TikTokDownloader />

      {/* SEO Content Section */}
      <div className="w-full max-w-4xl mx-auto mt-16 px-4">
        <div className="backdrop-blur-xl bg-white/40 border border-white/60 shadow-lg rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Why Choose TokDL?</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span><strong>HD Quality Downloads</strong> - Get videos in highest quality available</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span><strong>No Watermark</strong> - Clean videos without TikTok watermark</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span><strong>100% Free</strong> - No hidden fees or subscriptions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span><strong>Fast &amp; Secure</strong> - Lightning fast downloads with secure processing</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">How to Use TokDL</h2>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <span>Copy the TikTok video URL from the app or website</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <span>Paste the URL in the input field above</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <span>Click &quot;Download Now&quot; and choose your preferred quality</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <span>Save the video to your device instantly</span>
                </li>
              </ol>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/30">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Is TokDL free to use?</h3>
                <p className="text-gray-700 text-sm">Yes, TokDL is completely free. No registration, no fees, no hidden charges.</p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">What video quality can I download?</h3>
                <p className="text-gray-700 text-sm">You can download videos in HD quality (up to 1080p) or standard quality based on the original video.</p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Do I need to install any software?</h3>
                <p className="text-gray-700 text-sm">No installation required. TokDL works directly in your web browser on any device.</p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Is it safe to use?</h3>
                <p className="text-gray-700 text-sm">Yes, TokDL is completely safe. We don&apos;t store your videos or personal information.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}