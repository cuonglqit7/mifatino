import { appInfos } from "@/constants/appInfos";
import { Avatar, Button, Input, Layout, Space } from "antd";
import { Notification, SearchNormal, SearchNormal1 } from "iconsax-reactjs";

const { Header } = Layout;

const HeaderCo = () => {
  return (
    <Header className="p-0 d-flex justify-content-between align-items-center bg-white">
      <div className="p-2 row w-100">
        <div className="col">
          <Input
            placeholder="Tìm kiếm..."
            size="large"
            style={{
              borderRadius: 100,
              width: "100%",
            }}
            prefix={<SearchNormal className="text-muted" size={20} />}
          />
        </div>
        <div className="col text-end">
          <Space>
            <Button
              type="text"
              icon={<Notification size={22} color="gray" />}
            />
            <Avatar src={appInfos.logo} />
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default HeaderCo;
