import { ColumnsType } from "antd/es/table";
import { myLoanRequestProps } from "../../../types/request";
import { Dropdown, Menu } from "antd";

export const EMPLOYEE_LOAN_REQUEST_TABLE_COLUMNS =
  (): ColumnsType<myLoanRequestProps> => [
    {
      title: "Loan ID",
      key: "loanID",
    },
    {
      title: "Request Date",
      key: "requestDate",
    },
    {
      title: "Loan Type",
      key: "type",
      render: (_, val) => <span>{val?.type?.name}</span>
    },
    {
      title: "Loan Date",
      key: "loanDate",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Disbursed Date",
      key: "disbursedDate",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
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
                <Menu.Item key="3">Cancel Loan Request</Menu.Item>
                <Menu.Item key="2">View Approval Stages</Menu.Item>
                <Menu.Item key="1">View Loan Details</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];
