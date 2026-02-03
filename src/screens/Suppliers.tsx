import { ToggleSupplierModal } from "@/modals";
import { SupplierModel } from "@/models/SupplierModel";
import { Button, Space, Typography } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { Sort } from "iconsax-reactjs";
import { useState } from "react";

const { Title } = Typography;

const Suppliers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const columns: ColumnProps<SupplierModel>[] = [];
  return (
    <div>
      <Table
        columns={columns}
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
        onAddNew={(val: any) => console.log(val)}
      />
    </div>
  );
};

export default Suppliers;
