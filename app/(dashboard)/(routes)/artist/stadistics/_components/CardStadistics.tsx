import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardStadisticsProps {
    title: string;
    icon: LucideIcon;
    total: string;
    description: string;
};

export const CardStadistics = ({
    title,
    icon: Icon,
    total,
    description,
}: CardStadisticsProps) => {

    return (
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">{title}</h5>
                            <span className="font-semibold text-xl text-blueGray-700">{total}</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                <Icon
                                    size={22}
                                    className={cn(
                                        "text-white dark:text-white",
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">
                        <span className="whitespace-nowrap">{description}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
