import handleAPI from "@/apis/handleAPI";
import FormItems from "@/components/FormItems";
import { FormModel } from "@/models/FormModel";
import { SupplierModel } from "@/models/SupplierModel";
import { replaceNameFile } from "@/utils/replaceNameFile";
import { uploadFileToCloudiary } from "@/utils/uploadFileToCloudiary";
import { Avatar, Button, Form, message, Modal, Typography } from "antd";
import { User } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAddNew: (val: SupplierModel) => void;
  supplier?: SupplierModel;
}

const { Paragraph } = Typography;

const ToggleSupplierModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGetting, setIsGetting] = useState(false);
  const { visible, onClose, onAddNew, supplier } = props;
  const [isTaking, setIsTaking] = useState<boolean>();
  const [file, setFile] = useState<any>();
  const [formData, setFormData] = useState<FormModel>();

  const inpRef = useRef<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getFormData();
  }, [visible]);

  useEffect(() => {
    if (supplier) {
      form.setFieldsValue(supplier);

      setIsTaking(supplier.isTaking === 1);
    }
  }, [supplier]);

  const addNewSupplier = async (values: any) => {
    setIsLoading(true);
    const api = `/suppliers?${supplier ? "id=" + supplier._id : ""}`;
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
      const res = await handleAPI(api, data, supplier ? "put" : "post");

      message.success(
        supplier ? "Cập nhật thành công" : "Thêm nhà cung cấp thành công",
      );
      !supplier && onAddNew(res.data);
      handleClose();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getFormData = async () => {
    setIsGetting(true);
    const api = `/suppliers/get-form`;

    try {
      const res = await handleAPI(api);
      res.data && setFormData(res.data);
      console.log(res);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsGetting(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };
  return (
    <Modal
      loading={isGetting}
      closable={!isLoading}
      okButtonProps={{
        loading: isLoading,
      }}
      width={720}
      open={visible}
      onCancel={handleClose}
      onOk={() => form.submit()}
      title={supplier ? "Chỉnh sửa" : "Thêm mới"}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <label htmlFor="photoURL" className="p-2 mb-3 row">
        <div className="col text-end">
          {file ? (
            <Avatar size={80} src={URL.createObjectURL(file)} />
          ) : supplier ? (
            <Avatar size={80} src={supplier.photoURL} />
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

      {formData && (
        <Form
          disabled={isLoading}
          onFinish={addNewSupplier}
          layout={formData.layout}
          labelCol={{ span: formData.labelCol }}
          wrapperCol={{ span: formData.wrapperCol }}
          size="large"
          form={form}
        >
          {formData.formItems.map((item) => (
            <FormItems item={item} />
          ))}
        </Form>
      )}
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
