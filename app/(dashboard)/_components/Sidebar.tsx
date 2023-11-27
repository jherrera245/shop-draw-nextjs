import { Logo } from "./Logo";
import { NavRoutes} from "./NavRoutes";

const Sidebar = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-[#dbeafe] dark:bg-[#172554] shadow-sm">
            <div className="p-6 flex items-center justify-center">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <NavRoutes />
            </div>
        </div>
    );
}

export default Sidebar;