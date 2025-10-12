"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const sampleQuestions = [
  {
    id: 1,
    text: "Apa warna langit pada siang hari?",
    options: ["Merah", "Biru", "Hijau", "Kuning"],
  },
  {
    id: 2,
    text: "Siapa presiden pertama Indonesia?",
    options: ["Soekarno", "Soeharto", "Habibie", "Jokowi"],
  },
  {
    id: 3,
    text: "Berapa 2 + 2?",
    options: ["3", "4", "5", "6"],
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState({});

  const handleChange = (qId, value) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const handleSubmit = () => {
    console.log("Jawaban user:", answers);
    alert("Jawaban sudah dikirim!");
  };

  return (
    <div className="min-h-screen bg-primary p-4 sm:p-6 md:p-10 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Quiz Interaktif
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {sampleQuestions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-[#2A2A2A] rounded-xl shadow p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <p className="font-medium mb-3">
              {idx + 1}. {q.text}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-3 p-2 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                    className="accent-blue-500"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-4">
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
