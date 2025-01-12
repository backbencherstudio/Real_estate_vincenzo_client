import AdminDashboard from "../pages/Admin/Admin";
import AllTenant from "../pages/Admin/AllTenant/AllTenant";
import Owner from "../pages/Admin/Owner/Owner";
import AllProperties from "../pages/Admin/Properties/AllProperties";
import AdminProfile from "../pages/Admin/Settings/AdminProfile";
import TenantDetails from "../pages/Admin/TenantDetails/TenantDetails";

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
        name: "User Managment",
        children: [
            {
                name: " Owner",
                path: "owner",
                element: <Owner />,
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
