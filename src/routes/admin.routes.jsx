import { Bolt, LayoutDashboard, TableProperties, UserPen, Users } from "lucide-react";
import { FaUserTie } from "react-icons/fa";
import AdminDashboard from "../pages/Admin/Admin";
import AllTenant from "../pages/Admin/AllTenant/AllTenant";
import Owner from "../pages/Admin/Owner/Owner";
import OwnerDetails from "../pages/Admin/Owner/OwnerDetails";
import AllProperties from "../pages/Admin/Properties/AllProperties";
import PropertyDetails from "../shared/PropertyDetails";
import TenantDetails from "../shared/TenantDetails";
import { FaBuildingUser } from "react-icons/fa6";
import UserProfile from "../shared/Settings/Profile";

export const adminPaths = [
    {
        icon: <LayoutDashboard size={18} />,
        name: "Dashboard",
        path: "dashboard",
        element: <AdminDashboard />,
    },
    {
        icon: <TableProperties size={18} />,
        name: "Properties",
        path: "properties",
        element: <AllProperties />,
    },
    {
        path: "properties/:id",
        element: <PropertyDetails />,
      },
    {
        icon: <Users size={18} />,
        name: "User Managment",
        children: [
            {
                icon: <FaUserTie size={18} />,
                name: " Owner",
                path: "owner",
                element: <Owner />,
            },
            {
                path: "owner/:id",
                element: <OwnerDetails />,
            },
            {
                icon: <FaBuildingUser size={18} />,
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
        icon: <Bolt size={18} />,
        name: "Settings",
        children: [
            {
                icon: <UserPen size={18} />,
                name: "Profile",
                path: "profile",
                element: <UserProfile />
            }
        ]
    }
];
