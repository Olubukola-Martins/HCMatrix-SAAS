import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu, Table } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { TTravelRequest } from "../../requisitions/types/travel";
import { TravelRequestDetails } from "./TravelRequestDetails";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { useGetTravelRequisitions } from "../../requisitions/hooks/travel/useGetTravelRequisitions";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

export const TravelRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const [requestId, setRequestId] = useState<number>();
  const { companyId, token } = useApiAuth();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetTravelRequisitions({
    companyId,
    token,
    status,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
    employeeId,
  });

  const columns: ColumnsType<TTravelRequest> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.createdAt).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },
    {
      title: "Arrival Date",
      dataIndex: "adate",
      key: "adate",
      render: (_, item) => (
        <span>{moment(item.arrivalDate).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },
    {
      title: "Departure Date",
      dataIndex: "ddate",
      key: "ddate",
      render: (_, item) => (
        <span>{moment(item.departureDate).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },
    {
      title: "Travel ID",
      dataIndex: "id",
      key: "id",
      render: (_, item) => <span>{item.id} </span>,
    },

    {
      title: "Employee",
      dataIndex: "emp",
      key: "emp",
      render: (_, item) => <span>{getEmployeeFullName(item.employee)} </span>,
    },
    {
      title: "Reason",
      dataIndex: "reas",
      key: "reas",
      render: (_, item) => <span className="capitalize">{item.reason} </span>,
    },
    {
      title: "Duration (days)",
      dataIndex: "dura",
      key: "dura",
      render: (_, item) => <span className="capitalize">{item.duration} </span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span
          className="capitalize"
          style={{ color: getAppropriateColorForStatus(item.status) }}
        >
          {item.status}
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
        <TravelRequestDetails
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
