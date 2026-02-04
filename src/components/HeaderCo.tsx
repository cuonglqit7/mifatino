import { auth } from "@/firebases/firebaseConfig";
import { authSelector, removeAuth } from "@/redux/reducers/authReducer";
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Layout,
  MenuProps,
  Space,
} from "antd";
import { signOut } from "firebase/auth";
import { Notification, SearchNormal } from "iconsax-reactjs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderCo = () => {
  const user = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: async () => {
        signOut(auth);
        dispatch(removeAuth({}));
        localStorage.clear();
        navigate("/");
      },
    },
  ];
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
            <Dropdown menu={{ items }}>
              <Avatar src={user.photoURL} size={40} />
            </Dropdown>
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default HeaderCo;
