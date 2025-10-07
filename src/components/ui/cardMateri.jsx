import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiFillLike } from "react-icons/ai";
const CardMateri = ({ nameMateri, namePengajar }) => {
  const likeCount = 123;
  return (
    <div className="bg-[#2A2A2A] rounded-xl hover:-translate-y-2 duration-300 shrink-0 lg:min-w-0 cursor-pointer">
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
        <div className="p-2 lg:-3 space-y-2 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold text-xl lg:text-2xl">
              {nameMateri}
            </h2>
            <div className="flex items-center gap-1 text-slate-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
              <AiFillLike size={22} />
              <span className="text-sm">{likeCount}</span>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            Pelajari konsep logaritma dengan mudah melalui
          </p>

          <div className="flex items-center gap-3 pt-3 border-t border-gray-600">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-white font-medium">{namePengajar}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMateri;
