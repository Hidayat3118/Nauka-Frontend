"use client";
import CardBuku from "@/components/ui/cardBuku";
import LayoutKedua from "../layoutKedua";

import Search from "@/components/ui/search";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const Buku = () => {
  return (
    <LayoutKedua>
      <div className="min-h-screen flex flex-col items-center bg-slate-900 px-6 ">
        {/* Serch vedio */}
        <Search placeholder="Cari buku pelajaran ..." />

        {/* card vedio terpopuler */}
        <section className="mt-8 lg:mt-14 max-w-6xl w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
            <CardBuku name="Ilmu Sosiologi" image="/people/study.jpg" />
            <CardBuku name="Ilmu Sosiologi" image="/people/study.jpg" />
            <CardBuku name="Ilmu Sosiologi" image="/people/study.jpg" />
            <CardBuku name="Ilmu Sosiologi" image="/people/study.jpg" />
            <CardBuku name="Ilmu Sosiologi" image="/people/study.jpg" />
            <CardBuku name="Ilmu Sosiologi" image="/people/study.jpg" />
            <CardBuku name="Ilmu Sosiologi" image="/people/study.jpg" />
            <CardBuku name="Ilmu Sosiologi" image="/people/study.jpg" />
          </div>
        </section>

        {/* pagination */}
        <Pagination className="text-white mt-12">
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
    </LayoutKedua>
  );
};

export default Buku;
