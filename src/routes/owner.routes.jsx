import OwnerDashboard from "../pages/Owner/Owner";
import AddProperties from "../pages/Owner/Properties/AddProperties";
import Properties from "../pages/Owner/Properties/Properties";
import Tenants from "../pages/Owner/Properties/Tenants";
import TenantDetailsTwo from "../pages/Owner/TenantDetails/TenantDetailsTwo";

export const ownerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <OwnerDashboard />,
  },
  {
    name: "Properties",
    children: [
      {
        name: "Properties",
        path: "properties",
        element: <Properties />,
      },
      {
        name: "Tenants",
        path: "tenants",
        element: <Tenants />,
      },
      {
        path: "tenants/:id",
        element: <TenantDetailsTwo />,
      },
      {
        path: "properties/addProperties",
        element: <AddProperties />,
      },
    ],
  },
];
