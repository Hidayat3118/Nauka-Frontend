import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
const Step3Profile = ({ onNext, kembali }) => {
  const [file, setFile] = useState(null);
  // function handle file
  const handleFile = (e) => {
    setFile(e.target.files[0]);
 
  };
  return (
    <div className="max-w-lg w-full mx-auto p-6  md:bg-[#2A2A2A] text-white rounded-xl shadow-lg mt-6">
      <div className="rounded-full md:bg-primary bg-[#2A2A2A] w-12 h-12 flex justify-center items-center mb-8 cursor-pointer" onClick={kembali}>
        <FaArrowLeft className="text-xl" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Foto Profil</h2>
      <p className="text-gray-400 mb-6">Unggah atau pilih foto profil</p>

      <div className="flex justify-center mt-10">
        <div className="grid grid-cols-3 gap-4 lg:gap-8 justify-center items-center">
          {/* input gambar */}
          <label htmlFor="upload" className="cursor-pointer">
            <div className="rounded-full bg-primary">
              <Avatar className="w-24 h-24 lg:w-28 lg:h-28 ">
                <AvatarImage src="/kamera.png" className="p-4 lg:p-6" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            {/* inputnya */}
            <input
              id="upload"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFile}
            />
          </label>
          <Avatar className="w-24 h-24 lg:w-28 lg:h-28 ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="w-24 h-24 lg:w-28 lg:h-28 ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-white">CN</AvatarFallback>
          </Avatar>
          <Avatar className="w-24 h-24 lg:w-28 lg:h-28 ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="w-24 h-24 lg:w-28 lg:h-28 ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="w-24 h-24 lg:w-28 lg:h-28 ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-white">CN</AvatarFallback>
          </Avatar>
          <Avatar className="w-24 h-24 lg:w-28 lg:h-28 ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="w-24 h-24 lg:w-28 lg:h-28 ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="w-24 h-24 lg:w-28 lg:h-28 ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-white">CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full font-bold mt-12"
        variant="destructive"
        size="lg"
      >
        Lanjutkan
      </Button>
    </div>
  );
};

export default Step3Profile;
