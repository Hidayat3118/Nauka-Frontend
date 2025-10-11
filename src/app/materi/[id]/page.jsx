"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/components/ui/loading";
import {
  FaArrowLeft,
  FaFilePdf,
  FaFlag,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import ButtonLike from "@/components/ui/buttonLike";
import { getQuestionsByMaterialId } from "@/api/materi/questionsApi";
import { RiQuestionFill } from "react-icons/ri";
export default function MaterialDetail() {
  const { id } = useParams();

  // Semua state yang dibutuhkan
  const [material, setMaterial] = useState(null);
  const [questions, setQuestions] = useState([]); 
  const [selectedOptions, setSelectedOptions] = useState({});
  const [results, setResults] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  // Ambil data materi
  useEffect(() => {
    if (!id) return;
    const fetchMaterial = async () => {
      try {
        const res = await axios.get(
          `https://nauka.vps-poliban.my.id/api/materials/${id}`
        );
        setMaterial(res.data.data);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterial();
  }, [id]);

  // Ambil data pertanyaan
  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Kamu belum login. Silakan login dulu.");
        return;
      }

      try {
        const data = await getQuestionsByMaterialId(id, token);
        setQuestions(data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError(
            "Token tidak valid atau sudah expired. Silakan login ulang."
          );
        } else {
          setError("Gagal memuat soal.");
        }
      }
    };

    fetchQuestions();
  }, [id]);

  // Saat user pilih opsi
  const handleSelect = (questionId, option) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: option.id }));
    setResults((prev) => ({
      ...prev,
      [questionId]: option.is_correct ? "benar" : "salah",
    }));
  };

  if (loading) return <LoadingSpinner />;


  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white flex flex-col">
      <main className="flex-1 p-5 md:p-8 max-w-5xl mx-auto w-full">
        {/* Tombol kembali */}
        <button
          onClick={() => window.history.back()}
          className="rounded-full bg-[#2A2A2A] hover:bg-gray-700 w-12 md:w-14 md:h-14 h-12 flex justify-center items-center mb-8 cursor-pointer transition-colors duration-300"
        >
          <FaArrowLeft />
        </button>

        {/* Gambar utama */}
        <div className="relative h-56 sm:h-72 md:h-80">
          <img
            src={material.image}
            alt={material.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Judul & tombol like */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl lg:text-3xl font-semibold py-4">
            {material.title}
          </p>
          <ButtonLike
            materialId={material.id}
            initialLikes={material.likes}
            initiallyLiked={false}
          />
        </div>

        {/* Profil Pengajar */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-3 items-center">
            <img
              src={material.user.photo_profile}
              alt={material.user.name}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <p className="font-semibold text-base md:text-lg">
              {material.user.name}
            </p>
          </div>
          <button
            className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition"
            title="Laporkan materi ini"
          >
            <FaFlag size={18} />
            <span className="text-sm font-medium">Report</span>
          </button>
        </div>

        {/* Deskripsi */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg md:text-xl mb-2">Deskripsi</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {material.description}
          </p>
        </div>

        {/* Video */}
        <section className="mt-8">
          <video
            controls
            src={material.video}
            className="w-full rounded-xl border border-neutral-700 shadow-md"
          />
        </section>

        {/* File PDF */}
        <div className="mt-6">
          <a
            href={material.file}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 w-fit px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700 hover:border-green-500 transition-all duration-200"
          >
            <FaFilePdf className="text-red-500 text-lg group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm md:text-base font-medium text-gray-200 group-hover:text-green-400">
              Lihat Materi PDF
            </span>
          </a>
        </div>

        {/* Contoh Soal */}
        <section className="mt-10 ">
          <h2 className="font-semibold text-lg md:text-xl mb-2">Contoh Soal</h2>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : questions.length === 0 ? (
            <p className="text-gray-400">Belum ada soal untuk materi ini.</p>
          ) : (
            <div className="p-6 max-w-3xl mx-auto bg-[#2A2A2A] rounded-lg shadow-lg mt-6 text-white">
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className="mb-8 border-b border-gray-200 pb-6 last:border-none"
                >
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    {/* icon tanda tanya */}
                    <RiQuestionFill className="text-green-500 text-2xl md:text-3xl" />
                    {index + 1}. {q.question_text}
                  </h2>

                  {q.question_image && (
                    <img
                      src={q.question_image}
                      alt="Question"
                      className="w-full max-h-64 object-contain rounded-md mb-4"
                    />
                  )}

                  <div className="space-y-3">
                    {q.options.map((opt) => {
                      const selected = selectedOptions[q.id] === opt.id;
                      const result = results[q.id];

                      const getStyle = () => {
                        if (!selected) return "hover:bg-primary ";
                        if (result === "benar" && opt.is_correct)
                          return "border-green-500 bg-primary ";
                        if (result === "salah" && selected)
                          return "border-red-500 bg-primary ";
                        return "";
                      };

                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleSelect(q.id, opt)}
                          className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 transition ${getStyle()}`}
                        >
                          {opt.option_image ? (
                            <img
                              src={opt.option_image}
                              alt="Option"
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <p>{opt.option_text}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {results[q.id] && (
                    <div className="mt-4 text-center font-semibold">
                      {results[q.id] === "benar" ? (
                        <p className="text-green-600 flex justify-center items-center gap-2">
                          <FaCheckCircle /> Jawaban Benar!
                        </p>
                      ) : (
                        <p className="text-red-600 flex justify-center items-center gap-2">
                          <FaTimesCircle /> Jawaban Salah!
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
