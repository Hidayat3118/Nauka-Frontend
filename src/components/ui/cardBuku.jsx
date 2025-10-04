import Image from "next/image";

const CardBuku = ({ name, image }) => {
  return (
    <div className="grid items-center hover:-translate-2 duration-300">
      {/* Container untuk cover buku */}
      <div className="relative w-full h-48 lg:h-80 overflow-hidden rounded-lg shadow-md">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      {/* Judul buku */}
      <p className="mt-2 text-base lg:text-xl text-white font-sembold">
        {name}
      </p>
    </div>
  );
};

export default CardBuku;
