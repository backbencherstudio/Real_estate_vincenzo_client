import { createBrowserRouter } from "react-router-dom";
import { routeGenerator } from "../utils/routeGenerator";
import App from "../App";
import { adminPaths } from "./admin.routes";
import { ownerPaths } from "./owner.routes";
import { tenantPaths } from "./tenant.routes";
import Auth from "../pages/Auth/Auth";
import SignIn from "../pages/Auth/signIn/SignIn";
import SignUp from "../pages/Auth/SignUp/SignUp";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: <App></App>,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/owner",
    element: <App></App>,
    children: routeGenerator(ownerPaths),
  },
  {
    path: "/tenant",
    element: <App></App>,
    children: routeGenerator(tenantPaths),
  },
  {
    path: "/signin",
    element: <SignIn></SignIn>,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword></ResetPassword>,
  },

]);

export default routes;
