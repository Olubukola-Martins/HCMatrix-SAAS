import { Space, Dropdown } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { usePagination } from "hooks/usePagination";
import { useApproveORReject } from "hooks/useApproveORReject";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useQueryClient } from "react-query";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TableWithFocusType } from "components/table";
import { ViewShiftSwapRequest } from "./ViewShiftSwapRequest";
import { QUERY_KEY_FOR_GENERAL_SHIFT_SWAP_APPROVAL } from "../hooks/useGetGeneralRequest";
import { QUERY_KEY_FOR_MY_SHIFT_REQUEST } from "../hooks/useGetMyShiftSwapRequest";
import { ItemType } from "antd/es/menu/interface";
import dayjs from "dayjs";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

export const MySwapApprovals: React.FC = () => {
  const queryClient = useQueryClient();
  const [request, setRequest] = useState<TApprovalRequest>();

  const [showD, setShowD] = useState(false);
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "shift-swap",
  });

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_MY_SHIFT_REQUEST],
        // exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_GENERAL_SHIFT_SWAP_APPROVAL],
        // exact: true,
      });
    },
  });

  const generateMenuItems = (item: TApprovalRequest): ItemType[] => {
    return [
      {
        onClick: () => {
          setShowD(true);
          setRequest(item);
        },
        label: "View",
        type: "item",
        key: "view",
      },
      {
        hidden: item.shiftSwap?.status !== "pending",
        onClick: () =>
          confirmApprovalAction({
            approvalStageId: item?.id,
            status: "approved",
            workflowType: !!item?.basicStageId ? "basic" : "advanced",
            requires2FA: item?.advancedStage?.enableTwoFactorAuth,
          }),
        label: "Approve",
        type: "item",
        key: "approve",
      },
      {
        hidden: item.shiftSwap?.status !== "pending",
        onClick: () =>
          confirmApprovalAction({
            approvalStageId: item?.id,
            status: "rejected",
            workflowType: !!item?.basicStageId ? "basic" : "advanced",
            requires2FA: item?.advancedStage?.enableTwoFactorAuth,
          }),
        label: "Reject",
        type: "item",
        key: "reject",
      },
    ]
      .filter((item) => item.hidden !== true)
      .map(
        ({ key, label, onClick, type }): ItemType => ({
          label,
          onClick,
          key,
          type: type as "item",
        })
      );
  };

  const originalColumns: ColumnsType<TApprovalRequest> = [
    {
      title: "Date",
      key: "Date",
      render: (_, item) => (
        <span>
          {dayjs(item?.shiftSwap?.createdAt).format(DEFAULT_DATE_FORMAT)}
        </span>
      ),
    },
    {
      title: "Name",
      key: "employee",
      render: (_, item) => (
        <span className="capitalize">
          {getEmployeeFullName(item?.shiftSwap?.employee)}
        </span>
      ),
    },
    {
      title: "Department",
      key: "department",
      render: (_, item) => (
        <span className="capitalize">
          {item?.shiftSwap?.employee?.designation?.department?.name}
        </span>
      ),
    },
    {
      title: "Default Shift",
      key: "defaultShift",
      render: (_, item) => (
        <span className="capitalize">{item?.shiftSwap?.shiftFrom?.name}</span>
      ),
    },
    {
      title: "New Shift",
      key: "newShift",
      render: (_, item) => (
        <span className="capitalize">{item?.shiftSwap?.shiftTo?.name}</span>
      ),
    },
    {
      title: "Swap partner",
      key: "swapPartner",
      render: (_, item) => (
        <span className="capitalize">
          {getEmployeeFullName(item?.shiftSwap?.shiftPartner)}
        </span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, item) => (
        <span
          style={{
            color: getAppropriateColorForStatus(item?.shiftSwap?.status ?? ""),
          }}
          className="capitalize"
        >
          {item?.shiftSwap?.status}
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
            menu={{
              items: generateMenuItems(item),
            }}
            trigger={["click"]}
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
      {request?.shiftSwap?.id && (
        <ViewShiftSwapRequest
          open={showD}
          handleClose={() => setShowD(false)}
          data={request.shiftSwap}
          approvalRequest={request}
        />
      )}

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
