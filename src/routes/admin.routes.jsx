import AdminDashboard from "../pages/Admin/Admin";
import AllTenant from "../pages/Admin/AllTenant/AllTenant";
import Owner from "../pages/Admin/Owner/Owner";
import OwnerDetails from "../pages/Admin/Owner/OwnerDetails";
import AllProperties from "../pages/Admin/Properties/AllProperties";
import AdminProfile from "../pages/Admin/Settings/AdminProfile";
import TenantDetails from "../pages/Admin/TenantDetails/TenantDetails";
import PropertyDetails from "../shared/PropertyDetails";

export const adminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <AdminDashboard />,
    },
    {
        name: "Properties",
        path: "properties",
        element: <AllProperties />,
    },
    {
        path: "properties/:id",
        element: <PropertyDetails />,
      },
    {
        name: "User Managment",
        children: [
            {
                name: " Owner",
                path: "owner",
                element: <Owner />,
            },
            {
                path: "owner/:id",
                element: <OwnerDetails />,
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
                element: <AdminProfile />
            }
        ]
    }
];
