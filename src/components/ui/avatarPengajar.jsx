import Image from "next/image";

const Avatar = ({ name }) => {
  return (
    <div className="space-y-4 text-xl ">
      <Image
        src="/people/people.jpeg"
        alt="people"
        width={200}
        height={200}
        className="object-cover overflow-hidden rounded-full hover:-translate-2 duration-300 h-44 w-44"
      />
      <p className="text-white text-center font-semibold ">{name}</p>
    </div>
  );
};

export default Avatar;
