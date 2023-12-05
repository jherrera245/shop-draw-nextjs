"use client";

import { tbl_categorias } from "@prisma/client";
import {
    FcPanorama,
    FcAddImage,
    FcCamera,
    FcAutomatic,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./CategoryItem";

interface CategoriesProps {
    items: tbl_categorias[];
}

const iconMap: Record<tbl_categorias["nombre"], IconType> = {
    "Digital": FcAddImage,
    "Pinturas": FcAutomatic,
    "Paisajes": FcPanorama,
    "Retratos": FcCamera
};

export const Categories = ({
    items,
}: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2 content-between justify-center">
            {items.map((item) => (
                <CategoryItem
                    key={item.id_categoria}
                    label={item.nombre}
                    icon={iconMap[item.nombre]}
                    value={item.uuid}
                />
            ))}
        </div>
    )
}