import DashboardChart from "../../components/AdminComponents/DashboardChart";
import { dashboardCounterObject } from "../../testJsonData/testJson";

const AdminDashboard = () => {



    return (
        <div>
            <div>
                <h2 className="font-manrope text-2xl font-bold leading-[48px] tracking-[-0.03em] text-left"
                >Dashboard</h2>
                <span>
                    <p className="text-[#64748B] text-[14px] " > <span className="opacity-60" >Home /</span> Dashboard</p>
                </span>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-10 " >
                {
                    dashboardCounterObject?.map(item => <div
                    className="bg-[#FFFFFF] p-5 rounded-lg "
                        key={item._id} >
                        <h2 className="text-[#64748B] font-semibold text-[14px] " >{item.title}</h2>
                        <h2 className="text-[#1C2434] font-semibold text-[24px] py-4 " >{item.count}</h2>
                        <button className="text-[#4A90E2]" >View List</button>
                    </div>)
                }
            </div>

            <div>
                <DashboardChart/>
            </div>




        </div>
    );
};

export default AdminDashboard;