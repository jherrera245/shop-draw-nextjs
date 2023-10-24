import { NavbarRoutes } from "@/components/NavbarRoutes";
import MobileSidebar from "./MobileSidebar";

export const Navbar = () => { 
    return (
        <div className="p-4 border-b h-full flex items-center bg-[#dbeafe] dark:bg-[#1d4ed8] shadow-sm">
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    ); 
}

export default Navbar;
