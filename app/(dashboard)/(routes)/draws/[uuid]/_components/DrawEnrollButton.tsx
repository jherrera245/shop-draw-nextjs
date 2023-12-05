"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface DrawEnrollButtonProps {
    price: number;
    id_dibujo: number;
}

export const DrawEnrollButton = ({
    price,
    id_dibujo,
}: DrawEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(`/api/draws/${id_dibujo}/checkout`)

            window.location.assign(response.data.url);
        } catch {
            toast.error("Sucedio un error al procesar el pago");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            size="sm"
            className="w-full md:w-auto"
        >
            Comprar por {formatPrice(price)}
        </Button>
    )
}
