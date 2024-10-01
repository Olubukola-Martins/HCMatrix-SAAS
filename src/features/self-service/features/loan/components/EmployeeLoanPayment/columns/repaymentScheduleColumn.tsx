import { ColumnsType } from "antd/es/table";
import { IRepaymentPlanColumn } from "../../../types/repayment";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

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
      render: (_, val) => (
        <span>{formatNumberWithCommas(val?.principalPayment)}</span>
      ),
    },
    {
      title: "Interest Payment",
      key: "interest",
      render: (_, val) => (
        <span>{formatNumberWithCommas(val?.interestPayment)}</span>
      ),
    },

    {
      title: "Total Payment",
      key: "totalPayment",
      render: (_, val) => (
        <span>{formatNumberWithCommas(val?.totalAmount)}</span>
      ),
    },
    {
      title: "Remaining Balance",
      key: "remainingBalance",
      render: (_, val) => (
        <span>{formatNumberWithCommas(val?.remainingBalance)}</span>
      ),
    },
  ];
