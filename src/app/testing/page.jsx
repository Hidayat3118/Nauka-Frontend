"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";

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

export default function ProfileSheet() {
  return (
    <div className="mt-32 flex justify-center">
      <Sheet className="">
        {/* Trigger Avatar */}
        <SheetTrigger asChild>
          <div className="bg-red-500 h-16 w-16 rounded-full cursor-pointer hover:opacity-80 transition"></div>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="bg-primary text-white border-none shadow-none"
        >
          {/* Header */}
          <SheetHeader>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-red-500 h-24 w-24 lg:w-32 lg:h-32 rounded-full"></div>

              {/* Judul Profil sebagai SheetTitle (visible) */}
              <SheetTitle className="text-xl font-semibold text-center text-white">
                Edit Profile
              </SheetTitle>
            </div>

            <SheetDescription className="text-center mt-2 text-gray-400">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>

          {/* Form */}
          <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-4">
            <div className="grid gap-3">
              <Label htmlFor="profile-name">Nama Asli</Label>
              <Input id="profile-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="profile-email">Email</Label>
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
            <button className="flex items-center gap-3 px-4 py-2 w-full rounded-md hover:bg-gray-700 transition">
              <FiLogOut size={20} className="text-red-500" />
              <span>Riwayat Ujian</span>
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
  );
}


