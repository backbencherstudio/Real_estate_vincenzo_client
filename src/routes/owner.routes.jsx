import OwnerDashboard from "../pages/Owner/Owner";
import AddProperties from "../pages/Owner/Properties/AddProperties";
import Properties from "../pages/Owner/Properties/Properties";

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
        path: "properties/addProperties",
        element: <AddProperties />,
      },
    ],
  },
];
