import { createBrowserRouter } from "react-router";
import Login from '@/pages/Login/Index.tsx';
import Home from '@/pages/Home/Index.tsx';
import Layout from '@/layout/index.tsx';
export const router = createBrowserRouter([
    {       
        path: "/",
        Component: Layout,
        children: [
            {
                path: "/home",
                Component: Home
            },
            {
                path: "/login",
                Component: Login
            }
        ]
    },
])