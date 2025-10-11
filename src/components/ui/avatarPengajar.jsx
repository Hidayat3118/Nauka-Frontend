import Image from "next/image";

const AvatarPengajar = ({ name, image }) => {
  return (
    <div className="flex flex-col items-center space-y-3 text-center">
      <div className="w-28 h-28 lg:w-44 lg:h-44 rounded-full border border-green-500 overflow-hidden">
        <Image
          src={image}
          alt="pengajar"
          width={176} // bebas, hanya referensi ukuran
          height={176}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <p className="text-white font-semibold text-sm lg:text-base">{name}</p>
    </div>
  );
};

export default AvatarPengajar;
