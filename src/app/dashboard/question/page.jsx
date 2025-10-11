"use client";
import { useEffect, useState } from "react";
import { createQuestion } from "@/api/question/createQuestionApi";
import { getQuestions } from "@/api/question/getQuestionApi";
import { deleteQuestion } from "@/api/question/deleteQuestionApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const TestingPage = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [questions, setQuestions] = useState([]);

  const [newQuestion, setNewQuestion] = useState({
    question_text: "",
    question_image: null,
    options: [
      { option_text: "", option_image: null, is_correct: 0 },
      { option_text: "", option_image: null, is_correct: 0 },
      { option_text: "", option_image: null, is_correct: 0 },
      { option_text: "", option_image: null, is_correct: 0 },
    ],
  });
  // api materil
  const fetchMaterials = async () => {
    const res = await fetch("https://nauka.vps-poliban.my.id/api/materials");
    const data = await res.json();
    setMaterials(data.data || []);
  };

  const fetchQuestions = async (materialId) => {
    try {
      const res = await getQuestions(materialId);
      setQuestions(res.questions || []);
    } catch (error) {
      console.error("Gagal memuat soal:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);
// handle create
  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = { ...newQuestion };
      await createQuestion(selectedMaterial, payload, token);
      alert("Soal berhasil dibuat!");
      setNewQuestion({
        question_text: "",
        question_image: null,
        options: [
          { option_text: "", option_image: null, is_correct: 0 },
          { option_text: "", option_image: null, is_correct: 0 },
          { option_text: "", option_image: null, is_correct: 0 },
          { option_text: "", option_image: null, is_correct: 0 },
        ],
      });
      fetchQuestions(selectedMaterial);
    } catch (error) {
      console.error("Gagal buat soal:", error.response?.data || error);
    }
  };
  // delete
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin hapus soal ini?")) return;
    const token = localStorage.getItem("token");
    await deleteQuestion(id, token);
    fetchQuestions(selectedMaterial);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Kelola Soal</h1>

      {/* Pilih Materi */}
      <div>
        <select
          value={selectedMaterial}
          onChange={(e) => {
            setSelectedMaterial(e.target.value);
            fetchQuestions(e.target.value);
          }}
          className="border p-2 rounded-md w-full"
        >
          <option value="">-- Pilih Materi --</option>
          {materials.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>
      </div>

      {/* Input Soal */}
      <div className="mt-4 space-y-3">
        <Input
          placeholder="Tulis pertanyaan..."
          value={newQuestion.question_text}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, question_text: e.target.value })
          }
        />

        <div>
          <label className="text-sm font-medium">Upload Gambar Soal:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewQuestion({
                ...newQuestion,
                question_image: e.target.files[0],
              })
            }
          />
        </div>

        <h3 className="font-semibold mt-2">Opsi Jawaban:</h3>
        {newQuestion.options.map((opt, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 border p-3 rounded-md"
          >
            <Input
              placeholder={`Opsi ${index + 1}`}
              value={opt.option_text}
              onChange={(e) => {
                const updated = [...newQuestion.options];
                updated[index].option_text = e.target.value;
                setNewQuestion({ ...newQuestion, options: updated });
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const updated = [...newQuestion.options];
                updated[index].option_image = e.target.files[0];
                setNewQuestion({ ...newQuestion, options: updated });
              }}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={opt.is_correct === 1}
                onChange={(e) => {
                  const updated = newQuestion.options.map((o, i) => ({
                    ...o,
                    is_correct: i === index ? (e.target.checked ? 1 : 0) : 0,
                  }));
                  setNewQuestion({ ...newQuestion, options: updated });
                }}
              />
              <span>Benar</span>
            </label>
          </div>
        ))}

        <Button onClick={handleCreate} className="mt-3">
          Tambah Soal
        </Button>
      </div>

      {/* List Soal */}
      <div className="mt-6">
        {questions.length === 0 ? (
          <p className="text-gray-500">Belum ada soal untuk materi ini.</p>
        ) : (
          questions.map((q) => (
            <Card key={q.id} className="mb-3">
              <CardHeader>
                <CardTitle>{q.question_text}</CardTitle>
              </CardHeader>
              <CardContent>
                {q.question_image && (
                  <img
                    src={q.question_image}
                    alt="Gambar Soal"
                    className="rounded-md max-h-48 object-contain mb-3"
                  />
                )}
                {q.options.map((opt) => (
                  <div
                    key={opt.id}
                    className={`p-2 border rounded mb-2 ${
                      opt.is_correct ? "bg-green-50 border-green-400" : ""
                    }`}
                  >
                    {opt.option_text}
                    {opt.option_image && (
                      <img
                        src={opt.option_image}
                        alt="Gambar Opsi"
                        className="max-h-32 mt-2 rounded-md object-contain"
                      />
                    )}
                  </div>
                ))}
                <Button
                  variant="destructive"
                  className="flex items-center gap-1"
                  onClick={() => handleDelete(q.id)}
                >
                  <FaTrash /> Hapus
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TestingPage;
