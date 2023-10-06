import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Chat from "./Pages/chat";
import App from "./App";
import JoinGroup from "./join";

const Router = () =>{
    const router = createBrowserRouter ([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register/>
      },
      { path: '/profile',
        element: <Chat/>
    },
    {
      path:'joingroup',
      element: <JoinGroup/>
    }


    ])

    return <RouterProvider router={router}/>
}

export default Router;