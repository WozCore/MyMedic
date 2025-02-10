import { createBrowserRouter, RouteObject } from "react-router-dom";
import Hero from "../../pages/Hero";
import CatalogMainList from "../../Lists/CatalogMainList";
import Catalog from "../../Lists/Catalog";
// import { ProductDetail } from "../../Cards/ProductDetail";
import { Layout } from "../Layout/Layout";
import { PATH } from "../../utis/Constants";
import LandingPage from "../../pages/LandingPage/LandingPage";

const routes: RouteObject[] = [
    {
        path: PATH.home,
        element: <Layout />,
        children: [
            {
                path: PATH.home,
                element: <Hero />,
            },
            {
                path: PATH.landing,
                element: <LandingPage />,
            },
            {
                path: PATH.catalog,
                element: <CatalogMainList />,
            },
            {
                path: PATH.catalogOpen,
                element: <Catalog />,
            },
            // {
            //     path: PATH.product,
            //     element: <ProductDetail />,
            // },
        ],
    },
];

export const AppRouter = createBrowserRouter(routes);
