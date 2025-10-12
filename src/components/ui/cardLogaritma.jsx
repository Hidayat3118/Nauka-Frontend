import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import ButtonLike from "./buttonLike";
const CardLogaritma = ({
  title,
  description,
  image,
  user,
  materialId,
  initialLikes,
}) => {
  const router = useRouter();
  // 🔹 Gambar utama: pastikan tidak kosong
 
  return (
    <div className="bg-[#2A2A2A] rounded-xl hover:-translate-1 cursor-pointer duration-300 shrink-0 lg:min-w-0 ">
      <div className="rounded-xl p-3">
        <Image
          onClick={() => router.push(`/materi/${materialId}`)}
          src={image}
          width={250}
          height={300}
          alt="belajar"
          className="w-full rounded-xl object-cover h-44"
        />

        <div className="p-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold text-lg lg:text-xl line-clamp-1">
              {title}
            </h2>
            <div className="pl-4">
              <ButtonLike className=""
              materialId={materialId}
              initialLikes={initialLikes}
              initiallyLiked={false}
            />
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 h-10">
            {description}
          </p>

          <div className="flex items-center gap-3 pt-3 border-t border-slate-700">
            <Avatar>
              <AvatarImage src={user?.photo_profile} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-white font-medium">{user?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLogaritma;
