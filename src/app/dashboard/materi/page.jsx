"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
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
  FaImage,
  FaVideo,
} from "react-icons/fa";

export default function MateriPage() {
  const [materials, setMaterials] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    image: null,
    file: null,
    video: null,
  });
  const [preview, setPreview] = useState({ image: null, video: null });

  // Fetch data
  useEffect(() => {
    fetchMaterials();
    return () => {
      if (preview.image) URL.revokeObjectURL(preview.image);
      if (preview.video) URL.revokeObjectURL(preview.video);
    };
  }, []);

  const fetchMaterials = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(
        "https://nauka.vps-poliban.my.id/api/materials",
        { headers }
      );
      setMaterials(res.data.data || []);
    } catch (err) {
      console.error("Gagal memuat data:", err);
      toast.error("Gagal memuat daftar materi.");
    }
  };

  const openAddDialog = () => {
    if (preview.image) URL.revokeObjectURL(preview.image);
    if (preview.video) URL.revokeObjectURL(preview.video);
    setForm({
      id: null,
      title: "",
      description: "",
      image: null,
      file: null,
      video: null,
    });
    setPreview({ image: null, video: null });
    setOpenDialog(true);
  };

  const openEditDialog = (m) => {
    if (preview.image) URL.revokeObjectURL(preview.image);
    if (preview.video) URL.revokeObjectURL(preview.video);
    setForm({
      id: m.id,
      title: m.title || "",
      description: m.description || "",
      image: null,
      file: null,
      video: null,
    });
    setPreview({
      image: m.image || null,
      video: m.video || null,
    });
    setOpenDialog(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setForm((prev) => ({ ...prev, [name]: file }));

      if (name === "image") {
        if (preview.image && preview.image.startsWith("blob:"))
          URL.revokeObjectURL(preview.image);
        setPreview((p) => ({ ...p, image: URL.createObjectURL(file) }));
      } else if (name === "video") {
        if (preview.video && preview.video.startsWith("blob:"))
          URL.revokeObjectURL(preview.video);
        setPreview((p) => ({ ...p, video: URL.createObjectURL(file) }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Silakan login ulang.");

    if (!form.title?.trim() || !form.description?.trim())
      return toast.error("Judul dan deskripsi wajib diisi.");

    const isCreate = !form.id;
    if (isCreate && (!form.image || !form.file))
      return toast.error("Untuk membuat materi baru: Gambar dan PDF wajib diupload.");

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      if (form.image) data.append("image", form.image);
      if (form.file) data.append("file", form.file);
      if (form.video) data.append("video", form.video);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      let res;
      if (isCreate) {
        res = await axios.post(
          "https://nauka.vps-poliban.my.id/api/materials",
          data,
          { headers }
        );
        toast.success("Materi berhasil ditambahkan.");
      } else {
        res = await axios.post(
          `https://nauka.vps-poliban.my.id/api/materials/${form.id}?_method=PUT`,
          data,
          { headers }
        );
        toast.success("Materi berhasil diperbarui.");
      }

      const saved = res.data.data;
      setMaterials((prev) =>
        isCreate ? [saved, ...prev] : prev.map((m) => (m.id === saved.id ? saved : m))
      );
      setOpenDialog(false);
    } catch (err) {
      console.error("Error saat menyimpan:", err);
      toast.error("Gagal menyimpan materi.");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Hapus pakai Alert Dialog
  const confirmDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Silakan login ulang.");
      return;
    }

    try {
      await axios.delete(`https://nauka.vps-poliban.my.id/api/materials/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials((prev) => prev.filter((m) => m.id !== deleteId));
      toast.success("Materi berhasil dihapus.");
    } catch (err) {
      console.error("Gagal menghapus:", err);
      toast.error("Gagal menghapus materi.");
    } finally {
      setOpenDeleteDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Daftar Materi */}
      <Card className="bg-gradient-to-b from-[#262626] to-[#2f2f2f] max-w-5xl mx-auto border border-gray-700 rounded-xl shadow-lg">
        <CardHeader className="flex justify-between items-center border-b border-gray-700 pb-3">
          <CardTitle className="text-gray-100 text-lg flex items-center gap-2">
            <FaBookOpen className="text-green-500" /> Daftar Materi
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
            <p className="text-gray-400 text-center py-4 italic">Belum ada materi.</p>
          ) : (
            materials.map((m) => (
              <div
                key={m.id}
                className="flex justify-between items-center bg-[#303030] hover:bg-[#3a3a3a] border border-gray-700 p-4 rounded-lg transition-all duration-200"
              >
                <div className="flex flex-col max-w-[70%]">
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
                    onClick={() => confirmDelete(m.id)}
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

      {/* 🟢 Dialog Form Tambah/Edit */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-[#2A2A2A] max-h-[90vh] overflow-y-auto md:max-w-4xl max-w-lg w-full border border-gray-700 text-gray-100 rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Materi" : "Tambah Materi"}</DialogTitle>
          </DialogHeader>

          {/* Grid Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-3">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Judul</label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Masukkan judul materi..."
                className="bg-[#353535] border-gray-600 text-gray-100 py-6"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                <FaFileUpload /> File PDF
              </label>
              <Input
                type="file"
                name="file"
                accept=".pdf"
                onChange={handleChange}
                className="bg-[#353535] border-gray-600 pb-10 text-gray-100 file:text-gray-100 file:bg-[#444] file:border-0 file:px-3 file:py-1 file:rounded file:cursor-pointer"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                <FaImage /> Gambar
              </label>
              <Input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="bg-[#353535] border-gray-600 pb-10 text-gray-100 file:text-gray-100 file:bg-[#444] file:border-0 file:px-3 file:py-1 file:rounded file:cursor-pointer"
              />
              {preview.image && (
                <img
                  src={preview.image}
                  alt="preview"
                  className="mt-3 rounded-lg w-full h-40 object-cover border border-gray-700"
                />
              )}
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                <FaVideo /> Video
              </label>
              <Input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
                className="bg-[#353535] border-gray-600 pb-10 text-gray-100 file:text-gray-100 file:bg-[#444] file:border-0 file:px-3 file:py-1 file:rounded file:cursor-pointer"
              />
              {preview.video && (
                <video
                  controls
                  src={preview.video}
                  className="mt-3 w-full rounded-lg h-48 object-cover border border-gray-700"
                />
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-400 mb-1 block">Deskripsi</label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi..."
                className="bg-[#353535] border-gray-600 text-gray-100 min-h-[120px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
              className="border-gray-600 text-gray-300 hover:bg-[#3a3a3a]"
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

      {/* 🔴 Dialog Konfirmasi Hapus */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="bg-[#2A2A2A] border border-gray-700 text-gray-100 rounded-xl shadow-lg max-w-sm">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300 py-2">
            Apakah kamu yakin ingin menghapus materi ini?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
              className="border-gray-600 text-gray-300 hover:bg-[#3a3a3a]"
            >
              Batal
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
