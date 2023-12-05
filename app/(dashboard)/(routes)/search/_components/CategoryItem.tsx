"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import {
    usePathname,
    useRouter,
    useSearchParams
} from "next/navigation";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
    label: string;
    value?: string;
    icon?: IconType;
};

export const CategoryItem = ({
    label,
    value,
    icon: Icon,
}: CategoryItemProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get("category"); 
    const currentTitle = searchParams.get("title");

    const isSelected = currentCategoryId === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                category: isSelected ? null : value,
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);

        console.log(url);
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "py-2 px-3 text-sm border border-[#fd3d57] rounded-full flex items-center gap-x-1 transition",
                isSelected && "border border-[#fd3d57] bg-[#fd3d57] text-white dark:bg-yellow-500 dark:text-black dark:border-red-900"
            )}
            type="button"
        >
            {Icon && <Icon size={20} />}
            <div className="truncate">
                {label}
            </div>
        </button>
    )
}