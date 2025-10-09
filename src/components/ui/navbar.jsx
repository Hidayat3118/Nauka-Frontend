"use client";
import { FaBell } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { logout } from "@/api/logoutApi";
import { getUserProfile } from "@/api/user/profilApi";
import { updateUserProfile } from "@/api/user/updateApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import LoadingSpinner from "@/components/ui/loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // ambil data profil user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return console.warn("Token tidak ditemukan.");
        const data = await getUserProfile(token);
        setProfile(data);
      } catch (error) {
        console.error("Gagal memuat profil:", error);
      }
    };
    fetchProfile();
  }, []);

  // logout
  const handleLogout = async () => {
    try {
      const response = await logout();
      localStorage.removeItem("token");
      if (response) toast.success("Logout berhasil");
      router.push("/login");
    } catch (error) {
      toast.error("Terjadi kesalahan saat logout");
    }
  };

  // update profil
  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token tidak ditemukan. Silakan login ulang.");
        return;
      }

      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("email", profile.email);
      if (profile.photo_profile instanceof File) {
        formData.append("photo_profile", profile.photo_profile);
      }

      await updateUserProfile(token, formData);
      toast.success("Profil berhasil diperbarui ");
    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui profil ");
    }
  };

  if (!profile) return <LoadingSpinner />;

  return (
    <nav className="fixed top-0 lg:top-4 left-0 right-0 z-50">
      <div className="max-w-4xl mx-auto px-6 flex justify-between items-center md:border-2 md:border-[#2A2A2A] py-6 lg:rounded-full shadow-xl bg-primary">
        {/* Logo */}
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-center">
            <span className="text-white">NA</span>
            <span className="text-green-400 text-2xl lg:text-3xl underline">U</span>
            <span className="text-white">KA</span>
          </h1>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-2 lg:space-x-4 text-white text-lg lg:text-xl">
          {/* Notifikasi */}
          <div className="bg-[#2A2A2A] h-10 w-10 lg:h-12 lg:w-12 rounded-full flex justify-center hover:text-green-400">
            <Tooltip>
              <TooltipTrigger>
                <FaBell className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifikasi</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Avatar + Edit Profile */}
          <Sheet>
            <SheetTrigger asChild>
              <Avatar className="w-12 h-12 md:w-14 md:h-14 border border-green-500 cursor-pointer">
                <AvatarImage src={previewImage || profile.photo_profile} alt={profile.name} />
                <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </SheetTrigger>

            <SheetContent side="right" className="bg-primary text-white border-none shadow-none">
              <SheetHeader>
                <div className="flex flex-col items-center gap-4">
                  {/* foto profil */}
                  <Avatar className="w-16 h-16 md:w-32 md:h-32 border border-green-500">
                    <AvatarImage src={previewImage || profile.photo_profile} alt={profile.name} />
                    <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <SheetTitle className="text-xl font-semibold text-center text-white">
                    Edit Profile
                  </SheetTitle>
                </div>
                <SheetDescription className="text-center mt-2 text-gray-400">
                  Ubah data profilmu lalu klik <b>Save Changes</b> untuk menyimpan.
                </SheetDescription>
              </SheetHeader>

              {/* Form Profil */}
              <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-4">
                {/* Nama */}
                <div className="grid gap-3">
                  <Label htmlFor="profile-name">Nama Lengkap</Label>
                  <Input
                    id="profile-name"
                    type="text"
                    value={profile.name || ""}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>

                {/* Email */}
                <div className="grid gap-3">
                  <Label htmlFor="profile-email">Email</Label>
                  <Input
                    id="profile-email"
                    type="email"
                    value={profile.email || ""}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>

                {/* Role (tidak bisa diubah) */}
                <div className="grid gap-3">
                  <Label htmlFor="profile-role">Role</Label>
                  <Input
                    id="profile-role"
                    type="text"
                    value={profile.role || ""}
                    readOnly
                    className="cursor-default bg-gray-700/30 capitalize"
                  />
                </div>

                {/* Foto Profil */}
                <div className="grid gap-3">
                  <Label htmlFor="profile-photo">Foto Profil</Label>
                  <input
                    id="profile-photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProfile({ ...profile, photo_profile: file });
                        setPreviewImage(URL.createObjectURL(file));
                      }
                    }}
                    className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
                  />
                </div>
              </div>

              {/* Menu Tambahan */}
              <div className="mt-6 px-4 flex flex-col gap-3">
                <button className="flex items-center gap-3 px-4 py-2 w-full rounded-md hover:bg-gray-700 transition">
                  <AiOutlineClockCircle size={20} />
                  <span>Riwayat Ujian</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2 w-full rounded-md hover:bg-gray-700 transition"
                >
                  <FiLogOut size={20} className="text-red-500" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Footer */}
              <SheetFooter className="mt-4">
                <Button type="button" onClick={handleUpdateProfile} className="mr-2">
                  Save Changes
                </Button>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
