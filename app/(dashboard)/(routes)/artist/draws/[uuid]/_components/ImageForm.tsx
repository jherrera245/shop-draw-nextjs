"use client";

import * as z from "zod";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { tbl_dibujos } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/FileUpload";

interface ImageFormProps {
    initialData: tbl_dibujos
    id_dibujo: number;
};

const formSchema = z.object({
    imagen_url: z.string().min(5, {
        message: "La imagen es requerida",
    }),
});

export const ImageForm = ({
    initialData,
    id_dibujo
}: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/draws/${id_dibujo}`, values);
            toast.success("Se agrego imagen para el dibujo");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Sucedio un error");
        }
    }

    return (
        <div className="mt-6 border bg-[#cde0f9] dark:bg-[#334155] rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Imagen del la pintura
                <Button
                    className="text-white bg-[#3b82f6] hover:bg-blue-950 dark:hover:bg-slate-600 dark:hover:text-white" 
                    onClick={toggleEdit} 
                    variant="customghost">
                    {isEditing && (
                        <>Cancelar</>
                    )}
                    {!isEditing && !initialData.imagen_url && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Agregar una imagen
                        </>
                    )}
                    {!isEditing && initialData.imagen_url && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar imagen
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.imagen_url ? (
                    <div className="flex items-center justify-center h-60 bg-slate-20 dark:bg-[#313138] rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imagen_url}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="drawImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ imagen_url: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 es el ratio recomendado
                    </div>
                </div>
            )}
        </div>
    )
}