import BaseLayout from "@/layouts/BaseLayout/BaseLayout";
import GuestLayout from "@/layouts/GuestLayout/GuestLayout.tsx";
import Home from "@/pages/Home/home";
import Login from "@/pages/Login/Login.tsx";
import { createBrowserRouter } from "react-router-dom";
import Editor from "@/components/editor/editor";
import { EditorOptionsProvider } from "@/providers/EditorOptionsProvider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);
