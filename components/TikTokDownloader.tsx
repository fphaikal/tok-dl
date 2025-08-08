'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Download, X } from "lucide-react";
import { FaPlay, FaCommentDots, FaShareAlt } from "react-icons/fa";
import TikTokImage from "@/components/TikTokImage";

interface data {
  ai_dynamic_cover: string,
  title: string,
  duration: string,
  wmplay: string,
  hdplay: string,
  play_count: number,
  share_count: number,
  comment_count: number,
  author: {
    avatar: string,
    nickname: string,
    username: string
  }
}

interface DownloadProgress {
  isDownloading: boolean;
  progress: number;
  fileName: string;
  downloadId: string;
}

interface TikTokDownloaderProps {
  initialUrl?: string;
}

export default function TikTokDownloader({ initialUrl = '' }: TikTokDownloaderProps) {
  const [url, setUrl] = useState(initialUrl)
  const [result, setResult] = useState<data | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress | null>(null);

  const handleResult = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch video data');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
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

  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const cancelDownload = () => {
    setDownloadProgress(null);
  };

  const handleDownload = async (videoUrl: string, title: string, isHD: boolean = false) => {
    const fileName = `[TokDL] ${title}${isHD ? ' HD' : ''}.mp4`;
    const downloadId = Date.now().toString();
    
    setDownloadProgress({
      isDownloading: true,
      progress: 0,
      fileName,
      downloadId
    });

    try {
      const response = await fetch(videoUrl);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

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
            const progress = (received / total) * 100;
            setDownloadProgress(prev => prev ? {
              ...prev,
              progress: Math.round(progress)
            } : null);
          }
        }
      }

      // Create blob and download
      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      // Complete download
      setDownloadProgress(prev => prev ? {
        ...prev,
        progress: 100
      } : null);

      // Hide progress after 2 seconds
      setTimeout(() => {
        setDownloadProgress(null);
      }, 2000);

    } catch (error) {
      console.error('Download failed:', error);
      setDownloadProgress(null);
      setError('Download failed. Please try again.');
    }
  };

  if (loading) return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:max-w-4xl xl:max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <div className="backdrop-blur-xl bg-white/60 border border-white/80 shadow-lg rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-r-blue-400 animate-ping"></div>
          </div>
        </div>
        <h2 className="text-xl font-bold text-blue-900 mb-2">Processing Video</h2>
        <p className="text-gray-600">Please wait while we fetch your TikTok video...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:max-w-4xl xl:max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <div className="backdrop-blur-xl bg-white/60 border border-white/80 shadow-lg rounded-2xl p-8 max-w-md">
        <div className="text-red-500 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <Button onClick={handleReload} className="mt-4 bg-blue-500 hover:bg-blue-600">Try Again</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:max-w-4xl xl:max-w-6xl mx-auto py-12 flex flex-col items-center justify-center min-h-[80vh] gap-8">
      {/* Download Progress Modal */}
      {downloadProgress && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="backdrop-blur-xl bg-white/90 border border-white/80 shadow-xl rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-900">Downloading...</h3>
              <button 
                onClick={cancelDownload}
                className="p-1 rounded-full hover:bg-blue-100 transition-colors"
              >
                <X size={20} className="text-blue-600" />
              </button>
            </div>
            
            <div className="mb-3">
              <p className="text-sm text-blue-700 mb-2 truncate">{downloadProgress.fileName}</p>
              <Progress value={downloadProgress.progress} className="h-3 bg-blue-100" />
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-blue-700">{downloadProgress.progress}% completed</span>
              {downloadProgress.progress === 100 && (
                <span className="text-green-600 font-medium">✓ Download Complete!</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Form - Only show when no result */}
      {!result && (
        <div className="w-full max-w-2xl" style={{animation: 'float 4s ease-in-out infinite'}}>
          <div className="backdrop-blur-xl bg-white/60 border border-white/80 shadow-lg rounded-2xl p-8 text-center">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-sky-500 mb-6">
              TikTok Video Downloader
            </h1>
            <p className="text-gray-600 mb-6">Paste a TikTok video URL to download in HD quality</p>
            <div className="flex flex-col gap-3 w-full">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="https://www.tiktok.com/@username/video/1234567890"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-center backdrop-blur-sm bg-white/70"
                />
              </div>
              <Button 
                onClick={handleResult} 
                className="relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl py-3 text-white font-medium"
                disabled={!url.trim() || loading}
              >
                <span className="relative z-10">
                  {loading ? 'Processing...' : 'Download Now'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Video Result - Show when result exists */}
      {result && (
        <div className="w-full max-w-4xl" style={{animation: 'fadeIn 0.5s ease-in-out'}}>
          {/* Header with Reset Button */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-sky-500">
                Video Ready for Download
              </h1>
              <p className="text-gray-600 text-sm mt-1">Click below to download your video</p>
            </div>
            <Button 
              onClick={resetToSearch}
              className="relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 rounded-xl py-2 px-4 text-white font-medium flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">New Search</span>
              <span className="sm:hidden">Reset</span>
            </Button>
          </div>

          <div className="backdrop-blur-xl bg-white/60 border border-white/80 shadow-lg rounded-2xl p-8 mb-4">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex flex-col gap-6 w-full lg:w-1/2">
                <div className="w-full aspect-square md:max-w-[300px] mx-auto relative overflow-hidden rounded-2xl shadow-xl">
                  <TikTokImage
                    src={result.ai_dynamic_cover || '/placeholder-avatar.svg'}
                    alt={result.title || 'TikTok Video'}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="backdrop-blur-sm bg-white/50 border border-white/70 p-6 rounded-xl shadow-sm">
                  {/* Debug: Caption Display */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-blue-900 leading-relaxed break-words">{result.title}</h3>
                    {!result.title && <p className="text-red-500 text-sm">⚠️ No title found</p>}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <TikTokImage
                        src={result.author?.avatar || '/placeholder-avatar.svg'}
                        alt={result.author?.nickname || 'Author'}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-blue-800">{result.author?.nickname}</p>
                        <p className="text-xs text-gray-500">@{result.author?.username}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaPlay className="text-blue-500" />
                      <span>{result.play_count?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCommentDots className="text-green-500" />
                      <span>{result.comment_count?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaShareAlt className="text-orange-500" />
                      <span>{result.share_count?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-4">
                <div className="backdrop-blur-sm bg-white/50 border border-white/70 p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Download className="text-blue-600" size={24} />
                    Download Options
                  </h3>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={() => handleDownload(result.wmplay, result.title, false)}
                      className="w-full relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 rounded-xl py-3 text-white font-medium flex items-center justify-center gap-2"
                    >
                      <Download size={18} />
                      Download Standard Quality
                    </Button>
                    
                    <Button 
                      onClick={() => handleDownload(result.hdplay, result.title, true)}
                      className="w-full relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 rounded-xl py-3 text-white font-medium flex items-center justify-center gap-2"
                    >
                      <Download size={18} />
                      Download HD Quality
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
