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
import { CancelProfileEditRequest } from "./CancelProfileEditRequest";
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
      title: "Category",
      dataIndex: "preferredStartDate",
      key: "preferredStartDate",
      render: (_, item) => <span>Personal Information</span>,
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
      <CancelProfileEditRequest
        handleClose={onClose}
        open={action === "cancel"}
        data={request}
      />
      <TableWithFocusType
        size="small"
        // dataSource={data?.data}
        dataSource={[
          {
            id: 22,
            date: "2024-09-04T23:00:00.000Z",
            employeeId: 81,
            proposedDesignationId: 38,
            justification: "sds",
            preferredStartDate: "2024-09-11T23:00:00.000Z",
            attachmentUrls: [],
            status: "pending",
            companyId: 27,
            createdAt: "2024-09-04T10:06:24.000Z",
            updatedAt: "2024-09-04T10:06:24.000Z",
            employee: {
              id: 81,
              firstName: "James",
              lastName: "Doe",
              email: "thisbroisfresh+1@gmail.com",
              licenseType: "licensed",
              empUid: "OWN0001",
              roleId: 57,
              status: "confirmed",
              companyId: 27,
              designationId: 38,
              userId: 11,
              avatarUrl: "null",
              createdAt: "2023-11-22T22:05:08.000Z",
              updatedAt: "2024-07-15T14:18:34.000Z",
              deletedAt: "null",
            },
            proposedDesignation: {
              id: 38,
              name: "Backend Developer",
              label: "backend-developer",
              departmentId: 42,
              companyId: 27,
              createdAt: "2024-03-25T08:07:37.000Z",
              updatedAt: "2024-03-25T08:07:37.000Z",
              department: {
                id: 42,
                name: "Software Developmentqq",
                label: "software-developmentqq",
                companyId: 27,
                departmentHeadId: null,
                email: "test@bidautomate.com",
                parentDepartmentId: null,
                createdAt: "2024-03-25T08:07:16.000Z",
                updatedAt: "2024-04-02T08:16:09.000Z",
                deletedAt: null,
              },
            },
          },
        ]}
        loading={isFetching}
        columns={columns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
