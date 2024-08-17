import { ColumnsType } from "antd/es/table";
import { IRepaymentPlanColumn } from "../../../types/repayment";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

export const REPAYMENT_SCHEDULE_TABLE_COLUMNS =
  (): ColumnsType<IRepaymentPlanColumn> => [
    {
      title: "Date",
      key: "date",
      render: (_, val) => (
        <span>{dayjs(val?.createdAt).format(DEFAULT_DATE_FORMAT)}</span>
      ),
    },
    {
      title: "Principal Repayment",
      key: "amount",
      dataIndex: "principalPayment",
    },
    {
      title: "Interest Payment",
      key: "interest",
      dataIndex: "interestPayment",
    },

    {
      title: "Total Payment",
      key: "totalPayment",
      dataIndex: "totalAmount",
    },
    {
      title: "Remaining Balance",
      key: "remainingBalance",
      dataIndex: "remainingBalance",
    },
  ];
