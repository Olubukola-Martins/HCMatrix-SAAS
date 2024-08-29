import { Space, Dropdown, Menu } from "antd";
import { AiOutlineMore } from "react-icons/ai";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { usePagination } from "hooks/usePagination";
import { useApproveORReject } from "hooks/useApproveORReject";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useQueryClient } from "react-query";
import { TableWithFocusType } from "components/table";
import { ItemType } from "antd/es/menu/interface";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { QUERY_KEY_FOR_MY_TIME_OFF_REQUEST } from "../hooks/useGetTimeOff";
import { QUERY_KEY_FOR_ALL_TIME_OFF_REQUEST } from "../hooks/useGetAllTimeOffRequest";

export const TimeOffApproval: React.FC = () => {
  const queryClient = useQueryClient();
  const [request, setRequest] = useState<TApprovalRequest>();

  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "time-off",
  });

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_MY_TIME_OFF_REQUEST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_ALL_TIME_OFF_REQUEST],
      });
    },
  });

  const originalColumns: ColumnsType<TApprovalRequest> = [
    {
      title: "Name",
      key: "employee",
      render: (_, item) => (
        <span className="capitalize">
          {getEmployeeFullName(item?.timeOff?.employee)}
        </span>
      ),
    },
    {
      title: "Time off Policy",
      key: "timeOffPolicy",
      render: (_, val) => <span>{val.timeOff?.policy?.title}</span>,
    },
    {
      title: "Date",
      key: "Date",
      render: (_, item) => <span>{item.timeOff?.date}</span>,
    },
    {
      title: "Duration in hours",
      key: "duration",
      render: (_, val) => <span>{val.timeOff?.policy?.duration}</span>,
    },

    {
      title: "Start Time",
      key: "time",
      render: (_, val) => <span>{val.timeOff?.time}</span>,
    },
    {
      title: "Department",
      key: "department",
      render: (_, item) => (
        <span className="capitalize">
          {item?.timeOff?.employee?.designation?.department?.name}
        </span>
      ),
    },

    {
      title: "Status",
      key: "status",
      render: (_, item) => (
        <span
          style={{
            color: getAppropriateColorForStatus(item?.timeOff?.status ?? ""),
          }}
          className="capitalize"
        >
          {item?.timeOff?.status}
        </span>
      ),
    },

    {
      title: "Reasons",
      key: "comment",
      render: (_, val) => <span>{val.timeOff?.comment}</span>,
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, item) => (
        <Space align="center" className="cursor-pointer">
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  disabled={
                    item?.status === "approved" || item?.status === "rejected"
                  }
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
                <Menu.Item
                  key="3"
                  disabled={
                    item?.status === "approved" || item?.status === "rejected"
                  }
                  onClick={() =>
                    confirmApprovalAction({
                      approvalStageId: item?.id,
                      status: "approved",
                      workflowType: !!item?.basicStageId ? "basic" : "advanced",
                      requires2FA: item?.advancedStage?.enableTwoFactorAuth,
                    })
                  }
                >
                  Approve
                </Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const columns = originalColumns;

  return (
    <div>
      <TableWithFocusType
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
