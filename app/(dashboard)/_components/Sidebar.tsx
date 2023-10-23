import { Logo } from "./Logo";
import { SidebarRoutes } from "./SidebarRoutes";

const Sidebar = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-[#ededed] dark:bg-[#4c1d95] shadow-sm">
            <div className="p-6 flex items-center justify-center">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    );
}

export default Sidebar;