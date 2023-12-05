
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CheckSquareIcon, InfoIcon } from "lucide-react";
import { Banner } from "@/components/Banner";
import { Actions } from "./_components/Actions";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { ImageForm } from "./_components/ImageForm";
import { AttachmentsForm } from "./_components/AttachmentsForm";

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
        },
        include: {
            categoria: true,
            tecnica: true,
            adjuntos: true,
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
        draw.id_categoria,
        draw.id_tecnica,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            <div className="md:flex items-start justify-center">
                <div className="xl:w-4/6 lg:w-4/5 w-80 md:block hidden">
                    <ImageForm
                        initialData={draw}
                        id_dibujo={draw.id_dibujo}
                    />

                    <AttachmentsForm
                        initialData={draw}
                        id_dibujo={draw.id_dibujo}
                    />
                </div>

                {/* <div className="md:hidden">
                    <img className="w-full" alt="img of a girl posing" src="https://i.ibb.co/QMdWfzX/component-image-one.png" />
                    <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
                        <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" />
                        <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/f17NXrW/Rectangle-244.png" />
                        <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" />
                        <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/f17NXrW/Rectangle-244.png" />


                    </div>
                </div> */}

                <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                    {!draw.disponible && (
                        <div className="mb-3">
                            <Banner
                                label="Este dibujo o pintura no se encuentra disponible para la venta!"
                            />

                            <div className="mt-3">
                                <span className="text-sm text-slate-700 dark:text-white">
                                    Campos completados {completionText}
                                </span>
                            </div>
                        </div>
                    )}


                    <div className="border-b border-gray-200 pb-6">
                        <p className="text-sm leading-none text-gray-600">Detalle del producto: {draw.titulo}</p>
                        <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
                            {draw.titulo}
                        </h1>
                        <p className="text-xl text-[#fd3d57] font-semibold">
                            {formatPrice((draw.precio !== null) ? draw.precio : 0)}
                        </p>
                    </div>

                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800"><b>Categoría:</b> {draw.categoria?.nombre}</p>
                    </div>

                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800"><b>Técnica:</b> {draw.tecnica?.nombre}</p>
                    </div>

                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800">
                            <b>Descripción:</b> {draw.descripcion}
                        </p>
                    </div>

                    <Actions
                        disabled={!isComplete}
                        id_dibujo={draw.id_dibujo}
                        uuid={draw.uuid}
                        isAvaliable={draw.disponible}
                    />
                </div>
            </div>
        </>
    );
}

export default CourseUuidPage;