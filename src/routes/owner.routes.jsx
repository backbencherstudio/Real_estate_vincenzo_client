import DocumentDetails from "../pages/Owner/Documents/DocumentDetails";
import Documents from "../pages/Owner/Documents/Documents";
import Maintenance from "../pages/Owner/Maintenance/Maintenance";
import MaintenanceDetails from "../pages/Owner/Maintenance/MaintenanceDetails";
import OwnerDashboard from "../pages/Owner/Owner";
import AddProperties from "../pages/Owner/Properties/AddProperties";
import Properties from "../pages/Owner/Properties/Properties";
import PropertyDetails from "../shared/PropertyDetails";
import Tenants from "../pages/Owner/Properties/Tenants";
import TenantDetails from "../shared/TenantDetails";

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
      {
        path: "properties/:id",
        element: <PropertyDetails />,
      },
      {
        name: "Tenants",
        path: "tenants",
        element: <Tenants />,
      },
      {
        path: "tenants/:id",
        element: <TenantDetails />,
      },
      {
        path: "properties/addProperties",
        element: <AddProperties />,
      },
    ],
  },
  {
    name: "Maintenance",
    path: "maintenance",
    element: <Maintenance />,
  },
  {
    path: "maintenance/:id",
    element: <MaintenanceDetails />,
  },
  {
    name: "Documents",
    path: "documents",
    element: <Documents />,
  },
  {
    path: "documents/:id",
    element: <DocumentDetails />,
  },
];
