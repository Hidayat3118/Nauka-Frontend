import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiFillLike } from "react-icons/ai";

const CardLogaritma = ({ name }) => {
  const likeCount = 123;
  return (
    <div className="bg-slate-800 rounded-xl hover:-translate-1 cursor-pointer duration-300 shrink-0 lg:min-w-0 ">
      <div className="rounded-xl p-3 ">
        <Image
          src="/people/study.jpg"
          alt="study"
          width={250}
          height={300}
          className="w-full rounded-xl"
        />

        <div className="p-3 space-y-4">
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
            Pelajari konsep logaritma dengan mudah melalui contoh dan latihan
            soal yang menarik.
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
    </div>
  );
};

export default CardLogaritma;
