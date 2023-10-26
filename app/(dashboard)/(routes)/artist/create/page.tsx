"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const formSchema = z.object({
    titulo: z.string().min(1, {
        message: "El título es requerido",
    }),
});

const CreatePage = () => {
    const router = useRouter();
    // hook para el formulario
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            titulo: "",
        },
    });

    //Extraccion de estados del formulario
    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/draws", values);
            router.push(`/artist/draws/${response.data.uuid}`);
            toast.success("Dibujo publicado");
        } catch (error) {
            //console.log("ha ocurrido un error");
            toast.error("Ha ocurrido un error");
        }
    }


    return (
        <div className="max-w-5xl flex p-6">
            <div className="bg-[#cde0f9] dark:bg-[#334155] p-6 rounded-md">
                <h1 className="text-2xl">Nombra tu dibujo</h1>
                <p className="text-sm text-slate-600 dark:text-gray-500">
                    ¿Como te gustaría nombrar tu dibujo? No te preocupes, puedes cambiar esto después.
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
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
                                            placeholder="ej. 'Noche estrellada...'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
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
            </div>
        </div>
    );
}

export default CreatePage;