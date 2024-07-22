import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu } from "antd";
import { AllLoanRequestProps } from "../../../types/loan";

export const EMPLOYEE_ALL_LOAN_TABLE_COLUMNS =
(): ColumnsType<AllLoanRequestProps> => [
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
                <Menu.Item key="1">View Approval Stage</Menu.Item>
                <Menu.Item key="2">View Loan Details</Menu.Item>
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
