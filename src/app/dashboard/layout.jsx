"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaBookOpen,
  FaRegHeart,
  FaUsers,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { getUserProfile } from "@/api/user/profilApi";

const DashboardLayout = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [token, setToken] = useState(null);

  // ambil data profil pengajar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      const fetchProfile = async () => {
        try {
          const data = await getUserProfile(storedToken);
          setProfile(data);
        } catch (error) {
          console.error("Gagal memuat profil:", error);
        }
      };
      fetchProfile();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1C1C1C] to-[#242424] text-gray-100 font-inter">
      {/* HEADER */}
      <header className="flex justify-between items-center bg-gradient-to-r from-[#232323] to-[#2C2C2C] border-b border-gray-700 px-6 py-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          {/* Sidebar */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:bg-[#3A3A3A] hover:text-white"
              >
                <FaBars className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 p-0 bg-[#262626] text-gray-200 border-r border-gray-700 overflow-y-auto"
            >
              <SheetHeader className="p-4 border-b border-gray-700 bg-[#202020]">
                <SheetTitle className="text-lg font-semibold tracking-wide">
                  <div className="text-2xl font-bold text-center py-2">
                    <span className="text-white">NA</span>
                    <span className="text-green-400 text-3xl underline">U</span>
                    <span className="text-white">KA</span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-2 p-4 text-sm">
                {[
                  { icon: <FaHome />, label: "Beranda", href: "/dashboard" },
                  {
                    icon: <FaBookOpen />,
                    label: "Materi",
                    href: "/dashboard/materi",
                  },
                  {
                    icon: <FaRegHeart />,
                    label: "Video",
                    href: "/dashboard/video",
                  },
                  {
                    icon: <FaUsers />,
                    label: "Pengguna",
                    href: "/dashboard/pengguna",
                  },
                ].map((item, i) => (
                  <Link key={i} href={item.href} className="w-full">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-[#3A3A3A] rounded-lg transition"
                    >
                      {item.icon} {item.label}
                    </Button>
                  </Link>
                ))}

                <Separator className="my-3 bg-gray-700" />

                <Button
                  variant="destructive"
                  className="justify-start gap-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  <FaSignOutAlt className="w-4 h-4" /> Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          <h1 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-2">
            <MdOutlineDashboardCustomize className="text-green-400" />
            Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-[#3A3A3A] text-gray-300 hover:text-white"
          >
            <FaBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </Button>

         

          {/* Avatar */}
          <div className="flex items-center ">
            <Avatar className="w-12 h-12 md:w-12 md:h-12 border border-green-500 cursor-pointer">
              <AvatarImage
                src={previewImage || profile?.photo_profile || "/default-avatar.png"}
                alt={profile?.name || "User"}
              />
              <AvatarFallback>{profile?.name?.charAt(0) || "?"}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 p-6">{children}</main>

      {/* FOOTER */}
      <footer className="bg-[#2C2C2C] text-gray-400 py-4 text-center text-sm">
        © 2025 Nauka — All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;
