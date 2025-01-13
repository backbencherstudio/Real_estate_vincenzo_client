import Documents from "../pages/Tenant/Documents";
import MaintenanceRequests from "../pages/Tenant/MaintenanceRequests";
import PaymentsDetails from "../pages/Tenant/PaymentsDetails/PaymentsDetails";
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
        name: "Payments",
        path: "tenantpayments",
        element: <TenantPayments></TenantPayments>,
    },
    {
        // name: "Payments",
        path: "tenantpayments/:id",
        element: <PaymentsDetails />
    },
    {
        name: "My Apartment",
        children: [
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

