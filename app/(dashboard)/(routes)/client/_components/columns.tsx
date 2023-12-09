"use client"

import { Button } from "@/components/ui/button"
import { dateFormat } from "@/lib/format"
import { tbl_compras } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


export const columns: ColumnDef<tbl_compras>[] = [
    {
        accessorKey: "dibujo.titulo",
        header: ({ column }) => {
            return (
                <Button
                    className="bg-white text-dark hover:bg-[#fd3d57] hover:text-white"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre del producto
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "dibujo.precio",
        header: ({ column }) => {
            return (
                <Button
                    className="bg-white text-dark hover:bg-[#fd3d57] hover:text-white"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Precio
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {            
            const price = parseFloat(row.getValue("dibujo_precio") || "0");
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(price);

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    className="bg-white text-dark hover:bg-[#fd3d57] hover:text-white"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fecha de la compra
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {            
            const date = dateFormat(row.getValue("createdAt"));
            return <div>{date}</div>
        }
    },
]