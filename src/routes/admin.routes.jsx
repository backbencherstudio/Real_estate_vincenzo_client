import {
  Bolt,
  LayoutDashboard,
  TableProperties,
  UserPen,
  Users,
} from "lucide-react";
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
import Profile from "../shared/Profile";
import Messages from "../shared/Messages/Messages";
import { MdMarkEmailRead, MdOutlineMessage, MdOutlineRateReview } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import Review from "../pages/Admin/Review/Review";
import AddAdvisor from "../pages/Admin/AddAdvisor/AddAdvisor";
import { IoMdPersonAdd } from "react-icons/io";
import EmailCollection from "../pages/Admin/EmailCollection/EmailCollection";
import PaymentHistory from "../pages/Admin/paymentHistory/PaymentHistory";
import ContactUs from "../pages/Admin/ContactUs/ContactUs";

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
        path: "tenants",
        element: <AllTenant />,
      },
      {
        icon: <TbReportMoney size={18} />,
        name: "Payment History",
        path: "payment-history",
        element: <PaymentHistory />,
      },
      // {
      //   icon: <TbReportMoney size={18} />,
      //   name: "Pay Out",
      //   path: "payOut",
      //   element: <PayOutData />,
      // },
      {
        icon: <IoMdPersonAdd size={18} />,
        name: "Add Advisor",
        path: "addAdvisor",
        element: <AddAdvisor />,
      },
      {
        icon: <MdMarkEmailRead size={18} />,
        name: "Email Collection",
        path: "emailCollection",
        element: <EmailCollection />,
      },
      {
        icon: <MdMarkEmailRead size={18} />,
        name: "Contact Us Data",
        path: "contactUsData",
        element: <ContactUs />,
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
        element: <Review />,
      },
    ],
  },
  {
    name: "Messages",
    path: "messages",
    element: <Messages />,
    icon: <MdOutlineMessage />,
  },
];
