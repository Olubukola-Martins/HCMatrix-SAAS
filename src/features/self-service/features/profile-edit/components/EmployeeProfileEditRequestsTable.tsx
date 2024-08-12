import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu } from "antd";
import { TableWithFocusType } from "components/table";
import { AiOutlineMore } from "react-icons/ai";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TPromotionRequisition } from "../../requisitions/types/promotion";
import { ProfileEditRequestDetails } from "./ProfileEditRequestDetails";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { useGetPromotionRequisitions4AuthEmployee } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions4AuthEmployee";
import { CancelPromotionRequest } from "./CancelPromotionRequest";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";

type TAction = "cancel" | "view" | "view-approval-stages";

export const EmployeeProfileEditRequestsTable: React.FC<{
  status?: TApprovalStatus[] | TApprovalStatus;
}> = ({ status }) => {
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
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetPromotionRequisitions4AuthEmployee({
    status,
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
      render: (_, item) => <span>{getEmployeeFullName(item.employee)}</span>,
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
                key="3223"
                onClick={() => handleAction("view-approval-stages", item)}
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
      <CancelPromotionRequest
        handleClose={onClose}
        open={action === "cancel"}
        data={request}
      />
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
