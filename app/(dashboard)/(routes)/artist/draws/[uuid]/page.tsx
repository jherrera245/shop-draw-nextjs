import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { LayoutDashboard } from "lucide-react";
import { TitleForm } from "./_components/TitleForm";
import { DescriptionForm } from "./_components/DescriptionForm";
import { ImageForm } from "./_components/ImageForm";

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

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Configuración de la publicación del dibujo 
                    </h1>
                    <span className="text-sm text-slate-700 dark:text-white">
                        Completar todos los campos {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <div className="rounded-full flex items-center justify-center bg-sky-100 dark:bg-[#1f1f1f] p-2">
                            <LayoutDashboard className="h-8 w-8 text-teal-700 dark:text-yellow-500" />
                        </div>
                        <h2 className="text-xl">
                            Personaliza tu pulicación
                        </h2>
                    </div>
                    <TitleForm
                        initialData={draw}
                        id_dibujo={draw.id_dibujo}
                    />
                    <DescriptionForm
                        initialData={draw}
                        id_dibujo={draw.id_dibujo}
                    />
                    <ImageForm
                        initialData={draw}
                        id_dibujo={draw.id_dibujo}
                    />
                </div>
            </div>
        </div>
    );
}

export default CourseUuidPage;