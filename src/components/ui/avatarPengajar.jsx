import Image from "next/image";

const Avatar = ({ name }) => {
  return (
    <div className="space-y-4 lg:text-xl text-base ">
      <Image
        src="/people/people.jpeg"
        alt="people"
        width={100}
        height={200}
        className="object-cover overflow-hidden rounded-full hover:-translate-2 duration-300 min-h-28 min-w-28 lg:min-h-44 lg:min-w-44 w-full"
      />
      <p className="text-white text-center font-semibold ">{name}</p>
    </div>
  );
};

export default Avatar;
