"use client";

import { useEffect, useState } from "react";
import { createQuestion } from "../../api/question/createQuestionApi";
import { updateQuestion } from "../../api/question/updateQuestionApi";
import { deleteQuestion } from "../../api/question/deleteQuestionApi";
import { getQuestions } from "../../api/question/getQuestionApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function TestingPage() {
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

  const [editingQuestion, setEditingQuestion] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const fetchMaterials = async () => {
    try {
      const res = await fetch("https://nauka.vps-poliban.my.id/api/materials");
      const data = await res.json();
      setMaterials(data.data || []);
    } catch (error) {
      console.error("Gagal memuat materi:", error);
    }
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

  const handleCreate = async () => {
    try {
      if (!selectedMaterial) return alert("Pilih materi terlebih dahulu!");
      if (!newQuestion.question_text.trim() && !newQuestion.question_image)
        return alert("Tulis pertanyaan atau upload gambar!");

      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("question_text", newQuestion.question_text);
      if (newQuestion.question_image)
        formData.append("question_image", newQuestion.question_image);

      newQuestion.options.forEach((opt, i) => {
        formData.append(`options[${i}][option_text]`, opt.option_text);
        formData.append(`options[${i}][is_correct]`, opt.is_correct);
        if (opt.option_image)
          formData.append(`options[${i}][option_image]`, opt.option_image);
      });

      await createQuestion(selectedMaterial, formData, token);
      alert("Soal berhasil dibuat!");
      setOpenDialog(false);
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
      alert("Gagal membuat soal.");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("question_text", editingQuestion.question_text);
      if (editingQuestion.question_image)
        formData.append("question_image", editingQuestion.question_image);

      editingQuestion.options.forEach((opt, i) => {
        formData.append(`options[${i}][option_text]`, opt.option_text);
        formData.append(`options[${i}][is_correct]`, opt.is_correct);
        if (opt.option_image)
          formData.append(`options[${i}][option_image]`, opt.option_image);
      });

      await updateQuestion(id, formData, token);
      alert("Soal berhasil diperbarui!");
      setOpenEdit(false);
      fetchQuestions(selectedMaterial);
    } catch (error) {
      console.error("Gagal update soal:", error.response?.data || error);
      alert("Gagal memperbarui soal.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus soal ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await deleteQuestion(id, token);
      fetchQuestions(selectedMaterial);
    } catch (error) {
      console.error("Gagal hapus soal:", error.response?.data || error);
      alert("Gagal menghapus soal.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📘 Kelola Soal
        </h1>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <FaPlus className="mr-2" /> Tambah Soal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Buat Soal Baru</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <Input
                placeholder="Tulis pertanyaan baru..."
                value={newQuestion.question_text}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    question_text: e.target.value,
                  })
                }
              />
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

              <h3 className="font-semibold mt-2">Opsi Jawaban:</h3>
              {newQuestion.options.map((opt, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    placeholder={`Opsi ${i + 1}`}
                    value={opt.option_text}
                    onChange={(e) => {
                      const updated = [...newQuestion.options];
                      updated[i].option_text = e.target.value;
                      setNewQuestion({ ...newQuestion, options: updated });
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const updated = [...newQuestion.options];
                      updated[i].option_image = e.target.files[0];
                      setNewQuestion({ ...newQuestion, options: updated });
                    }}
                  />
                  <input
                    type="checkbox"
                    checked={opt.is_correct === 1}
                    onChange={(e) => {
                      const updated = newQuestion.options.map((o, idx) => ({
                        ...o,
                        is_correct: idx === i ? (e.target.checked ? 1 : 0) : 0,
                      }));
                      setNewQuestion({ ...newQuestion, options: updated });
                    }}
                  />
                  <span>Benar</span>
                </div>
              ))}

              <Button onClick={handleCreate} className="w-full mt-3">
                Simpan Soal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* SELECT MATERI */}
      <select
        value={selectedMaterial}
        onChange={(e) => {
          setSelectedMaterial(e.target.value);
          fetchQuestions(e.target.value);
        }}
        className="border p-2 rounded-md w-full bg-gray-800 text-gray-200"
      >
        <option value="">-- Pilih Materi --</option>
        {materials.map((m) => (
          <option key={m.id} value={m.id}>
            {m.title}
          </option>
        ))}
      </select>

      {/* DAFTAR SOAL */}
      <div className="space-y-3 mt-4">
        {questions.length === 0 ? (
          <p className="text-gray-400 text-center">
            Belum ada soal untuk materi ini.
          </p>
        ) : (
          questions.map((q) => (
            <Card key={q.id} className="bg-gray-800 text-gray-100 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">{q.question_text}</CardTitle>
              </CardHeader>
              <CardContent>
                {q.question_image && (
                  <img
                    src={q.question_image}
                    alt="Gambar Soal"
                    className="max-w-sm mb-3 rounded"
                  />
                )}
                {q.options.map((opt) => (
                  <div
                    key={opt.id}
                    className={`p-2 rounded border mb-2 ${
                      opt.is_correct ? "border-green-400 bg-green-950/40" : "border-gray-700"
                    }`}
                  >
                    {opt.option_text}
                    {opt.option_image && (
                      <img
                        src={opt.option_image}
                        alt="Opsi Gambar"
                        className="max-w-xs mt-1 rounded"
                      />
                    )}
                  </div>
                ))}
                <div className="flex gap-3 mt-3">
                  <Button
                    onClick={() => {
                      setEditingQuestion(q);
                      setOpenEdit(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => handleDelete(q.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <FaTrash />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* DIALOG EDIT */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Soal</DialogTitle>
          </DialogHeader>

          {editingQuestion && (
            <div className="space-y-3">
              <Input
                value={editingQuestion.question_text}
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    question_text: e.target.value,
                  })
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    question_image: e.target.files[0],
                  })
                }
              />
              {editingQuestion.options.map((opt, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={opt.option_text}
                    onChange={(e) => {
                      const updated = [...editingQuestion.options];
                      updated[i].option_text = e.target.value;
                      setEditingQuestion({
                        ...editingQuestion,
                        options: updated,
                      });
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const updated = [...editingQuestion.options];
                      updated[i].option_image = e.target.files[0];
                      setEditingQuestion({
                        ...editingQuestion,
                        options: updated,
                      });
                    }}
                  />
                  <input
                    type="checkbox"
                    checked={opt.is_correct === 1}
                    onChange={(e) => {
                      const updated = editingQuestion.options.map((o, idx) => ({
                        ...o,
                        is_correct: idx === i ? (e.target.checked ? 1 : 0) : 0,
                      }));
                      setEditingQuestion({
                        ...editingQuestion,
                        options: updated,
                      });
                    }}
                  />
                  <span>Benar</span>
                </div>
              ))}
              <Button onClick={() => handleUpdate(editingQuestion.id)} className="w-full">
                Simpan Perubahan
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
