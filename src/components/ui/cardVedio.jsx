import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaPlay } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { useRouter } from "next/navigation";
const CardVedio = ({ title, description, user, vedioId }) => {
  const likeCount = 128;
  const router = useRouter();
  return (
    <div className="bg-[#2A2A2A] rounded-xl hover:-translate-y-2 duration-300 shrink-0 lg:min-w-0 cursor-pointer">
      <div className="p-3 flex flex-row items-center gap-3 md:flex-col md:items-start">
        {/* Gambar */}
        <div className=" relative h-32 w-64 md:w-full md:h-auto rounded-xl overflow-hidden">
          <Image onClick={() => router.push(`/vedio/${vedioId}`)}
            src="/people/study.jpg"
            alt="study"
            width={250}
            height={300}
            className="w-full h-full object-cover rounded-xl"
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                rounded-full h-10 w-10 md:h-12 md:w-12 bg-green-500 flex justify-center items-center shadow-lg "
          >
            <FaPlay className="" />
          </div>
        </div>

        {/* Konten */}
        <div className="p-2 lg:p-3 space-y-2 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold text-lg line-clamp-1 lg:text-xl">
              {title}
            </h2>
            {/* like buttn */}
            <div className="flex items-center gap-1 text-slate-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
              <AiOutlineLike size={22} />
              <span className="text-sm">{likeCount}</span>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>

          <div className="flex items-center gap-3 pt-3 border-t border-gray-600">
            <Avatar>
              <AvatarImage src={user?.photo_profile} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-white font-medium line-clamp-1 text-sm md:text-base">
              {user?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardVedio;
