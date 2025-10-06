import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiFillLike } from "react-icons/ai";

const CardLogaritma = ({ name, className }) => {
  // nanti bisa ubah ini jadi state kalau mau interaktif
  const likeCount = 128;

  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 max-w-sm">
      <div className="relative group">
        <Image
          src="/people/study.jpg"
          alt="study"
          width={400}
          height={250}
          className={`w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105 ${className}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
      </div>

      <div className="p-5 space-y-4 bg-red-400">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-xl lg:text-2xl">
            Logaritma
          </h2>
          <div className="flex items-center gap-1 text-slate-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
            <AiFillLike size={22} />
            <span className="text-sm">{likeCount}</span>
          </div>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          Pelajari konsep logaritma dengan mudah melalui contoh dan latihan soal
          yang menarik.
        </p>

        <div className="flex items-center gap-3 pt-3 border-t border-slate-700">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-white font-medium">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default CardLogaritma;
