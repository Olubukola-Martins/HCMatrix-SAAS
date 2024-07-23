import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu } from "antd";
import { AllLoanPaymentProps } from "../../../types/repayment";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

export const REPAYMENT_PLAN_TABLE_COLUMNS =
  (): ColumnsType<AllLoanPaymentProps> => [
    {
      title: "Loan ID",
      key: "loanID",
    },
    {
      title: "Employee Name",
      key: "employeeName",
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
                <Menu.Item key="2">
                  <Link to={appRoutes.loanPaymentPlan(1).path}>
                    View Payment Plan
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
