'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Download, X, Loader2 } from "lucide-react";
import { FaPlay, FaCommentDots, FaShareAlt } from "react-icons/fa";
import TikTokImage from "@/components/TikTokImage";

interface VideoData {
  ai_dynamic_cover: string;
  title: string;
  duration: string;
  wmplay: string;
  hdplay: string;
  play_count: number;
  share_count: number;
  comment_count: number;
  author: {
    avatar: string;
    nickname: string;
    username: string;
  };
}

interface DownloadProgress {
  isDownloading: boolean;
  progress: number;
  fileName: string;
}

export default function TikTokDownloader() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<VideoData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress | null>(null)

  const handleResult = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error('Failed to fetch video data');

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to process the video. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetToSearch = () => {
    setResult(null);
    setUrl('');
    setError(null);
  };

  const cancelDownload = () => setDownloadProgress(null);

  const handleDownload = async (videoUrl: string, title: string, isHD: boolean = false) => {
    const fileName = `[TokDL] ${title}${isHD ? ' HD' : ''}.mp4`;

    setDownloadProgress({ isDownloading: true, progress: 0, fileName });

    try {
      // Use proxy API to bypass CORS restrictions
      const proxyUrl = `/api/download?url=${encodeURIComponent(videoUrl)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Network response was not ok');

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      let received = 0;

      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          chunks.push(value);
          received += value.length;

          if (total > 0) {
            setDownloadProgress(prev => prev ? {
              ...prev,
              progress: Math.round((received / total) * 100)
            } : null);
          }
        }
      }

      const blob = new Blob(chunks as BlobPart[]);
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);

      setDownloadProgress(prev => prev ? { ...prev, progress: 100 } : null);
      setTimeout(() => setDownloadProgress(null), 2000);
    } catch (err) {
      console.error('Download failed:', err);
      setDownloadProgress(null);
      setError('Download failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Download Progress Modal */}
      {downloadProgress && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Downloading...</h3>
              <button onClick={cancelDownload} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <X size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <div className="mb-3">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 truncate">{downloadProgress.fileName}</p>
              <Progress value={downloadProgress.progress} className="h-3" />
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 dark:text-slate-400">{downloadProgress.progress}% completed</span>
              {downloadProgress.progress === 100 && (
                <span className="text-green-600 dark:text-green-400 font-medium">✓ Complete!</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Form */}
      {!result && !loading && !error && (
        <div className="animate-fade-in">
          <div className="glass-card p-8 md:p-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-blue">TikTok</span>{' '}
              <span className="text-slate-800 dark:text-white">Video Downloader</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              Download TikTok videos in HD quality - Fast, Free & No Watermark
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Paste TikTok video URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleResult()}
                className="flex-1 h-14 px-6 rounded-2xl border-2 border-slate-200/50 dark:border-slate-600/50 bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 shadow-sm"
              />
              <Button
                onClick={handleResult}
                disabled={!url.trim()}
                className="h-14 px-10 gradient-button rounded-2xl text-white font-semibold text-lg shrink-0"
              >
                <Download className="mr-2" size={20} />
                Download
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="glass-card p-8 md:p-12 text-center animate-fade-in">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Processing Video</h2>
          <p className="text-slate-600 dark:text-slate-400">Please wait while we fetch your TikTok video...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="glass-card p-8 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Error</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
          <Button onClick={resetToSearch} className="gradient-button rounded-xl text-white px-6 py-2">
            Try Again
          </Button>
        </div>
      )}

      {/* Video Result */}
      {result && !loading && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                Video Ready for Download
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Click below to download your video
              </p>
            </div>
            <Button
              onClick={resetToSearch}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl"
            >
              New Search
            </Button>
          </div>

          <div className="glass-card p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Video Preview */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-9/16 max-w-[300px] mx-auto relative overflow-hidden rounded-2xl shadow-xl">
                  <TikTokImage
                    src={result.ai_dynamic_cover || '/placeholder.svg'}
                    alt={result.title || 'TikTok Video'}
                    width={300}
                    height={533}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Video Info */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 line-clamp-3">
                    {result.title || 'Untitled Video'}
                  </h3>

                  {/* Author */}
                  <div className="flex items-center gap-3 mb-4">
                    <TikTokImage
                      src={result.author?.avatar || '/placeholder.svg'}
                      alt={result.author?.nickname || 'Author'}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white">{result.author?.nickname}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">@{result.author?.username}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm mb-6">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <FaPlay className="text-blue-500" />
                      <span>{result.play_count?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <FaCommentDots className="text-green-500" />
                      <span>{result.comment_count?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <FaShareAlt className="text-orange-500" />
                      <span>{result.share_count?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                </div>

                {/* Download Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => handleDownload(result.wmplay, result.title, false)}
                    disabled={downloadProgress?.isDownloading}
                    className="w-full h-12 gradient-button rounded-xl text-white font-semibold"
                  >
                    <Download size={18} className="mr-2" />
                    Download Standard Quality
                  </Button>

                  <Button
                    onClick={() => handleDownload(result.hdplay, result.title, true)}
                    disabled={downloadProgress?.isDownloading}
                    className="w-full h-12 gradient-button-secondary rounded-xl text-white font-semibold"
                  >
                    <Download size={18} className="mr-2" />
                    Download HD Quality
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
