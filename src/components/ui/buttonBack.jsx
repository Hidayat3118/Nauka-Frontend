"use client";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ButtonBack = ({ back }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push(back);
  };

  return (
    <div
      onClick={handleBack}
      className="rounded-full bg-[#2A2A2A] hover:bg-gray-700 w-12 h-12 flex justify-center items-center mb-8 cursor-pointer  transition-colors duration-300 md:hidden"
    >
      <FaArrowLeft className="text-xl text-white" />
    </div>
  );
};

export default ButtonBack;
