import {createBrowserRouter, Navigate} from "react-router-dom";

import {HomePage} from "../pages/HomePage/HomePage.tsx";
import {MainLayout} from "../layouts/MainLayout/MainLayout.tsx";
import {PageNotFound} from "../pages/PageNotFound/PageNotFound.tsx";
import {UsersPage} from "../pages/UsersPage/UsersPage.tsx";
import {UserDetails} from "../components/UserDetails/UserDetails.tsx";
import {SelectedPostsPage} from "../pages/SelectedPostsPage/SelectedPostsPage.tsx";
import {PostPage} from "../pages/PostsPage/PostPage.tsx";
import {CommentsPage} from "../pages/CommentsPage/CommentsPage.tsx";
import {AllCommentPage} from "../pages/AllCommentPage/AllCommentPage.tsx";

export const routerConfig = createBrowserRouter([{
    path: '/',
    element: <MainLayout/>,
    errorElement: <PageNotFound/>,
    children: [
        // {index: true, element: <HomePage/>},
        {index: true, element: <Navigate to={'home'}/>},
        {path: 'home', element: <HomePage/>},
        {
            path: 'users', element: <UsersPage/>, children: [
                {path: ':userId', element: <UserDetails/>},
                {path: ':userId/posts', element: <SelectedPostsPage/>}
            ]
        },
        {path: 'posts', element: <PostPage/>},
        {path: 'comments', element: <AllCommentPage/>},
        {path: 'comments/:postId', element: <CommentsPage/>}
    ]
}]);