import { useState } from "react";
import { MenuOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../redux/fetures/auth/authSlice";
import { Button, Dropdown, Avatar } from "antd";
import { useAppDispatch } from "../redux/hooks";
import authApi from "../redux/fetures/auth/authApi";
import { url } from "../globalConst/const";
import logo from "../assets/logo.png"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        // navigate("/signin");
        dispatch(logOut());
    };
    const { data } = authApi.useGetSingleUserInfoQuery(currentUser?.email);

    const items = [
        {
            label: <Link to={`/${currentUser?.role}/dashboard`}>Dashboard</Link>,
            key: "0",
        },
        {
            label: <Link to={`/${currentUser?.role}/profile`}>Profile</Link>,
            key: "1",
        },
        {
            label: (
                <Button onClick={handleLogout} className="w-full">
                    Log Out
                </Button>
            ),
            key: "3",
        },
    ];

    return (
        <div className="">
            <nav className="text-[#64636A] py-4 px-4 xl:px-0 lg:py-10 flex items-center justify-between max-w-7xl mx-auto ">
                <div className="text-2xl font-bold">
                    <NavLink to="/" >
                        <img src={logo} alt="logo" className="" />
                    </NavLink>
                </div>
                <div className="hidden md:flex space-x-12">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "text-black font-semibold" : "hover:text-black font-semibold")}>Home</NavLink>
                    <NavLink to="/about-us" className={({ isActive }) => (isActive ? "text-black font-semibold" : "hover:text-black font-semibold")}>About</NavLink>
                    <NavLink to="/contact-us" className={({ isActive }) => (isActive ? "text-black font-semibold" : "hover:text-black font-semibold")}>Contact Us</NavLink>
                    <NavLink to="/pricing" className={({ isActive }) => (isActive ? "text-black font-semibold" : "hover:text-black font-semibold")}>Pricing</NavLink>
                </div>
                <div className="hidden md:flex">
                    {currentUser ? (
                        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
                            {
                                data?.data?.profileImage ?
                                    <img src={`${url}${data?.data?.profileImage}`} className="size-10 rounded-full cursor-pointer" alt="" />
                                    :
                                    <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" />
                            }
                        </Dropdown>
                    ) : (
                        <Link to="/signIn" className="px-4 py-2 rounded text-[#070127] font-semibold">Login</Link>
                    )}
                </div>
                <div className="md:hidden flex items-center">
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isOpen ? <CloseOutlined className="text-2xl" /> : <MenuOutlined className="text-2xl" />}
                    </motion.button>
                </div>
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 py-4 md:hidden overflow-hidden"
                >
                    <NavLink onClick={() => setIsOpen(!isOpen)} to="/" className={({ isActive }) => (isActive ? "text-blue-400" : "hover:text-gray-300")}>Home</NavLink>
                    <NavLink onClick={() => setIsOpen(!isOpen)} to="/about-us" className={({ isActive }) => (isActive ? "text-blue-400" : "hover:text-gray-300")}>About</NavLink>
                    <NavLink onClick={() => setIsOpen(!isOpen)} to="/contact-us" className={({ isActive }) => (isActive ? "text-blue-400" : "hover:text-gray-300")}>Contact Us</NavLink>
                    <NavLink onClick={() => setIsOpen(!isOpen)} to="/pricing" className={({ isActive }) => (isActive ? "text-blue-400" : "hover:text-gray-300")}>Pricing</NavLink>
                    {currentUser ? (
                        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
                            {
                                data?.data?.profileImage ?
                                    <img src={`${url}${data?.data?.profileImage}`} className="size-10 rounded-full cursor-pointer" alt="" />
                                    :
                                    <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" />
                            }
                        </Dropdown>
                    ) : (
                        <Link to="/signIn" className="px-4 py-2 rounded text-[#070127] font-semibold">Login</Link>
                    )}
                </motion.div>
            </nav>
        </div>
    );
};

export default Navbar;
