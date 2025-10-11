"use client";
import CardVedio from "@/components/ui/cardVedio";
import LayoutKedua from "../layoutKedua";
import Search from "@/components/ui/search";
import ButtonBack from "@/components/ui/buttonBack";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FaArrowLeft } from "react-icons/fa";
import { getVideos } from "@/api/video/getVideoApi";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/loading"
const Vedio = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  // tampilkan data api
  useEffect(() => {
    const fetchData = setTimeout(async () => {
      try {
        const data = await getVideos();
        setVideos(data);
      } catch (error) {
        console.error("terjadi kesalahan di halaman materi", error);
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(fetchData);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <LayoutKedua>
      <div className="min-h-screen flex flex-col items-center bg-primary px-6 ">
        <div className="max-w-5xl w-full mt-28  md:mt-44">
           <ButtonBack back="/beranda" />
          {/* Serch vedio */}
          <Search placeholder="Cari video pembelajaran ..." />

          {/* card vedio */}
          <section className="mt-8 lg:mt-14 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((data) => (
                <CardVedio
                  key={data.id}
                  title={data.title}
                  description={data.description}
                  user={data.user}
                  vedioId={data.id}
                />
              ))}
            </div>
          </section>

          {/* pagination */}
          <Pagination className="text-white">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </LayoutKedua>
  );
};

export default Vedio;
