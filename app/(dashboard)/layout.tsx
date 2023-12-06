import Header from "./_components/Header";
import Navbar from "./_components/Navbar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <header className="py-4 shadow-sm bg-white">
                <Header />
            </header>

            <nav className="bg-gray-800">
                <Navbar />
            </nav>

            <div className="container py-16">
                {children}
            </div>
        </>
    );
}

export default DashboardLayout;