"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaFileUpload,
  FaBookOpen,
} from "react-icons/fa";

export default function MateriPage() {
  const [materials, setMaterials] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    image: null,
    file: null,
    video: null,
  });

  // 🟢 1. GET DATA dari API
  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(
        "https://nauka.vps-poliban.my.id/api/materials"
      );
      setMaterials(res.data.data || []);
    } catch (err) {
      console.error("Gagal memuat data:", err);
      alert("Gagal memuat daftar materi.");
    }
  };

  // 🟢 2. Buka dialog tambah
  const openAddDialog = () => {
    setForm({
      id: null,
      title: "",
      description: "",
      image: null,
      file: null,
      video: null,
    });
    setOpenDialog(true);
  };

  // 🟢 3. Edit
  const openEditDialog = (m) => {
    setForm({
      id: m.id,
      title: m.title,
      description: m.description || "",
      image: null,
      file: null,
      video: null,
    });
    setOpenDialog(true);
  };

  // 🟢 4. Handle input perubahan
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 🟢 5. Simpan ke API
  const handleSave = async () => {
    const token = localStorage.getItem("token"); // pastikan token tersimpan setelah login

    if (!token) {
      alert("Token tidak ditemukan. Silakan login ulang.");
      return;
    }
 setLoading(true); // 🟢 tambahkan ini
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);
    if (form.file) data.append("file", form.file);
    if (form.video) data.append("video", form.video);

    try {
      const res = await axios.post(
        "https://nauka.vps-poliban.my.id/api/materials",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // 🟢 penting
          },
        }
      );

      const newMaterial = res.data.data;
      setMaterials([newMaterial, ...materials]); // tambahkan ke atas
      setOpenDialog(false);
    } catch (err) {
      console.error("Error saat menyimpan:", err.response?.data || err.message);
      alert(
        "Gagal menyimpan data: " +
          (err.response?.data?.message || "Lihat console untuk detail.")
      );
    } finally {
      setLoading(false);
    }
  };

  // 🟢 6. Delete (opsional lokal saja dulu)
  const deleteMaterial = (id) => {
    if (confirm("Yakin ingin menghapus materi ini?")) {
      setMaterials(materials.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* List Materi */}
      <Card className="bg-gradient-to-b from-[#262626] to-[#2f2f2f] max-w-5xl mx-auto border border-gray-700 rounded-xl shadow-lg">
        <CardHeader className="flex justify-between items-center border-b border-gray-700 pb-3">
          <CardTitle className="text-gray-100 text-lg flex items-center gap-2">
            <FaBookOpen className="text-green-500" />
            Daftar Materi
          </CardTitle>
          <Button
            onClick={openAddDialog}
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 px-4"
          >
            <FaPlus /> Tambah Materi
          </Button>
        </CardHeader>

        <CardContent className="space-y-3 mt-3">
          {materials.length === 0 ? (
            <p className="text-gray-400 text-center py-4 italic">
              Belum ada materi.
            </p>
          ) : (
            materials.map((m) => (
              <div
                key={m.id}
                className="flex justify-between items-center bg-[#303030] hover:bg-[#3a3a3a] border border-gray-700 p-4 rounded-lg transition-all duration-200"
              >
                <div className="flex flex-col">
                  <p className="text-gray-200 font-medium">{m.title}</p>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {m.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => openEditDialog(m)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => deleteMaterial(m.id)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Modal Form */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-[#2A2A2A] border border-gray-700 text-gray-100 rounded-xl shadow-lg max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {form.id ? "Edit Materi" : "Tambah Materi"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-2">
            {/* Judul */}
            <div>
              <label className="text-sm text-gray-400">Judul</label>
              <Input
                name="title"
                placeholder="Masukkan judul materi..."
                value={form.title}
                onChange={handleChange}
                className="bg-[#353535] border-gray-600 text-gray-100"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="text-sm text-gray-400">Deskripsi</label>
              <Textarea
                name="description"
                placeholder="Masukkan deskripsi..."
                value={form.description}
                onChange={handleChange}
                className="bg-[#353535] border-none text-gray-100"
              />
            </div>

            {/* Upload Gambar */}
            <div>
              <label className="text-sm text-gray-400">Gambar</label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="bg-[#353535] border-gray-600 text-gray-100 file:text-gray-100 file:bg-[#444] file:border-0 file:px-3 file:py-1 file:rounded file:cursor-pointer"
                />
                <FaFileUpload className="text-gray-400" />
              </div>
            </div>

            {/* Upload File */}
            <div>
              <label className="text-sm text-gray-400">File PDF</label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  name="file"
                  accept=".pdf"
                  onChange={handleChange}
                  className="bg-[#353535] border-gray-600 text-gray-100 file:text-gray-100 file:bg-[#444] file:border-0 file:px-3 file:py-1 file:rounded file:cursor-pointer"
                />
                <FaFileUpload className="text-gray-400" />
              </div>
            </div>

            {/* Upload Video */}
            <div>
              <label className="text-sm text-gray-400">Video</label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleChange}
                  className="bg-[#353535] border-gray-600 text-gray-100 file:text-gray-100 file:bg-[#444] file:border-0 file:px-3 file:py-1 file:rounded file:cursor-pointer"
                />
                <FaFileUpload className="text-gray-400" />
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2 pt-3">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-[#3a3a3a]"
              onClick={() => setOpenDialog(false)}
            >
              Batal
            </Button>
            <Button
              disabled={loading}
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
