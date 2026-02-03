import { appInfos } from "@/constants/appInfos";
import { colors } from "@/constants/colors";
import { Layout, Menu, MenuProps, Typography } from "antd";
import {
  Box,
  Category2,
  Chart,
  DocumentFilter,
  Home2,
  ProfileCircle,
} from "iconsax-reactjs";
import { Link } from "react-router-dom";

const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];
const { Sider } = Layout;

const SiderCo = () => {
  const navbars: MenuItem[] = [
    {
      key: "dashboard",
      label: (
        <Link to={"/"} style={{ textDecorationLine: "none" }}>
          Tổng quan
        </Link>
      ),
      icon: <Home2 size={20} />,
    },
    {
      key: "inventories",
      label: (
        <Link to={"/inventories"} style={{ textDecorationLine: "none" }}>
          Kho hàng
        </Link>
      ),
      icon: <Category2 size={20} />,
    },
    {
      key: "reports",
      label: (
        <Link to={"/reports"} style={{ textDecorationLine: "none" }}>
          Báo cáo
        </Link>
      ),
      icon: <Chart size={20} />,
    },
    {
      key: "suppliers",
      label: (
        <Link to={"/suppliers"} style={{ textDecorationLine: "none" }}>
          Nhà cung cấp
        </Link>
      ),
      icon: <ProfileCircle size={20} />,
    },
    {
      key: "orders",
      label: (
        <Link to={"/orders"} style={{ textDecorationLine: "none" }}>
          Đơn hàng
        </Link>
      ),
      icon: <Box size={20} />,
    },
    {
      key: "managerStore",
      label: (
        <Link to={"/manager-store"} style={{ textDecorationLine: "none" }}>
          Quản lý của hàng
        </Link>
      ),
      icon: <DocumentFilter size={20} />,
    },
  ];
  return (
    <Sider theme="light" style={{ height: "100vh" }}>
      <div className="mt-2 mb-2 d-flex justify-content-center aligh-items-center">
        <img
          src={appInfos.logo}
          alt="logo"
          className=" rounded-circle"
          style={{ width: 48, height: 48 }}
        />
        <Title
          style={{
            color: colors.primary500,
            fontWeight: "bold",
            fontSize: "1.3rem",
            margin: 0,
            paddingLeft: "2px",
            verticalAlign: "middle",
          }}
          className="text-uppercase d-flex align-items-center"
        >
          {appInfos.title}
        </Title>
      </div>
      <Menu items={navbars} theme="light" mode="inline" />
    </Sider>
  );
};

export default SiderCo;
