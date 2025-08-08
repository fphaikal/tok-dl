'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import TikTokImage from "@/components/TikTokImage";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, X } from "lucide-react";
import Link from "next/link";
import { FaUser, FaClock } from "react-icons/fa";

interface Data {
  ai_dynamic_cover: string;
  title: string;
  duration: string;
  wmplay: string;
  hdplay: string;
  author: {
    nickname: string;
    avatar: string;
    unique_id: string;
  }
}

interface DownloadProgress {
  isDownloading: boolean;
  progress: number;
  fileName: string;
  downloadId: string;
}

export default function Result() {
  const router = useRouter();
  const [result, setResult] = useState<Data | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress | null>(null);

  useEffect(() => {
    if (router.query.data) {
      const data = JSON.parse(String(router.query.data));
      setResult(data);
    }
  }, [router.query.data]);

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
      setDownloadProgress(null);
    }
  };

  const cancelDownload = () => {
    setDownloadProgress(null);
  };

  if (!result) return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:max-w-4xl xl:max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[80vh] gap-5">
      <div className="relative flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping"></div>
        <div className="w-3 h-3 rounded-full bg-blue-400 animate-ping delay-200"></div>
        <div className="w-3 h-3 rounded-full bg-blue-300 animate-ping delay-500"></div>
        <p className="text-blue-800 font-medium ml-2">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:max-w-4xl xl:max-w-6xl mx-auto py-12 flex flex-col gap-8">
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

      <Link 
        href="/" 
        className="self-start flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span>Back to Home</span>
      </Link>

      <div className="backdrop-blur-xl bg-white/60 border border-white/80 shadow-lg rounded-2xl p-6 md:p-8">
        <div className="flex gap-4 items-center mb-6">
          <div className="relative w-16 h-16 overflow-hidden rounded-full ring-2 ring-white/80 ring-offset-2 shadow-lg">
            <TikTokImage 
              src={result.author.avatar} 
              alt={result.author.nickname} 
              width={100} 
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-blue-900">{result.author.nickname}</h2>
            <p className="text-blue-700/80">@{result.author.unique_id}</p>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/60 border border-white/80 shadow-lg rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-0 relative aspect-square w-full max-w-md mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-purple-200/30 z-0"></div>
            <TikTokImage
              src={result.ai_dynamic_cover}
              alt={result.title}
              layout="fill"
              objectFit="cover"
              className="z-10 hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 z-20">
              <p className="text-white text-sm font-semibold truncate drop-shadow-lg mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>{result.title}</p>
              <div className="flex items-center gap-2 text-white/90">
                <FaClock className="text-blue-200" />
                <span>{result.duration}</span>
              </div>
            </div>
          </div>

          <div className="p-8 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">{result.title}</h1>
              
              <div className="space-y-6 mb-8">
                <div className="backdrop-blur-sm bg-blue-50/30 p-4 rounded-xl border border-blue-100/50">
                  <h3 className="text-lg font-medium text-blue-800 mb-3">Video Details</h3>
                  <div className="flex items-center gap-2 text-blue-700/80 mb-2">
                    <FaUser className="text-blue-400" />
                    <span>Creator: {result.author.nickname}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700/80">
                    <FaClock className="text-blue-400" />
                    <span>Duration: {result.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <Button 
                onClick={() => handleDownload(result.wmplay, result.title, false)} 
                className="relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl py-3 text-white font-medium w-full flex justify-center items-center"
                disabled={downloadProgress?.isDownloading}
              >
                <Download className="mr-2" size={20} />
                Download Standard Quality
              </Button>
              
              <Button 
                onClick={() => handleDownload(result.hdplay, result.title, true)} 
                className="relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl py-3 text-white font-medium w-full flex justify-center items-center"
                disabled={downloadProgress?.isDownloading}
              >
                <Download className="mr-2" size={20} />
                Download HD Quality
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
