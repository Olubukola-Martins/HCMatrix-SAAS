import { Space, Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import moment from "moment";
import {
  TCRBookingStatus,
  useFetchAllConferenceRoomBookings,
} from "../hooks/useFetchAllConferenceRoomBookings";
import { TSingleConferenceRoomBooking } from "../types";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import CRBBookingDetails from "./CRBBookingDetails";
import { usePagination } from "hooks/usePagination";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";

type TAction = "add" | "view" | "cancel" | "view-approval-stages";

const CRBHistoryTable: React.FC<{
  status?: TCRBookingStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const [showM, setShowM] = useState<TAction>();
  const [booking, setBooking] = useState<TSingleConferenceRoomBooking>();
  const handleAction = (
    action: TAction,
    item?: TSingleConferenceRoomBooking
  ) => {
    setBooking(item);
    setShowM(action);
  };
  const onClose = () => {
    setShowM(undefined);
    setBooking(undefined);
  };
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useFetchAllConferenceRoomBookings({
    pagination,
    status,
    employeeId,
  });

  const columns: ColumnsType<TSingleConferenceRoomBooking> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span>{getEmployeeFullName(item.employee)}</span>,

      ellipsis: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val, item) => moment(item.createdAt).format(DEFAULT_DATE_FORMAT),
    },
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
      render: (_, item) => (
        <span className="capitalize">{item.conferenceRoom.name}</span>
      ),

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
      title: "Meeting Date",
      dataIndex: "date",
      key: "date",
      render: (val) => moment(val).format(DEFAULT_DATE_FORMAT),
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
          style={{ color: getAppropriateColorForStatus(val) }}
        >
          {val}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, item) => (
        <Space align="center" className="cursor-pointer">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="4"
                  onClick={() => {
                    handleAction("view-approval-stages", item);
                  }}
                >
                  View Stages
                </Menu.Item>
                <Menu.Item
                  key="3"
                  onClick={() => {
                    handleAction("view", item);
                  }}
                >
                  View
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {booking && (
        <CRBBookingDetails
          id={booking.id}
          open={showM === "view"}
          handleClose={onClose}
        />
      )}
      {booking && (
        <ViewApprovalStages
          handleClose={onClose}
          open={showM === "view-approval-stages"}
          id={booking?.id}
          type="conference-room"
        />
      )}

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

export default CRBHistoryTable;
