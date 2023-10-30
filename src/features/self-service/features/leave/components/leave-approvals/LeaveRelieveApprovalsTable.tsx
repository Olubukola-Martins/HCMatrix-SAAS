import { Space, Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { usePagination } from "hooks/usePagination";
import { TApprovalStatus } from "types/statuses";
import moment from "moment";

import { LeaveDetails } from "../LeaveDetails";
import { useGetLeaveRelieverApprovals } from "../../hooks/leaveRelieverApproval/useGetLeaveRelieverApprovals";
import { TLeaveRelieverApproval } from "../../types";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { ApproveLeaveRelieveRequest } from "./ApproveLeaveRelieveRequest";

type TApprovalDetail = { status: "approved" | "rejected"; approvalId: number };
const LeaveRelieveApprovalsTable: React.FC<{
  status?: TApprovalStatus[];
}> = ({ status }) => {
  const [showD, setShowD] = useState<"view" | "approve/reject">();
  const [requestId, setRequestId] = useState<number>();
  const [approvalDetail, setApprovalDetail] = useState<TApprovalDetail>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetLeaveRelieverApprovals({
    pagination,
    status,
  });
  const handleApproveOrReject = ({ approvalId, status }: TApprovalDetail) => {
    setApprovalDetail({ approvalId, status });
    setShowD("approve/reject");
  };

  const columns: ColumnsType<TLeaveRelieverApproval> = [
    {
      title: "Applier Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <span>{getEmployeeFullName(item.leave.employee)}</span>
      ),
    },
    {
      title: "Applier ID",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span>{item.leave.employee.empUid}</span>,
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (val, item) => (
        <span>
          {moment(item?.leave?.startDate).format(DEFAULT_DATE_FORMAT)}
        </span>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (val, item) => (
        <span>{moment(item?.leave?.endDate).format(DEFAULT_DATE_FORMAT)}</span>
      ),
    },

    {
      title: "Leave Length",
      dataIndex: "leaveLength",
      key: "leaveLength",
      render: (val, item) => <span>{item?.leave?.length}</span>,
    },

    {
      title: "Status",
      dataIndex: "status",

      key: "status",
      render: (val, item) => (
        <span
          className="capitalize"
          style={{
            color: getAppropriateColorForStatus(item?.status),
          }}
        >
          {item?.leave?.status}
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
                    setShowD("view");
                    setRequestId(item?.leave?.id);
                  }}
                >
                  View Leave Details
                </Menu.Item>
                <Menu.Item
                  hidden={item.leave?.status !== "pending"}
                  key="2"
                  onClick={() =>
                    handleApproveOrReject({
                      status: "approved",
                      approvalId: item?.id,
                    })
                  }
                >
                  Approve
                </Menu.Item>
                <Menu.Item
                  hidden={item.leave?.status !== "pending"}
                  key="1"
                  onClick={() =>
                    handleApproveOrReject({
                      status: "rejected",
                      approvalId: item?.id,
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

  return (
    <div>
      {requestId && (
        <LeaveDetails
          id={requestId}
          open={showD === "view"}
          handleClose={() => setShowD(undefined)}
        />
      )}
      {approvalDetail && (
        <ApproveLeaveRelieveRequest
          {...{
            approvalId: approvalDetail?.approvalId,
            status: approvalDetail?.status,
            handleClose: () => setShowD(undefined),
            open: showD === "approve/reject",
          }}
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

export default LeaveRelieveApprovalsTable;
