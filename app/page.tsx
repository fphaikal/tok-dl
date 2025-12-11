'use client'

import React from 'react';
import TikTokDownloader from '@/components/TikTokDownloader';
import { FiDownload, FiShield, FiZap, FiSmartphone } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with TikTok Downloader */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <TikTokDownloader />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Why Choose <span className="gradient-text-blue">TokDL</span>?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The fastest and most reliable way to download your favorite TikTok videos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FiDownload className="w-6 h-6" />,
                title: 'HD Quality',
                description: 'Download videos in the highest quality available'
              },
              {
                icon: <FiShield className="w-6 h-6" />,
                title: 'No Watermark',
                description: 'Get clean videos without TikTok watermark'
              },
              {
                icon: <FiZap className="w-6 h-6" />,
                title: '100% Free',
                description: 'No hidden fees, no subscriptions required'
              },
              {
                icon: <FiSmartphone className="w-6 h-6" />,
                title: 'All Devices',
                description: 'Works on mobile, tablet and desktop'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:shadow-blue-400/30 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-8 text-center">
              How to <span className="gradient-text-blue">Download</span>
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Copy URL', description: 'Copy the TikTok video URL from the app' },
                { step: '2', title: 'Paste Link', description: 'Paste the URL in the input field above' },
                { step: '3', title: 'Click Download', description: 'Click Download Now button' },
                { step: '4', title: 'Save Video', description: 'Choose quality and save to your device' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-8 text-center">
            Frequently Asked <span className="gradient-text-blue">Questions</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: 'Is TokDL free to use?',
                answer: 'Yes, TokDL is completely free. No registration, no fees, no hidden charges.'
              },
              {
                question: 'What video quality can I download?',
                answer: 'You can download videos in HD quality (up to 1080p) or standard quality based on the original video.'
              },
              {
                question: 'Do I need to install any software?',
                answer: 'No installation required. TokDL works directly in your web browser on any device.'
              },
              {
                question: 'Is it safe to use?',
                answer: "Yes, TokDL is completely safe. We don't store your videos or personal information."
              }
            ].map((faq, index) => (
              <div key={index} className="glass-card p-6">
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}