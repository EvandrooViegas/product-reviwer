import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/home"
import Collection from "../pages/collection"
import Product from "../pages/product"
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/collection/:id",
        element: <Collection />
    },
    {
        path: "/product/:id",
        element: <Product />
    },


])

export {
    router,
    RouterProvider
}