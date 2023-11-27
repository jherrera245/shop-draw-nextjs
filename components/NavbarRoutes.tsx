"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { MenuIcon } from "lucide-react";
import { NavRoutes } from "@/app/(dashboard)/_components/NavRoutes";

export const NavbarRoutes = () => {
    return (
        <>
            <div className="px-8 py-4 bg-[#fd3d57] md:flex items-center cursor-pointer relative group hidden">
                <span className="text-white">
                    <MenuIcon />
                </span>
            </div>

            <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
                <div className="flex items-center space-x-6 capitalize">
                   <NavRoutes />
                </div>
                <ModeToggle />
            </div>
        </>
    );
}