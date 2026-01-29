import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";

const { Title, Paragraph, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [isLoading, SetIsLoading] = useState(false);
  const [isRemember, SetIsRemember] = useState(false);

  const handleLogin = (values: { email: string; password: string }) => {
    console.log(values);
  };
  return (
    <div>
      <Card style={{ width: 400 }}>
        <div className="text-center">
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
            name={"email"}
            label="Email"
            rules={[{ required: true, message: "Vui lòng điền email!" }]}
          >
            {" "}
            <Input allowClear maxLength={255} type={"email"} />
          </Form.Item>
          <Form.Item
            name={"password"}
            label="Mật Khẩu"
            rules={[{ required: true, message: "Vui lòng điền mật khẩu!" }]}
          >
            {" "}
            <Input.Password maxLength={100} type={"password"} />
          </Form.Item>
        </Form>
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
            <Text>Bạn chưa có tải khoản?</Text>
            <Link to={"/sign-up"}>Đăng ký ngay!</Link>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default Login;
