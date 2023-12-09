import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { ShoppingBagIcon, UserCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Separator } from "@/components/ui/separator";

const ClientPage = async () => {
    const user = await currentUser();

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const shopping = await db.tbl_compras.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            dibujo: true,
        }
    });

    console.log(shopping);
    

    return (
        <div className="mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <div className="flex items-center space-x-3 capitalize">
                <UserCircle />
                <h1 className="text-2xl uppercase font-medium mb-1">
                    Bienvenido, {user?.firstName + ' ' + user?.lastName}
                </h1>
            </div>

            <Separator />

            <div className="flex items-center space-x-3 capitalize mt-4">
                <ShoppingBagIcon />
                <h4 className="text-sm uppercase font-medium mb-1">
                    Mis Compras
                </h4>
            </div>

            <DataTable columns={columns} data={shopping} />
        </div>
    );
}

export default ClientPage;
