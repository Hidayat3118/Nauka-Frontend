"use client";
import { FaSearch, FaBell, FaHeart, FaBookmark } from "react-icons/fa";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center border-1 border-gray-600 py-6 rounded-full shadow-xl bg-slate-900">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-center">
            <span className="text-white">NA</span>
            <span className="text-green-400 text-3xl underline">U</span>
            <span className="text-white">KA</span>
          </h1>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-12 text-white font-medium text-xl">
          <li className="hover:text-green-400 cursor-pointer hover:-translate-1 duration-300">
            Beranda
          </li>
          <li className="hover:text-green-400 cursor-pointer hover:-translate-1 duration-300">
            Form
          </li>
          <li className="hover:text-green-400 cursor-pointer hover:-translate-1 duration-300">
            Di Sukai
          </li>
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-white text-xl">
          {/* Notif */}
          <div className="bg-slate-800 h-12 w-12 rounded-full flex justify-center hover:text-green-400">
            <Tooltip>
              <TooltipTrigger>
                <FaBell className="cursor-pointer " />
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifikasi</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* simpan */}
          <div className="bg-slate-800 h-12 w-12 rounded-full flex justify-center">
            <Tooltip>
            <TooltipTrigger>
              <FaBookmark className="cursor-pointer hover:text-green-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Di Simpan</p>
            </TooltipContent>
          </Tooltip>
          </div>

          {/* Profil */}
          <div className="">
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src="/people/people.jpeg"
                  alt="people"
                  width={200}
                  height={200}
                  className="object-cover overflow-hidden h-12 w-12 rounded-full border-4 border-green-500"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Profil</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
