import { Space, Dropdown, Menu, Table, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import moment from "moment";
import {
  QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS,
  TCRBookingStatus,
} from "../hooks/useFetchAllConferenceRoomBookings";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import CRBBookingDetails from "./CRBBookingDetails";
import { usePagination } from "hooks/usePagination";
import { useQueryClient } from "react-query";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useApproveORReject } from "hooks/useApproveORReject";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

const CRBApprovalRequestsTable: React.FC<{
  status?: TCRBookingStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const queryClient = useQueryClient();

  const [showD, setShowD] = useState(false);
  const [requestId, setRequestId] = useState<number>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "conference-room",
  });

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS],
        // exact: true,
      });
    },
  });

  const originalColumns: ColumnsType<TApprovalRequest> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <span>{getEmployeeFullName(item.conferenceRoomBooking?.employee)}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val, item) =>
        moment(item.conferenceRoomBooking?.createdAt).format(
          DEFAULT_DATE_FORMAT
        ),
    },
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
      render: (_, item) => (
        <span>{item.conferenceRoomBooking?.conferenceRoom.name}</span>
      ),

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      ellipsis: true,
      render: (_, item) => <span>{item.conferenceRoomBooking?.reason}</span>,

      // width: 100,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (_, item) => (
        <span>{item.conferenceRoomBooking?.department?.name ?? "N/A"}</span>
      ),
    },
    {
      title: "Meeting Date",
      dataIndex: "date",
      key: "date",
      render: (val, item) =>
        moment(item.conferenceRoomBooking?.date).format(DEFAULT_DATE_FORMAT),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (_, item) =>
        moment(item.conferenceRoomBooking?.startTime).format("h:mm:ss"),
    },

    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (_, item) =>
        moment(item.conferenceRoomBooking?.endTime).format("h:mm:ss"),
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
                  key="3"
                  onClick={() => {
                    setShowD(true);
                    setRequestId(item.conferenceRoomBooking?.id);
                  }}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  hidden={item.conferenceRoomBooking?.status !== "pending"}
                  key="2"
                  onClick={() =>
                    confirmApprovalAction({
                      approvalStageId: item?.id,
                      status: "rejected",
                      workflowType: !!item?.basicStageId ? "basic" : "advanced",
                      requires2FA: item?.advancedStage?.enableTwoFactorAuth,
                    })
                  }
                >
                  Approve
                </Menu.Item>
                <Menu.Item
                  hidden={item.conferenceRoomBooking?.status !== "pending"}
                  key="1"
                  onClick={() =>
                    confirmApprovalAction({
                      approvalStageId: item?.id,
                      status: "rejected",
                      workflowType: !!item?.basicStageId ? "basic" : "advanced",
                    })
                  }
                >
                  Reject
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
  const columns = employeeId
    ? originalColumns.filter((item) => item.key !== "name")
    : originalColumns;
  return (
    <div>
      <Modal
        open={showD}
        onCancel={() => setShowD(false)}
        closeIcon={false}
        title={"Booking Details"}
        style={{ top: 10 }}
        footer={null}
      >
        {requestId && <CRBBookingDetails id={requestId} />}
      </Modal>

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

export default CRBApprovalRequestsTable;
