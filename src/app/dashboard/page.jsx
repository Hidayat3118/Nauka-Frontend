"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FaUserGraduate,
  FaBookOpen,
  FaRegHeart,
  FaUsers,
  FaArrowUp,
} from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { BsGraphUp } from "react-icons/bs";
import { useState } from "react";

export default function DashboardPage() {
  const [user] = useState({
    name: "Muhammad Hidayat",
    avatar: "/default-avatar.png",
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1C1C1C] to-[#242424] text-gray-100 font-inter">
     

      {/* MAIN CONTENT */}
      <main className="flex-1  grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* LEFT COLUMN - Stats */}
        <section className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: <FaUserGraduate className="text-blue-400 text-2xl" />,
                title: "Total Pengguna",
                value: "1,245",
                note: "+10 hari ini",
                gradient: "from-[#222] to-[#2E2E2E]",
              },
              {
                icon: <FaBookOpen className="text-purple-400 text-2xl" />,
                title: "Materi Aktif",
                value: "32",
                note: "+2 minggu ini",
                gradient: "from-[#262626] to-[#353535]",
              },
              {
                icon: <FaRegHeart className="text-pink-400 text-2xl" />,
                title: "Like Hari Ini",
                value: "87",
                note: "+14 dibanding kemarin",
                gradient: "from-[#292929] to-[#3B3B3B]",
              },
            ].map((stat, i) => (
              <Card
                key={i}
                className={`bg-gradient-to-b ${stat.gradient} border border-gray-700 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <CardHeader className="flex items-center justify-between pb-1">
                  <CardTitle className="flex items-center gap-3 text-gray-300">
                    {stat.icon}
                    <span className="text-base font-medium">{stat.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart Section */}
          <Card className="bg-gradient-to-b from-[#242424] to-[#2D2D2D] border border-gray-700 rounded-xl shadow-md p-4">
            <CardHeader className="flex justify-between items-center pb-3">
              <CardTitle className="text-gray-200 flex items-center gap-2">
                <BsGraphUp className="text-indigo-400" /> Statistik Aktivitas
              </CardTitle>
              <span className="text-sm text-green-400 flex items-center gap-1">
                <FaArrowUp /> +8% minggu ini
              </span>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-36">
                {[50, 80, 65, 90, 60, 100, 75].map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-indigo-800 to-indigo-500 rounded-md transition-all hover:opacity-80"
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RIGHT COLUMN */}
        <section className="space-y-6">
          {/* Aktivitas Terbaru */}
          <Card className="bg-[#262626] border border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all">
            <CardHeader className="border-b border-gray-700 pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-300">
                <IoMdAnalytics className="text-indigo-400" /> Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 mt-3">
              {[
                {
                  user: "Alif",
                  action: "menambahkan materi baru",
                  time: "5 menit lalu",
                },
                {
                  user: "Husein",
                  action: "memberikan like pada video",
                  time: "10 menit lalu",
                },
                {
                  user: "Azhar",
                  action: "menghapus materi logaritma",
                  time: "1 jam lalu",
                },
              ].map((act, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-[#323232] border border-gray-700 rounded-lg p-3 hover:bg-[#3A3A3A] transition-all"
                >
                  <span className="text-gray-200 text-sm">
                    <strong className="text-white">{act.user}</strong>{" "}
                    {act.action}
                  </span>
                  <span className="text-xs text-gray-500">{act.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card className="bg-gradient-to-b from-[#242424] to-[#2F2F2F] border border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all">
            <CardHeader className="border-b border-gray-700 pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-300">
                <FaUsers className="text-blue-400" /> Tim Aktif
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 mt-3">
              {["Aisyah", "Rizky", "Husein", "Azhar"].map((member, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-white"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{member.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{member}</span>
                  </div>
                  <div className="w-24 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${60 + i * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-[#2C2C2C] to-[#1E1E1E] border-t border-gray-700 text-gray-400 py-4 text-center text-sm">
        © 2025 <span className="font-semibold text-gray-200">Nauka</span> — All
        rights reserved.
      </footer>
    </div>
  );
}
