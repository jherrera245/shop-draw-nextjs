import { tbl_categorias, tbl_dibujos } from "@prisma/client";
import { DrawCard } from "./DrawCard";


type DrawWithCategory = tbl_dibujos & {
    categoria: tbl_categorias | null;
};

interface DrawsListProps {
    items: DrawWithCategory[];
}

export const DrawsList = ({
    items
}: DrawsListProps) => {
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {items.map((item) => (
                    <DrawCard
                        key={item.uuid}
                        uuid={item.uuid}
                        title={item.titulo!}
                        imageUrl={item.imagen_url!}
                        price={item.precio!}
                        category={item?.categoria?.nombre!}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No drawings were found.
                </div>
            )}
        </div>
    )
}
