import { Table } from "antd";

import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { useFetchEmployees } from "features/core/employees/hooks/useFetchEmployees";
import { TEmployee } from "features/core/employees/types";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

export const LeaveWhoIsOut: React.FC = () => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useFetchEmployees({
    pagination,
  });

  const columns: ColumnsType<TEmployee> = [
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
      title: "ID",
      dataIndex: "ID",
      ellipsis: true,

      key: "ID",
      render: (_, item) => <span className="capitalize">{item.empUid}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      ellipsis: true,

      key: "email",
      render: (_, item) => <span className="">{item.email}</span>,
    },

    {
      title: "Status",
      dataIndex: "Employee Status",
      key: "Employee Status",
      ellipsis: true,

      render: (_, item) => (
        <span
          className="capitalize"
          style={{ color: getAppropriateColorForStatus(item.status) }}
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
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
