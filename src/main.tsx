import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/homepage.tsx";
import Quizpage from "./pages/quizpage.tsx";
import Landingpage from "./pages/landingpage.tsx";
import Resultpage from "./pages/resultpage.tsx";
import Errorpage from "./pages/errorpage.tsx";
import LoginPage from "./pages/loginpage.tsx";
import RegisterPage from "./pages/registerpage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landingpage />,
        errorElement: <Errorpage />,
    },
    {
        path: "/home",
        element: <Homepage />,
    },
    {
        path: "/quiz",
        element: <Quizpage />,
    },
    {
        path: "/result",
        element: <Resultpage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
} else {
    console.error("Root element not found");
}
