import { Tabs } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";
import { TransactionsContainer } from "../transactions/TransactionsContainer";
import { TTransaction, TTransactionType } from "features/payroll/types";
import {
  TFilterTransactionContainerProps,
  withFilterTransactionContainer,
} from "../transactions/hoc/FilterTransactionContainerProps";
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
} from "constants/dateFormats";
import moment from "moment";

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

interface ComponentProps {
  type: TTransactionType[];
  costCentreId?: number;
}

const Component: React.FC<
  ComponentProps & TFilterTransactionContainerProps
> = ({ status, employeeId, type, costCentreId }) => {
  return (
    <TransactionsContainer
      columns={columns}
      status={status}
      employeeId={employeeId}
      type={type}
      transactionApiEntity={{ costCentreId, entity: "cost-centre" }}
    />
  );
};
const TransactionsWithFilter = withFilterTransactionContainer(Component, {
  displayEmployeeFilter: true,
  displayStatusFilter: true,
  displayTransactionTypeFilter: false,
});

const CostCentreTransactions: React.FC<{
  costCentreId?: number;
}> = ({ costCentreId }) => {
  const tabItems = [
    {
      key: "Credit",
      label: "Credit",
      children: (
        <TransactionsWithFilter type={["credit"]} costCentreId={costCentreId} />
      ),
    },
    {
      key: "Debit",
      label: "Debit",
      children: (
        <TransactionsWithFilter type={["debit"]} costCentreId={costCentreId} />
      ),
    },
  ];
  return <Tabs items={tabItems} />;
};

export default CostCentreTransactions;
