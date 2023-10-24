import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

export const MobileSidebar = () => {
    return (
    <div>
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0  bg-[#dbeafe] dark:bg-[#1d4ed8] ">
                <Sidebar />
            </SheetContent>
        </Sheet>
    </div>
    );
}

export default MobileSidebar;
