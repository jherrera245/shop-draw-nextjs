"use client";
import { Layout, BarChart, Palette, PenTool } from "lucide-react";
import { NavItem } from "./NavItem";
import {usePathname} from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/cliente",
    },
    {
        icon: Palette,
        label: "Navegar",
        href: "/search",
    }
];

const artistRoutes = [
    {
        icon: PenTool,
        label: "Draws",
        href: "/artist/draws",
    },
    {
        icon: BarChart,
        label: "Estadisticas",
        href: "/artist/stadistics",
    }
];

export const NavRoutes = () => {

    const pathname = usePathname();
    const isArtistPage = pathname?.includes("/artist");
    const routes = isArtistPage ? artistRoutes : guestRoutes;
    
    return (
        <>
            {routes.map((route) => (
                <NavItem 
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}
            />
            ))}
        </>
    )
};

