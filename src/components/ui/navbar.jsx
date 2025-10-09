"use client";
import { FaUser, FaBell, FaBookmark } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import { logout } from "@/api/logoutApi";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  // function handleLogout
  const handleLogout = async () => {
    try {
      const response = await logout();

      // Hapus token di localStorage
      await localStorage.removeItem("token");
      if (response) {
        toast.success("Logout berhasil");
      }
      router.push("/login");
    } catch (error) {
      toast.error("Terjadi kesalahan saat logout");
    }
  };

  return (
    <nav className="fixed top-0 lg:top-4 left-0 right-0 z-50">
      <div className="max-w-4xl mx-auto px-6 flex justify-between items-center md:border-2 md:border-[#2A2A2A]  py-6 lg:rounded-full shadow-xl bg-primary">
        {/* Logo */}
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-center">
            <span className="text-white">NA</span>
            <span className="text-green-400 text-2xl lg:text-3xl underline">
              U
            </span>
            <span className="text-white">KA</span>
          </h1>
        </div>
        {/* Icons */}
        <div className="flex items-center space-x-2 lg:space-x-4 text-white text-lg lg:text-xl">
          {/* Notif */}
          <div className="bg-[#2A2A2A] h-10 w-10 lg:h-12 lg:w-12 rounded-full flex justify-center hover:text-green-400">
            <Tooltip>
              <TooltipTrigger>
                <FaBell className="cursor-pointer " />
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifikasi</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Profil */}
          <div className="">
            {/* nagitain menu */}
            <Sheet className="">
              {/* Trigger Avatar */}
              <SheetTrigger asChild>
                <Avatar className="w-12 h-12 md:w-14 md:h-14 border border-green-500">
                  <AvatarImage src={"/people/people.jpeg"} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-primary text-white border-none shadow-none"
              >
                {/* Header */}
                <SheetHeader>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-16 h-16 md:w-32 md:h-32 border border-green-500">
                      <AvatarImage src={"/people/people.jpeg"} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>

                    {/* Judul Profil sebagai SheetTitle (visible) */}
                    <SheetTitle className="text-xl font-semibold text-center text-white">
                      Edit Profile
                    </SheetTitle>
                  </div>

                  <SheetDescription className="text-center mt-2 text-gray-400">
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </SheetDescription>
                </SheetHeader>

                {/* Form */}
                <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-4">
                  {/* nama asli */}
                  <div className="grid gap-3">
                    <Label htmlFor="profile-name">Nama Asli</Label>
                    <Input id="profile-name" defaultValue="Pedro Duarte" />
                  </div>
                  {/* email */}
                  <div className="grid gap-3">
                    <Label htmlFor="profile-email">Email</Label>
                    <Input id="profile-email" defaultValue="@peduarte" />
                  </div>
                  {/* role */}
                  <div className="grid gap-3">
                    <Label htmlFor="profile-email">Role</Label>
                    <Input id="profile-email" defaultValue="@peduarte" />
                  </div>
                </div>

                {/* Menu Buttons */}
                <div className="mt-6 px-4 flex flex-col gap-3">
                  {/* riwayat ujian */}
                  <button className="flex items-center gap-3 px-4 py-2 w-full rounded-md hover:bg-gray-700 transition">
                    <AiOutlineClockCircle size={20} />
                    <span>Riwayat Ujian</span>
                  </button>
                  {/* logout */}
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
                  <Button type="submit" className="mr-2">
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
      </div>
    </nav>
  );
};

export default Navbar;
