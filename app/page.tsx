'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface data {
  cover: string,
  title: string,
  duration: string,
  wmplay: string,
  hdplay: string
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
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


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col mx-96 items-center justify-center h-screen gap-5">
      <div className="flex flex-col gap-3 w-full text-center">
        <h1 className="text-3xl text-white">TikTok Video Downloader</h1>
        <Input type="text" placeholder="https://www.tiktok.com/..." onChange={e => setUrl(e.target.value)} />
        <Button onClick={handleResult} className="w-full bg-red-500">Submit</Button>
      </div>
      {result && (
        <div className="flex bg-slate-700 p-10 rounded-xl w-full gap-10">
          <Image src={result.cover} className="rounded-lg" alt={result.title} width={300} height={300} />
          <div className="flex flex-col gap-3 text-white">
            <p className="font-bold">{result.title}</p>
            <p>{result.duration}</p>

            <Button>
              <Link href={result.wmplay}>Download Video</Link>
            </Button>
            <Button>
              <Link href={result.hdplay}>Download Video HD</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
