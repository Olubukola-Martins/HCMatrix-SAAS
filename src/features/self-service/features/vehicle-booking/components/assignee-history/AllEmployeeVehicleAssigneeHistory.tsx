import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { usePagination } from "hooks/usePagination";
import moment from "moment";
import { useGetEmployeeVehicleAssigneeHistory } from "../../hooks/assignee-history/useGetEmployeeVehicleAssigneeHistory";
import { TVehicleAssigneeHistory } from "../../types/vehicleAssigneeHistory";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

export const AllEmployeeVehicleAssigneeHistory = () => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetEmployeeVehicleAssigneeHistory({
    pagination,
  });

  const columns: ColumnsType<TVehicleAssigneeHistory> = [
    {
      title: "Date Returned",
      dataIndex: "Date Returned",
      key: "Date Returned",
      render: (_, item) =>
        moment(item.dateReturned).format(DEFAULT_DATE_FORMAT),
    },
    {
      title: "Vehicle Brand",
      dataIndex: "brand",
      key: "brand",
      render: (_, item) => item.vehicle.brand,
    },
    {
      title: "Plate No",
      dataIndex: "Plate No",
      key: "Plate No",
      render: (_, item) => item.vehicle.plateNumber,
    },
    {
      title: "Vehicle Type",
      dataIndex: "Vehicle Type",
      key: "Vehicle Type",
      render: (_, item) => item.vehicle.type,
    },

    {
      title: "Assignee",
      dataIndex: "Assignee",
      key: "Assignee",
      render: (_, item) => (
        <span className={`capitalize`}>
          {getEmployeeFullName(item.assignee)}
        </span>
      ),
    },
    {
      title: "Duration(hrs)",
      dataIndex: "duration",
      key: "duration",
      render: (_, item) => item.duration,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-2">
        <Table
          columns={columns}
          size="small"
          dataSource={data?.data}
          loading={isFetching}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
        />
      </div>
    </>
  );
};
