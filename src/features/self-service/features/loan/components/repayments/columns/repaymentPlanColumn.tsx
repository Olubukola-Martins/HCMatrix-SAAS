import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu } from "antd";
import { IRepaymentPlanColumn } from "../../../types/repayment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { EmployeeLoanRequestTableActions } from "../../../types/request";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

export const REPAYMENT_PLAN_TABLE_COLUMNS = (
  actions: EmployeeLoanRequestTableActions
): ColumnsType<IRepaymentPlanColumn> => [
  {
    title: "Date",
    key: "date",
    render: (_, val) => (
      <span>{dayjs(val?.createdAt).format(DEFAULT_DATE_FORMAT)}</span>
    ),
  },
  {
    title: "Amount Deducted",
    key: "amount",
    render: (_, val) => <span>{formatNumberWithCommas(val?.principalPayment)}</span>,
  },
  {
    title: "Interest",
    key: "interest",
    render: (_, val) => <span>{formatNumberWithCommas(val?.interestPayment)}</span>,
  },

  {
    title: "Total Payment",
    key: "totalPayment",
    render: (_, val) => <span>{formatNumberWithCommas(val?.totalAmount)}</span>,
  },
  {
    title: "Remaining Balance",
    key: "remainingBalance",
    render: (_, val) => <span>{formatNumberWithCommas(val?.remainingBalance)}</span>,
  },
  {
    title: "Status",
    key: "status",
    render: (_, item) => {
      if (!item || !item.status) {
        return null;
      }
      return (
        <span
          style={{ color: getAppropriateColorForStatus(item.status) }}
          className="capitalize"
        >
          {item.status}
        </span>
      );
    },
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
              <Menu.Item
                key="1"
                onClick={() =>
                  actions.handleGetRepaymentPlan &&
                  actions.handleGetRepaymentPlan(val?.id)
                }
              >
                Change Status
              </Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      </div>
    ),
  },
];
