"use client";

import { NavbarRoutes } from "@/components/NavbarRoutes";
import MobileSidebar from "./MobileSidebar";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { LogOut, PaintBucket, Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchInput } from "@/components/SearchInput";

export const Header = () => { 
    const pathname = usePathname();
    const isArtisPage = pathname?.startsWith("/artist");
    const isPlayerPage = pathname?.includes("/chapter");
    const isSearchPage = pathname === "/search";

    return (
        <div className="container flex items-center justify-between">
            <Logo />

            {isSearchPage && (
                <div className="w-full max-w-xl relative flex">
                    <SearchInput />
                </div>
            )}

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
