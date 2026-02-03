import handleAPI from "@/apis/handleAPI";
import { SupplierModel } from "@/models/SupplierModel";
import { replaceNameFile } from "@/utils/replaceNameFile";
import { uploadFileToCloudiary } from "@/utils/uploadFileToCloudiary";
import {
  Avatar,
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Typography,
} from "antd";
import { User } from "iconsax-reactjs";
import { useRef, useState } from "react";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAddNew: (val: SupplierModel) => void;
  supplier?: SupplierModel;
}

const { Text, Paragraph } = Typography;

const ToggleSupplierModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { visible, onClose, onAddNew, supplier } = props;
  const [isTaking, setIsTaking] = useState<boolean>();
  const [file, setFile] = useState<any>();
  const inpRef = useRef<any>(null);

  const [form] = Form.useForm();

  const addNewSupplier = async (values: any) => {
    setIsLoading(true);
    const api = `/suppliers`;
    try {
      const data: any = {};

      for (const i in values) {
        data[i] = values[i] ?? "";
      }

      data.price = values.price ? parseInt(values.price) : 0;
      data.isTaking = isTaking ? 1 : 0;

      if (file) {
        data.photoURL = await uploadFileToCloudiary(file);
      }
      data.slug = replaceNameFile(values.name);
      const res = await handleAPI(api, data, "post");

      message.success("Thêm nhà cung cấp thành công");
      onAddNew(res.data);
      handleClose();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };
  return (
    <Modal
      closable={!isLoading}
      okButtonProps={{
        loading: isLoading,
      }}
      width={720}
      open={visible}
      onCancel={handleClose}
      onOk={() => form.submit()}
      title="Thêm mới"
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <label htmlFor="photoURL" className="p-2 mb-3 row">
        <div className="col text-end">
          {file ? (
            <Avatar size={80} src={URL.createObjectURL(file)} />
          ) : (
            <Avatar
              size={80}
              className="bg-white"
              style={{
                border: "1px dashed gray",
              }}
            >
              <User size={60} color="gray" />
            </Avatar>
          )}
        </div>
        <div className="col ml-3">
          <Paragraph className="text-muted m-0">Kéo hình vào đây</Paragraph>
          <Paragraph className="text-muted">hoặc</Paragraph>
          <Button type="link" onClick={() => inpRef.current.click()}>
            Chọn file
          </Button>
        </div>
      </label>
      <Form
        disabled={isLoading}
        onFinish={addNewSupplier}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        size="large"
        form={form}
      >
        <Form.Item
          name={"name"}
          label="Tên nhà cung cấp"
          rules={[
            { required: true, message: "Vui lòng nhập tên nhà cung cấp" },
          ]}
        >
          <Input placeholder="Nhập tên nhà cung cấp" allowClear></Input>
        </Form.Item>
        <Form.Item name={"product"} label="Sản phẩm">
          <Input placeholder="Nhập sản phẩm" allowClear></Input>
        </Form.Item>
        <Form.Item name={"categories"} label="Danh mục">
          <Select options={[]} placeholder="Chọn danh mục" />
        </Form.Item>
        <Form.Item name={"price"} label="Giá">
          <Input type={"number"} placeholder="Nhập giá" allowClear></Input>
        </Form.Item>
        <Form.Item name={"contact"} label="SĐT">
          <Input type={"number"} placeholder="Nhập SĐT"></Input>
        </Form.Item>
        <Form.Item label="Trạng thái">
          <div className="mb-2">
            <Button
              type={isTaking === false ? "primary" : "default"}
              onClick={() => setIsTaking(false)}
            >
              Không hoạt động
            </Button>
          </div>
          <Button
            type={isTaking ? "primary" : "default"}
            onClick={() => setIsTaking(true)}
          >
            Đang hoạt động
          </Button>
        </Form.Item>
      </Form>
      <div className="d-none">
        <input
          ref={inpRef}
          accept="image/*"
          type="file"
          name="photoURL"
          id="photoURL"
          onChange={(val: any) => setFile(val.target.files[0])}
        />
      </div>
    </Modal>
  );
};

export default ToggleSupplierModal;
