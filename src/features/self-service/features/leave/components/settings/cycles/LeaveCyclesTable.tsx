import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import moment from "moment";
import { useState } from "react";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { MoreOutlined } from "@ant-design/icons";
import AppSwitch from "components/switch/AppSwitch";

import { TLeaveCycle } from "../../../types";

export const LeaveCyclesTable: React.FC<{
  handleEdit?: (item: TLeaveCycle) => void;
  handleActivateOrDeactivate?: {
    fn: (item: TLeaveCycle) => void;
    isLoading?: boolean;
  };
  data?: TLeaveCycle[];
  isFetching?: boolean;
}> = ({ handleActivateOrDeactivate, handleEdit, data, isFetching }) => {
  const [selectedId, setSelectedId] = useState<number>();
  const columns: ColumnsType<TLeaveCycle> = [
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (val, item) => (
        <span
          className="capitalize"
          style={{
            color: getAppropriateColorForStatus(
              item.isActive ? "active" : "inactive"
            ),
          }}
        >
          {item.isActive ? "active" : "inactive"}
        </span>
      ),
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (val, item) => (
        <span className="">
          {moment(
            `${moment().format("YYYY")}-${item.startMonth + 1}-${item.startDay}`
          ).format(`DD, MMMM`)}
          {/* //cos of backend api, using 0 - 11 for month, hence +1 */}
        </span>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (val, item) => (
        <span className="">
          {moment(
            `${moment().format("YYYY")}-${item.endMonth + 1}-${item.endDay}`
          ).format(`DD, MMMM`)}
          {/* //cos of backend api, using 0 - 11 for month, hence +1 */}
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
          defaultChecked={item.isActive}
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
        dataSource={data}
        loading={isFetching}
      />
    </div>
  );
};
