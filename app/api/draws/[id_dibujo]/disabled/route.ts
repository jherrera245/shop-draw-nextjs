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
            return new NextResponse("No Autorizado", { status: 401 });
        }

        const draw = await db.tbl_dibujos.findUnique({
            where: {
                id_dibujo: parseInt(params.id_dibujo),
                id_usuario: userId,
            },
        });

        if (!draw) {
            return new NextResponse("Dibujo no encotrado", { status: 404 });
        }

        const disabledDraw = await db.tbl_dibujos.update({
            where: {
                id_dibujo: parseInt(params.id_dibujo),
                id_usuario: userId,
            },
            data: {
                disponible: false,
            }
        });

        return NextResponse.json(disabledDraw);
    } catch (error) {
        console.log("[DRAW_ID_DISABLED]", error);
        return new NextResponse("Error Interno", { status: 500 });
    }
}
