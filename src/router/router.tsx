import {createBrowserRouter, Navigate} from "react-router-dom";

import {HomePage} from "../pages/HomePage/HomePage.tsx";
import {MainLayout} from "../layouts/MainLayout/MainLayout.tsx";
import {PageNotFound} from "../pages/PageNotFound/PageNotFound.tsx";
import {UsersPage} from "../pages/UsersPage/UsersPage.tsx";
import {PostsPage} from "../pages/PostsPage/PostsPage.tsx";

export const routerConfig = createBrowserRouter([{
    path: '/',
    element: <MainLayout/>,
    errorElement: <PageNotFound/>,
    children: [
        // {index: true, element: <HomePage/>},
        {index: true, element: <Navigate to={'home'}/>},
        {path: 'home', element: <HomePage/>},
        {path: 'users', element: <UsersPage/>},
        {path: 'posts', element: <PostsPage/>}
    ]
}]);