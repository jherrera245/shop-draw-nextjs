import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: { id_dibujo: string } }
) {
    try {
        const { userId } = auth();
        const { url, nombre } = await req.json();

        if (!userId) {
            return new NextResponse("No Autorizado", { status: 401 });
        }

        const courseOwner = await db.tbl_dibujos.findUnique({
            where: {
                id_dibujo: parseInt(params.id_dibujo),
                id_usuario: userId,
            }
        });

        if (!courseOwner) {
            return new NextResponse("No Autorizado", { status: 401 });
        }

        const attachment = await db.tbl_adjuntos.create({

            data: {
                url: url,
                nombre: nombre,
                id_dibujo: parseInt(params.id_dibujo),
            }
        });

        return NextResponse.json(attachment);
    } catch (error) {
        console.log("DRAW_ID_ATTACHMENTS", error);
        return new NextResponse("Error Interno", { status: 500 });
    }
}
