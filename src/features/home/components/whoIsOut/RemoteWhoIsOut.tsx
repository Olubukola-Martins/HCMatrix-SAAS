import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { TCompanyOwnerDashboard } from "features/core/company/types/companyDashboard";

export const RemoteWhoIsOut: React.FC<{
  data?: TCompanyOwnerDashboard["outToday"]["leave"]["result"];
}> = ({ data }) => {
  const columns: ColumnsType<
    TCompanyOwnerDashboard["outToday"]["leave"]["result"][0]
  > = [
    {
      title: "Name",
      ellipsis: true,
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <Link
          to={`${appRoutes.singleEmployee(item.employee.id).path}`}
          className="text-caramel hover:underline hover:text-caramel"
        >
          {getEmployeeFullName(item.employee)}
        </Link>
      ),
    },
    {
      title: "ID",
      dataIndex: "ID",
      ellipsis: true,

      key: "ID",
      render: (_, item) => (
        <span className="capitalize">{item.employee.empUid}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      ellipsis: true,

      key: "email",
      render: (_, item) => <span className="lowercase">{}</span>,
      // render: (_, item) => <span className="lowercase">{item.employee.email}</span>,
    },

    {
      title: "Status",
      dataIndex: "Employee Status",
      key: "Employee Status",
      ellipsis: true,

      render: (_, item) => (
        <span
          className="capitalize"
          style={{ color: getAppropriateColorForStatus(item.employee.status) }}
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
        <span className="capitalize">
          {item.employee.jobInformation?.branch?.name}
        </span>
      ),
    },
    {
      title: "Designation",
      dataIndex: "Designation",
      key: "Designation",
      render: (_, item) => (
        <span className="capitalize">{item.employee.designation?.name}</span>
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
