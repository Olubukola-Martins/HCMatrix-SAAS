import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import moment from "moment";
import { useState } from "react";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { useGetLeaveCycles } from "../../../hooks/leaveCycles/useGetLeaveCycles";
import { TLeaveCycle } from "../LeaveCyclesAccordian";
import { MoreOutlined } from "@ant-design/icons";
import { usePagination } from "hooks/usePagination";
import AppSwitch from "components/switch/AppSwitch";

export const LeaveCyclesTable: React.FC<{
  handleDelete?: (item: TLeaveCycle) => void;
  handleEdit?: (item: TLeaveCycle) => void;
  handleActivateOrDeactivate?: {
    fn: (item: TLeaveCycle) => void;
    isLoading?: boolean;
  };
}> = ({ handleActivateOrDeactivate, handleDelete, handleEdit }) => {
  const { data, isFetching } = useGetLeaveCycles();
  const { pagination, onChange } = usePagination({ pageSize: 8 });
  const [selectedId, setSelectedId] = useState<number>();
  const columns: ColumnsType<TLeaveCycle> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item.name}</span>,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (val, item) => (
        <span
          className="capitalize"
          style={{ color: getAppropriateColorForStatus(item.status) }}
        >
          {item.status}
        </span>
      ),
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (val, item) => (
        <span className="">
          {moment(item.startDate).format(DEFAULT_DATE_FORMAT)}
        </span>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (val, item) => (
        <span className="">
          {moment(item.endDate).format(DEFAULT_DATE_FORMAT)}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val, item) => (
        <span className="">
          {moment(item.createdAt).format(DEFAULT_DATE_FORMAT)}
        </span>
      ),
    },
    {
      title: "Last Modified",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (val, item) => (
        <span className="">
          {moment(item.updatedAt).format(DEFAULT_DATE_FORMAT)}
        </span>
      ),
    },
    {
      title: "Activation",
      dataIndex: "activation",
      key: "activation",
      render: (_, item) => (
        <AppSwitch
          checkedChildren="Yes"
          unCheckedChildren="No"
          defaultChecked={item.status === "active"}
          onChange={() => {
            setSelectedId(item.id); //to ensure only one row is selected for loading to affect
            handleActivateOrDeactivate?.fn?.(item);
          }}
          loading={
            selectedId === item.id && handleActivateOrDeactivate?.isLoading
          }
        />
      ),
    },

    {
      title: "Actions",
      dataIndex: "act",
      key: "act",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  label: "Edit",
                  key: "Edit",
                  onClick: () => handleEdit?.(item),
                },
                {
                  label: "Delete",
                  key: "Delete",
                  onClick: () => handleDelete?.(item),
                },
              ]}
            />
          }
          children={<MoreOutlined />}
          trigger={["click"]}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        size="small"
        dataSource={data?.data.map((item): TLeaveCycle & { key: number } => ({
          key: item.id,
          id: item.id,

          createdAt: item.createdAt,
          endDate: item.dueDate,
          name: item.name,
          startDate: item.dateAssigned,
          updatedAt: item.updatedAt,
          status:
            item.status === "resolved"
              ? "ended"
              : item.status === "closed"
              ? "active"
              : "inactive",
        }))}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
