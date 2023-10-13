import { usePagination } from "hooks/usePagination";
import { useFetchAllOnboarding } from "../hooks/useFetchAllOnboarding";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { TOnboarding } from "../types";

const ManageOnboarding = () => {
  const columns: ColumnsType<TOnboarding> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <span className="capitalize">
          {item.employee.firstName} {item.employee.lastName}
        </span>
      ),
    },

    {
      title: "Employee ID",
      dataIndex: "EmployeeID",
      key: "EmployeeID",
      render: (_, item) => (
        <span className="uppercase">{item.employee.empUid}</span>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (_, item) => (
        <span className="capitalize">
          {item.employee.designation?.department.name}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      render: (_, item) => (
        <span className="lowercase">{item.employee.email}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val) => <span className="capitalize">{val}</span>,
    },
    {
      title: "Action",
      key: "Action",
      width: 100,
      fixed: "right",
      render: (val, item) => (
        <div className="cursor-pointer">
          <Link to={appRoutes.startOnBoarding(item.id).path}>
            <button className="transparentButton text-caramel">Start</button>
          </Link>
        </div>
      ),
    },
  ];

  const { pagination, onChange } = usePagination();

  const { data, isLoading } = useFetchAllOnboarding({
    pagination,
  });
  return (
    <>
      {/* <div className="flex items-center gap-4 justify-end">
          <button className="button">Start</button>
          <button className="transparentButton text-caramel">
            Mark as completed
          </button>
        </div> */}

      <div className="mt-7">
        <Table
          size="small"
          dataSource={data?.data}
          loading={isLoading}
          columns={columns}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
          scroll={{ x: "max-content" }}
        />
      </div>
    </>
  );
};

export default ManageOnboarding;
