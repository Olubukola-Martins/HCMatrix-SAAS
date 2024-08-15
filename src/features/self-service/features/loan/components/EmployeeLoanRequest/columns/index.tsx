import { ColumnsType } from "antd/es/table";
import {
  EmployeeLoanRequestTableActions,
  myLoanRequestProps,
} from "../../../types/request";
import { Dropdown, Menu } from "antd";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

export const EMPLOYEE_LOAN_REQUEST_TABLE_COLUMNS = (
  actions: EmployeeLoanRequestTableActions
): ColumnsType<myLoanRequestProps> => [
  {
    title: "Loan ID",
    key: "loanID",
    render: (_, val) => <span>{val?.id.toString().padStart(7, "0")}</span>,
  },
  {
    title: "Request Date",
    key: "requestDate",
    render: (_, val) => (
      <span>{dayjs(val?.requestDate).format(DEFAULT_DATE_FORMAT)}</span>
    ),
  },
  {
    title: "Loan Type",
    key: "type",
    render: (_, val) => <span>{val?.type?.name}</span>,
  },
  {
    title: "Loan Date",
    key: "loanDate",
    render: (_, val) => (
      <span>{dayjs(val?.loanDate).format(DEFAULT_DATE_FORMAT)}</span>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Disbursed Date",
    key: "disbursedDate",
    render: (_, val) => (
      <span>{dayjs(val?.disbursedDate).format(DEFAULT_DATE_FORMAT)}</span>
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
                key="3"
                onClick={() => actions.handleLoanTypeDelete(val?.id)}
              >
                Cancel Loan Request
              </Menu.Item>
              <Menu.Item key="2">View Approval Stages</Menu.Item>
              <Menu.Item
                key="1"
                onClick={() => actions.handleLoanDetails(val?.id)}
              >
                View Loan Details
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
