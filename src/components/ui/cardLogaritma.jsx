import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CardLogaritma = ({ name }) => {
  return (
    <div className="bg-slate-800 rounded-xl hover:-translate-2 duration-300">
      <div className="rounded-xl p-4 ">
        <Image
          src="/people/study.jpg"
          alt="study"
          width={340}
          height={300}
          className="rounded-2xl "
        />
        <h2 className="text-white font-semibold text-2xl my-4">Logaritma</h2>
        <div className="flex gap-4">
          {/* avatar */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* nama pengajar */}
          <p className="text-white text-xl">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default CardLogaritma;
