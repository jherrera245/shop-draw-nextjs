import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { Compass, Eye, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PublicationItem } from "./_components/PublicationItem";

const DrawsPage = async () => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const draws = await db.tbl_dibujos.findMany({
        where: {
            id_usuario: userId
        }
    });

    if (!draws) {
        return redirect("/");
    }

    return (
        <div className="p-6">
            <Link href="/artist/create">
                <Button className="text-white bg-[#3b82f6] hover:bg-blue-950 dark:hover:bg-slate-600 dark:hover:text-white">
                    <Compass />
                    &nbsp; Publicar un dibujo
                </Button>
            </Link>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {
                    draws.map((item, index) => {
                        return (
                            <div key={index} className="mt-6 border bg-[#cde0f9] dark:bg-[#334155] rounded-md p-4">
                                <PublicationItem draw={item} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default DrawsPage;
