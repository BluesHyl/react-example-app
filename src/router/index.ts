import { createBrowserRouter } from "react-router";
import Login from '@/views/Pages/Login/Index.tsx';
import Home from '@/views/Pages/Home/Index.tsx';
export const router = createBrowserRouter([
    {
        path: "/",
        Component: Login,
    },
    {
        path: "/home",
        Component: Home,
    },
])