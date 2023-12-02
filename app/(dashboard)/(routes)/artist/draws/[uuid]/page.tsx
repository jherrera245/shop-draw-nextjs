import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { InfoIcon } from "lucide-react";
import { Banner } from "@/components/Banner";
import { Actions } from "./_components/Actions";

const CourseUuidPage = async ({
    params
}: {
    params: { uuid: string }
}) => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const draw = await db.tbl_dibujos.findFirst({
        where: {
            uuid: params.uuid,
            id_usuario: userId
        }
    });

    if (!draw) {
        return redirect("/");
    }

    const requiredFields = [
        draw.titulo,
        draw.descripcion,
        draw.imagen_url,
        draw.precio,
        draw.stock,
        draw.disponible,
        draw.es_orginal,
        draw.id_categoria,
        draw.id_tecnica,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <div className="p-6">

            {!draw.disponible && (
                <Banner
                    label="Este dibujo o pintura no se encuentra disponible para la venta!"
                />
            )}

            <div className={!draw.disponible ? "flex items-center justify-between mt-3" : "flex items-center justify-between"}>
                <div className="flex flex-col gap-y-2">
                    <span className="text-sm text-slate-700 dark:text-white">
                        Campos completados {completionText}
                    </span>
                </div>

                <Actions
                    disabled={isComplete}
                    id_dibujo={draw.id_dibujo}
                    isAvaliable={draw.disponible}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="flex items-center gap-x-2">
                    <div className="rounded-full flex items-center justify-center bg-sky-100 dark:bg-[#334155] p-2">
                        <InfoIcon className="h-8 w-8 text-blue-400 dark:text-blue-700" />
                    </div>
                    <h1 className="text-2xl font-medium">
                        Titulo: {draw.titulo}
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">

            </div>
        </div>
    );
}

export default CourseUuidPage;