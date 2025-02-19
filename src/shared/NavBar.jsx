// import React, { useState } from "react";
// import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
//       <div className="text-2xl font-bold">LOGO</div>
//       <div className="hidden md:flex space-x-6">
//         <a href="#" className="hover:text-gray-300">Home</a>
//         <a href="#" className="hover:text-gray-300">About</a>
//         <a href="#" className="hover:text-gray-300">Contact Us</a>
//       </div>
//       <div className="hidden md:flex">
//         <button className="bg-blue-500 px-4 py-2 rounded">Login</button>
//       </div>
//       <div className="md:hidden flex items-center">
//         <button onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <CloseOutlined className="text-2xl" /> : <MenuOutlined className="text-2xl" />}
//         </button>
//       </div>
//       {isOpen && (
//         <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center space-y-4 py-4 md:hidden duration-300">
//           <a href="#" className="hover:text-gray-300">Home</a>
//           <a href="#" className="hover:text-gray-300">About</a>
//           <a href="#" className="hover:text-gray-300">Contact Us</a>
//           <button className="bg-blue-500 px-4 py-2 rounded">Login</button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-[#FFFFFF]" >

            <nav className="  text-[#64636A] px-6 py-4 flex items-center justify-between  max-w-[1400px] mx-auto ">
                <div className="text-2xl font-bold">LOGO</div>
                <div className="hidden md:flex space-x-12 ">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-black font-semibold" : "hover:text-black font-semibold"}>Home</NavLink>
                    <NavLink to="/about-us" className={({ isActive }) => isActive ? "text-black font-semibold" : "hover:text-black font-semibold"}>About</NavLink>
                    <NavLink to="/contact-us" className={({ isActive }) => isActive ? "text-black font-semibold" : "hover:text-black font-semibold"}>Contact Us</NavLink>
                    <NavLink to="/pricing" className={({ isActive }) => isActive ? "text-black font-semibold" : "hover:text-black font-semibold"}>Pricing</NavLink>
                </div>
                <div className="hidden md:flex">
                    <Link to="/signIn" className=" px-4 py-2 rounded text-[#070127] font-semibold ">Login</Link>
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
                    className={`absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 py-4 md:hidden overflow-hidden`}
                >
                    <NavLink onClick={() => setIsOpen(!isOpen)} to="/" className={({ isActive }) => isActive ? "text-blue-400" : "hover:text-gray-300"}>Home</NavLink>
                    <NavLink onClick={() => setIsOpen(!isOpen)} to="/about-us" className={({ isActive }) => isActive ? "text-blue-400" : "hover:text-gray-300"}>About</NavLink>
                    <NavLink onClick={() => setIsOpen(!isOpen)} to="/contact-us" className={({ isActive }) => isActive ? "text-blue-400" : "hover:text-gray-300"}>Contact Us</NavLink>
                    <NavLink onClick={() => setIsOpen(!isOpen)} to="/pricing" className={({ isActive }) => isActive ? "text-blue-400" : "hover:text-gray-300"}>Pricing</NavLink>
                    <Link to="/signIn" className="bg-blue-500 px-4 py-2 rounded">Login</Link>
                </motion.div>
            </nav>
        </div>
    );
};

export default Navbar;

