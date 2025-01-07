import { createBrowserRouter } from "react-router-dom";
import { routeGenerator } from "../utils/routeGenerator";
import App from "../App";
import { adminPaths } from "./admin.routes";
import { ownerPaths } from "./owner.routes";
import { tenantPaths } from "./tenant.routes";
import SignIn from "../pages/signIn/SignIn";
import Login from "../components/Login/Login";
import LoginMain from "../components/LoginMain/LoginMain";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: (
        <App></App>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/owner",
    element: (
        <App></App>
    ),
    children: routeGenerator(ownerPaths),
  },
  {
    path: "/tenant",
    element: (
        <App></App>
    ),
    children: routeGenerator(tenantPaths),
  },
  {
    path : "/signIn",
    element : <SignIn/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/loginmain",
    element: <LoginMain/>
  }
  
]);

export default routes;
