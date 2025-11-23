"use client";
import CardWarna from "@/components/ui/cardWarna";
import AvatarPengajar from "@/components/ui/avatarPengajar";
import CardLogaritma from "@/components/ui/cardLogaritma";
import { FaLongArrowAltRight } from "react-icons/fa";
import LayoutKedua from "../layoutKedua";
import Link from "next/link";
import { getMaterialNew } from "@/api/materi/materialNewApi";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/loading";
import { getAllPengajar } from "../../api/user/getAllPengajarApi";
// import { videosMostLikeApi } from "@/api/videosMostLikeApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Beranda = () => {
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pengajar, setPengajar] = useState([]);
  const [videos, setVideos] = useState([]);

  // Ambil data materi
  useEffect(() => {
    const fetchData = setTimeout(async () => {
      try {
        const data = await getMaterialNew();
        setMateri(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Terjadi kesalahan di halaman materi:", error);
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(fetchData);
  }, []);

  // ambil data videos most like api

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await videosMostLikeApi();
  //       setVideos(data);
  //     } catch (error) {
  //       console.error("gagal di nangkap api ", error);
  //     }
  //   };
  //   fetchData
  // },[]);

  // Ambil data pengajar
  useEffect(() => {
    const fetchDataPengajar = async () => {
      try {
        const data = await getAllPengajar();
        console.log("cek data pengajar", data);
        setPengajar(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Data pengajar gagal render:", error);
      }
    };

    fetchDataPengajar();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <LayoutKedua>
      <div className="min-h-screen flex flex-col items-center bg-primary px-6">
        {/* Section Card */}
        <section className="max-w-5xl w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-32 lg:mt-44">
          <CardWarna
            name="Materi"
            href="/materi"
            className="bg-green-500 hover:bg-green-500 rounded-xl p-6 md:p-10 text-center text-white font-semibold text-xl cursor-pointer hover:-translate-y-2 duration-300"
          />
          <CardWarna
            name="Video"
            href="/vedio"
            className="bg-yellow-500 hover:bg-yellow-600 rounded-xl p-6 md:p-10 text-center text-white font-semibold text-xl cursor-pointer hover:-translate-y-2 duration-300"
          />
          <CardWarna
            name="Soal Tryout"
            href="/quiz"
            className="bg-purple-500 hover:bg-purple-600 rounded-xl p-6 md:p-10 text-center text-white font-semibold text-xl cursor-pointer hover:-translate-y-2 duration-300 col-span-2 md:col-span-1"
          />
        </section>

        {/* Section Pengajar */}
        <section className="mt-10 max-w-5xl w-full">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-lg lg:text-2xl text-white font-bold">
              Pengajar
            </h1>
            <div className="flex items-center gap-2 text-white text-sm lg:text-lg font-semibold hover:text-green-400 transition duration-300">
              <Link href="/" className="text-sm">
                Lihat Lainnya
              </Link>
              <FaLongArrowAltRight className="text-base" />
            </div>
          </div>

          {/* Carousel Section */}
          <div className="pb-6">
            <Carousel
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {pengajar.map((data) => (
                  <CarouselItem
                    key={data.id}
                    className=""
                  >
                    <div className="flex justify-center p-2">
                      <AvatarPengajar
                        name={data.name}
                        image={
                          data.photo_profile && data.photo_profile.trim() !== ""
                            ? data.photo_profile
                            : "/study.png"
                        }
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Tombol navigasi */}
              <CarouselPrevious className="left-2 sm:left-5" />
              <CarouselNext className="right-2 sm:right-5" />
            </Carousel>
          </div>
        </section>

        {/* Section Materi Terbaru */}
        <section className="mt-8 lg:mt-24 max-w-5xl w-full">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-lg lg:text-2xl text-white font-bold">
              Materi Terbaru
            </h1>
            <div className="flex items-center gap-2 text-white text-sm lg:text-lg font-semibold hover:text-green-400 transition duration-300">
              <Link href="/materi">Lihat Lainnya</Link>
              <FaLongArrowAltRight className="text-base" />
            </div>
          </div>

          {/* Carousel Section */}
          <div className="pb-6">
            <Carousel
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {materi.map((data) => (
                  <CarouselItem
                    key={data.id}
                    className="basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-2">
                      <CardLogaritma
                        title={data.title}
                        description={data.description}
                        image={
                          data.image && data.image.trim() !== ""
                            ? data.image
                            : "/default-material.png"
                        }
                        user={data.user}
                        materialId={data.id}
                        initialLikes={data.likes}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Tombol navigasi tidak terlalu di ujung */}
              <CarouselPrevious className="left-2 sm:left-5" />
              <CarouselNext className="right-2 sm:right-5" />
            </Carousel>
          </div>
        </section>

        {/* Section Video Terpopuler */}
        <section className="mt-8 lg:mt-24 max-w-5xl w-full">
          {/* <div className="flex justify-between">
            <h1 className="text-lg lg:text-2xl text-white font-bold mb-10">
              Video Terpopuler
            </h1>
            <div className="text-lg hover:text-green-400 text-white mb-10 font-semibold hover:-translate-1 duration-300 flex items-center justify-center gap-2">
              <Link href="/materi" className="text-sm">
                Lihat Lainnya
              </Link>
              <FaLongArrowAltRight className="text-base" />
            </div>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 pb-6">
            {/* nunggu api nya di perbaiki */}
            {/* {videos.map((data) => (
              <CardLogaritma title={data.title} description={data.description} />
            ))} */}
          </div>
        </section>
      </div>
    </LayoutKedua>
  );
};

export default Beranda;
