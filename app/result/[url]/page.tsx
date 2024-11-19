'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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



export default function Result() {
  const router = useRouter();
  const [result, setResult] = useState<Data | null>(null);

  useEffect(() => {
    if (router.query.data) {
      const data = JSON.parse(String(router.query.data));
      setResult(data);
    }
  }, [router.query.data]);

  if (!result) return <p>Loading...</p>;

  return result ? (
    <div className="flex flex-col gap-5 min-h-screen mx-96 my-5 items-center justify-center">
      <div className="flex bg-slate-100 p-7 rounded-xl w-full gap-5">
        <div className="w-50 h-50">
          <Image src={result.author.avatar} className="rounded-full" alt={result.author.nickname} width={100} height={100} />
        </div>
        <div className="flex flex-col justify-center items-center text-slate-950">
          <p className="font-bold hover:text-primary duration-300">{result.author.unique_id}</p>
          <p className="hover:text-primary duration-300">{result.author.nickname}</p>
        </div>
      </div>
      <div className="flex bg-slate-100 p-10 rounded-xl w-full gap-10">
        <div className="flex flex-col">
          <div className="w-[300px] h-[300px] relative">
            <Image
              src={result.ai_dynamic_cover}
              alt={result.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex items-center justify-center gap-2 hover:text-primary duration-300">
              <p className="">{result.author.nickname}</p>
            </div>
            <span>|</span> 
            <div className="flex items-center justify-center gap-2 hover:text-primary duration-300">
              <p className="hover:text-primary duration-300">{result.author.unique_id}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-slate-950">
          <p className="font-bold hover:text-primary duration-300">{result.title}</p>
          <p className="hover:text-primary duration-300">{result.duration}</p>
          <Button className="flex justify-center items-center">
            <Download size={24} />
            <a href={result.wmplay} target="_blank" rel="noopener noreferrer">Download Video</a>
          </Button>
          <Button className="flex justify-center items-center">
            <Download size={24} />
            <a href={result.hdplay} target="_blank" rel="noopener noreferrer">Download Video HD</a>
          </Button>
        </div>
      </div>
    </div>
  ) : null;
}
