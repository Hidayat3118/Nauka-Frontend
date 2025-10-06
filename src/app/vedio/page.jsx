"use client";
import CardVedio from "@/components/ui/cardVedio";
import LayoutKedua from "../layoutKedua";
import Search from "@/components/ui/search"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const Vedio = () => {
  
  return (
    <LayoutKedua>
      <div className="min-h-screen flex flex-col items-center bg-slate-900 px-6 ">
        {/* Serch vedio */}
        <Search placeholder="Cari vedio pembelajaran ..." />

        {/* card vedio */}
        <section className="mt-8 lg:mt-14 max-w-6xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardVedio nameVedio={"Linier"} namePengajar={"Baha"}  />
            <CardVedio nameVedio={"Linier"} namePengajar={"Baha"}  />
            <CardVedio nameVedio={"Linier"} namePengajar={"Baha"}  />
            <CardVedio nameVedio={"Linier"} namePengajar={"Baha"}  />
            <CardVedio nameVedio={"Linier"} namePengajar={"Baha"}  />
            <CardVedio nameVedio={"Linier"} namePengajar={"Baha"}  />
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
    </LayoutKedua>
  );
};

export default Vedio;
