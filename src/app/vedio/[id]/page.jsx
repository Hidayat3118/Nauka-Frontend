"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { AiFillLike } from "react-icons/ai";
import { FaFlag, FaPlay } from "react-icons/fa";
import ButtonBack from "@/components/ui/buttonBack";
import LoadingSpinner from "@/components/ui/loading";

const DetailVedio = () => {
  const { id } = useParams();

  const [videos, setVideos] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

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
          setError("Token tidak valid atau sudah expired. Silakan login ulang.");
        } else {
          setError("Gagal memuat data video.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id]);

  // Kondisi loading & error
  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-400 py-10">{error}</p>;
  if (!videos) return <p className="text-center text-gray-400 py-10">Data video tidak ditemukan.</p>;

  // Event listener: sembunyikan ikon saat video diputar
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <div className="min-h-screen bg-primary text-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <ButtonBack back="/vedio" />

        {/* Video Section */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
          {videos?.video_url ? (
            <video
              ref={videoRef}
              controls
              src={videos.video_url}
              onPlay={handlePlay}
              onPause={handlePause}
              className="w-full h-full object-cover rounded-xl border border-neutral-700 shadow-md"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-neutral-800 rounded-xl">
              <p className="text-slate-400 text-sm">Video tidak tersedia</p>
            </div>
          )}

          {/* Ikon Play di tengah (hilang saat video diputar) */}
          {!isPlaying && videos?.video_url && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                          rounded-full h-10 w-10 md:h-12 md:w-12 bg-green-500 flex justify-center items-center shadow-lg 
                          pointer-events-none transition-opacity duration-300 "
            >
              <FaPlay className="text-black" />
            </div>
          )}
        </div>

        {/* Title + Info */}
        <div className="space-y-3 relative">
          {/* Tombol Report */}
          <button
            className="absolute top-2 right-0 flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors duration-200"
            title="Laporkan video ini"
          >
            <FaFlag size={18} />
            <span className="text-sm font-medium">Report</span>
          </button>

          {/* Judul */}
          <div className="flex">
            <h1 className="text-2xl md:text-3xl font-bold pr-16">
              {videos?.title || "Judul tidak tersedia"}
            </h1>
          </div>

          {/* Info Pengajar + Like */}
          <div className="flex flex-row sm:items-center justify-between text-slate-300 gap-3">
            {/* Pengajar */}
            {videos?.user && (
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
            )}

            {/* Suka */}
            <div className="flex items-center gap-2">
              <AiFillLike
                size={22}
                className="text-white hover:text-blue-400 hover:-translate-1 cursor-pointer duration-300"
              />
              <span>{videos?.likes ?? 0} suka</span>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="border-t border-slate-700 pt-6">
          <h2 className="text-xl font-semibold mb-2">Deskripsi</h2>
          <p className="text-slate-300 leading-relaxed text-justify">
            {videos?.description || "Tidak ada deskripsi."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailVedio;
