'use client'
import Card from "@/components/ui/card";
import AvatarPengajar from "@/components/ui/avatarPengajar";
import CardLogaritma from "@/components/ui/cardLogaritma";
import { FaLongArrowAltRight } from "react-icons/fa";
import LayoutKedua from "../layoutKedua";
import Link from "next/link";

const Beranda = () => {
  return (
    <LayoutKedua>
      <div className="min-h-screen flex flex-col items-center bg-primary px-6">
        {/* section Card */}
        <section className="max-w-5xl w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-32 lg:mt-44">
          <Card
            name={"Materi"} href="/materi"
            className="bg-green-500 hover:bg-green-500 rounded-xl p-6 md:p-10 text-center text-white font-semibold text-xl cursor-pointer hover:-translate-y-2  duration-300"
          />
          <Card
            name={"Video"} href="/vedio"
            className="bg-yellow-500 hover:bg-yellow-600 rounded-xl p-6 md:p-10 text-center text-white font-semibold text-xl cursor-pointer hover:-translate-y-2  duration-300"
          />
          <Card
            name={"Soal Tryout"} href="/"
            className="bg-purple-500 hover:bg-purple-600 rounded-xl p-6 md:p-10 text-center text-white font-semibold text-xl cursor-pointer hover:-translate-y-2  duration-300 col-span-2 md:col-span-1"
          />
        </section>

        {/* section Pengajar */}
        <section className="mt-10 max-w-5xl w-full">
          <div className="flex justify-between">
            <h1 className="text-lg lg:text-2xl text-white font-bold mb-10">Pengajar</h1>
            <div className="text-lg hover:text-green-400 text-white mb-10 font-semibold hover:-translate-1 duration-300 flex items-center justify-center gap-2">
              <Link href="/" className="text-sm">
                lihat Lainnya
              </Link>
              <FaLongArrowAltRight className="text-base"/>
            </div>
          </div>

          <div className="flex overflow-x-auto scrollbar-custom gap-6 pb-6 ">
            <AvatarPengajar name={"alif"} />
            <AvatarPengajar name={"husein"} />
            <AvatarPengajar name={"alif"} />
            <AvatarPengajar name={"husein"} />
            <AvatarPengajar name={"alif"} />
            <AvatarPengajar name={"azhar"} />    
          </div>
        </section>

        {/* card vedio terpopuler */}
        <section className="mt-8 lg:mt-24 max-w-5xl w-full">
          <div className="flex justify-between">
            <h1 className="text-lg lg:text-2xl text-white font-bold mb-10">
              Vedio Terpopuler
            </h1>
            <div className="text-lg hover:text-green-400 text-white mb-10 font-semibold hover:-translate-1 duration-300 flex items-center justify-center gap-2">
              <Link href="/vedio" className="text-sm">
                lihat Lainnya
              </Link>
              <FaLongArrowAltRight className="text-base"/>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 pb-6">
            <CardLogaritma name={"Baha"} />
            <CardLogaritma name={"Baha"} />
            <CardLogaritma name={"Baha"} />
          </div>
        </section>

        {/* card Materi terpopuler */}
        <section className="mt-8 lg:mt-24  max-w-5xl w-full">
          <div className="flex justify-between">
            <h1 className="text-lg lg:text-2xl text-white font-bold mb-10">
              Materi Terpopuler
            </h1>
            <div className="text-lg hover:text-green-400 text-white mb-10 font-semibold hover:-translate-1 duration-300 flex items-center justify-center gap-2">
              <Link href="/materi" className="text-sm">
                lihat Lainnya
              </Link>
              <FaLongArrowAltRight className="text-base"/>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 pb-6">
            <CardLogaritma name={"Baha"} />
            <CardLogaritma name={"Baha"} />
            <CardLogaritma name={"Baha"} />
          </div>
        </section>
      </div>
    </LayoutKedua>
  );
};

export default Beranda;
