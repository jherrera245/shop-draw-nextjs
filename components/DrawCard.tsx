import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

interface DrawCardProps {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    category: string;
};

export const DrawCard = ({
    id,
    title,
    imageUrl,
    price,
    category
}: DrawCardProps) => {
    return (
        <Link href={`/draws/${id}`}>
            <div className="bg-white shadow rounded overflow-hidden group">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        fill
                        className="object-cover w-full"
                        alt={title}
                        src={imageUrl}
                    />
                </div>
                <div className="pt-4 pb-3 px-4">
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                        {title}
                    </h4>

                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>

                    <div className="flex items-baseline mb-1 space-x-2">
                        <p className="text-xl text-[#fd3d57] font-semibold">
                            {formatPrice(price)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
