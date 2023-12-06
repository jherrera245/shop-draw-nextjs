import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";


export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image
                    src="/draw.png"
                    alt="Logo"
                    height={30}
                    width={30}
                />
                <p className={cn(
                    "text-lg text-neutral-70 pb-1 hover:text-[#fd3d57] text-white"
                )}>
                    Shop Draw
                </p>
            </div>
        </Link>
    );
};
