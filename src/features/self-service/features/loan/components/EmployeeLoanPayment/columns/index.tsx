import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu } from "antd";
import { TLoanRepayment } from "../../../types/repayment";
import { EmployeeLoanRequestTableActions } from "../../../types/request";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

export const EMPLOYEE_LOAN_PAYMENT_TABLE_COLUMNS =
  (actions: EmployeeLoanRequestTableActions): ColumnsType<TLoanRepayment> => [
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
      render: (_, val) => <span>{val?.amount.toLocaleString()}</span>,
    },
    {
      title: "Balance",
      key: "balance",
      render: (_, val) => <span>{val?.balance.toLocaleString()}</span>,
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
                <Menu.Item key="1"
                onClick={() => actions.handleLoanDetails(val?.id)}>View Loan Details</Menu.Item>
                <Menu.Item key="2">View Payment Schedule</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];
