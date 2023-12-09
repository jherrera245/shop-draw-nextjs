"use client";

import { tbl_categorias, tbl_dibujos } from "@prisma/client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CategoriesProductChartProps {
    products: tbl_dibujos[];
    categories: tbl_categorias[];
};

export function CategoriesProductChart({ products, categories }: CategoriesProductChartProps) {

    const [data, setData] = useState([{ category: "", total: 0 }])
    useEffect(() => {
        const dataRender = categories.map((category) => {

            const result = {
                category: category.nombre,
                total: 0
            };

            products.map((product) => {
                if (category.id_categoria === product.id_categoria) {
                    result.total += 1;
                }
            })

            return result;
        })

        setData(dataRender);
    }, [])

    const option = {
        chart: {
            id: 'apexchart-categorias-productos'
        },
        xaxis: {
            categories: data.map((item) => {
                return item.category;
            })
        }
    }

    const series = [{
        name: 'Total',
        data: data.map((item) => {
            return item.total;
        })
    }]

    return (
        <>
            <div className="w-full xl:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full max-w-full flex-grow flex-1">
                                <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">Productos</h6>
                                <h2 className="text-blueGray-700 text-xl font-semibold">Productos por categorías</h2>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 flex-auto">
                        <div className="relative h-350-px">
                            <ApexChart type="bar" options={option} series={series} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}