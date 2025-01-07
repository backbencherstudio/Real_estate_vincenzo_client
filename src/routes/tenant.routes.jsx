import TenantDashboard from "../pages/Tenant/Tenant";
import Test from "../pages/Tenant/Test/Test";

export const tenantPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <TenantDashboard />,
    },
    {
        name: "Tenant", 
        children: [
            {
                name: "Test",
                path: "test",
                element: <Test />,
            }, 
        ],
    },

];

