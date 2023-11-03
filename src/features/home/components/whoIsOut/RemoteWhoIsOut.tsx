import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { TCompanyOwnerDashboard } from "features/core/company/types/companyDashboard";
import { getEmployeeStatusColor } from "features/core/employees/utils/getEmployeeStatusColor";
import { TEmployeeStatus } from "features/core/employees/types";

export const RemoteWhoIsOut: React.FC<{
  data?: TCompanyOwnerDashboard["outToday"]["remoteWork"]["result"];
}> = ({ data }) => {
  const columns: ColumnsType<
    TCompanyOwnerDashboard["outToday"]["remoteWork"]["result"][0]
  > = [
    {
      title: "Name",
      ellipsis: true,
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <Link
          to={`${appRoutes.singleEmployee(item.id).path}`}
          className="text-caramel hover:underline hover:text-caramel"
        >
          {getEmployeeFullName(item)}
        </Link>
      ),
    },
    {
      title: "Employee ID",

      dataIndex: "ID",
      ellipsis: true,

      key: "ID",
      render: (_, item) => <span className="capitalize">{item.empUid}</span>,
    },

    {
      title: "Status",
      dataIndex: "Employee Status",
      key: "Employee Status",
      ellipsis: true,

      render: (_, item) => (
        <span
          className={`capitalize ${getEmployeeStatusColor(
            item.status as TEmployeeStatus
          )}`}
        >
          {item.status}
        </span>
      ),
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      ellipsis: true,

      render: (_, item) => (
        <span className="capitalize">{item.jobInformation?.branch?.name}</span>
      ),
    },
    {
      title: "Designation",
      dataIndex: "Designation",
      key: "Designation",
      render: (_, item) => (
        <span className="capitalize">{item.designation?.name}</span>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        size="small"
        scroll={{ x: "max-content" }}
        dataSource={data}
      />
    </div>
  );
};
