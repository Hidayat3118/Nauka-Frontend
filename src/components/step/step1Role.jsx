import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const Step1Role = ({ onNext }) => {
  const [role, setRole] = useState("");
  // function kembali
  const route = useRouter();
  const kembali = async (e) => {
    e.preventDefault();
    route.push("/register");
  };

  return (
    <div className="max-w-lg w-full mx-auto p-6 md:bg-[#2A2A2A]  text-white rounded-xl shadow-lg mt-6">
      <div
        className="rounded-full  bg-[#2A2A2A] w-12 h-12 flex justify-center items-center mb-8 cursor-pointer"
        onClick={kembali}
      >
        <FaArrowLeft className="text-xl" />
      </div>
      <h2 className="text-2xl font-bold mb-2 mt-32 md:mt-0">Pilih Peran</h2>
      <p className="text-gray-400 mb-6">Anda ingin melanjutkan sebagai?</p>

      <div className="space-y-4">
        {/* murid */}
        <Button
          className="w-full font-bold"
          variant={role == "murid" ? "secondary" : "outline"}
          size="lg"
          onClick={() => setRole("murid")}
        >
          Murid
        </Button>
        {/* Pengajar */}
        <Button
          className="w-full font-bold"
          variant={role == "pengajar" ? "secondary" : "outline"}
          size="lg"
          onClick={() => setRole("pengajar")}
        >
          Pengajar
        </Button>
      </div>
      {/* Button Lanjutkan */}
      <Button
        onClick={() => onNext(role)}
        disabled={!role}
        className="w-full font-bold mt-6"
        variant={role ? "default" :  'destructive'}
        size="lg"
      >
        Lanjutkan
      </Button>
    </div>
  );
};

export default Step1Role;
