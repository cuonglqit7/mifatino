import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";

const { Title, Paragraph, Text } = Typography;

const Signup = () => {
  const [form] = Form.useForm();
  const [isLoading, SetIsLoading] = useState(false);

  const handleLogin = (values: { email: string; password: string }) => {
    console.log(values);
  };
  return (
    <div>
      <Card style={{ width: 400 }}>
        <div className="text-center">
          <Title level={2}>Đăng ký</Title>
          <Paragraph type="secondary">
            Bạn sẽ được trải nghiệm không gian mua sấm tuyệt vời.
          </Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          disabled={isLoading}
          size="large"
        >
          <Form.Item
            name={"name"}
            label="Tên"
            rules={[{ required: true, message: "Vui lòng điền tên của bạn!" }]}
          >
            {" "}
            <Input allowClear maxLength={100} />
          </Form.Item>
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

        <div className="mt-4 mb-3">
          <Button
            type="primary"
            style={{ width: "100%" }}
            size="large"
            onClick={() => form.submit()}
          >
            Đăng ký ngay
          </Button>
        </div>

        <SocialLogin />

        <div className="mt-4 text-center">
          <Space>
            <Text>Bạn đã có tải khoản?</Text>
            <Link to={"/login"}>Đăng nhập ngay!</Link>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
