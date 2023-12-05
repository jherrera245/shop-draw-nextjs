"use client";

import axios from "axios";
import { CheckSquareIcon, Edit, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import Link from "next/link";

interface ActionsProps {
    disabled: boolean;
    id_dibujo: number;
    uuid: string;
    isAvaliable: boolean;
};

export const Actions = ({
    disabled,
    id_dibujo,
    uuid,
    isAvaliable
}: ActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (!isAvaliable) {
                await axios.patch(`/api/draws/${id_dibujo}/actived`);
                toast.success("El dibujo ya no esta disponible para venta");
            } else {
                await axios.patch(`/api/draws/${id_dibujo}/disabled`);
                toast.success("La publicación se encuentra disponible para la venta");
                confetti.onOpen();
            }

            router.refresh();

        } catch {
            toast.error("Sucedió un error al actualizar la publicación del dibujo");

        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/draws/${id_dibujo}`);

            toast.success("Publicación de dibujo eliminado");
            router.refresh();
            router.push(`/artist/draws`);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="mb-3">
                <Button
                    onClick={onClick}
                    disabled={disabled}
                    className="focus:outline-none focus:ring-2 rounded-none  h-15 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700"
                >
                    <CheckSquareIcon className="mr-2" />
                    {isAvaliable ? "Descativar este producto para la venta" : "Activar este producto para la venta"}
                </Button>
            </div>

            <div className="mb-3">
                <Link href={`/artist/draws/${uuid}/edit`}>
                    <Button
                        disabled={isLoading}
                        className="focus:outline-none focus:ring-2 rounded-none  h-15 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700"
                    >
                        <Edit className="mr-2" />
                        Editar datos del producto
                    </Button>
                </Link>
            </div>

            <div className="mb-3">
                <ConfirmModal onConfirm={onDelete}>
                    <Button
                        className="focus:outline-none focus:ring-2 rounded-none h-15 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-destructive w-full py-4 hover:bg-gray-700"
                        disabled={isLoading}
                        variant={"destructive"}>
                        <Trash className="mr-2" />
                        Borrar Producto
                    </Button>
                </ConfirmModal>
            </div>
        </>
    )
}