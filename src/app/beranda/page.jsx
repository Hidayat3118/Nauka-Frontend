import Card from "@/components/ui/card";
import AvatarPengajar from "@/components/ui/avatarPengajar";
import CardLogaritma from "@/components/ui/cardLogaritma";
import { FaLongArrowAltRight } from "react-icons/fa";

const Beranda = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-900">
      {/* section Card */}
      <section className="max-w-6xl grid grid-cols-3  w-full gap-6 mt-44">
        <Card
          name={"Materi"}
          className="bg-green-400 hover:bg-green-500 rounded-xl p-10 text-center text-white font-semibold text-xl cursor-pointer hover:-translate-2 duration-300"
        />
        <Card
          name={"Vedio"}
          className="bg-yellow-500 hover:bg-yellow-600 rounded-xl p-10 text-center text-white font-semibold text-xl cursor-pointer hover:-translate-2 duration-300"
        />
        <Card
          name={"Soal Tryout"}
          className="bg-purple-500 hover:bg-purple-600 rounded-xl p-10 text-center text-white font-semibold text-xl cursor-pointer hover:-translate-2 duration-300"
        />
      </section>
      {/* section Pengajar */}
      <section className="mt-16 ">
        <div className="flex justify-between">
          <h1 className="text-2xl text-white font-bold mb-10">Pengajar</h1>
          <div className="text-lg hover:text-green-400 text-white mb-10 font-semibold hover:-translate-1 duration-300 flex items-center justify-center gap-2">
            <a href="" className="">
              lihat Lainnya
            </a>
            <FaLongArrowAltRight />
          </div>
        </div>

        <div className="flex gap-6">
          <AvatarPengajar name={"husein"} />
          <AvatarPengajar name={"alif"} />
          <AvatarPengajar name={"azhar"} />
          <AvatarPengajar name={"azhar"} />
          <AvatarPengajar name={"Baha"} />
          <AvatarPengajar name={"azhar"} />
        </div>
      </section>

      {/* card vedio terpopuler */}
      <section className="mt-24">
        <div className="flex justify-between">
          <h1 className="text-2xl text-white font-bold mb-10">
            Vedio Terpopuler
          </h1>
          <div className="text-lg hover:text-green-400 text-white mb-10 font-semibold hover:-translate-1 duration-300 flex items-center justify-center gap-2">
            <a href="" className="">
              lihat Lainnya
            </a>
            <FaLongArrowAltRight />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <CardLogaritma name={"Baha"} />
          <CardLogaritma name={"Baha"} />
          <CardLogaritma name={"Baha"} />
        </div>
      </section>

      {/* card Buku terpopuler */}
      <section className="my-28 ">
        <div className="flex justify-between">
          <h1 className="text-2xl text-white font-bold mb-10">
            Buku Terpopuler
          </h1>
          <div className="text-lg hover:text-green-400 text-white mb-10 font-semibold hover:-translate-1 duration-300 flex items-center justify-center gap-2">
            <a href="" className="">
              lihat Lainnya
            </a>
            <FaLongArrowAltRight />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <CardLogaritma name={"Baha"} />
          <CardLogaritma name={"Baha"} />
          <CardLogaritma name={"Baha"} />
        </div>
      </section>
    </div>
  );
};

export default Beranda;
