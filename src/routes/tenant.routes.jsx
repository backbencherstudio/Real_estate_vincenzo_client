import Documents from "../pages/Tenant/Documents";
import MaintenanceRequests from "../pages/Tenant/MaintenanceRequests";
import PaymentsDetails from "../pages/Tenant/PaymentsDetails/PaymentsDetails";
import TenantDashboard from "../pages/Tenant/Tenant";
import TenantPayments from "../pages/Tenant/TenantPayments";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlinePayment } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import TenantDocuments from "../pages/Tenant/TenantDocuments/TenantDocuments";
import { ClipboardMinus, Construction } from "lucide-react";

export const tenantPaths = [
    {
        icon: <RxDashboard size={18} />,
        name: "Dashboard",
        path: "dashboard",
        element: <TenantDashboard />,
    },
    {
        icon: <MdOutlinePayment size={18} />,
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
        icon: <TfiMenuAlt size={18} />,
        name: "My Apartment",
        children: [
            {
                icon:<Construction size={18}/>,
                name: "Maintenance",
                path: "maintenance",
                element: <MaintenanceRequests></MaintenanceRequests>,
            },
            {
                icon:<ClipboardMinus size={18} />,
                name: "Documents",
                path: "documents",
                element: <TenantDocuments />
            },

        ],
    },
];

