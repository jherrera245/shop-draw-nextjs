"use client";

import { tbl_compras, tbl_dibujos } from "@prisma/client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface SalesProductChartProps {
    products: tbl_dibujos[];
    shoppings: tbl_compras[];
};

export function SalesProductChart({ products, shoppings }: SalesProductChartProps) {


    const [data, setData] = useState([{product:"", total:0}]);

    useEffect(() => {
        const renderData = products.map((product) => {

            const result = {
                product: product.titulo,
                total: 0
            };
    
            shoppings.map((shopping) => {
                if (product.id_dibujo === shopping.id_dibujo) {
                    result.total += 1;
                }
            })
    
            return result;
        })

        setData(renderData)
    }, [])

    const option = {
        chart: {
            id: 'apexchart-sales-products'
        },
        xaxis: {
            categories: data.map((item) => {
                return item.product;
            })
        }
    }

    const series = [{
        name: 'Unidades',
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
                                <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">Ventas</h6>
                                <h2 className="text-blueGray-700 text-xl font-semibold">Ventas por producto</h2>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 flex-auto">
                        <div className="relative h-350-px">          
                            <ApexChart type="line" options={option} series={series} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}