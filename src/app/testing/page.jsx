"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaQuestionCircle } from "react-icons/fa";

export default function QuestionPage() {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Kamu belum login. Silakan login dulu.");
        return;
      }

      try {
        const res = await axios.get(
          "https://nauka.vps-poliban.my.id/api/materials/questions/1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setQuestion(res.data.question);
      } catch (err) {
        console.error("Error fetching question:", err);
        if (err.response?.status === 401) {
          setError("Token tidak valid atau sudah expired. Silakan login ulang.");
        } else {
          setError("Gagal memuat soal.");
        }
      }
    };

    fetchQuestion();
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option.id);
    setResult(option.is_correct ? "benar" : "salah");
  };

  if (error)
    return (
      <div className="p-6 text-center text-red-600 font-medium">{error}</div>
    );

  if (!question) return <p className="text-center mt-10">Memuat soal...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaQuestionCircle className="text-green-500" />
        {question.question_text}
      </h2>

      {question.question_image && (
        <img
          src={question.question_image}
          alt="Question"
          className="w-full max-h-64 object-contain rounded-md mb-4"
        />
      )}

      <div className="space-y-3">
        {question.options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelect(option)}
            className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 transition ${
              selectedOption === option.id
                ? option.is_correct
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "hover:bg-gray-100"
            }`}
          >
            {option.option_image ? (
              <img
                src={option.option_image}
                alt="Option"
                className="w-16 h-16 object-cover rounded"
              />
            ) : (
              <p>{option.option_text}</p>
            )}
          </div>
        ))}
      </div>

      {result && (
        <div className="mt-4 text-center font-semibold">
          {result === "benar" ? (
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
  );
}
