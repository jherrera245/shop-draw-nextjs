import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawEnrollButton } from "./_components/DrawEnrollButton";

const DrawIdPage = async ({
    params
}: {
    params: { uuid: string; }
}) => {
    const draw = await db.tbl_dibujos.findFirst({
        where: {
            uuid: params.uuid,
        },
        include: {
            adjuntos: true
        }
    });

    if (!draw) {
        return redirect("/");
    }

    const purchase = await db.tbl_compras.findUnique({
        where: {
            userId_dibujo_uuid: {
                userId: auth().userId!,
                dibujo_uuid: draw.uuid,
            }
        }
    });

    return (
        <div>
            <div className="flex flex-col max-w-4xl mx-auto pb-20 m-2">
                <div className="relative aspect-video pb-2">
                    <Image
                        alt="Cover"
                        fill
                        className="object-cover rounded-md"
                        src={draw.imagen_url!}
                    />
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">
                            {draw.titulo}
                        </h2>
                        {purchase ? (
                            <Button
                                disabled={true}
                                size="sm"
                                className="w-full md:w-auto"
                            >
                                Adquirido
                            </Button>
                        ) : (
                            <DrawEnrollButton
                                id_dibujo={draw.id_dibujo}
                                price={draw.precio!}
                            />
                        )}
                    </div>
                    <Separator />
                    <div className="p-6">
                        <p>{draw.descripcion!}</p>
                    </div>
                </div>
                {purchase && (
                    <>
                        {!!draw.adjuntos.length && (
                            <>
                                <Separator />
                                <div className="p-4 md:flex-row">
                                    <h2 className="text-xl font-semibold mb-2">
                                        Vista previa del dibujo
                                    </h2>
                                    <div className="p-4">
                                        {draw.adjuntos.map((adjunto) => (
                                            <a
                                                href={adjunto.url}
                                                target="_blank"
                                                key={adjunto.id_adjunto}
                                                className="flex items-center p-3 w-full bg-sky-100 dark:bg-[#313138] border-sky-200 dark:border-white border dark:text-teal-400 text-sky-700 rounded-md mt-2"
                                            >
                                                <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                                <p className="text-sm line-clamp-1">
                                                    {adjunto.nombre}
                                                </p>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                    </>
                )}

            </div>
        </div>
    );
}

export default DrawIdPage;
