import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CardVedio = ({ name }) => {
  return (
    <div className="bg-slate-800 rounded-xl hover:-translate-y-2 duration-300 shrink-0 lg:min-w-0">
      <div className="p-3 flex flex-row items-center gap-3 md:flex-col md:items-start">
        {/* Gambar */}
        <Image
          src="/people/study.jpg"
          alt="study"
          width={250}
          height={300}
          className="w-32 h-32 md:w-full md:h-auto rounded-xl object-cover"
        />

        {/* Konten */}
        <div className="flex flex-col justify-between h-24">
          <h2 className="text-white font-semibold text-base md:text-2xl">
            Logaritma
          </h2>

          <div className="flex items-center gap-2">
            {/* Avatar */}
            <Avatar className="w-6 h-6 md:w-10 md:h-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* Nama pengajar */}
            <p className="text-white text-sm md:text-xl">{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardVedio;
