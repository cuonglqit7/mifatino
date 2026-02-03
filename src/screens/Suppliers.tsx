import handleAPI from "@/apis/handleAPI";
import { ToggleSupplierModal } from "@/modals";
import { SupplierModel } from "@/models/SupplierModel";
import { Button, message, Space, Typography } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { Sort } from "iconsax-reactjs";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

const Suppliers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns: ColumnProps<SupplierModel>[] = [
    {
      key: "name",
      dataIndex: "name",
      title: "Tên nhà cung cấp",
    },
    {
      key: "product",
      dataIndex: "product",
      title: "Sản phẩm",
    },
    {
      key: "contact",
      dataIndex: "contact",
      title: "SĐT",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "type",
      dataIndex: "isTaking",
      title: "Trạng thái",
      render: (isTaking: boolean) =>
        isTaking ? (
          <Text type="success">Đã thanh toán</Text>
        ) : (
          <Text type="secondary">Chưa thanh toán</Text>
        ),
    },
    {
      key: "ontheway",
      dataIndex: "",
      title: "Vận chuyển",
    },
  ];

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    setIsLoading(true);
    const api = `/suppliers`;
    try {
      const res = await handleAPI(api);

      res.data && setSuppliers(res.data);
    } catch (error: any) {
      console.log(error.message);
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={suppliers}
        title={() => (
          <div className="row">
            <div className="col">
              <Title level={5}>Nhà cung cấp</Title>
            </div>
            <div className="col text-end">
              <Space>
                <Button type="primary" onClick={() => setIsVisible(true)}>
                  Thêm mới
                </Button>
                <Button icon={<Sort size={20} color="gray" />}>Bộ lọc</Button>
                <Button>Tải về tất cả</Button>
              </Space>
            </div>
          </div>
        )}
      ></Table>
      <ToggleSupplierModal
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        onAddNew={(val: any) => setSuppliers([...suppliers, val])}
      />
    </div>
  );
};

export default Suppliers;
