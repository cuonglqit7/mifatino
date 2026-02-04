import handleAPI from "@/apis/handleAPI";
import { ToggleSupplierModal } from "@/modals";
import { SupplierModel } from "@/models/SupplierModel";
import { Button, message, Modal, Space, Tooltip, Typography } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { Edit2, Sort, UserRemove } from "iconsax-reactjs";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;
const { confirm } = Modal;

const Suppliers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [supplierSelected, setSupplierSelected] = useState<SupplierModel>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState<number>(10);

  const columns: ColumnProps<SupplierModel>[] = [
    {
      title: "",
      dataIndex: "_id",
      render: (_: any, __: any, index: number) =>
        (page - 1) * pageSize + index + 1,
      align: "center",
    },
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
      dataIndex: "active",
      title: "Vận chuyển",
      render: (num) => num ?? "-",
    },
    {
      key: "buttonContainer",
      title: "Chỉnh sửa",
      dataIndex: "",
      render: (item: SupplierModel) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<Edit2 size={20} className="text-info" />}
              onClick={() => {
                setSupplierSelected(item);
                setIsVisible(true);
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              icon={<UserRemove size={20} className="text-danger" />}
              onClick={() => {
                confirm({
                  title: "Confirm",
                  content: "Bạn có chắc muốn xóa không?",
                  onOk: () => delSupplier(item._id),
                });
              }}
            ></Button>
          </Tooltip>
        </Space>
      ),
      fixed: "right",
      align: "right",
    },
  ];

  useEffect(() => {
    getSuppliers();
  }, [page, pageSize]);

  const getSuppliers = async () => {
    setIsLoading(true);
    const api = `/suppliers?page=${page}&pageSize=${pageSize}`;
    try {
      const res = await handleAPI(api);

      res.data && setSuppliers(res.data.items);
      setTotal(res.data.total);
    } catch (error: any) {
      console.log(error.message);
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const delSupplier = async (id: string) => {
    const api = `/suppliers?id=${id}`;
    try {
      await handleAPI(api, undefined, "delete");
      getSuppliers();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Table
        pagination={{
          showSizeChanger: true,
          onShowSizeChange: (_current, size) => {
            setPageSize(size);
          },
          total,
          onChange(page, _pageSize) {
            setPage(page);
          },
        }}
        scroll={{ y: "calc(100vh - 280px)" }}
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
        onClose={() => {
          supplierSelected && getSuppliers();
          setSupplierSelected(undefined);
          setIsVisible(false);
        }}
        onAddNew={(val: any) => setSuppliers([...suppliers, val])}
        supplier={supplierSelected}
      />
    </div>
  );
};

export default Suppliers;
