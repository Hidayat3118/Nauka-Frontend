import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CardMateri = ({ nameMateri }) => {
  return (
    <div className="bg-slate-800 rounded-xl hover:-translate-y-2 duration-300 shrink-0 lg:min-w-0">
      <div className="p-3 flex flex-row items-center gap-3 md:flex-col md:items-start">
        {/* Gambar */}
        <Image
          src="/people/study.jpg"
          alt="study"
          width={250}
          height={300}
          className="w-24 h-24  md:w-full md:h-auto rounded-xl object-cover"
        />

        {/* Konten */}
        <div className="flex flex-col justify-center h-24 pl-6">
          <h2 className="text-white font-semibold text-lg lg:text-xl md:text-2xl ">
            {nameMateri}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CardMateri;
