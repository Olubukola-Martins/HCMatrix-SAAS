import { Space, Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { usePagination } from "hooks/usePagination";
import { TApprovalStatus } from "types/statuses";

import moment from "moment";
import { useApproveORReject } from "hooks/useApproveORReject";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useQueryClient } from "react-query";
import { PromotionRequestDetails } from "./PromotionRequestDetails";
import { QUERY_KEY_FOR_PROMOTION_REQUISITIONS } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { QUERY_KEY_FOR_PROMOTION_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions4AuthEmployee";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

const PromotionApprovalRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const queryClient = useQueryClient();

  const [showD, setShowD] = useState(false);
  const [requestId, setRequestId] = useState<number>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "promotion",
  });

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_PROMOTION_REQUISITIONS],
        // exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_PROMOTION_REQUISITIONS_FOR_AUTH_EMPLOYEE],
        // exact: true,
      });
    },
  });

  const originalColumns: ColumnsType<TApprovalRequest> = [
    {
      title: "Employee",
      dataIndex: "Employee",
      key: "Employee",
      render: (_, item) => (
        <span>
          {item?.promotionRequisition
            ? getEmployeeFullName(item?.promotionRequisition?.employee)
            : ""}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>
          {moment(item?.promotionRequisition?.date).format(DEFAULT_DATE_FORMAT)}{" "}
        </span>
      ),
    },
    {
      title: "Preferred Start Date",
      dataIndex: "preferredStartDate",
      key: "preferredStartDate",
      render: (_, item) => (
        <span>
          {moment(item?.promotionRequisition?.preferredStartDate).format(
            DEFAULT_DATE_FORMAT
          )}{" "}
        </span>
      ),
    },
    {
      title: "Proposed Designation",
      dataIndex: "proposedDesignationId",
      key: "proposedDesignationId",
      render: (_, item) => (
        <span className="capitalize">
          {item?.promotionRequisition?.proposedDesignation.name}{" "}
        </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",

      key: "status",
      render: (val, item) => (
        <span
          className="capitalize"
          style={{
            color: getAppropriateColorForStatus(
              item?.promotionRequisition?.status ?? ""
            ),
          }}
        >
          {item?.promotionRequisition?.status}
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
                    setRequestId(item?.promotionRequisition?.id);
                  }}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  hidden={item?.promotionRequisition?.status !== "pending"}
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
                  hidden={item?.promotionRequisition?.status !== "pending"}
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

  const columns = originalColumns;

  return (
    <div>
      {requestId && (
        <PromotionRequestDetails
          open={showD}
          handleClose={() => setShowD(false)}
          id={requestId}
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

export default PromotionApprovalRequestsTable;
