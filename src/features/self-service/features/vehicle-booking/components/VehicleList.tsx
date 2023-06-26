import { Button, Dropdown, Menu, Table } from "antd";
import { SelectVehicleStatus } from "./SelectVehicleStatus";
import { SelectVehicleType } from "./SelectVehicleType";
import { useState } from "react";
import { TVehicle, useFetchVehicles } from "../hooks/useFetchVehicles";
import { useApiAuth } from "hooks/useApiAuth";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { MoreOutlined } from "@ant-design/icons";

import { TVehicleStatus, TVehicleType } from "../hooks/useCreateVehicle";
import { usePagination } from "hooks/usePagination";
import { appRoutes } from "config/router/paths";

const VehicleList = () => {
  const { token, companyId } = useApiAuth();
  const [status, setStatus] = useState<TVehicleStatus>();
  const [type, setType] = useState<TVehicleType>();

  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useFetchVehicles({
    token,
    companyId,
    pagination,
    searchParams: {
      name: type,
    },
    status,
  });

  const columns: ColumnsType<TVehicle> = [
    {
      title: "Vehicle Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <Link
          to={`${appRoutes.vehicleDetails(item.id).path}`}
          className="text-caramel hover:underline hover:text-caramel"
        >
          {item.model} {item.brand}
        </Link>
      ),
    },
    {
      title: "Plate No",
      dataIndex: "Plate No",
      key: "Plate No",
      render: (_, item) => item.plateNumber,
    },
    {
      title: "Vehicle Type",
      dataIndex: "Vehicle Type",
      key: "Vehicle Type",
      render: (_, item) => item.type,
    },

    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (_, item) => item.status,
    },
    {
      title: "Color",
      dataIndex: "Color",
      key: "Color",
      render: (_, item) => item.color,
    },
    {
      title: "Assigned to",
      dataIndex: "Assigned to",
      key: "Assigned to",
      render: (_, item) => (
        <span className="capitalize">
          {item.assignee?.firstName} {item.assignee?.lastName} N/A
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
              {[
                { label: "edit", onClick: () => {} },
                { label: "delete", onClick: () => {} },
                { label: "download", onClick: () => {} },
                { label: "add document", onClick: () => {} },
              ].map((item) => (
                <Menu.Item key={item.label} onClick={item.onClick}>
                  <span className="capitalize">{item.label}</span>
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center gap-3">
        {/* filter inputs */}
        <div className="flex items-center gap-3">
          <SelectVehicleType
            onSelect={(val) => setType(val)}
            onClear={() => setType(undefined)}
          />
          <SelectVehicleStatus
            onSelect={(val) => setStatus(val)}
            onClear={() => setStatus(undefined)}
          />
        </div>
      </div>
      <Table
        columns={columns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};

export default VehicleList;
