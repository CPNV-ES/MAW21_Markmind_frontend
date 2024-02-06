import { Link, createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/BaseLayout/BaseLayout";
import Home from "../pages/home/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/:workspaceId",
        element: <Home />,
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
    ],
  },
]);

export default router;
