<<<<<<< HEAD
import DocumentsTenant from "../pages/Tenant/DocumentsTenant";
=======
>>>>>>> 46578642e4311302eb30600a53866ca3aaea955c
import MaintenanceRequests from "../pages/Tenant/MaintenanceRequests";
import PaymentsDetails from "../pages/Tenant/PaymentsDetails/PaymentsDetails";
import TenantDashboard from "../pages/Tenant/Tenant";
import TenantPayments from "../pages/Tenant/TenantPayments";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlinePayment } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import TenantDocuments from "../pages/Tenant/TenantDocuments/TenantDocuments";
import { Bolt, ClipboardMinus, Construction, UserPen } from "lucide-react";
import Profile from "../shared/Profile";
import UserProfile from "../shared/Settings/Profile";
import MaintenanceDetails from "../pages/Owner/Maintenance/MaintenanceDetails";
import { ToolOutlined } from "@ant-design/icons";

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
            {
              path: "maintenance/:id",
              element: <MaintenanceDetails />,
              icon: <ToolOutlined />,
            },
            {
                path: "profile/edit",
                element: <Profile />
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
          },
          {
    
            path: "profile/edit",
            element: <Profile />
          },
        ]
      }
];

