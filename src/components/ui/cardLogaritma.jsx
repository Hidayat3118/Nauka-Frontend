import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CardLogaritma = ({ name, className }) => {
  return (
    <div className="bg-slate-800 rounded-xl hover:-translate-2 duration-300 shrink-0 lg:min-w-0 ">
      <div className="rounded-xl p-3 ">
        <Image
          src="/people/study.jpg"
          alt="study"
          width={250}
          height={300}
          className={className}
        />
        <h2 className="text-white font-semibold text-lg lg:text-2xl my-4">Logaritma</h2>
        <div className="flex gap-4">
          {/* avatar */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* nama pengajar */}
          <p className="text-white lg:text-xl">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default CardLogaritma;
