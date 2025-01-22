import { Spin } from "antd";
import adminApi from "../../../redux/fetures/admin/adminApi";
import { Link } from "react-router-dom";

const OverviewData = () => {
    const { data: overviewAllData, isLoading } = adminApi.useGetAllDataOverviewByAdminQuery();

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
            <div className="bg-[#FFFFFF] p-5 rounded-lg ">
                <h2 className="text-[#64748B] font-semibold text-[14px] ">
                    Property Owner
                </h2>
                <h2 className="text-[#1C2434] font-semibold text-[24px] py-4 ">
                    {isLoading ? <Spin size="large" /> : overviewAllData?.data.ownersLength}
                </h2>
                <Link to="/admin/owner" className="text-[#4A90E2]">View List</Link>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-lg ">
                <h2 className="text-[#64748B] font-semibold text-[14px] ">
                    Total Property
                </h2>
                <h2 className="text-[#1C2434] font-semibold text-[24px] py-4 ">
                    {isLoading ? <Spin size="large" /> : overviewAllData?.data.propertyLength}
                </h2>
                <Link to="/admin/properties" className="text-[#4A90E2]">View List</Link>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-lg ">
                <h2 className="text-[#64748B] font-semibold text-[14px] ">
                    Total Unit
                </h2>
                <h2 className="text-[#1C2434] font-semibold text-[24px] py-4 ">
                    {isLoading ? <Spin size="large" /> : overviewAllData?.data.unitsLength}
                </h2>
                <button className="text-[#4A90E2]">View List</button>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-lg ">
                <h2 className="text-[#64748B] font-semibold text-[14px] ">
                    Total Tenant
                </h2>
                <h2 className="text-[#1C2434] font-semibold text-[24px] py-4 ">
                    {isLoading ? <Spin size="large" /> : overviewAllData?.data.tenantLength}
                </h2>
                <Link to="/admin/tenant" className="text-[#4A90E2]">View List</Link>
            </div>
        </div>
    );
};

export default OverviewData;