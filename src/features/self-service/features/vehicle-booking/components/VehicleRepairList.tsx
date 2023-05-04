import { Table } from "antd";
import { TVehicle, TVehicleRepair } from "../hooks/useFetchVehicles";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";
import { AppButton } from "components/button/AppButton";

export const VehicleRepairList: React.FC<{ vehicle: TVehicle }> = ({
  vehicle,
}) => {
  const { pagination, onChange } = usePagination();
  const columns: ColumnsType<TVehicleRepair> = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Vehicle Name",
      dataIndex: "vehicleName",
      key: "vehicleName",
      render: (_, item) => vehicle.brand,
    },
    {
      title: "Plate No",
      dataIndex: "plateNo",
      key: "plateNo",
      render: (_, item) => vehicle.plateNumber,
    },

    {
      title: "Registered",
      dataIndex: "registered",
      key: "registered",
      render: (_, item) => item.createdAt,
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (_, item) => item.nextDueDate,
    },

    {
      title: "Action",
      key: "Action",
      width: 100,
      fixed: "right",
      render: () => (
        <AppButton
          label="Renew"
          variant="transparent"
          additionalClassNames={["border-green-200"]}
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <Table
        columns={columns}
        size="small"
        dataSource={vehicle.repairs}
        pagination={{ ...pagination, total: vehicle.repairs.length }}
        onChange={onChange}
      />
    </div>
  );
};
