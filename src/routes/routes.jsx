import { createBrowserRouter } from "react-router-dom";
import { routeGenerator } from "../utils/routeGenerator";
import App from "../App";
import { adminPaths } from "./admin.routes";
import { ownerPaths } from "./owner.routes";
import { tenantPaths } from "./tenant.routes";

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
  
]);

export default routes;
