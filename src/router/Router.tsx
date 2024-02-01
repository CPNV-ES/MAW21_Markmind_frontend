import {createBrowserRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import Home from '../pages/home/home';
import Layout from '../layouts/BaseLayout/BaseLayout';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>, children: [
            {
                path: "/:workspaceId",
                element: <Home/>,
            },
            {
                path: "/about",
                element: (
                    <div>
                        <h1>About Us</h1>
                        <Link to="/">Home</Link>
                    </div>
                ),
            },
            {
                path: "/*",
                element: <div>404</div>,
            },
        ]
    },
]);

export default router;