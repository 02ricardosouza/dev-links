import { createBrowserRouter } from "react-router";
import Home from "./pages/home";
import Admin from "./pages/admin";
import Login from "./pages/login";
import NetWorks from "./pages/networks";
import Private from "./routes/Private";
import ErrorPage from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        {" "}
        <Admin />{" "}
      </Private>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/social",
    element: (
      <Private>
        <NetWorks />
      </Private>
    ),
  },
  {
    path: "*",
    element: (
      <Private>
        <ErrorPage />
      </Private>
    ),
  },
]);

export default router;
