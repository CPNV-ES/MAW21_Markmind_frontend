import "@/assets/css/app.css";
import { router } from "@/router";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { ResourceProvider } from "@/providers/ResourceProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ResourceProvider>
        <RouterProvider router={router}></RouterProvider>
      </ResourceProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
