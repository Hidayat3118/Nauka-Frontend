"use client";

import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaRegUser, FaPhoneAlt } from "react-icons/fa";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="max-w-lg w-full p-6 rounded-xl space-y-8">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-center mb-20">
          <span className="text-white">NA</span>
          <span className="text-green-400 text-5xl underline">U</span>
          <span className="text-white">KA</span>
        </h1>

        <div className="space-y-4">
          {/* Input Email */}
          <div className="relative flex justify-center items-center">
            <Input className="py-6" placeholder="Nama Lengkap" />
            <FaRegUser className="absolute right-3 text-gray-400" />
          </div>

          {/* No Telepon */}
          <div className="relative flex justify-center items-center">
            <Input className="py-6" placeholder="No Telepon" />
            <FaPhoneAlt className="absolute right-3 text-gray-400" />
          </div>

          {/* Alamat Email */}
          <div className="relative flex justify-center items-center">
            <Input className="py-6" placeholder="Alamat Email" />
            <FaEnvelope className="absolute right-3 text-gray-400" />
          </div>

          {/* Input Password */}
          <div className="relative flex justify-center items-center">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              className="py-6"
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
          <Button variant="default" className="w-full mt-4" size="lg">
            Daftar
          </Button>
        </div>

        {/* Daftar */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          Belum punya akun ?{" "}
          <a href="#" className="text-green-500 hover:underline">
            Daftar
          </a>
        </p>
      </div>
    </div>
  );
}
