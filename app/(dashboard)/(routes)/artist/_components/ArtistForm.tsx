"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { tbl_categorias, tbl_dibujos, tbl_tecnicas } from "@prisma/client";
import Link from "next/link";
import { Combobox } from "@/components/ui/combobox";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { FileUpload } from "@/components/FileUpload";

interface ArtistFormProps {
    initialData?: tbl_dibujos & { categoria: tbl_categorias | null, tecnica: tbl_tecnicas | null };
    id_dibujo: number;
    optionsCategories: { label: string, value: number }[];
    optionsTechniques: { label: string, value: number }[];
    isEdit: boolean;
};

const formSchema = z.object({
    titulo: z.string().min(1, {
        message: "El título es requerido",
    }),
    precio: z.coerce.number().positive().min(0.00, {
        message: "El precio es requerido",
    }),
    descripcion: z.string().min(5, {
        message: "La descripcion es requerida",
    }),
    id_categoria: z.number().nullable(),
    id_tecnica: z.number().nullable(),
});

export const ArtistForm = ({
    initialData,
    id_dibujo,
    optionsCategories,
    optionsTechniques,
    isEdit,
}: ArtistFormProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            titulo: initialData?.titulo || undefined,
            precio: initialData?.precio || undefined,
            descripcion: initialData?.descripcion || undefined,
            id_categoria: initialData?.id_categoria || undefined,
            id_tecnica: initialData?.id_tecnica || undefined,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/draws", values);
            router.push(`/artist/draws/${response.data.uuid}`);
            toast.success("Publicación de dibujo creado correctamente!!!");
        } catch (error) {
            //console.log("ha ocurrido un error");
            toast.error("Ha ocurrido un error");
        }
    }

    return (
        <div className="space-y-2">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <FormField
                            control={form.control}
                            name="titulo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Titulo del dibujo o pintura
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Ejemplo: 'Noche estrellada...'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="precio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Precio
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            disabled={isSubmitting}
                                            placeholder="Ejemplo: $99.99"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="id_tecnica"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Técnicas
                                    </FormLabel>
                                    <FormControl>
                                        <Combobox
                                            options={...optionsTechniques}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="id_categoria"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Categoría
                                    </FormLabel>
                                    <FormControl>
                                        <Combobox
                                            options={...optionsCategories}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="descripcion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Descripción
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={isSubmitting}
                                        placeholder="Ejemplo: Este dibujo es sobre..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    < div className="flex items-center gap-x-2">
                        <Link href="/">
                            <Button
                                type="button"
                                variant="destructive"
                            >
                                Cancelar
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            variant="success"
                            disabled={!isValid || isSubmitting}
                        >
                            Aceptar
                        </Button>
                    </div>
                </form>
            </Form>
        </div >
    )
}
