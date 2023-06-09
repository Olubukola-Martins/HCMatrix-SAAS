import { TApprovalStatus } from "types/statuses";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu, Table } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";

import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { useGetExitHandOverForms } from "../hooks/useGetExitHandOverForms";
import { useNavigate } from "react-router-dom";
import { TTHandOverForm } from "../types";

export const HandOverTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const { companyId, token } = useApiAuth();
  const { pagination, onChange } = usePagination({
    pageSize: 4,
  });
  const navigate = useNavigate();
  const { data, isFetching } = useGetExitHandOverForms({
    companyId,
    token,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
    status,
    employeeId,
  });

  const columns: ColumnsType<TTHandOverForm> = [
    {
      title: "Seperation Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.separationDate).format("YYYY/MM/DD")} </span>
      ),
    },

    {
      title: "Employee Name",
      dataIndex: "emp",
      key: "emp",
      render: (_, item) => (
        <span className="capitalize">
          {getEmployeeFullName(item.employee)}{" "}
        </span>
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "emp_uid",
      key: "emp_uid",
      render: (_, item) => (
        <span className="capitalize">{item.employee.empUid} </span>
      ),
    },
    {
      title: "Department",
      dataIndex: "dep",
      key: "dep",
      render: (_, item) => <span className="capitalize">N/A</span>,
    },
    {
      title: "Reason",
      dataIndex: "reas",
      key: "reas",
      render: (_, item) => (
        <span className="capitalize">{item.reasonForLeaving}</span>
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
                  navigate(item.id);
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
