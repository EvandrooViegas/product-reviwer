import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import Collection from "../pages/collection";
import Product from "../pages/product";
import MainLayout from "../components/UI/layouts/MainLayout";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/collection/:id",
    element: <Collection />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
];
const router = createBrowserRouter(routes.map(route => ({
    ...route,
    element: <MainLayout>
        {route.element}
    </MainLayout>
})));

export { router, RouterProvider };
