import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Dropdown, Menu, Space, Table } from "antd";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { useGetConferenceRoomBookings4AuthEmployee } from "../../hooks/useGetConferenceRoomBookings4AuthEmployee";
import { TSingleConferenceRoomBooking } from "../../types";
import CRBBookingDetails from "../CRBBookingDetails";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { CancelCRBBooking } from "./CancelCRBBooking";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";

type TAction = "cancel" | "view" | "view-approval-stages";
export const EmployeeCRBBookingsTable: React.FC<{
  status?: TApprovalStatus[] | TApprovalStatus;
}> = ({ status }) => {
  const [request, setRequest] = useState<TSingleConferenceRoomBooking>();
  const [action, setAction] = useState<TAction>();
  const handleAction = (key: TAction, item?: TSingleConferenceRoomBooking) => {
    setAction(key);
    setRequest(item);
  };
  const onClose = () => {
    setAction(undefined);
    setRequest(undefined);
  };

  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetConferenceRoomBookings4AuthEmployee({
    status,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });

  const columns: ColumnsType<TSingleConferenceRoomBooking> = [
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
                  key="cancel"
                  hidden={item.status !== "pending"}
                  onClick={() => handleAction("cancel", item)}
                >
                  Cancel
                </Menu.Item>
                <Menu.Item key="3" onClick={() => handleAction("view", item)}>
                  View Details
                </Menu.Item>
                <Menu.Item
                  key="4"
                  onClick={() => handleAction("view-approval-stages", item)}
                >
                  View Stages
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
      {request && (
        <CRBBookingDetails
          id={request.id}
          open={action === "view"}
          handleClose={onClose}
        />
      )}
      {request && (
        <ViewApprovalStages
          handleClose={onClose}
          open={action === "view-approval-stages"}
          id={request?.id}
          type="conference-room"
        />
      )}
      <CancelCRBBooking
        open={action === "cancel"}
        handleClose={onClose}
        data={request}
      />

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
