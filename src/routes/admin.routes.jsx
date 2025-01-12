import AdminDashboard from "../pages/Admin/Admin";
import AllTenant from "../pages/Admin/AllTenant/AllTenant";
import CreateOwner from "../pages/Admin/createOwner/CreateOwner";
import AdminProfile from "../pages/Admin/Settings/AdminProfile";
import TenantDetails from "../pages/Admin/TenantDetails/TenantDetails";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Managment",
    children: [
      {
        name: "Create Owner",
        path: "create-owner",
        element: <CreateOwner />,
      },
      {
        name: "Tenant",
        path: "tenant",
        element: <AllTenant />,
      },
      {
        path: "tenant/:id",
        element: <TenantDetails />,
      },
    ],
  },
  {
    name: "Settings",
    children: [
      {
        name: "Profile",
        path: "profile",
        element: <AdminProfile />,
      },
    ],
  },
];
