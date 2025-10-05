import { Button } from "@/components/ui/button";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

const Step2Upload = ({ onNext, kembali }) => {
  const [file, setFile] = useState(null);

  // function handle file
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="max-w-lg w-full mx-auto p-6 lg:bg-gray-800 text-white rounded-xl shadow-lg mt-6">
      <div
        className="rounded-full md:bg-gray-700 bg-gray-800 w-12 h-12 flex justify-center items-center mb-8 cursor-pointer"
        onClick={kembali}
      >
        <FaArrowLeft className="text-xl" />
      </div>
      <h2 className="text-2xl font-bold mb-2 mt-32 md:mt-0">Upload Validasi</h2>
      <p className="text-gray-400 mb-6">
        Kami memerlukan bukti untuk memvalidasi anda seorang Murid
      </p>

      <label className="border-2 border-dashed border-green-600 rounded-lg p-6 text-center cursor-pointer justify-center items-center flex flex-col">
        <div className="rounded-full bg-gray-700 h-16 w-16 flex justify-center items-center mb-4">
          <IoCloudUploadOutline className="text-4xl" />
        </div>
        <p className="text-gray-400">Upload bukti disini yang </p>
        <p className="text-gray-400">menandakan anda seorang murid</p>
        <p className="text-xs text-gray-500 mt-2">PNG, JPG, JPEG (Max 5mb)</p>

        {/* Input aslinya disembunyikan */}
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleFile}
        />
      </label>

      <Button
        onClick={() => onNext(file)}
        disabled={!file}
        className="w-full font-bold mt-6"
        variant={file ? "default" : "destructive"}
        size="lg"
      >
        Lanjutkan
      </Button>
    </div>
  );
};

export default Step2Upload;
