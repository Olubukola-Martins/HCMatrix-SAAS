import { ColumnsType } from "antd/lib/table";
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
} from "constants/dateFormats";
import { TTransaction } from "features/payroll/types";
import moment from "moment";

export const PAYSLIP_TRANSACTION_TABLE_COLUMNS: ColumnsType<TTransaction> = [
  {
    title: "Transaction Type",
    dataIndex: "Transaction Type",
    key: "Transaction Type",
    render: (_, item) => <span className="capitalize">{item.type} </span>,
  },
  {
    title: "Sender",
    dataIndex: "Sender",
    key: "Sender",
    render: (_, item) => <span className="capitalize">{item.sender} </span>,
  },
  {
    title: "Receiver",
    dataIndex: "Receiver",
    key: "Receiver",
    render: (_, item) => <span className="capitalize">{item.receiver} </span>,
  },
  {
    title: "Reference",
    dataIndex: "Reference",
    key: "Reference",
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
    dataIndex: "Context",
    key: "Context",
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
