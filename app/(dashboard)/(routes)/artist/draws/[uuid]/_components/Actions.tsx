"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionsProps {
    disabled: boolean;
    id_dibujo: number;
    isAvaliable: boolean;
};

export const Actions = ({
    disabled,
    id_dibujo,
    isAvaliable
}: ActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isAvaliable) {
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
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="customghost"
                size="sm"
            >
                {isAvaliable ? "Descativar" : "Activar"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading} variant={"destructive"}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    )
}