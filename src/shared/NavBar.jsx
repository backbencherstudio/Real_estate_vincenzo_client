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
            <nav className="text-[#64636A] py-4 px-4 xl:px-0 lg:py-10 flex items-center justify-between max-w-7xl mx-auto">
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
                                    <img src={`${url}${data?.data?.profileImage}`} className="size-10 bg-gray-300 rounded-full cursor-pointer" alt="" />
                                    :
                                    <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" />
                            }
                        </Dropdown>
                    ) : (
                        <Link to="/signIn" className="px-4 py-2 rounded text-[#070127] font-semibold">Login</Link>
                    )}
                </div>
                <div className="md:hidden flex items-center gap-4">
                    {
                        currentUser ?
                            <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
                                {data?.data?.profileImage ? (
                                    <img
                                        src={`${url}${data?.data?.profileImage}`}
                                        className="size-8 bg-gray-300 rounded-full cursor-pointer"
                                        alt=""
                                    />
                                ) : (
                                    <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" />
                                )}
                            </Dropdown> : ''
                    }
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="z-50 relative"
                    >
                        {isOpen ? <CloseOutlined className="text-2xl" /> : <MenuOutlined className="text-2xl" />}
                    </motion.button>
                </div>

                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: isOpen ? 0 : "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed top-0 right-0 h-screen w-[70%] bg-white shadow-2xl z-40 md:hidden"
                >
                    <div className="flex flex-col pt-20 px-6 h-full">
                        <div className="flex flex-col space-y-4">
                            <NavLink
                                onClick={() => setIsOpen(false)}
                                to="/"
                                className={({ isActive }) =>
                                    `text-lg ${isActive ? "font-semibold bg-blue-600 p-2 rounded-md text-white" : "bg-gray-100 p-2 rounded-md text-gray-600  hover:text-black"}`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                onClick={() => setIsOpen(false)}
                                to="/about-us"
                                className={({ isActive }) =>
                                    `text-lg ${isActive ? "font-semibold bg-blue-600 p-2 rounded-md text-white" : "bg-gray-100 p-2 rounded-md text-gray-600  hover:text-black"}`
                                }
                            >
                                About
                            </NavLink>
                            <NavLink
                                onClick={() => setIsOpen(false)}
                                to="/contact-us"
                                className={({ isActive }) =>
                                    `text-lg ${isActive ? "font-semibold bg-blue-600 p-2 rounded-md text-white" : "bg-gray-100 p-2 rounded-md text-gray-600  hover:text-black"}`
                                }
                            >
                                Contact Us
                            </NavLink>
                            <NavLink
                                onClick={() => setIsOpen(false)}
                                to="/pricing"
                                className={({ isActive }) =>
                                    `text-lg ${isActive ? "font-semibold bg-blue-600 p-2 rounded-md text-white" : "bg-gray-100 p-2 rounded-md text-gray-600  hover:text-black"}`
                                }
                            >
                                Pricing
                            </NavLink>
                        </div>

                        <div className="mt-8">
                            {currentUser ? (
                                ""
                            ) : (
                                <Link
                                    to="/signIn"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-block px-4 py-2 rounded bg-gray-100 text-[#070127] font-semibold"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.div>

                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </nav>
        </div>
    );
};

export default Navbar;
