import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home/Home";

import Login from "../Login/Login";
import ImageDetails from "../ImageDetails/ImageDetails";
import PrivateRoute from "../pages/PrivateRoute/PrivateRoute";
import AllUsers from "../pages/AllUSers/AllUsers";
import OverView from "../pages/OverView/OverView";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>
    },
    {
        path: '/overView',
        element: <OverView></OverView>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/images/:imageId', 
        element: <PrivateRoute><ImageDetails /></PrivateRoute>,
    },
    {
        path: '/allUsers',
        element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
    }
])