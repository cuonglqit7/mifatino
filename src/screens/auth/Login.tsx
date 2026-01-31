import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  message,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import handleAPI from "../../apis/handleAPI";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";

const { Title, Paragraph, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [isLoading, SetIsLoading] = useState(false);
  const [isRemember, SetIsRemember] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (values: { email: string; password: string }) => {
    const api = `/auth/login`;
    try {
      const res: any = await handleAPI(api, values, "post");
      res.data && dispatch(addAuth(res.data));
      message.success(res.message);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <Card style={{ width: 400 }}>
        <div className="text-center">
          <img
            className="mb-3 rounded-circle"
            src={
              "https://res.cloudinary.com/defgbyoii/image/upload/v1769685200/logo_MIFATINO_900x900_jx0skm.jpg"
            }
            alt="logo"
            style={{ width: 48, height: 48 }}
          />
          <Title level={2}>Đăng nhập</Title>
          <Paragraph type="secondary">Chào mừng bạn quay trở lại!</Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          disabled={isLoading}
          size="large"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng điền email!" }]}
          >
            <Input
              allowClear
              maxLength={255}
              type="email"
              placeholder="Nhập Email của bạn."
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật Khẩu"
            rules={[{ required: true, message: "Vui lòng điền mật khẩu!" }]}
          >
            <Input.Password
              maxLength={100}
              type="password"
              placeholder="Nhập mật khẩu của bạn."
            />
          </Form.Item>

          <div className="row">
            <div className="col">
              <Checkbox
                checked={isRemember}
                onChange={(val) => SetIsRemember(val.target.checked)}
              >
                Lưu đăng nhập
              </Checkbox>
            </div>
            <div className="col text-end">
              <Link to={"/"}>Quên mật khẩu?</Link>
            </div>
          </div>

          <div className="mt-4 mb-3">
            <Button
              type="primary"
              style={{ width: "100%" }}
              size="large"
              onClick={() => form.submit()}
            >
              Đăng nhập ngay
            </Button>
          </div>

          <SocialLogin />

          <div className="mt-4 text-center">
            <Space>
              <Text type="secondary">Bạn chưa có tài khoản?</Text>
              <Link to={"/sign-up"}>Đăng ký ngay!</Link>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
