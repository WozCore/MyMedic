import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "../../modules/Footer/Footer";
import { Header } from "../../modules/Header/Header";

export const Layout: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
