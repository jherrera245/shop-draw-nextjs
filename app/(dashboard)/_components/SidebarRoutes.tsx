"use client";
import { Layout, BarChart, List, Palette } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import {usePathname} from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Palette,
        label: "Navegar",
        href: "/search",
    }
];

const artistRoutes = [
    {
        icon: List,
        label: "Draws",
        href: "/artist/draws",
    },
    {
        icon: BarChart,
        label: "Estadisticas",
        href: "/artist/stadistics",
    }
];

export const SidebarRoutes = () => {

    const pathname = usePathname();
    const isArtistPage = pathname?.includes("/artist");
    const routes = isArtistPage ? artistRoutes : guestRoutes;
    
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem 
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}
            />
            ))}
        </div>
    )
};

