"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ButtonBack from "@/components/ui/buttonBack";

const sampleQuestions = [
  {
    id: 1,
    question: "Jika semua A adalah B, dan semua B adalah C, maka semua A adalah ...",
    options: ["A", "B", "C", "Tidak dapat ditentukan"],
    answer: "C",
  },
  {
    id: 2,
    question: "Urutan logis dari 2, 4, 8, 16, ... adalah?",
    options: ["18", "24", "32", "20"],
    answer: "32",
  },
  {
    id: 3,
    question: "Hewan berikut yang termasuk mamalia adalah ...",
    options: ["Katak", "Ayam", "Lumba-lumba", "Ikan Hiu"],
    answer: "Lumba-lumba",
  },
];

export default function QuizDetailPage() {
  const { subkategori } = useParams();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < sampleQuestions.length) {
      return alert("Masih ada soal yang belum dijawab 😅");
    }

    let total = 0;
    sampleQuestions.forEach((q) => {
      if (answers[q.id] === q.answer) total++;
    });

    setScore(total);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white flex flex-col items-center py-10 px-4 sm:px-8">
      <div className="w-full max-w-3xl mb-6">
        <ButtonBack />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center capitalize">
        Quiz {subkategori.replace(/-/g, " ")}
      </h1>

      {!submitted ? (
        <>
          <div className="w-full max-w-3xl space-y-6 overflow-y-auto">
            {sampleQuestions.map((q, i) => (
              <Card
                key={q.id}
                className="bg-[#2A2A2A] border border-gray-800 rounded-2xl text-gray-200 shadow-md"
              >
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl font-semibold">
                    {i + 1}. {q.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(q.id, opt)}
                      className={`w-full text-left p-3 rounded-lg border transition text-sm sm:text-base ${
                        answers[q.id] === opt
                          ? "bg-green-400 hover:bg-green-500 text-white"
                          : "bg-[#1E1E1E] border-gray-800 hover:bg-[#333333]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="w-full max-w-3xl flex justify-end mt-8">
            <Button
              onClick={handleSubmit}
              className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 text-base rounded-lg"
            >
              Kirim Jawaban
            </Button>
          </div>
        </>
      ) : (
        <Card className="bg-[#2A2A2A] border border-gray-800 w-full max-w-md text-gray-200 p-6 text-center mt-10">
          <CardTitle className="text-2xl font-bold mb-4">Hasil Quiz</CardTitle>
          <p className="mb-2 text-lg">Nilai kamu: {score}</p>
          <p className="text-gray-400 mb-6">
            {score === sampleQuestions.length
              ? "Keren! Semua benar 🎉"
              : score >= sampleQuestions.length / 2
              ? "Lumayan! Tinggal sedikit lagi 💪"
              : "Masih bisa lebih baik, semangat belajar lagi ya 💫"}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-green-400 hover:bg-green-500 text-white"
          >
            Coba Lagi
          </Button>
        </Card>
      )}
    </div>
  );
}
