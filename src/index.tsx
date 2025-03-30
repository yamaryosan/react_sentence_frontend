import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { RouterProvider } from "react-router-dom";
import routesLink from "./routesLink";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routesLink} />
        </QueryClientProvider>
    </React.StrictMode>
);

reportWebVitals();
