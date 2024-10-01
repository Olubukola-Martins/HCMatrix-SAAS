import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu } from "antd";
import { TLoanRepayment } from "../../../types/repayment";
import { EmployeeLoanRequestTableActions } from "../../../types/request";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

export const EMPLOYEE_LOAN_PAYMENT_TABLE_COLUMNS = (
  actions: EmployeeLoanRequestTableActions
): ColumnsType<TLoanRepayment> => [
  {
    title: "Loan ID",
    key: "loanID",
    render: (_, val) => <span>{val?.id.toString().padStart(7, "0")}</span>,
  },
  {
    title: "Loan Type",
    key: "type",
    render: (_, val) => <span>{val?.type?.name}</span>,
  },

  {
    title: "Amount",
    key: "amount",
    render: (_, val) => <span>{formatNumberWithCommas(val?.amount)}</span>,
  },
  {
    title: "Balance",
    key: "balance",
    render: (_, val) => <span>{formatNumberWithCommas(val?.balance)}</span>,
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
                onClick={() => actions.handleLoanDetails(val?.id)}
              >
                View Loan Details
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={appRoutes.loanPaymentSchedule(val?.id).path}>
                  View Payment Schedule
                </Link>
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
