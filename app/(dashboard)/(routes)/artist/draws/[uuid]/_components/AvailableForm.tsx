"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { tbl_dibujos } from "@prisma/client";

interface AvailableFormProps {
    initialData: tbl_dibujos;
    id_dibujo: number;
};

const formSchema = z.object({
    disponible: z.boolean().optional(),
});

export const AvailableForm = ({
    initialData,
    id_dibujo
}: AvailableFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isChecked, setIsChecked] = useState(initialData.disponible);

    const handleClick = () => {
        setIsChecked(!isChecked)
        form.setValue("disponible", isChecked);
    }

    const toggleEdit = () => {
        setIsEditing((current) => !current);
        if (!isEditing) {
            form.setValue("disponible", initialData.disponible);
        }
    };

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            disponible: initialData.disponible
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/draws/${id_dibujo}`, values);
            console.log(values)
            toast.success("Dibujo actualizado correctamente");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Sucedio un error");
        }
    }

    return (
        <div className="mt-6 border bg-[#cde0f9] dark:bg-[#334155] rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Estado del dibujo o pintura
                <Button
                    className="text-white bg-[#3b82f6] hover:bg-blue-950 dark:hover:bg-slate-600 dark:hover:text-white" 
                    onClick={toggleEdit} 
                    variant="customghost">
                    {isEditing ? (
                        <>Cancelar</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar estado
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className="text-xl mt-2">
                    {initialData.disponible ? 'Disponible' : 'No disponible'}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="disponible"
                            render={() => (
                                <FormItem>
                                    <FormControl>
                                        <Checkbox
                                            disabled={isSubmitting}
                                            checked={initialData.disponible}
                                            onClick={() => handleClick()}
                                        />
                                    </FormControl>
                                    <FormLabel>
                                        &nbsp;El dibujo esta disponible
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                                variant="success"
                            >
                                Guardar
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}
