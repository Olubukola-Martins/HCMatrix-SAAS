import { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import {
  TWalletTransaction,
  TWalletTransactionAction,
} from "features/payroll/types/payrollWallet";
import { truncateString } from "utils/dataHelpers/truncateString";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import { HELPFUL_COLORS } from "constants/color";

export const WALLET_TRANSACTION_TABLE_COLUMNS = (
  handleAction: (
    data: TWalletTransaction,
    action: TWalletTransactionAction
  ) => void
): ColumnsType<TWalletTransaction> => [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (val, item) => (
      <span>{dayjs(item.createdAt).format(DEFAULT_DATE_FORMAT)}</span>
    ),
  },
  {
    title: "Provider",
    dataIndex: "Provider",
    key: "Provider",
    render: (val, item) => <span className="capitalize">{item.provider}</span>,
  },

  {
    title: "Narration",
    dataIndex: "narration",
    key: "narration",
    render: (val, item) => (
      <span className="capitalize">
        {truncateString(item?.narration ?? "")}
      </span>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (val, item) => (
      <span className="capitalize">{formatNumberWithCommas(item.amount)}</span>
    ),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (val, item) => (
      <span
        className="capitalize"
        style={{
          color:
            item.type.toLowerCase() === "credit"
              ? HELPFUL_COLORS.credit
              : HELPFUL_COLORS.debit,
        }}
      >
        {item.type}
      </span>
    ),
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    render: (val, item) => (
      <span className="capitalize">
        {formatNumberWithCommas(item.balanceAfter)}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (val, item) => (
      <span
        className="capitalize"
        color={getAppropriateColorForStatus(item.status)}
      >
        {item.status}
      </span>
    ),
  },

  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, item) => (
      <Dropdown
        menu={{
          items: [
            {
              label: "View",
              key: "View",
              onClick: () => handleAction(item, "view"),
            },
          ],
        }}
        children={<MoreOutlined />}
        trigger={["click"]}
      />
    ),
  },
];
export const WALLET_TRANSACTION_EXPORT_COLUMNS = (
  items?: TWalletTransaction[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      Date: dayjs(item.createdAt).format(DEFAULT_DATE_FORMAT),
      Narration: item.narration ?? "",
    })) ?? []
  );
};
