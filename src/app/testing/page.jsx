"use client";
import Image from "next/image";
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

const Testing = () => {
  const notifikasi = () => {
    toast.success("Testing Berhasil");
  };

  return (
    <div className="flex justify-center ">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
                <Image
                      src="/people/people.jpeg"
                      alt="people"
                      width={200}
                      height={200}
                      className="object-cover overflow-hidden h-12 w-12 rounded-full border-2 lg:border-4 border-green-500"
                    />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Testing;
