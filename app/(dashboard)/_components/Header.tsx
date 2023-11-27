"use client";

import { NavbarRoutes } from "@/components/NavbarRoutes";
import MobileSidebar from "./MobileSidebar";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { LogOut, PaintBucket, Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Header = () => { 
    const pathname = usePathname();
    const isArtisPage = pathname?.startsWith("/artist");
    const isPlayerPage = pathname?.includes("/chapter");

    return (
        <div className="container flex items-center justify-between">
            <Logo />

            <div className="w-full max-w-xl relative flex">
                <span className="absolute left-4 top-3 text-lg text-gray-400">
                    <Search />
                </span>
                <input 
                    type="text" 
                    name="search" 
                    id="search"
                    className="w-full border border-[#fd3d57] border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
                    placeholder="search" />
                <button
                    className="bg-[#fd3d57] border border-[#fd3d57] text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">Search</button>
            </div>

            <div className="flex items-center space-x-4">
                
                {isArtisPage || isPlayerPage ? (
                    <Link href="/" className="text-center text-gray-700 hover:text-primary transition relative">

                        <LogOut className="text-2xl" />
                        
                        <div className="text-xs leading-3">Salir</div>
                    </Link>
                ) : (
                    <Link href="/artist/draws" className="text-center text-gray-700 hover:text-primary transition relative">
                       
                       <PaintBucket className="text-2xl" />
                        
                        <div className="text-xs leading-3">Artista</div>
                    </Link>
                )}

                <UserButton
                    afterSignOutUrl="/"
                />
            </div>

        </div>
    ); 
}

export default Header;
