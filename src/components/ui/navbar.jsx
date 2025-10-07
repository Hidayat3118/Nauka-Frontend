"use client";
import { FaUser, FaBell, FaBookmark } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import { logout } from "@/api/logoutApi";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
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
          {/* simpan */}
          <div className="bg-[#2A2A2A] h-10 w-10 lg:h-12 lg:w-12 rounded-full flex justify-center ">
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
            {/* nagitain menu */}
            <NavigationMenu className="">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent flex justify-center items-center">
                    <Image
                      src="/people/people.jpeg"
                      alt="people"
                      width={200}
                      height={200}
                      className="object-cover overflow-hidden h-12 w-12 rounded-full border lg:border-2 border-green-500"
                    />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="">
                    <NavigationMenuLink>
                      {" "}
                      <button className="flex items-center gap-1 md:gap-2 md:px-2 w-full rounded-md hover:bg-gray-100">
                        <FaUser className="text-green-600" />
                        <span>Profil</span>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink>
                      {" "}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 md:gap-2 md:px-2 w-full rounded-md hover:bg-gray-100"
                      >
                        <FiLogOut className="text-red-500" />
                        <span>Logout</span>
                      </button>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
