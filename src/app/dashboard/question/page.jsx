"use client";
import { useEffect, useState } from "react";
import { createQuestion } from "@/api/question/createQuestionApi";
import { getQuestions } from "@/api/question/getQuestionApi";
import { deleteQuestion } from "@/api/question/deleteQuestionApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaTrash, FaPlus, FaImage, FaCheckCircle } from "react-icons/fa";

const TestingPage = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

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

  //   handle update

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("question_text", editQuestion.question_text);
      if (editQuestion.question_image) {
        formData.append("question_image", editQuestion.question_image);
      }

      editQuestion.options.forEach((opt, i) => {
        formData.append(`options[${i}][option_text]`, opt.option_text);
        if (opt.option_image) {
          formData.append(`options[${i}][option_image]`, opt.option_image);
        }
        formData.append(`options[${i}][is_correct]`, opt.is_correct);
      });

      await updateQuestion(editQuestion.id, formData, token);
      alert("✅ Soal berhasil diupdate!");
      fetchQuestions(selectedMaterial);
      setShowEditDialog(false);
    } catch (error) {
      console.error("❌ Gagal update soal:", error.response?.data || error);
      alert("Gagal update soal. Cek console untuk detail.");
    }
  };

  // Fetch materials
  const fetchMaterials = async () => {
    const res = await fetch("https://nauka.vps-poliban.my.id/api/materials");
    const data = await res.json();
    setMaterials(data.data || []);
  };

  // Fetch questions
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

  // Create question
  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = { ...newQuestion };
      await createQuestion(selectedMaterial, payload, token);
      setShowDialog(false);
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

  // Delete question
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await deleteQuestion(id, token);
    fetchQuestions(selectedMaterial);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 bg-[#2A2A2A] text-gray-100 rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-4">
        Kelola Soal Materi
      </h1>

      {/* Pilih Materi */}
      <div className="bg-[#2A2A2A] rounded-lg p-4 shadow-md">
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Pilih Materi:
        </label>
        <select
          value={selectedMaterial}
          onChange={(e) => {
            setSelectedMaterial(e.target.value);
            fetchQuestions(e.target.value);
          }}
          className="bg-[#2A2A2A] border border-gray-600 p-2 rounded-md w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="">-- Pilih Materi --</option>
          {materials.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>
      </div>

      {/* Tombol Tambah Soal */}
      <div className="flex justify-end">
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
              <FaPlus /> Tambah Soal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#2A2A2A] text-gray-100 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-green-400">
                Tambah Soal Baru
              </DialogTitle>
            </DialogHeader>

            {/* Form Tambah Soal */}
            <div className="space-y-4 mt-2">
              <Input
                placeholder="Tulis pertanyaan..."
                className="bg-[#2A2A2A] border border-gray-600 text-gray-100"
                value={newQuestion.question_text}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    question_text: e.target.value,
                  })
                }
              />

              <div>
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FaImage className="text-green-400" /> Upload Gambar Soal
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 text-sm text-gray-300"
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      question_image: e.target.files[0],
                    })
                  }
                />
              </div>

              <h3 className="font-semibold text-gray-200 mt-3">
                Opsi Jawaban:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {newQuestion.options.map((opt, index) => (
                  <div
                    key={index}
                    className="p-3 border border-gray-600 rounded-md bg-[#2A2A2A] space-y-2"
                  >
                    <Input
                      placeholder={`Opsi ${index + 1}`}
                      className="bg-[#2A2A2A] border border-gray-500 text-gray-300"
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
                      className="text-sm text-gray-400"
                      onChange={(e) => {
                        const updated = [...newQuestion.options];
                        updated[index].option_image = e.target.files[0];
                        setNewQuestion({ ...newQuestion, options: updated });
                      }}
                    />
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={opt.is_correct === 1}
                        onChange={(e) => {
                          const updated = newQuestion.options.map((o, i) => ({
                            ...o,
                            is_correct:
                              i === index ? (e.target.checked ? 1 : 0) : 0,
                          }));
                          setNewQuestion({ ...newQuestion, options: updated });
                        }}
                      />
                      <span className="text-green-400">Tandai Benar</span>
                    </label>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleCreate}
                className="mt-4 bg-green-600 hover:bg-green-700 w-full"
              >
                Simpan Soal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* List Soal */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <p className="text-gray-400 italic text-center mt-8">
            Belum ada soal untuk materi ini.
          </p>
        ) : (
          questions.map((q) => (
            <Card key={q.id} className="bg-[#2A2A2A]  text-gray-100 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-green-400">
                  {q.question_text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {q.question_image && (
                  <img
                    src={q.question_image}
                    alt="Gambar Soal"
                    className="rounded-md max-h-48 object-contain border border-gray-700 mb-3"
                  />
                )}

                <div className="grid md:grid-cols-2 gap-3">
                  {q.options.map((opt) => (
                    <div
                      key={opt.id}
                      className={`p-2 border rounded-md ${
                        opt.is_correct
                          ? "border-green-500 bg-green-900/30"
                          : "border-gray-700 bg-[#2A2A2A]/40"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {opt.is_correct && (
                          <FaCheckCircle className="text-green-400" />
                        )}
                        <span>{opt.option_text}</span>
                      </div>
                      {opt.option_image && (
                        <img
                          src={opt.option_image}
                          alt="Opsi"
                          className="max-h-32 mt-2 rounded-md border border-gray-600 object-contain"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Tombol Hapus */}
                <div className="flex justify-end mt-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
                      >
                        <FaTrash /> Hapus
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#2A2A2A] text-gray-100 border-none">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Yakin ingin menghapus soal ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-[#2A2A2A] hover:bg-primary text-gray-100">
                          Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(q.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
    </div>
  );
};

export default TestingPage;
