import { Tabs } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";
import { TransactionsContainer } from "../transactions/TransactionsContainer";
import { TTransaction, TTransactionType } from "features/payroll/types";
import {
  TFilterTransactionContainerProps,
  withFilterTransactionContainer,
} from "../transactions/hoc/FilterTransactionContainerProps";

const columns: ColumnsType<TTransaction> = [
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
    render: (_, item) => <span className="capitalize">{item.ref}</span>,
  },

  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_, item) => <span className="capitalize">{item.amount}</span>,
  },
  {
    title: "Context",
    dataIndex: "Payroll",
    key: "Payroll",
    render: (_, item) => (
      <div className="capitalize flex flex-col gap-2 text-sm">
        {item.payroll}
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
        <span>{item.paidAt} </span>
        <span>{"8:00 am"} </span>
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

interface ComponentProps {
  type: TTransactionType;
}

const Component: React.FC<
  ComponentProps & TFilterTransactionContainerProps
> = ({ status, employeeId, type }) => {
  console.log(employeeId, "___");
  return (
    <TransactionsContainer
      columns={columns}
      status={status}
      employeeId={employeeId}
      type={type}
    />
  );
};
const TransactionsWithFilter = withFilterTransactionContainer(Component);

const CostCentreTransactions = () => {
  const tabItems = [
    {
      key: "Credit",
      label: "Credit",
      children: <TransactionsWithFilter type="credit" />,
    },
    {
      key: "Debit",
      label: "Debit",
      children: <TransactionsWithFilter type="debit" />,
    },
  ];
  return <Tabs items={tabItems} />;
};

export default CostCentreTransactions;
