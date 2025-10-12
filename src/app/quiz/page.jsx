"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ButtonBack from "@/components/ui/buttonBack";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { FaBrain, FaBookOpen } from "react-icons/fa";
import LayoutKedua from "../layoutKedua";
import { useRouter } from "next/navigation"; // ✅ tambahkan ini di atas

const quizStructure = [
  {
    bidang: "Potensi Skolastik",
    icon: <FaBrain className="text-green-400 text-xl sm:text-2xl" />,
    subkategori: [
      "Penalaran Umum",
      "Pengetahuan dan Pemahaman Umum",
      "Pemahaman Bacaan dan Menulis",
      "Pengetahuan Kuantitatif",
    ],
  },
  {
    bidang: "Literasi",
    icon: <FaBookOpen className="text-green-400 text-xl sm:text-2xl" />,
    subkategori: [
      "Literasi Bahasa Indonesia",
      "Literasi Bahasa Inggris",
      "Penalaran Matematika",
    ],
  },
];

export default function QuizPage() {
  const [openIndex, setOpenIndex] = useState(null);
  
  const router = useRouter();
  const toggleCategory = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <LayoutKedua>
      <div className="min-h-screen bg-[#1E1E1E] text-white flex flex-col items-center py-10 px-4 sm:px-8">
        {/* Tombol kembali */}
        <div className="w-full max-w-2xl  mt-16 md:mt-32">
          <ButtonBack back={"/beranda"} />
        </div>

        {/* Judul halaman */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
          Pilih Bidang Quiz
        </h1>

        {/* Daftar bidang */}
        <div className="w-full max-w-2xl space-y-4">
          {quizStructure.map((item, index) => (
            <Card
              key={index}
              className="bg-[#2A2A2A] border border-gray-700 rounded-2xl text-gray-300 shadow-md transition hover:border-gray-500"
            >
              {/* Header bidang */}
              <CardHeader
                onClick={() => toggleCategory(index)}
                className="flex justify-between items-center cursor-pointer select-none py-1 px-4 sm:px-6"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <CardTitle className="text-base sm:text-lg md:text-xl font-semibold">
                    {item.bidang}
                  </CardTitle>
                </div>

                {openIndex === index ? (
                  <HiChevronUp className="text-gray-400 text-lg sm:text-xl" />
                ) : (
                  <HiChevronDown className="text-gray-400 text-lg sm:text-xl" />
                )}
              </CardHeader>

              {/* Isi subkategori */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <CardContent className="space-y-3 pb-4">
                  {item.subkategori.map((sub, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex justify-between items-center bg-[#1E1E1E] p-3 sm:p-4 rounded-xl hover:bg-[#333333] transition text-sm sm:text-base"
                    >
                      <span>{sub}</span>
                      <Button
                        variant="secondary"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base px-4 sm:px-5 py-1 sm:py-2 rounded-lg"
                        onClick={() =>
                          router.push(
                            `/quiz/${sub.toLowerCase().replace(/\s+/g, "-")}`
                          )
                        }
                      >
                        Mulai
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </LayoutKedua>
  );
}
