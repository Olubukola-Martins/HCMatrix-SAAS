import { Switch, Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import moment from "moment";
import { useState } from "react";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { MoreOutlined } from "@ant-design/icons";
import { usePagination } from "hooks/usePagination";
import { useFetchLeaveTypes } from "../../../hooks/leaveTypes/useFetchLeaveTypes";
import { TLeaveType } from "../../../types";

export const LeaveTypesTable: React.FC<{
  handleView?: (item: TLeaveType) => void;
  handleDelete?: (item: TLeaveType) => void;
  handleActivateOrDeactivate?: {
    fn: (item: TLeaveType) => void;
    isLoading?: boolean;
  };
}> = ({ handleActivateOrDeactivate, handleView, handleDelete }) => {
  const { data, isFetching } = useFetchLeaveTypes();
  const { pagination, onChange } = usePagination({ pageSize: 8 });
  const [selectedId, setSelectedId] = useState<number>();
  const columns: ColumnsType<TLeaveType> = [
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
          style={{ color: getAppropriateColorForStatus(item.gender) }}
        >
          {`Active`}
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
        <Switch
          checkedChildren="Yes"
          unCheckedChildren="No"
          defaultChecked={item.gender === "active"}
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
                  label: "View",
                  key: "View",
                  onClick: () => handleView?.(item),
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
        dataSource={data?.data.map((item) => ({
          key: item.id,
          ...item,
        }))}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
