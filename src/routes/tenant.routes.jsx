import Documents from "../pages/Tenant/Documents";
import MaintenanceRequests from "../pages/Tenant/MaintenanceRequests";
import TenantDashboard from "../pages/Tenant/Tenant";
import TenantPayments from "../pages/Tenant/TenantPayments";
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
            {
                name: "TenantPayments",
                path: "tenantpayments",
                element: <TenantPayments></TenantPayments>,
            },
            {
                name: "MaintenanceRequests",
                path: "maintenancerequests",
                element: <MaintenanceRequests></MaintenanceRequests>,
            },
            {
                name: "Documents",
                path: "documents",
                element: Documents,
            },
 
        ],
    },
];

