import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts/MainLayout.tsx";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage.tsx";
import {AuthRequired} from "./hoc/AuthRequired.tsx";
import {AuthLayout} from "./layouts/AuthLayout.tsx";
import {RegisterPage} from "./pages/AuthPage/RegisterPage.tsx";
import {LoginPage} from "./pages/AuthPage/LoginPage.tsx";
import {CarsPage} from "./pages/CarsPage/CarsPage.tsx";
import {SomeReqPage} from "./pages/SomeReqPage/SomeReqPage.tsx";
import {AboutPage} from "./pages/AboutPage/AboutPage.tsx";

export const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, errorElement: <NotFoundPage/>, children: [
            {index: true, element: <Navigate to={'/cars'}/>},
            {
                element: <AuthRequired><AuthLayout/></AuthRequired>, children: [
                    {path: 'cars', element: <CarsPage/>},
                    {path: 'something', element: <SomeReqPage/>}
                ]
            },
            {path: 'register', element: <RegisterPage/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'about', element: <AboutPage/>}
        ]
    }
]);