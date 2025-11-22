"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaRegUser,
  FaPhoneAlt,
} from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { register } from "@/api/registerApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    id_number: "",
    role: "",
    phone: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Debug log
    console.log("Data yang dikirim ke API:", formData);

    if (
      !formData.name ||
      !formData.username ||
      !formData.id_number ||
      !formData.role ||
      !formData.phone ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Semua kolom wajib diisi!");
      return;
    }

    console.log("Data yang dikirim ke API:", formData);

    try {
      const response = await register(formData);
      console.log("Respons dari API:", response);
      console.log("Data yang dikirim ke API:", formData);

      if (response?.token) {
        toast.success("Registrasi berhasil!");
        router.push("/beranda");
      } else {
        toast.error(
          response?.message || "Registrasi gagal. Silakan coba lagi."
        );
      }
    } catch (error) {
      console.error("Error saat register:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat registrasi."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="max-w-lg w-full p-6 rounded-xl space-y-8">
        <h1 className="text-4xl font-bold text-center mb-20">
          <span className="text-white">NA</span>
          <span className="text-green-400 text-5xl underline">U</span>
          <span className="text-white">KA</span>
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Nama Lengkap */}
          <div className="relative flex justify-center items-center">
            <Input
              className="py-6"
              placeholder="Nama Lengkap"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FaRegUser className="absolute right-3 text-gray-400" />
          </div>

          {/* Username */}
          <div className="relative flex justify-center items-center">
            <Input
              className="py-6"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <FaRegUser className="absolute right-3 text-gray-400" />
          </div>

          {/* ID Number */}
          <div className="relative flex justify-center items-center">
            <Input
              className="py-6"
              placeholder="ID Number"
              name="id_number"
              value={formData.id_number}
              onChange={handleChange}
            />
            <FaRegUser className="absolute right-3 text-gray-400" />
          </div>

          {/* Role */}
          <Select onValueChange={handleRoleChange}>
            <SelectTrigger className="w-full py-6 border-0 text-gray-400 bg-[#2A2A2A]">
              <SelectValue placeholder="Pilih Role" />
            </SelectTrigger>
            <SelectContent className="bg-[#2A2A2A] text-gray-400">
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                <SelectItem value="pelajar">Murid</SelectItem>
                <SelectItem value="pengajar">Pengajar</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* No Telepon */}
          <div className="relative flex justify-center items-center">
            <Input
              className="py-6"
              placeholder="No Telepon"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <FaPhoneAlt className="absolute right-3 text-gray-400" />
          </div>

          {/* Email */}
          <div className="relative flex justify-center items-center">
            <Input
              className="py-6"
              placeholder="Alamat Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FaEnvelope className="absolute right-3 text-gray-400" />
          </div>

          {/* Password */}
          <div className="relative flex justify-center items-center">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              className="py-6"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <Button
            variant="default"
            className="w-full mt-4"
            size="lg"
            type="submit"
          >
            Daftar
          </Button>
        </form>

        <p className="text-sm lg:text-base text-gray-400 mt-6 text-center">
          Sudah punya akun?{" "}
          <Link href="/" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
