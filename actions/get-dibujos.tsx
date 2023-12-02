import { tbl_categorias, tbl_dibujos } from "@prisma/client";

import { db } from "@/lib/db";

type DrawWithCategory = tbl_dibujos & {
    categoria: tbl_categorias | null;
};

type GetDraws = {
    userId: string;
    title?: string;
    category?: string;
};

export const getDraws = async ({
    userId,
    title,
    category
}: GetDraws): Promise<DrawWithCategory[]> => {
    try {
        const categoria = await db.tbl_categorias.findFirst({
            where: {
                uuid: category,
            },
        });

        const draws = await db.tbl_dibujos.findMany({
            where: {
                disponible: true,
                titulo: {
                    contains: title,
                },
                id_categoria: category ? categoria?.id_categoria : undefined,
            },
            include: {
                categoria: true,
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        const DrawsList: DrawWithCategory[] = await Promise.all(
            draws.map(async draw => {
                return {
                    ...draw
                }
            })
        );

        return DrawsList;

    } catch (error) {
        console.log("[GET_DRAW]", error);
        return [];
    }
}
