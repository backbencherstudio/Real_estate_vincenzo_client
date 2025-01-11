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
import ProtectedRoute from "../layout/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App></App>
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/owner",
    element: (
      <ProtectedRoute role="owner">
        <App></App>
      </ProtectedRoute>
    ),
    children: routeGenerator(ownerPaths),
  },
  {
    path: "/tenant",
    element: (
      <ProtectedRoute role="tenant">
        <App></App>
      </ProtectedRoute>
    ),
    children: routeGenerator(tenantPaths),
  },
  {
    path: "/signin",
    element: <SignIn></SignIn>
  },
  {
    path: "/auth",
    element: <Auth/>
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>
  },
  {
    path: "/resetpassword",
    element: <ResetPassword></ResetPassword>
  }
  
]);

export default routes;
