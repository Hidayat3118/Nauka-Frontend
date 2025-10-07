"use client";
import CardMateri from "@/components/ui/cardMateri";
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
import ButtonBack from "@/components/ui/buttonBack";
const Vedio = () => {
  return (
    <LayoutKedua>
      <div className="min-h-screen flex flex-col items-center bg-primary px-6 ">
        <div className="max-w-5xl">
          {/* <ButtonBack back="/vedio" /> */}
          {/* Serch vedio */}
          <Search placeholder="Cari materi pembelajara ..." />
          {/* card vedio terpopuler */}
          <section className="mt-8 lg:mt-14 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CardMateri namePengajar={"Azhar"} nameMateri={"Aljabar"} />
              <CardMateri namePengajar={"Azhar"} nameMateri={"Penalaran"} />
              <CardMateri namePengajar={"Azhar"} nameMateri={"Penalaran"} />
              <CardMateri namePengajar={"Azhar"} nameMateri={"Penalaran"} />
              <CardMateri namePengajar={"Azhar"} nameMateri={"Penalaran"} />
              <CardMateri namePengajar={"Azhar"} nameMateri={"Penalaran"} />
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
