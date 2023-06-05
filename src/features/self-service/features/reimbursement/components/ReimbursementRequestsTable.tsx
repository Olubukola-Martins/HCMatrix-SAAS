import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useGetReimbursementRequisitions } from "../../requisitions/hooks/reimbursement/useGetReimbursementRequisitions";
import { usePagination } from "hooks/usePagination";
import { TReimbursementRequisition } from "../../requisitions/types/reimbursement";
import { Button, Dropdown, Menu, Table } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { ReimbursementDetails } from "./ReimbursementDetails";

export const ReimbursementRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const [requestId, setRequestId] = useState<number>();
  const { companyId, token } = useApiAuth();
  const { pagination, onChange } = usePagination({
    pageSize: 4,
  });
  const { data, isFetching } = useGetReimbursementRequisitions({
    companyId,
    token,
    status,
    employeeId,
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
        <span>{moment(item.date).format("YYYY/MM/DD")} </span>
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
                key="3"
                onClick={() => {
                  setRequestId(item.id);
                }}
              >
                View Details
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button
            title="Actions"
            icon={<MoreOutlined />}
            type="text"
            // onClick={() => handleEdit(item._id)}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {requestId && (
        <ReimbursementDetails
          open={!!requestId}
          handleClose={() => setRequestId(undefined)}
          id={requestId}
        />
      )}
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
