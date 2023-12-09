"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { tbl_adjuntos, tbl_categorias, tbl_dibujos, tbl_tecnicas } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";

interface AttachmentFormProps {
    initialData: tbl_dibujos & { categoria: tbl_categorias | null, tecnica:tbl_tecnicas | null, adjuntos: tbl_adjuntos[] };
    id_dibujo: number;
};

const formSchema = z.object({
    url: z.string().min(1),
    nombre: z.string().min(1)
});

export const AttachmentsForm = ({
    initialData,
    id_dibujo
}: AttachmentFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/draws/${id_dibujo}/attachments`, values);
            toast.success("Se agrego un elemento de referencia para el dibujo");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Sucedio un error al agregar el adjunto");
        }
    };

    const onDelete = async (id_adjunto: number) => {
        try {
            setDeletingId(id_adjunto);
            await axios.delete(`/api/draws/${id_dibujo}/attachments/${id_adjunto}`);
            toast.success("Adjunto eliminado");
            router.refresh();
        } catch {
            toast.error("Sucedio un error al eliminar el adjunto");
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="border bg-white shadow rounded-md p-4 mt-3">
            <div className="font-medium flex items-center justify-between">
                Adjuntos del dibujo
                <Button 
                    className="text-white bg-[#fd3d57] hover:bg-black dark:hover:bg-slate-600 dark:hover:text-white" 
                    onClick={toggleEdit} 
                    variant="customghost">
                    {isEditing && (
                        <>Cancelar</>
                    )}
                    {!isEditing && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Agregar un archivo
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    {initialData.adjuntos.length === 0 && (
                        <p className="text-sm mt-2 text-slate-500 italic">
                            *Aun no se han agregado adjuntos*
                        </p>
                    )}
                    {initialData.adjuntos.length > 0 && (
                        <div className="space-y-2">
                            {initialData.adjuntos.map((adjunto) => (
                                <div
                                    key={adjunto.id_adjunto}
                                    className="flex items-center p-3 w-full bg-sky-100 dark:bg-[#313138] border-sky-200 dark:border-white border dark:text-teal-400 text-sky-700 rounded-md mt-2"
                                >
                                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <p className="text-sm line-clamp-1">
                                        {adjunto.nombre}
                                    </p>
                                    {deletingId === adjunto.id_adjunto && (
                                        <div>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    )}
                                    {deletingId !== adjunto.id_adjunto && (
                                        <button
                                            onClick={() => onDelete(adjunto.id_adjunto)}
                                            className="text-white bg-[#fd3d57] hover:bg-black dark:hover:bg-slate-600 dark:hover:text-white"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="drawAttachment"
                        onChange={(url, nombre) => {
                            if (url && nombre) {
                                onSubmit({ url: url, nombre: nombre });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Agrega cualquier cosa que tus estudiantes puedan necesitar para completar el curso.
                    </div>
                </div>
            )}
        </div>
    )
}