import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu } from "antd";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { EmployeeLoanRequestTableActions } from "../../../types/request";

export const EMPLOYEE_LOAN_APPROVAL_TABLE_COLUMNS = (
  actions: EmployeeLoanRequestTableActions
): ColumnsType<TApprovalRequest> => [
  {
    title: "Loan ID",
    key: "loanID",
    render: (_, val) => <span>{val.id.toString().padStart(7, "0")}</span>,
  },
  {
    title: "Request Date",
    key: "requestDate",
    render: (_, val) => (
      <span>{dayjs(val?.loan?.createdAt).format(DEFAULT_DATE_FORMAT)}</span>
    ),
  },
  {
    title: "Employee Name",
    key: "employeeName",
    render: (_, item) => (
      <span className="capitalize">
        {getEmployeeFullName(item?.loan?.employee)}
      </span>
    ),
  },
  {
    title: "Department",
    key: "department",
    render: (_, val) => (
      <span className="capitalize">
        {val?.loan?.employee?.designation?.department?.name}
      </span>
    ),
  },
  {
    title: "Loan Type",
    key: "type",
    render: (_, val) => <span>{val?.loan?.type?.name}</span>,
  },
  {
    title: "Loan Date",
    key: "date",
    render: (_, val) => (
      <span>{dayjs(val?.loan?.date).format(DEFAULT_DATE_FORMAT)}</span>
    ),
  },
  {
    title: "Balance",
    key: "balance",
    render: (_, val) => <span>{val.loan?.balance.toLocaleString()}</span>,
  },
  {
    title: "Disbursed",
    key: "disbursed",
    render: (_, val) => (
      <span>
        {val?.loan?.disbursedAt &&
          dayjs(val?.loan?.disbursedAt).format(DEFAULT_DATE_FORMAT)}
      </span>
    ),
  },
  {
    title: "Status",
    key: "status",
    render: (_, item) => {
      if (!item || !item.status) {
        return null;
      }
      return (
        <span
          style={{ color: getAppropriateColorForStatus(item.status) }}
          className="capitalize"
        >
          {item.status}
        </span>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, val) => (
      <div>
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={() => actions.handleLoanDetails(val?.loan?.id ?? 0)}
              >
                View
              </Menu.Item>
              <Menu.Item key="2">Rejects</Menu.Item>
              <Menu.Item key="3">Approve</Menu.Item>
              <Menu.Item
                key="4"
                onClick={() =>
                  actions.handleLoanDisbursement &&
                  actions.handleLoanDisbursement(val?.loan?.id ?? 0)
                }
              >
                Disburse loan
              </Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      </div>
    ),
  },
];
