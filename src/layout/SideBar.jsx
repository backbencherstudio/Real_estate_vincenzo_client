import { Layout, Menu } from "antd";
import { adminPaths } from "../routes/admin.routes";
import { ownerPaths } from "../routes/owner.routes";
import { tenantPaths } from "../routes/tenant.routes";
import { sidebarItemGenerator } from "../utils/sidebarItemGenerator";

const { Sider } = Layout;

const userRole = {
    ADMIN: "admin",
    OWNER: "owner",
    TENENT: "tenant",
};

const SideBar = () => {
    // const token = useAppSelector(useCurrentToken);
    
    let user = "admin";
    // if (token) {
    //     user = verifyToken(token);
    // }

    // const role = "admin";
    let sideBarItems;

    switch (user) {
        case userRole.ADMIN:
            sideBarItems = sidebarItemGenerator(adminPaths, userRole.ADMIN);
            break;
        case userRole.OWNER:
            sideBarItems = sidebarItemGenerator(ownerPaths, userRole.OWNER);
            break;
        case userRole.TENENT:
            sideBarItems = sidebarItemGenerator(tenantPaths, userRole.TENENT);
            break;

        default:
            break;
    }

    return (
        <Sider
            style={{ height: "100vh", position: "sticky", top: "0", left: "0", backgroundColor:"#1C2434"  }}
            breakpoint="lg"
            collapsedWidth="0"
        >
            <div
                style={{
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1C2434",
                }}
            >
                <h2 style={{ color: "white" }}> Real Estate </h2>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["4"]}
                items={sideBarItems}
            />
        </Sider>
    );
};

export default SideBar;
