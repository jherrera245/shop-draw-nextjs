import { Badge, BarChart, ListIcon, Settings, TypeIcon } from "lucide-react";
import { CardStadistics } from "./_components/CardStadistics";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import calculateSales from "./util/calulateSales";
import { format } from "util";
import { formatPrice } from "@/lib/format";
import { CategoriesProductChart } from "./_components/CategoriesProductChart";
import { SalesProductChart } from "./_components/SalesProductChart";

const StadisticPage = async () => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    //calculado el total de categorias
    const totalCategories = await db.tbl_categorias.aggregate(
        {
            _count: {
                id_categoria: true,
            }
        }
    );

    const draws = await db.tbl_dibujos.findMany({
        where: {
            id_usuario: userId
        }
    });

    const categories = await db.tbl_categorias.findMany();

    const shoppings = await db.tbl_compras.findMany();


    const totalSales = calculateSales({ products: draws, sales: shoppings })

    //calculado el total de productos
    const totalProducts = await db.tbl_dibujos.aggregate(
        {
            where: {
                id_usuario: userId
            },
            _count: {
                id_dibujo: true,
            }
        }
    );

    //calculado el total de categorias
    const totalTechniques = await db.tbl_tecnicas.aggregate(
        {
            _count: {
                id_tecnica: true,
            }
        }
    );

    return (
        <>
            <div className="flex flex-wrap">
                <CardStadistics
                    title="Categorias"
                    icon={ListIcon}
                    total={`${totalCategories._count.id_categoria}`}
                    description="Total de categorías"
                />

                <CardStadistics
                    title="Ventas"
                    icon={BarChart}
                    total={formatPrice(totalSales)}
                    description="Total de ventas"
                />

                <CardStadistics
                    title="Productos"
                    icon={Badge}
                    total={`${totalProducts._count.id_dibujo}`}
                    description="Total de productos"
                />

                <CardStadistics
                    title="Técnicas"
                    icon={Settings}
                    total={`${totalTechniques._count.id_tecnica}`}
                    description="Total de técnicas"
                />

            </div>

            <div className="flex flex-wrap mt-5">
                <CategoriesProductChart
                    products={draws}
                    categories={categories}
                />

                <SalesProductChart
                    products={draws}
                    shoppings={shoppings}
                />
            </div>
        </>
    );
}

export default StadisticPage;