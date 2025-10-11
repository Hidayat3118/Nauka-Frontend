"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AiFillLike } from "react-icons/ai";
import { FaFlag } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaPlay } from "react-icons/fa";
import ButtonBack from "@/components/ui/buttonBack";
import LoadingSpinner from "@/components/ui/loading";
import { Description } from "@radix-ui/react-dialog";
import ButtonLike from "@/components/ui/buttonLike";
const DetailVedio = () => {
  const { id } = useParams();

  // Semua state yang dibutuhkan
  const [videos, setVideos] = useState(null);
  const [results, setResults] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  // Ambil data video
  useEffect(() => {
    if (!id) return;

    const fetchVideos = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Kamu belum login. Silakan login dulu.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://nauka.vps-poliban.my.id/api/videos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVideos(res.data.data);
      } catch (err) {
        console.error("Gagal ambil data videos:", err);

        if (err.response?.status === 401) {
          setError(
            "Token tidak valid atau sudah expired. Silakan login ulang."
          );
        } else {
          setError("Gagal memuat data video.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id]);

  if (loading) return <LoadingSpinner />;

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
          {/* judul */}
          <div className="flex ">
            <h1 className="text-2xl md:text-3xl font-bold pr-16">
              {videos.title}
            </h1>
            {/* button like */}
            {/* <ButtonLike
              materialId={material.id}
              initialLikes={material.likes}
              initiallyLiked={false}
            /> */}
          </div>

          <div className="flex flex-row sm:items-center justify-between text-slate-300 gap-3">
            {/* pengajar */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-3 items-center">
                <img
                  src={videos.user.photo_profile}
                  alt={videos.user.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
                <p className="font-semibold text-base md:text-lg">
                  {videos.user.name}
                </p>
              </div>
            </div>
            {/* suka */}
            <div className="flex items-center gap-2">
              <AiFillLike
                size={22}
                className="text-white hover:text-blue-400 hover:-translate-1 cursor-pointer duration-300"
              />
              <span>128 suka</span>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="border-t border-slate-700 pt-6">
          <h2 className="text-xl font-semibold mb-2">Deskripsi</h2>
          <p className="text-slate-300 leading-relaxed text-justify">
            {videos.description}
          </p>
        </div>

        {/* Rekomendasi Video */}
      </div>
    </div>
  );
};

export default DetailVedio;
