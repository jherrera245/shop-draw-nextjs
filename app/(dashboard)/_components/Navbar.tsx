import { NavbarRoutes } from "@/components/NavbarRoutes";
import MobileSidebar from "./MobileSidebar";

export const Navbar = () => { 
    return (
        <div className="container flex">
            {/* <MobileSidebar /> */}
            <NavbarRoutes />
        </div>
    ); 
}

export default Navbar;
