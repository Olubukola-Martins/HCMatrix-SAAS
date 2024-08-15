import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu } from "antd";
import { AllLoanRequestProps } from "../../../types/loan";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import dayjs from "dayjs";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { EmployeeLoanRequestTableActions } from "../../../types/request";

export const EMPLOYEE_ALL_LOAN_TABLE_COLUMNS = (
  actions: EmployeeLoanRequestTableActions
): ColumnsType<AllLoanRequestProps> => [
  {
    title: "Loan ID",
    key: "loanID",
    render: (_, val) => <span>{val.id.toString().padStart(7, "0")}</span>,
  },
  {
    title: "Request Date",
    key: "requestDate",
    render: (_, val) => (
      <span>{dayjs(val?.createdAt).format(DEFAULT_DATE_FORMAT)}</span>
    ),
  },
  {
    title: "Employee Name",
    key: "employeeName",
    render: (_, item) => (
      <span className="capitalize">{getEmployeeFullName(item?.employee)}</span>
    ),
  },
  {
    title: "Department",
    key: "department",
    render: (_, val) => (
      <span className="capitalize">
        {val?.employee?.designation?.department?.name}
      </span>
    ),
  },
  {
    title: "Loan Type",
    key: "type",
    render: (_, val) => <span>{val?.type?.name}</span>,
  },
  {
    title: "Loan Date",
    key: "date",
    render: (_, val) => (
      <span>{dayjs(val?.date).format(DEFAULT_DATE_FORMAT)}</span>
    ),
  },
  {
    title: "Balance",
    key: "balance",
    dataIndex: "balance",
  },
  {
    title: "Disbursed",
    key: "disbursed",
    render: (_, val) => (
      <span>
        {val.disbursedAt && dayjs(val?.disbursedAt).format(DEFAULT_DATE_FORMAT)}
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
              <Menu.Item key="1">View Approval Stage</Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => actions.handleLoanDetails(val?.id)}
              >
                View Loan Details
              </Menu.Item>
              <Menu.Item key="3">Rejects</Menu.Item>
              <Menu.Item key="4">Approve</Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      </div>
    ),
  },
];
