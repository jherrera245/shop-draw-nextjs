import Banner from "./_components/Banner";
import Categorias from "./_components/Categorias";
import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";

const HomeLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <Navbar />

            <div className="block">
                {children}
            </div>

            <Footer />
        </>
    );
};

export default HomeLayout;
