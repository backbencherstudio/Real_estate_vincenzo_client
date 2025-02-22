/* eslint-disable no-dupe-keys */
import { createBrowserRouter } from "react-router-dom";
import { routeGenerator } from "../utils/routeGenerator";
import App from "../App";
import { adminPaths } from "./admin.routes";
import { ownerPaths } from "./owner.routes";
import { tenantPaths } from "./tenant.routes";
import Auth from "../pages/Auth/Auth";
import SignIn from "../pages/Auth/SignIn/SignIn";
import SignUp from "../pages/Auth/SignUp/SignUp";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import ProtectedRoute from "../layout/ProtectedRoute";
import SubscriptionPlan from "../pages/Auth/subscriptionPlan/SubscriptionPlan";
import OwnerProtectedRoute from "../layout/OwnerProtectedRoute";
import TenantProtectedRoute from "../layout/TenantProtectedRoute";
import LandingPageLayout from "../layout/LandingPageLayout";
import Home from "../pages/HomePage/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import Pricing from "../pages/Pricing/Pricing";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPageLayout/>,
    children : [
      {
        path : "",
        element : <Home/>
      },
      {
        path : "about-us",
        element : <AboutUs/>
      },
      {
        path : "contact-us",
        element : <ContactUs/>
      },
      {
        path : "pricing",
        element : <Pricing/>
      },
    ]
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
      <OwnerProtectedRoute role="owner">
        <App></App>
       </OwnerProtectedRoute>
    ),
    children: routeGenerator(ownerPaths),
  },
  {
    path: "/tenant",
    element: (
      <TenantProtectedRoute role="tenant">
        <App></App>
      </TenantProtectedRoute>
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
