"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  FaArrowLeft,
  FaPlay,
  FaUserGraduate,
  FaHome,
  FaUser,
} from "react-icons/fa";
import ButtonLike from "@/components/ui/buttonLike";

export default function MaterialDetail() {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchMaterial = async () => {
      try {
        const res = await axios.get(
          `https://nauka.vps-poliban.my.id/api/materials/${id}`
        );
        setMaterial(res.data.data);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      }
    };
    fetchMaterial();
  }, [id]);

  if (!material)
    return <p className="text-center text-white mt-10">Memuat materi...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white flex flex-col">
      {/* HEADER */}

      {/* KONTEN */}
      <main className="flex-1 p-5 md:p-8 max-w-5xl mx-auto w-full">
        <button
          onClick={() => window.history.back()}
          className="rounded-full bg-[#2A2A2A] hover:bg-gray-700 w-12 h-12 flex justify-center items-center mb-8 cursor-pointer  transition-colors duration-300 "
        >
          <FaArrowLeft />
        </button>
        {/* GAMBAR UTAMA */}
        <div className="relative  h-56 sm:h-72 md:h-80">
          <img
            src={material.image}
            alt={material.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        {/* PROFIL PENGAJAR */}
        <div className="flex items-center gap-3 mt-3  justify-between">
          <div className="flex gap-3 justify-center items-center">
            <img
              src={material.user.photo_profile}
              alt={material.user.name}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div className="">
              <p className="font-semibold text-base md:text-lg">
                {material.user.name}
              </p>
            </div>
          </div>
          <div>
            <ButtonLike
              materialId={material.id}
              initialLikes={material.likes}
              initiallyLiked={false}
            />
          </div>
        </div>

        {/* DESKRIPSI */}
        <section className="mt-6">
          <h2 className="font-semibold text-lg md:text-xl mb-2">Deskripsi</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {material.description}
          </p>
        </section>

        {/* STATISTIK */}
        <div className="flex flex-wrap items-center justify-between text-sm md:text-base text-gray-400 mt-5">
          <p>9 Pelajaran</p>
          <p>1 Jam 20 Menit</p>
        </div>

        {/* DAFTAR PELAJARAN */}
        {/* <section className="mt-6 flex flex-col gap-3">
          {[
            { title: "Pengantar", duration: "10 Menit" },
            { title: "BAB 1", duration: "20 Menit" },
            { title: "BAB 2", duration: "15 Menit" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-neutral-800 hover:bg-neutral-700 transition rounded-xl p-4 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-600 p-2 rounded-full">
                  <FaPlay className="text-white text-sm" />
                </div>
                <div>
                  <p className="font-medium text-sm md:text-base">
                    {item.title}
                  </p>
                  <p className="text-xs md:text-sm text-gray-400">
                    {item.duration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section> */}

        {/* VIDEO */}
        <section className="mt-8">
          <video
            controls
            src={material.video}
            className="w-full rounded-xl border border-neutral-700 shadow-md"
          />
        </section>

        {/* FILE */}
        <section className="mt-4">
          <a
            href={material.file}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-green-500 hover:text-green-400 underline text-sm md:text-base transition"
          >
            📄 Lihat File PDF
          </a>
        </section>
      </main>
    </div>
  );
}
