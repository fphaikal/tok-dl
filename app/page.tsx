'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import TikTokImage from "@/components/TikTokImage";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Download, X } from "lucide-react";
import { FaPlay, FaCommentDots, FaShareAlt } from "react-icons/fa";

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
    unique_id: string,
    nickname: string,
    avatar: string,
  }
}

interface DownloadProgress {
  isDownloading: boolean;
  progress: number;
  fileName: string;
  downloadId: string;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<data | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when returning to search
  useEffect(() => {
    if (!result && inputRef.current) {
      inputRef.current.focus();
    }
  }, [result]);

  const handleResult = async () => {
    if (!url.trim()) {
      setError("Please enter a TikTok URL");
      return;
    }
    
    if (!url.includes('tiktok.com')) {
      setError("Please enter a valid TikTok URL");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/v1`, {
        method: "POST",
        body: JSON.stringify({ url, hd: 1 }),
      });

      const data = await response.json();
      if (data.msg !== "success") {
        setError(data.error || "An error occurred");
      } else {
        setResult(data.data);
      }
    } catch (error) {
      setError(String(error));
    }

    setLoading(false);
  }

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
      const total = parseInt(contentLength || '0', 10);
      
      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;

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
      setError('Download failed. Please try again.');
      setDownloadProgress(null);
    }
  };

  const cancelDownload = () => {
    setDownloadProgress(null);
  };

  const resetToSearch = () => {
    setResult(null);
    setUrl('');
    setError('');
  };

  if (loading) return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:max-w-4xl xl:max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[80vh] gap-5">
      <div className="relative flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping"></div>
        <div className="w-3 h-3 rounded-full bg-blue-400 animate-ping delay-200"></div>
        <div className="w-3 h-3 rounded-full bg-blue-300 animate-ping delay-500"></div>
        <p className="text-blue-800 font-medium ml-2">Loading...</p>
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
          <Button onClick={() => window.location.reload()} className="mt-4 bg-blue-500 hover:bg-blue-600">Try Again</Button>
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
              <p className="text-sm text-blue-800 truncate mb-2">{downloadProgress.fileName}</p>
              <Progress value={downloadProgress.progress} className="h-3" />
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
                  ref={inputRef}
                  type="text" 
                  placeholder="https://www.tiktok.com/..." 
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleResult()}
                  className="backdrop-blur-sm bg-white/50 border border-white/80 focus:border-blue-300 shadow-sm rounded-xl px-4 py-3 text-base"
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none border border-blue-400/20 shadow-md shadow-blue-300/10"></div>
              </div>
              
              {error && (
                <div className="bg-red-50/80 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}
              
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
                    src={result.ai_dynamic_cover}
                    alt={result.title}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 z-10">
                    <p className="text-white text-sm font-semibold truncate drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>{result.title}</p>
                  </div>
                </div>
                
                <div className="backdrop-blur-sm bg-white/40 border border-white/60 p-4 rounded-xl shadow-sm flex gap-4 items-center">
                  <div className="relative w-12 h-12 overflow-hidden rounded-full ring-2 ring-white/80 ring-offset-1">
                    <TikTokImage 
                      src={result.author.avatar} 
                      alt={result.author.nickname} 
                      width={50} 
                      height={50}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-blue-900">{result.author.nickname}</p>
                    <p className="text-sm text-blue-800/70">@{result.author.unique_id}</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <div className="backdrop-blur-sm bg-white/50 border border-white/70 p-6 rounded-xl shadow-sm">
                  {/* Debug: Caption Display */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-blue-900 leading-relaxed break-words">{result.title}</h3>
                    {!result.title && <p className="text-red-500 text-sm">⚠️ No title found</p>}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1 bg-blue-50/50 px-3 py-1 rounded-full">
                      <FaPlay className="text-blue-500" />
                      <span className="text-blue-800">{result.play_count}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-blue-50/50 px-3 py-1 rounded-full">
                      <FaCommentDots className="text-blue-500" />
                      <span className="text-blue-800">{result.comment_count}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-blue-50/50 px-3 py-1 rounded-full">
                      <FaShareAlt className="text-blue-500" />
                      <span className="text-blue-800">{result.share_count}</span>
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    <Button 
                      onClick={() => handleDownload(result.wmplay, result.title, false)} 
                      className="relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl py-3 text-white font-medium w-full flex justify-center"
                      disabled={downloadProgress?.isDownloading}
                    >
                      <Download className="mr-1" size={20} />
                      Download Standard Quality
                    </Button>
                    
                    <Button 
                      onClick={() => handleDownload(result.hdplay, result.title, true)} 
                      className="relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl py-3 text-white font-medium w-full flex justify-center"
                      disabled={downloadProgress?.isDownloading}
                    >
                      <Download className="mr-1" size={20} />
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
