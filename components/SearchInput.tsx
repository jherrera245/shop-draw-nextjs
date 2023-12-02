"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = () => {
    const [value, setValue] = useState("")
    const debouncedValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue,
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [debouncedValue, currentCategoryId, router, pathname])

    return (
        <>
            <span className="absolute left-4 top-3 text-lg text-gray-400">
                <Search />
            </span>
            <Input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="w-full border border-[#fd3d57] border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
                placeholder="Buscar pinturas o dibujos..."
            />
            <button
                className="bg-[#fd3d57] border border-[#fd3d57] text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">Search</button>
        </>
    )
}