import { Table } from "antd";
import { TVehicle, TVehicleAssigneeHistory } from "../hooks/useFetchVehicles";
import { ColumnsType } from "antd/lib/table";
import { usePagination } from "hooks/usePagination";

export const VehicleAssigneeHistoryList: React.FC<{ vehicle: TVehicle }> = ({
  vehicle,
}) => {
  const { pagination, onChange } = usePagination();
  const columns: ColumnsType<TVehicleAssigneeHistory> = [
    {
      title: "Assignee Name",
      dataIndex: "assigneeName",
      key: "assigneeName",
      render: (_, item) => (
        <span className="capitalize">
          {item.assignee.firstName} {item.assignee.lastName}
        </span>
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
      render: (_, item) => (
        <span className="uppercase">{item.assignee.empUid}</span>
      ),
    },
    {
      title: "Job Role",
      dataIndex: "jobRole",
      key: "jobRole",
      render: (_, item) => "N/A",
    },

    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (_, item) => "N/A",
    },
    {
      title: "Date Assigned",
      dataIndex: "dateAssigned",
      key: "dateAssigned",
      render: (_, item) => item.dateAssigned,
    },
    {
      title: "Date Returned",
      dataIndex: "dateReturned",
      key: "dateReturned",
      render: (_, item) => item.dateReturned,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (_, item) => item.duration,
    },

    {
      title: "Action",
      key: "Action",
      width: 100,
      fixed: "right",
      render: () => <span>...</span>,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <Table
        columns={columns}
        size="small"
        dataSource={vehicle.assigneeHistory}
        pagination={{ ...pagination, total: vehicle.assigneeHistory.length }}
        onChange={onChange}
      />
    </div>
  );
};
