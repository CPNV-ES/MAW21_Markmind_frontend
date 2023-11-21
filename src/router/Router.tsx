import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

export const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1>Hello World</h1>
          <Link to="about">About Us</Link>
        </div>
      ),
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
  ]);
