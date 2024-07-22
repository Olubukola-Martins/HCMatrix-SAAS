import { ColumnsType } from "antd/es/table";
import { myLoanRequestProps } from "../../../types/request";

export const EMPLOYEE_LOAN_REQUEST_TABLE_COLUMNS =
  (): ColumnsType<myLoanRequestProps> => [
    {
      title: "Loan ID",
      dataIndex: "loanID",
    },
    {
      title: "Request Date",
      dataIndex: "requestDate",
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
    },
    {
      title: "Loan Date",
      dataIndex: "loanDate",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Disbursed Date",
      dataIndex: "disbursedDate",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
