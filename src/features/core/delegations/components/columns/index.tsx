import { ColumnsType } from "antd/lib/table";
import { TDelegation } from "../../types";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import moment from "moment";

export const DELEGATIONS_TABLE_COLUMNS = (
  view: (id: number) => void
): ColumnsType<TDelegation> => [
  {
    title: "Delegator",
    dataIndex: "Delegator",
    key: "Delegator",
    render: (_, item) => (
      <span className="capitalize">{getEmployeeFullName(item.delegator)}</span>
    ),
  },
  {
    title: "Delegatee",
    dataIndex: "Delegatee",
    key: "Delegatee",
    render: (_, item) => (
      <span className="capitalize">{getEmployeeFullName(item.delegatee)}</span>
    ),
  },
  {
    title: "Start Date",
    dataIndex: "Start Date",
    key: "Start Date",
    render: (_, item) => {
      return <span>{moment(item.startDate).format(DEFAULT_DATE_FORMAT)}</span>;
    },
  },
  {
    title: "Expires On",
    dataIndex: "Expires On",
    key: "Expires On",
    render: (_, item) => (
      <span>{moment(item.endDate).format(DEFAULT_DATE_FORMAT)}</span>
    ),
  },
  {
    title: "Permission Count",
    dataIndex: "Permission",
    key: "Permission",
    ellipsis: true,
    render: (_, item) => `${item.permissions.length}`,
  },

  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, item) => (
      <div className="flex items-center gap-3 text-lg">
        <i
          className="ri-eye-line cursor-pointer hover:text-caramel"
          onClick={() => view(item.id)}
        ></i>
      </div>
    ),
  },
];
export const DELEGATIONS_EXPORT_COLUMNS = (
  items?: TDelegation[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      Delegator: getEmployeeFullName(item.delegator),

      Delegatee: getEmployeeFullName(item.delegatee),
      "Start Date": moment(item.startDate).format(DEFAULT_DATE_FORMAT),
      "Expires On": moment(item.endDate).format(DEFAULT_DATE_FORMAT),
      "Permission Count": item.permissions.length,
    })) ?? []
  );
};
