'use client';

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react";
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

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<data | null>(null);

  const handleResult = async () => {
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

  const handleDownload = async (videoUrl: string, title: string) => {
    const response = await fetch(videoUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `[TokDL] ${title}` || 'video.mp4'; // You can customize the file name
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return (
    <div className="flex flex-col mx-10 2xl:mx-96 items-center justify-center min-h-screen gap-5">
      <p>Loading...</p>
    </div>
  );
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col mx-10 2xl:mx-96 items-center justify-center min-h-screen gap-5">
      <div className="flex flex-col gap-3 w-full text-center">
        <h1 className="text-3xl text-slate-950 font-bold">TikTok Video Downloader</h1>
        <Input type="text" placeholder="https://www.tiktok.com/..." onChange={e => setUrl(e.target.value)} />
        <Button onClick={handleResult} className="w-full bg-primary">Submit</Button>
      </div>
      {result && (
        <div className="flex flex-col 2xl:flex-row bg-slate-100 p-5 2xl:p-10 rounded-xl w-full gap-5 2xl:gap-10 items-center">
          <div className="w-[300px] h-[300px] relative justify-center">
            <Image
              src={result.ai_dynamic_cover}
              alt={result.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-3 text-slate-950 w-full 2xl:w-1/2 justify-center">
            <p className="font-bold hover:text-primary duration-300">{result.title}</p>
            <div className="flex gap-3">
              <div className="flex items-center justify-center gap-2 hover:text-primary duration-300">
                <FaPlay />
                <p className="">{result.play_count}</p>
              </div>
              <span>|</span>
              <div className="flex items-center justify-center gap-2 hover:text-primary duration-300">
                <FaCommentDots />
                <p className="hover:text-primary duration-300">{result.comment_count}</p>
              </div>
              <span>|</span>
              <div className="flex items-center justify-center gap-2 hover:text-primary duration-300">
                <FaShareAlt />
                <p className="hover:text-primary duration-300">{result.share_count}</p>
              </div>
            </div>

            <Button onClick={() => handleDownload(result.wmplay, result.title)} className="flex justify-center items-center w-full bg-slate-950 hover:bg-primary duration-300">
              <Download size={24} />
              Download Video
            </Button>

            <Button onClick={() => handleDownload(result.hdplay, result.title + ' HD')} className="flex justify-center items-center w-full bg-slate-950 hover:bg-primary duration-300">
              <Download size={24} />
              Download Video HD
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
