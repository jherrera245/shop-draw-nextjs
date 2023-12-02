import { db } from "@/lib/db";
import { Categories } from "./_components/Categories";
import { SearchInput } from "@/components/SearchInput";
import { getDraws } from "@/actions/get-dibujos";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DrawsList } from "@/components/DrawsList";

interface SearchPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
};

const SearchPage = async ({
    searchParams
}: SearchPageProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const categories = await db.tbl_categorias.findMany({
        orderBy: {
            nombre: "asc"
        }
    });

    const draws = await getDraws({
        userId,
        ...searchParams,
    });

    return (
        <>
            <div className="px-6 pt-6 md:hidden md:mb-0 block">
                <SearchInput />
            </div>

            <div className="p-6 space-y-4">
                <Categories
                    items={categories}
                />

                <DrawsList items={draws} />
            </div>
        </>
    );
}

export default SearchPage;
