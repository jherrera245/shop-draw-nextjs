import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArtistForm } from "../_components/ArtistForm";

const CreatePage = async() => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }


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

    return (
        <div className="mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase font-medium mb-1">Nueva Publicación</h2>

            <ArtistForm
                initialData={undefined}
                id_dibujo={0}
                optionsCategories={categorias.map(categoria => ({
                    label: categoria.nombre,
                    value: categoria.id_categoria
                }))}
                optionsTechniques={tecnicas.map(tecnica => ({
                    label: tecnica.nombre,
                    value: tecnica.id_tecnica
                }))}
                isEdit={false}
            />
        </div>
    );
}

export default CreatePage;