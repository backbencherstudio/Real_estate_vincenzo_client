import { FileOutlined, TeamOutlined, ToolOutlined } from "@ant-design/icons";
import { GrVmMaintenance } from "react-icons/gr";
import { BsBuildingCheck } from "react-icons/bs";
import { PiBuildingApartment } from "react-icons/pi";
import DocumentDetails from "../pages/Owner/Documents/DocumentDetails";
import Documents from "../pages/Owner/Documents/Documents";
import Maintenance from "../pages/Owner/Maintenance/Maintenance";
import MaintenanceDetails from "../pages/Owner/Maintenance/MaintenanceDetails";
import OwnerDashboard from "../pages/Owner/Owner";
import AddProperties from "../pages/Owner/Properties/AddProperties";
import Properties from "../pages/Owner/Properties/Properties";
import PropertyDetails from "../shared/PropertyDetails";
import Tenants from "../pages/Owner/Properties/Tenants";
import TenantDetails from "../shared/TenantDetails";
import { MdOutlineDashboard, MdOutlineMessage, MdOutlineRateReview } from "react-icons/md";
import { Bolt, UserPen } from "lucide-react";
import UserProfile from "../shared/Settings/Profile";
import Profile from "../shared/Profile";
import Messages from "../shared/Messages/Messages";
import StripePayment from "../pages/Owner/payment/StripePayment";
import WithdrawForm from "../pages/Owner/WithdrawForm/WithdrawForm";
import UpdateProperties from "../pages/Owner/Properties/UpdateProperties";
import ReviewForm from "../pages/Owner/ReviewForm/ReviewForm";

export const ownerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <OwnerDashboard />,
    icon: <MdOutlineDashboard />,
  },
  {
    name: "Properties",
    icon: <PiBuildingApartment />,
    children: [
      {
        name: "Properties",
        path: "properties",
        element: <Properties />,
        icon: <BsBuildingCheck />,
      },
      {
        path: "properties/addProperties",
        element: <AddProperties />,
      },
      {
        path: "updateProperties/:id",
        element: <UpdateProperties />,
      },
      {
        path: "properties/:id",
        element: <PropertyDetails />,
        icon: <FileOutlined />,
      },
      {
        name: "Tenants",
        path: "tenants",
        element: <Tenants />,
        icon: <TeamOutlined />,
      },
      {
        path: "tenant/:id",
        element: <TenantDetails />,
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    name: "Maintenance",
    path: "maintenance",
    element: <Maintenance />,
    icon: <GrVmMaintenance />,
  },
  {
    path: "maintenance/:id",
    element: <MaintenanceDetails />,
    icon: <ToolOutlined />,
  },
  {
    name: "Documents",
    path: "documents",
    element: <Documents />,
    icon: <FileOutlined />,
  },
  {
    path: "documents/:id",
    element: <DocumentDetails />,
    icon: <FileOutlined />,
  },
  {
    name: "Messages",
    path: "messages",
    element: <Messages />,
    icon: <MdOutlineMessage />,
  },
  {
    icon: <Bolt size={18} />,
    name: "Settings",
    children: [
      {
        icon: <UserPen size={18} />,
        name: "Profile",
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "profile/edit",
        element: <Profile />,
      },
      {
        icon: <MdOutlineRateReview size={18} />,
        name: "Review",
        path: "review",
        element: <ReviewForm />,
      },
    ],
  },
  {
    name : "Update plan",
    path : "payment",
    element : <StripePayment/>
  },
  {
    path : "Withdraw",
    element : <WithdrawForm/>
  }
];
