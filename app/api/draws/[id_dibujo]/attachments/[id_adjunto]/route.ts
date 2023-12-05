import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { id_dibujo: string, id_adjunto: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("No Autorizado", { status: 401 });
        }

        const drawOwner = await db.tbl_dibujos.findUnique({
            where: {
                id_dibujo: parseInt(params.id_dibujo),
                id_usuario: userId
            }
        });

        if (!drawOwner) {
            return new NextResponse("No Autorizado", { status: 401 });
        }

        const attachment = await db.tbl_adjuntos.delete({
            where: {
                id_dibujo: parseInt(params.id_dibujo),
                id_adjunto: parseInt(params.id_adjunto),
            }
        });

        return NextResponse.json(attachment);
    } catch (error) {
        console.log("ATTACHMENT_ID", error);
        return new NextResponse("Error Interno", { status: 500 });
    }
}

