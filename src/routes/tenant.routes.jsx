import Documents from "../pages/Tenant/Documents";
import MaintenanceRequests from "../pages/Tenant/MaintenanceRequests";
import PaymentsDetails from "../pages/Tenant/PaymentsDetails/PaymentsDetails";
import TenantDashboard from "../pages/Tenant/Tenant";
import TenantPayments from "../pages/Tenant/TenantPayments";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlinePayment } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

export const tenantPaths = [
    {
        icon:<RxDashboard size={18}/>,
        name: "Dashboard",
        path: "dashboard",
        element: <TenantDashboard />,
    },
    {
        icon:<MdOutlinePayment size={18}/>,
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
        icon:<TfiMenuAlt size={18} />,
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

