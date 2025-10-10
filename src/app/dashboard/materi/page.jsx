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
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    image: null, // File object
    file: null, // File object (pdf)
    video: null, // File object (video)
  });

  const [preview, setPreview] = useState({ image: null, video: null });

  // Ambil data dari API (pakai token kalau ada)
  useEffect(() => {
    fetchMaterials();
    // cleanup preview URLs on unmount
    return () => {
      if (preview.image) URL.revokeObjectURL(preview.image);
      if (preview.video) URL.revokeObjectURL(preview.video);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      console.error(
        "Gagal memuat data:",
        err.response?.data || err.message || err
      );
      alert("Gagal memuat daftar materi. Cek console untuk detail.");
    }
  };

  // open dialog untuk tambah
  const openAddDialog = () => {
    // revoke old previews
    if (preview.image) {
      URL.revokeObjectURL(preview.image);
    }
    if (preview.video) {
      URL.revokeObjectURL(preview.video);
    }

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

  // open dialog untuk edit (pre-fill title/description only; files optional)
  const openEditDialog = (m) => {
    if (preview.image) {
      URL.revokeObjectURL(preview.image);
    }
    if (preview.video) {
      URL.revokeObjectURL(preview.video);
    }

    setForm({
      id: m.id,
      title: m.title || "",
      description: m.description || "",
      image: null,
      file: null,
      video: null,
    });
    setPreview({
      image: m.image || null, // if backend provides image URL, show it
      video: m.video || null, // if backend provides video URL
    });
    setOpenDialog(true);
  };

  // handle input change (text or file)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setForm((prev) => ({ ...prev, [name]: file }));

      if (name === "image") {
        // revoke old preview
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

  // Save (create or update)
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Silakan login ulang.");
      return;
    }

    // Basic validation:
    if (!form.title?.trim() || !form.description?.trim()) {
      toast.error("Judul dan deskripsi wajib diisi.");
      return;
    }

    // For create, image + file are required by backend (based on earlier errors)
    const isCreate = !form.id;
    if (isCreate && (!form.image || !form.file)) {
      toast.error("Untuk membuat materi baru: Gambar dan File PDF wajib diupload.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);

      // append files only if present (for edit, they can be omitted)
      if (form.image) data.append("image", form.image);
      if (form.file) data.append("file", form.file);
      if (form.video) data.append("video", form.video);

      
      let res;
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      if (isCreate) {
        res = await axios.post(
          "https://nauka.vps-poliban.my.id/api/materials",
          data,
          { headers }
        );
      } else {
        
        res = await axios.post(
          `https://nauka.vps-poliban.my.id/api/materials/${form.id}?_method=PUT`,
          data,
          { headers }
        );
      }

      const saved = res.data.data;
      if (isCreate) {
        setMaterials((prev) => [saved, ...prev]);
      } else {
        setMaterials((prev) =>
          prev.map((m) => (m.id === saved.id ? saved : m))
        );
      }

      setOpenDialog(false);
    } catch (err) {
      // detailed error logging
      console.error("Error saat menyimpan:", err);
      if (err.response) {
        console.error("RESPONSE STATUS:", err.response.status);
        console.error("RESPONSE DATA:", err.response.data);
        const msg =
          err.response.data?.message ||
          JSON.stringify(err.response.data) ||
          "Server menolak request.";
        alert("Gagal menyimpan: " + msg);
      } else if (err.request) {
        console.error("REQUEST INFO:", err.request);
        alert("Tidak ada respon dari server. Cek koneksi / CORS.");
      } else {
        console.error("AXIOS ERROR:", err.message);
        alert("Terjadi error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // function delate
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus materi ini?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Silakan login ulang.");
      return;
    }

    try {
      await axios.delete(
        `https://nauka.vps-poliban.my.id/api/materials/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMaterials((prev) => prev.filter((m) => m.id !== id));
      toast.success("Materi berhasil dihapus.");
    } catch (err) {
      console.error("Gagal menghapus:", err);
      if (err.response) {
        toast.error(
          "Gagal menghapus: " +
            (err.response.data?.message || JSON.stringify(err.response.data))
        );
      } else {
        toast.error("Gagal menghapus. Periksa koneksi.");
      }
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
                    onClick={() => handleDelete(m.id)}
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
        <DialogContent className="bg-[#2A2A2A] max-h-[90vh] overflow-y-auto md:!max-w-4xl max-w-lg w-full border border-gray-700 text-gray-100 rounded-xl shadow-lg ">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {form.id ? "Edit Materi" : "Tambah Materi"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-3">
            {/* Judul */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-400 mb-1">Judul</label>
              <Input
                name="title"
                placeholder="Masukkan judul materi..."
                value={form.title}
                onChange={handleChange}
                className="bg-[#353535] border-gray-600 text-gray-100 py-6"
              />
            </div>

            {/* File PDF */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                <FaFileUpload /> File PDF
              </label>
              <Input
                type="file"
                name="file"
                accept=".pdf"
                onChange={handleChange}
                className="bg-[#353535] border-gray-600 pb-10 text-gray-100 
                 file:text-gray-100 file:bg-[#444] file:border-0 
                 file:px-3 file:py-1 file:rounded file:cursor-pointer"
              />
            </div>

            {/* Gambar */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                <FaImage /> Gambar
              </label>
              <Input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="bg-[#353535] border-gray-600 text-gray-100 pb-10 
                 file:text-gray-100 file:bg-[#444] file:border-0 
                 file:px-3 file:py-1 file:rounded file:cursor-pointer"
              />
              {preview.image && (
                <img
                  src={preview.image}
                  alt="preview"
                  className="mt-3 rounded-lg w-full h-40 object-cover border border-gray-700"
                />
              )}
            </div>

            {/* Video */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                <FaVideo /> Video
              </label>
              <Input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
                className="bg-[#353535] border-gray-600 pb-10 text-gray-100 
                 file:text-gray-100 file:bg-[#444] file:border-0 
                 file:px-3 file:py-1 file:rounded file:cursor-pointer"
              />
              {preview.video && (
                <video
                  controls
                  src={preview.video}
                  className="mt-3 w-full rounded-lg h-48 object-cover border border-gray-700"
                />
              )}
            </div>

            {/* Deskripsi (full width) */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm text-gray-400 mb-1">Deskripsi</label>
              <Textarea
                name="description"
                placeholder="Masukkan deskripsi..."
                value={form.description}
                onChange={handleChange}
                className="bg-[#353535] border-gray-600 text-gray-100 min-h-[120px]"
              />
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
