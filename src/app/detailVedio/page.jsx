"use client";
import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import { FaFlag } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaPlay } from "react-icons/fa";
import ButtonBack from "@/components/ui/buttonBack";
const DetailVedio = () => {
  return (
    <div className="min-h-screen bg-primary text-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <ButtonBack back="/vedio" />
        {/* Video Section */}
        <div className="relative h-56 md:h-auto w-full aspect-video rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/people/study.jpg"
            alt="Thumbnail Video"
            fill
            className="object-cover"
          />

          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                          rounded-full h-10 w-10 md:h-12 md:w-12 bg-green-500 flex justify-center items-center shadow-lg"
          >
            <FaPlay className="text-black" />
          </div>
        </div>

        {/* Title + Info */}
        <div className="space-y-3 relative ">
          {/* Tombol Report */}
          <button
            className=" absolute top-2 right-0 flex  items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors duration-200"
            title="Laporkan video ini"
          >
            <FaFlag size={18} />
            <span className="text-sm font-medium ">Report</span>
          </button>

          <h1 className="text-2xl md:text-3xl font-bold pr-16">
            Linier — Konsep Logaritma
          </h1>

          <div className="flex flex-row sm:items-center justify-between text-slate-300 gap-3">
            {/* pengajar */}
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-white">Baha</p>
                <p className="text-sm text-slate-400">Pengajar Matematika</p>
              </div>
            </div>
            {/* suka */}
            <div className="flex items-center gap-2">
              <AiFillLike size={22} className="text-blue-400" />
              <span>128 suka</span>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="border-t border-slate-700 pt-6">
          <h2 className="text-xl font-semibold mb-2">Deskripsi</h2>
          <p className="text-slate-300 leading-relaxed text-justify">
            Pelajari konsep logaritma dengan mudah melalui video pembelajaran
            ini. Dalam video ini, Anda akan memahami dasar-dasar logaritma dan
            penerapannya pada perhitungan linier. Cocok untuk pelajar,
            mahasiswa, dan siapa saja yang ingin memperkuat pemahaman
            matematika.
          </p>
        </div>

        {/* Rekomendasi Video */}
      </div>
    </div>
  );
};

export default DetailVedio;
