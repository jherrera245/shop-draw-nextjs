import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tbl_dibujos } from "@prisma/client";
import { Eye, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PublicationItemProps {
    draw: tbl_dibujos;
};


export const PublicationItem = ({ draw }: PublicationItemProps) => {
    return (
        <>
            <div className="font-medium flex items-center justify-between">
                {draw.titulo}
            </div>

            {
                !draw.imagen_url ? (
                    <div className="flex items-center justify-center h-60 bg-slate-20 dark:bg-[#313138] rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={draw.imagen_url}
                        />
                    </div>
                )
            }

            <p className={cn(
                "text-sm",
                "text-slate-700 dark:text-white",
                "mt-2",
                !draw.descripcion && "italic"
            )}>
                {draw.descripcion || "* Sin descripción *"}
            </p>

            <Link href={`/artist/draws/${draw.uuid}`}>
                <Button className="w-full mt-3 text-white bg-[#3b82f6] hover:bg-blue-950 dark:hover:bg-slate-600 dark:hover:text-white">
                    <Eye />
                    &nbsp;Mostrar publicación
                </Button>
            </Link>
        </>
    );
};