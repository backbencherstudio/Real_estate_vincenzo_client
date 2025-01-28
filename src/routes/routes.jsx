/* eslint-disable no-dupe-keys */
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
import SubscriptionPlan from "../pages/Auth/subscriptionPlan/SubscriptionPlan";
import OwnerProtectedRoute from "../layout/OwnerProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: <App></App>,
    element: (
      <ProtectedRoute role="admin">
        <App></App>
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/owner",
    element: <App></App>,
    element: (
      // <OwnerProtectedRoute role="owner">
        <App></App>
      // </OwnerProtectedRoute>
    ),
    children: routeGenerator(ownerPaths),
  },
  {
    path: "/tenant",
    element: <App></App>,
    element: (
      <ProtectedRoute role="tenant">
        <App></App>
      </ProtectedRoute>
    ),
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
    path: "/subscription-plan",
    element: <SubscriptionPlan/>
  },
  {
    path: "/resetpassword",
    element: <ResetPassword></ResetPassword>,
  },
]);

export default routes;
