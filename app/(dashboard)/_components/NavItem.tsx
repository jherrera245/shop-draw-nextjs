"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface NavItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
};

export const NavItem = ({
    icon: Icon,
    label,
    href,
}: NavItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive =
        (pathname === "/" && href === "/") ||
        pathname === href ||
        pathname?.startsWith(`${href}/`);

    const onClick = () => {
        router.push(href);
    }

    return (
        <>
            <button
                onClick={onClick}
                type="button"
                className={cn(
                    "text-white hover:text-[#fd3d57] transition",
                    isActive && "text-gray-200 hover:text-white transition"
                )}
            >
                <div className="flex">
                    <Icon
                        size={22}
                        className={cn(
                            "text-slate-[#fd3d57] dark:text-white me-2",
                            isActive && "text-[#fd3d57]"
                        )}
                    />
                    <div 
                        className={cn(
                            "text-slate-[#fd3d57] dark:text-white me-2",
                            isActive && "text-[#fd3d57]"
                        )}>
                       {label} 
                    </div>
                </div>
            </button>
        </>
    )
}
