import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import Banner from "./_components/baner";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import Categorias from "./_components/Categorias";
import Sidebar from "./_components/Sidebar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>  
        <header className="py-4 shadow-sm bg-white">
            <Header />
        </header>

        <nav className="bg-gray-800">
            <Navbar />
        </nav>

        <div className="bg-cover bg-no-repeat bg-center py-36" style={{backgroundImage: "url('banner.png')"}}>
            <Banner />
        </div>
        {/* <!-- features --> */}
        <div className="container py-16">
            <Features />
        </div>

        <div className="container py-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">Explora categorias</h2>
            <Categorias />
        </div>

        <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
            <Footer />
        </footer>

        <div className="bg-gray-800 py-4">
            <div className="container flex items-center justify-between">
                <p className="text-white">&copy; ShopDraw - Todos los derechos reservados</p>
                <div>
                    
                </div>
            </div>
        </div>
        </>
    );
}

export default DashboardLayout;