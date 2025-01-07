import AdminDashboard from "../pages/Admin/Admin";
import CreateOwner from "../pages/Admin/createOwner/CreateOwner";
import AdminProfile from "../pages/Admin/Settings/AdminProfile";

export const adminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <AdminDashboard />,
    },

    {
        name: "Owner Managment",
        children: [

            {
                name: "Create Owner",
                path: "create-owner",
                element: <CreateOwner />,
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

