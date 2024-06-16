import {createBrowserRouter, Navigate} from "react-router-dom";

import {Authed, RequiredAuth} from "./hoc";
import {PrivateLayout, MainLayout, PublicLayout, ForAuthLayout} from "./layouts";
import {
    AboutPage,
    CarsPage,
    LoginPage,
    NotFoundPage,
    RegisterPage,
    SpecialPage,
    UserInfoPage
} from "./pages";


const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, errorElement: <NotFoundPage/>, children: [
            {index: true, element: <Navigate to={'/cars'}/>},
            {
                element: <PublicLayout/>, children: [
                    {
                        element: <Authed><ForAuthLayout/></Authed>, children: [
                            {path: 'login', element: <LoginPage/>},
                            {path: 'register', element: <RegisterPage/>},
                        ]
                    },
                    {path: 'about', element: <AboutPage/>}
                ]
            },
            {
                element: <RequiredAuth><PrivateLayout/></RequiredAuth>, children: [
                    {path: 'cars', element: <CarsPage/>},
                    {path: 'spec', element: <SpecialPage/>},
                    {path: 'user-info', element: <UserInfoPage/>}
                ]
            }


        ]
    }
]);

export default router;