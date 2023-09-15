import { Tabs } from "antd";
import PageSubHeader from "components/layout/PageSubHeader";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import React from "react";
import { PayslipsContainer } from "./PayslipsContainer";
import { TransactionsContainer } from "../transactions/TransactionsContainer";
import { TTransaction } from "features/payroll/types";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
} from "constants/dateFormats";
import {
  TFilterTransactionContainerProps,
  withFilterTransactionContainer,
} from "../transactions/hoc/FilterTransactionContainerProps";

const columns: ColumnsType<TTransaction> = [
  {
    title: "Transaction Type",
    dataIndex: "_type",
    key: "_type",
    render: (_, item) => <span className="capitalize">{item.type} </span>,
  },
  {
    title: "Sender",
    dataIndex: "Name",
    key: "Name",
    render: (_, item) => <span className="capitalize">{item.sender} </span>,
  },
  {
    title: "Receiver",
    dataIndex: "Name",
    key: "Name",
    render: (_, item) => <span className="capitalize">{item.receiver} </span>,
  },
  {
    title: "Reference",
    dataIndex: "ass",
    key: "ass",
    render: (_, item) => <span className="capitalize">{item.reference}</span>,
  },

  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_, item) => <span className="capitalize">{item.amount}</span>,
  },
  {
    title: "Context",
    dataIndex: "desc",
    key: "desc",
    render: (_, item) => (
      <div className="capitalize flex flex-col gap-2 text-sm">
        {item.description}
      </div>
    ),
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, item) => (
      <span
        className="capitalize"
        //   style={{ color: getAppropriateColorForStatus(item.status) }}
      >
        {item.status}
      </span>
    ),
  },

  {
    title: "Date & Time",
    dataIndex: "Date & Time",
    key: "Date & Time",
    render: (_, item) => (
      <div className="flex flex-col gap-2 ">
        <span>{moment(item.createdAt).format(DEFAULT_DATE_FORMAT)} </span>
        <span>{moment(item.createdAt).format(DEFAULT_TIME_FORMAT)} </span>
      </div>
      // <span>{moment(item.createdAt).format("YYYY/MM/DD")} </span>
    ),
  },
  //   {
  //     title: "Action",
  //     dataIndex: "_",
  //     key: "_",
  //     render: (_, item) => (
  //       <div className="flex flex-col gap-2 items-">
  //         <Button size="small"> View </Button>
  //       </div>
  //       // <span>{moment(item.createdAt).format("YYYY/MM/DD")} </span>
  //     ),
  //   },
];

interface IProps {
  employeePayrollType: TPayrollSchemeType;
}

interface ComponentProps {}

const Component: React.FC<
  ComponentProps & TFilterTransactionContainerProps
> = ({ status, transactionType }) => {
  return (
    <TransactionsContainer
      columns={columns}
      status={status}
      type={transactionType}
      transactionApiEntity={`transaction`}
    />
  );
};
const TransactionsWithFilter = withFilterTransactionContainer(Component, {
  displayEmployeeFilter: false,
  displayStatusFilter: true,
  displayTransactionTypeFilter: true,
});
const PayslipTransactionContainer: React.FC<IProps> = ({
  employeePayrollType,
}) => {
  const tabItems = [
    {
      key: "Payslips",
      label: "Payslips",
      children: (
        <PayslipsContainer
          role="employee"
          defaultScheme={employeePayrollType}
        />
      ),
    },
    {
      key: "Transactions",
      label: "Transactions",
      children: <TransactionsWithFilter />,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        <PageSubHeader
          description={`You can now view your payslips and transactions`}
          hideBackground
        />
        <Tabs items={tabItems} />
      </div>
    </>
  );
};

export default PayslipTransactionContainer;
