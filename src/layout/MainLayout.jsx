import { Button, Dropdown, Layout, Space } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { FaChevronDown, FaRegUserCircle } from "react-icons/fa";
import { useAppDispatch } from "../redux/hooks";
import { logOut, selectCurrentUser } from "../redux/fetures/auth/authSlice";
import { useSelector } from "react-redux";
import authApi from "../redux/fetures/auth/authApi";
import { url } from "../globalConst/const";
import { BsThreeDotsVertical } from "react-icons/bs";
import logo from "../assets/logo.png"

const { Header, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const handleLOgout = () => {
    navigate("/signin")
    dispatch(logOut());
  };

  const currentUser = useSelector(selectCurrentUser);
  const { data } = authApi.useGetSingleUserInfoQuery(currentUser?.email);

  // console.log(`http://localhost:5000${data?.data?.profileImage}`);
  // console.log(data?.data);

  const items = [
    {
      label: (
        <div className="px-2">
          <h2 className="text-lg font-semibold">{data?.data?.name}</h2>
          <p className="text-sm text-gray-600">{currentUser?.email}</p>
        </div>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Button onClick={handleLOgout} className="w-full">
          LogOut
        </Button>
      ),
      key: "3",
    },
  ];


  return (
    <div className="">
      <Layout style={{ height: "100%" }}>
        <SideBar />
        <Layout>
          <Header className="flex justify-between items-center bg-white p-4">
            <img src={logo} className="block md:hidden cursor-pointer" alt="" />
            <p></p>
            <div className="flex items-center ">
              {
                data?.data?.profileImage ?
                  <img src={`${url}${data?.data?.profileImage}`} className="size-8 md:size-10 rounded-full cursor-pointer" alt="" />
                  :
                  <FaRegUserCircle className="size-10 rounded-full" />
              }
              <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a
                onClick={(e) => e.preventDefault()} 
                className="flex items-center cursor-pointer"
              >
                <Space>
                  <BsThreeDotsVertical className="text-xl" />
                </Space>
              </a>
            </Dropdown>
            </div>
            
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
