import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { id_dibujo: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("No Autorizado", { status: 401 });
        }

        const draw = await db.tbl_dibujos.findUnique({
            where: {
                id_dibujo: parseInt(params.id_dibujo),
                id_usuario: userId,
            },
        });

        if (!draw) {
            return new NextResponse("Publicación de dibujo no encontrada", { status: 404 });
        }

        const deletedDraw = await db.tbl_dibujos.delete({
            where: {
                id_dibujo: parseInt(params.id_dibujo),
            },
        });

        return NextResponse.json(deletedDraw);
    } catch (error) {
        console.log("[DRAW_ID_DELETE]", error);
        return new NextResponse("Error Interno", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id_dibujo: string } }
) {
    try {
        const { userId } = auth();
        const { id_dibujo } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        const draw = await db.tbl_dibujos.update({
            where: {
                id_dibujo: parseInt(id_dibujo),
                id_usuario: userId
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(draw);
    } catch (error) {
        console.log("[DRAW_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}