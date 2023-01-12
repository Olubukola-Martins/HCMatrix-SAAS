import { Button, Dropdown, Menu, Table } from "antd";
import { TEmployee } from "../../../../../AppTypes/DataEntitities";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import { MoreOutlined } from "@ant-design/icons";
import { employeeStatusColor } from "../../../../../GeneralHelpers/employeeHelpers";

interface IProps {
  employees: TEmployee[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  rowSelection: TableRowSelection<TEmployee>;
}

const InvitedEmpTableView = ({
  employees,
  loading,
  pagination,
  rowSelection,
}: IProps) => {
  const columns: ColumnsType<TEmployee> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Last Sent",
      dataIndex: "lastSent",
      key: "lastSent",
      width: 80,
    },

    {
      title: "Action",
      key: "Action",
      width: 100,
      fixed: "right",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>Edit</Menu.Item>
            </Menu>
          }
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];
  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={employees.map((item) => ({ ...item, key: item.id }))}
        scroll={{ x: "max-content" }}
        loading={loading}
        className="mt-5"
        size="small"
        pagination={pagination}
      />
    </div>
  );
};

export default InvitedEmpTableView;
