import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: { id_dibujo: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        const draw = await db.tbl_dibujos.findUnique({
            where: {
                id_dibujo: parseInt(params.id_dibujo),
                id_usuario: userId,
            },
        });

        if (!draw) {
            return new NextResponse("Not found", { status: 404 });
        }

        if (!draw.titulo || !draw.descripcion || !draw.imagen_url || !draw.id_categoria) {
            return new NextResponse("Faltan campos requeridos", { status: 401 });
        }

        const activedDraw = await db.tbl_dibujos.update({
            where: {
                id_dibujo: parseInt(params.id_dibujo),
                id_usuario: userId,
            },
            data: {
                disponible: true,
            }
        });

        return NextResponse.json(activedDraw);
    } catch (error) {
        console.log("[DRAW_ID_ACTIVED]", error);
        return new NextResponse("Error Interno", { status: 500 });
    }
}