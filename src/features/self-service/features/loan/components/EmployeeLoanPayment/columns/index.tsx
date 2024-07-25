import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu } from "antd";
import { myLoanRePaymentProps } from "../../../types/repayment";

export const EMPLOYEE_LOAN_PAYMENT_TABLE_COLUMNS =
  (): ColumnsType<myLoanRePaymentProps> => [
    {
      title: "Loan ID",
      key: "loanID",
    },
    {
      title: "Loan Type",
      key: "loanType",
    },
    {
      title: "Amount",
      key: "amount",
    },
    {
      title: "Balance",
      key: "balance",
    },
    {
      title: "Disbursed Date",
      key: "disbursedDate",
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
                <Menu.Item key="1">View Loan Details</Menu.Item>
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
