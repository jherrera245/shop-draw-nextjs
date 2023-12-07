import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Banner = () => {
    return (
        <div className="bg-cover bg-no-repeat bg-center py-36" style={{ backgroundImage: "url('banner.png')" }}>
            <div className="container">
                <h1 className="text-6xl dark:text-white-800 font-medium mb-4 capitalize">
                    La mejor colección <br /> de arte.
                </h1>
                <p>
                    Explora una amplia variedad de obras de artistas talentosos.<br />
                    Encuentra la pieza perfecta para tu colección o regalo especial.
                </p>

                <div className="mt-12">
                    <Button
                        className="bg-[#fd3d57] border border-[#fd3d57] text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-[#fd3d57]">
                        <Link
                            href="/sign-up">
                            Explorar galería
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Banner;