"use client";

import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const NavbarRoutes = () => {
    const pathname = usePathname();
    const isArtisPage = pathname?.startsWith("/artist");
    const isPlayerPage = pathname?.includes("/chapter");

    return (
        <div className="flex gap-x-8 ml-auto">
            {isArtisPage || isPlayerPage ? (
                <Link href="/">
                    <Button className="text-white bg-[#3b82f6]" size="sm" variant='customghost'>
                        <LogOut className="h-4 w-4 mr-2" />
                        Salir
                    </Button>
                </Link>
            ) : (
                <Link href="/artist/draws">
                    <Button className="text-white bg-[#3b82f6]" size="sm" variant='customghost'>
                        Artista
                    </Button>
                </Link>
            )}
            <UserButton
                afterSignOutUrl="/"
            />
            <ModeToggle />
        </div>
    );
}