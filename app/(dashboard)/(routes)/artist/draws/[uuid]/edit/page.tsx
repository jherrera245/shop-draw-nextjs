import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArtistForm } from "../../../_components/ArtistForm";

const EditPage = async ({
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
        },
    });

    if (!draw) {
        return redirect("/");
    }

    console.log(draw);

    const categorias = await db.tbl_categorias.findMany({
        orderBy: {
            nombre: "asc"
        }
    });

    const tecnicas = await db.tbl_tecnicas.findMany({
        orderBy: {
            nombre: "asc"
        }
    });

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

    return (
        <div className="mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase font-medium mb-1">Editar Publicación</h2>

            <span className="text-sm text-slate-700 dark:text-white">
                Campos completados {completionText}
            </span>

            <ArtistForm
                initialData={draw}
                id_dibujo={draw.id_dibujo}
                optionsCategories={categorias.map(categoria => ({
                    label: categoria.nombre,
                    value: categoria.id_categoria
                }))}
                optionsTechniques={tecnicas.map(tecnica => ({
                    label: tecnica.nombre,
                    value: tecnica.id_tecnica
                }))}
                isEdit={true}
            />
        </div>
    );
}

export default EditPage;