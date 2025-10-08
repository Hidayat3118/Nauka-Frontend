import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineLike } from "react-icons/ai";
import ButtonLike from "./buttonLike";
const CardMateri = ({ title, description, image, user, materialId, initialLikes }) => {
  return (
    <div className="bg-[#2A2A2A] rounded-xl hover:-translate-y-2 duration-300 shrink-0 lg:min-w-0 cursor-pointer">
      <div className="p-3 flex flex-row items-center gap-3 md:flex-col md:items-start">
        {/* Gambar */}
        <Image
          src={image}
          alt="study"
          width={250}
          height={300}
          className="w-32 h-32 md:w-full md:h-44 rounded-xl object-cover"
        />

        {/* Konten */}
        <div className="p-2 lg:-3 space-y-2 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold text-lg lg:text-xl line-clamp-1">
              {title}
            </h2>
            {/* like */}
            <ButtonLike
              materialId={materialId}
              initialLikes={initialLikes}
              initiallyLiked={false}
            />
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

export default CardMateri;
