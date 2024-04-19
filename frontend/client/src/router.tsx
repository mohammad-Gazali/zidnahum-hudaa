import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import { HomePage, LoginPage } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
    ],
  }
]);
