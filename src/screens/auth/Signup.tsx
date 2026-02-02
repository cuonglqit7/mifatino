import { Button, Card, Form, Input, message, Space, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import handleAPI from "../../apis/handleAPI";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";

const { Title, Paragraph, Text } = Typography;

const Signup = () => {
  const [form] = Form.useForm();
  const [isLoading, SetIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSignup = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    SetIsLoading(true);

    const api = `/auth/register`;
    try {
      const res: any = await handleAPI(api, values, "post");

      if (res.data) {
        message.success(res.message);
        dispatch(addAuth(res.data));
      }
    } catch (err: any) {
      message.error(err.message);
    } finally {
      SetIsLoading(false);
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
          <Title level={2}>Đăng ký</Title>
          <Paragraph type="secondary">
            Bạn sẽ được trải nghiệm không gian mua sắm tuyệt vời.
          </Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSignup}
          disabled={isLoading}
          size="large"
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng điền tên của bạn!" }]}
          >
            <Input allowClear maxLength={100} placeholder="Nhập tên của bạn." />
          </Form.Item>
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
            rules={[
              { required: true, message: "Vui lòng điền mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value.length > 6) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu cần trên 6 ký tự!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              maxLength={100}
              type="password"
              placeholder="Nhập mật khẩu của bạn."
            />
          </Form.Item>
        </Form>

        <div className="mt-5 mb-3">
          <Button
            type="primary"
            style={{ width: "100%" }}
            size="large"
            onClick={() => form.submit()}
            loading={isLoading}
          >
            Đăng ký ngay
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Space>
            <Text type="secondary">Bạn đã có tài khoản?</Text>
            <Link to={"/login"}>Đăng nhập ngay!</Link>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
