"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/api/loginApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // data api
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // variabel useRoute
  const route = useRouter();
  // function handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password);
      toast.success("Selamat Login Berhasil");
      console.log("Response:", data);
      if (data.token) localStorage.setItem("token", data.token);
      route.push("/beranda");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Login gagal");
      } else if (error.request) {
        setMessage("Tidak ada respons dari server");
      } else {
        setMessage("username dan sandi tidak sesuai");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="max-w-lg w-full p-6 rounded-xl space-y-8">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-center mb-20">
          <span className="text-white">NA</span>
          <span className="text-green-400 text-5xl underline">U</span>
          <span className="text-white">KA</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <p className="text-red-500 font-semibold">{message}</p>
          {/* Input Email */}
          <div className="relative flex justify-center items-center">
            <Input
              type="text"
              className="py-6"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaEnvelope className="absolute right-3 text-gray-400" />
          </div>

          {/* Input Password */}
          <div className="relative flex justify-center items-center">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              className="py-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3  text-gray-400 "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Tombol Masuk */}
          <Button
            type="submit"
            variant="default"
            className="w-full mt-4"
            size="lg"
          >
            Masuk
          </Button>
        </form>

        {/* Lupa password */}
        <p className="text-sm lg:text-base text-gray-400 mt-3 text-center cursor-pointer hover:underline hover:text-green-400">
          Lupa kata sandi?
        </p>
        {/* Daftar */}
        <p className="text-sm lg:text-base text-gray-400 mt-6 text-center">
          Belum punya akun ?{" "}
          <Link href="/register" className="text-green-500 hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
