import { usePagination } from "hooks/usePagination";
import { useFetchAllOnboarding } from "../hooks/useFetchAllOnboarding";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { TOnboarding } from "../types";
import BulkOnboardingActionHeader from "./BulkOnboardingActionHeader";
import { useState } from "react";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";

const ManageOnboarding = () => {
  const columns: ColumnsType<TOnboarding> = [
    {
      title: "S/N", 
      key: "index",
      render: (text, item, index) => index + 1, 
    },
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
      render: (_, item) => <span className="uppercase">{item.employee.empUid}</span>,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (_, item) => <span className="capitalize">{item.employee.designation?.department.name}</span>,
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      render: (_, item) => <span className="lowercase">{item.employee.email}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val) => (
        <span className="capitalize" style={{ color: getAppropriateColorForStatus(val) }}>
          {val}
        </span>
      ),
    },
    {
      title: "Action",
      key: "Action",
      width: 100,
      fixed: "right",
      render: (val, item) => (
        <div className="cursor-pointer">
          <Link to={appRoutes.startOnBoarding(item.id).path}>
            <button className="transparentButton text-caramel">{item.status === "pending" ? "Start" : "View"}</button>
          </Link>
        </div>
      ),
    },
  ];

  const { pagination, onChange } = usePagination();

  const { data, isLoading } = useFetchAllOnboarding({
    pagination,
  });
  const [selectedData, setSelectedData] = useState<TOnboarding[]>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TOnboarding[]) => {
      setSelectedData(selectedRows);
    },
  };
  const clearSelected = () => setSelectedData([]);
  return (
    <>
      <BulkOnboardingActionHeader
        data={selectedData}
        clearSelected={clearSelected}
      />

      <div className="mt-7">
        <Table
          size="small"
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          dataSource={data?.data.map((item) => ({ ...item, key: item.id }))}
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
