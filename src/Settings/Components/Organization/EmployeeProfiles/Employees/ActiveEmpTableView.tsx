import { Button, Dropdown, Menu, Table } from "antd";
import { TEmployee } from "../../../../../AppTypes/DataEntitities";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import { MoreOutlined } from "@ant-design/icons";
import { employeeStatusColor } from "../../../../../GeneralHelpers/employeeHelpers";
import { Link } from "react-router-dom";
import { appRoutes } from "AppRoutes";

interface IProps {
  employees: TEmployee[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  rowSelection: TableRowSelection<TEmployee>;
}

const ActiveEmpTableView = ({
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
      render: (val, item) => (
        <Link
          to={`${appRoutes.singleEmployee(item.id).path}`}
          className="text-caramel hover:underline hover:text-caramel"
        >
          {item.name}
        </Link>
      ),
    },

    {
      title: "Employee ID",
      dataIndex: "employeeID",
      key: "employeeID",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      width: 20,
    },
    {
      title: "Employee Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={`capitalize ${employeeStatusColor(status)}`}>
          {status}
        </span>
      ),
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

export default ActiveEmpTableView;
