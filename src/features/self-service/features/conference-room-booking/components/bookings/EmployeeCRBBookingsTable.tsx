import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Dropdown, Menu, Modal, Space, Table } from "antd";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { useGetConferenceRoomBookings4AuthEmployee } from "../../hooks/useGetConferenceRoomBookings4AuthEmployee";
import { TSingleConferenceRoomBooking } from "../../types";
import CRBBookingDetails from "../CRBBookingDetails";

export const EmployeeCRBBookingsTable: React.FC<{
  status?: TApprovalStatus[] | TApprovalStatus;
}> = ({ status }) => {
  const [bookingId, setBookingId] = useState<number>();
  const [showD, setShowD] = useState(false);

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
                    setBookingId(item.id);
                  }}
                >
                  View
                </Menu.Item>
                {/* <Menu.Item key="2">Approve</Menu.Item>
                <Menu.Item key="1">Reject</Menu.Item> */}
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
      <Modal
        open={showD}
        onCancel={() => setShowD(false)}
        closeIcon={false}
        title={"Booking Details"}
        style={{ top: 10 }}
        footer={null}
      >
        {bookingId && <CRBBookingDetails id={bookingId} />}
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
