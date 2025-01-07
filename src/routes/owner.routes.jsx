import CreateTenant from "../pages/Owner/createTenant/CreateTenant";
import OwnerDashboard from "../pages/Owner/Owner";


export const ownerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <OwnerDashboard />,
    },
    {
        name: "Tenant Managment",
        children: [
            {
                name: "Create Tenant",
                path: "create-tenant",
                element: <CreateTenant />,
            },
        ],
    },

];

