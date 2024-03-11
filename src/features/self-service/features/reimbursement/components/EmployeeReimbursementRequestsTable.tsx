import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu, Table } from "antd";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import moment from "moment";
import { TReimbursementRequisition } from "../../requisitions/types/reimbursement";
import { ReimbursementDetails } from "./ReimbursementDetails";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { useGetReimburements4AuthEmployee } from "../../requisitions/hooks/reimbursement/useGetReimburements4AuthEmployee";
import { CancelReimbursementRequest } from "./CancelReimbursementRequest";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";

type TAction = "cancel" | "view" | "view-approval-stages";

export const EmployeeReimbursementRequestsTable: React.FC<{
  status?: TApprovalStatus[] | TApprovalStatus;
}> = ({ status }) => {
  const [request, setRequest] = useState<TReimbursementRequisition>();
  const [action, setAction] = useState<TAction>();
  const handleAction = (key: TAction, item?: TReimbursementRequisition) => {
    setAction(key);
    setRequest(item);
  };
  const onClose = () => {
    setAction(undefined);
    setRequest(undefined);
  };
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetReimburements4AuthEmployee({
    status,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });

  const columns: ColumnsType<TReimbursementRequisition> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.date).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_, item) => <span className="capitalize">{item.title} </span>,
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      render: (_, item) => (
        <span className="capitalize">{item.description} </span>
      ),
    },

    {
      title: "Amount",
      dataIndex: "amnt",
      key: "amnt",
      render: (_, item) => <span>{item.amount} </span>,
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
                key="3 stages"
                onClick={() => handleAction("view-approval-stages", item)}
              >
                View Stages
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button title="Actions" icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {request && (
        <ReimbursementDetails
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
          type="reimbursement"
        />
      )}
      <CancelReimbursementRequest
        handleClose={onClose}
        open={action === "cancel"}
        data={request}
      />
      <Table
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
