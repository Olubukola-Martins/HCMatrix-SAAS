import { Table } from "antd";

import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { useFetchEmployees } from "features/core/employees/hooks/useFetchEmployees";
import { TEmployee } from "features/core/employees/types";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";

export const RemoteWhoIsOut: React.FC = () => {
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
      render: (_, item) => (
        <span className="capitalize">{getEmployeeFullName(item)}</span>
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
      title: "Role",
      dataIndex: "role",
      ellipsis: true,

      key: "role",
      render: (_, item) => <span className="capitalize">{item.role.name}</span>,
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
