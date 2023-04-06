import { Space, Dropdown, Menu, Table, Drawer } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { leaveRequestStatusColor } from "../../UtilityHelpers/leaves";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { TSingleConferenceRoomBooking } from "./hooks/useFetchSingleConferenceRoomBooking";
import { useFetchAllConferenceRoomBookings } from "./hooks/useFetchAllConferenceRoomBookings";
import { listPageSize } from "Constants";
import moment from "moment";

const CRBBookingsList = () => {
  const [showD, setShowD] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: listPageSize,
    total: 0,
    showSizeChanger: false,
  });

  const offset =
    pagination.current && pagination.current !== 1
      ? (pagination.pageSize ?? listPageSize) * (pagination.current - 1)
      : 0;

  const onChange = (newPagination: TablePaginationConfig | number) => {
    if (typeof newPagination === "number") {
      setPagination((val) => ({
        ...val,
        current: newPagination,
      }));
    } else {
      setPagination((val) => ({
        ...val,
        current: newPagination.current,
      }));
    }
  };
  const { data, isFetching } = useFetchAllConferenceRoomBookings({
    pagination: {
      limit: pagination.pageSize,
      offset,
    },
  });

  const columns: ColumnsType<TSingleConferenceRoomBooking> = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => moment(val).format("YYYY-MM-DD"),
    },
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
      render: (val: string) => <span>{`Marketing`}</span>,

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      ellipsis: true,

      // width: 100,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Meeting Date",
      dataIndex: "date",
      key: "date",
      render: (val) => moment(val).format("YYYY-MM-DD"),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (val) => moment(val).format("h:mm:ss"),
    },

    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (val) => moment(val).format("h:mm:ss"),
    },

    {
      title: "Status",
      dataIndex: "status",

      key: "status",
      render: (val: string) => (
        <span
          className="capitalize"
          style={{ color: leaveRequestStatusColor(val) }}
        >
          {val}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      render: (val: string, item: any) => (
        <Space align="center" className="cursor-pointer">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="3">View</Menu.Item>
                <Menu.Item key="2">Approve</Menu.Item>
                <Menu.Item key="1">Reject</Menu.Item>
              </Menu>
            }
            trigger={["click", "hover"]}
          >
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Drawer
        visible={showD}
        onClose={() => setShowD(false)}
        closeIcon={false}
        title={"Edit Request"}
      ></Drawer>

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

export default CRBBookingsList;
