import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";

import { TableWithFocusType } from "components/table";
import { AiOutlineMore } from "react-icons/ai";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { TPromotionRequisition } from "../../requisitions/types/promotion";
import { ProfileEditRequestDetails } from "./ProfileEditRequestDetails";
import { useGetPromotionRequisitions } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";

type TAction = "cancel" | "view" | "view-approval-stages";

export const ProfileEditRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const [request, setRequest] = useState<TPromotionRequisition>();
  const [action, setAction] = useState<TAction>();
  const handleAction = (key: TAction, item?: TPromotionRequisition) => {
    setAction(key);
    setRequest(item);
  };
  const onClose = () => {
    setAction(undefined);
    setRequest(undefined);
  };
  const { companyId, token } = useApiAuth();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetPromotionRequisitions({
    companyId,
    token,
    status,
    employeeId,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });

  const columns: ColumnsType<TPromotionRequisition> = [
    {
      title: "Employee",
      dataIndex: "Employee",
      key: "Employee",
      render: (_, item) => (
        <span>
          {item.employee.firstName} {item.employee.lastName}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.date).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },
    {
      title: "Preferred Start Date",
      dataIndex: "preferredStartDate",
      key: "preferredStartDate",
      render: (_, item) => (
        <span>
          {moment(item.preferredStartDate).format(DEFAULT_DATE_FORMAT)}{" "}
        </span>
      ),
    },
    {
      title: "Proposed Designation",
      dataIndex: "proposedDesignationId",
      key: "proposedDesignationId",
      render: (_, item) => (
        <span className="capitalize">{item.proposedDesignation.name} </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span style={{ color: getAppropriateColorForStatus(item.status) }}>
          {item.status}{" "}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="3"
                onClick={() => {
                  handleAction("view", item);
                }}
              >
                View Details
              </Menu.Item>
              <Menu.Item
                key="30-00"
                onClick={() => {
                  handleAction("view-approval-stages", item);
                }}
              >
                View Stages
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button title="Actions" icon={<AiOutlineMore />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {request && (
        <ProfileEditRequestDetails
          open={action === "view"}
          handleClose={onClose}
          id={request.id}
        />
      )}
      {request && (
        <ViewApprovalStages
          handleClose={onClose}
          open={action === "view-approval-stages"}
          id={request?.id}
          type="promotion"
        />
      )}
      <TableWithFocusType
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        columns={columns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
