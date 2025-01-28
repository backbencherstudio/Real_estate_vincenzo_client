/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";
import { useSelector } from "react-redux";

const OverviewData = ({ overviewAllData }) => {
    const currentUser = useSelector(selectCurrentUser);

    return (
        <div className={`mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10`}>
            {
                overviewAllData?.data.ownersLength &&
                <div className="bg-[#FFFFFF] p-5 rounded-lg shadow-md ">
                    <h2 className="text-[#64748B] font-semibold text-[14px] ">
                        Property Owner
                    </h2>
                    <h2 className="text-[#1C2434] font-semibold text-[24px] py-4 ">
                        { overviewAllData?.data.ownersLength}
                    </h2>
                    <Link to={`/${currentUser?.role}/owner`} className="text-[#4A90E2]">View List</Link>
                </div>
            }

            <div className="bg-[#FFFFFF] p-5 rounded-lg shadow-md ">
                <h2 className="text-[#64748B] font-semibold text-[14px] ">
                    Total Property
                </h2>
                <h2 className="text-[#1C2434] font-semibold text-[24px] py-4 ">
                    { overviewAllData?.data.propertyLength}
                </h2>
                <Link to={`/${currentUser?.role}/properties`} className="text-[#4A90E2]">View List</Link>
            </div>

            {
                overviewAllData?.data.unitsLength  ?

            <div className="bg-[#FFFFFF] p-5 rounded-lg shadow-md ">
                <h2 className="text-[#64748B] font-semibold text-[14px] ">
                    Total Unit
                </h2>
                <h2 className="text-[#1C2434] font-semibold text-[24px] py-4 ">
                    {overviewAllData?.data.unitsLength}
                </h2>
                <button className="text-[#4A90E2]">View List</button>
            </div>
            : 

            ( currentUser.role !== "admin" &&  

                <div className="bg-[#FFFFFF] p-5 rounded-lg ">
                <h2 className="text-[#64748B] font-semibold text-[14px] ">
                    Total Unit
                </h2>
                <h2 className="text-[#1C2434] font-semibold text-[24px] py-4 ">
                    {overviewAllData?.data.unitsLength}
                </h2>
                <button className="text-[#4A90E2]">View List</button>
            </div>
              )
            
            }

            <div className="bg-[#FFFFFF] p-5 rounded-lg shadow-md ">
                <h2 className="text-[#64748B] font-semibold text-[14px] ">
                    Total Tenant
                </h2>
                <h2 className="text-[#1C2434] font-semibold text-[24px] py-4 ">
                    { overviewAllData?.data.tenantLength}
                </h2>
                <Link to={`/${currentUser.role}/tenants`} className="text-[#4A90E2]">View List</Link>
            </div>
        </div>
    );
};

export default OverviewData;