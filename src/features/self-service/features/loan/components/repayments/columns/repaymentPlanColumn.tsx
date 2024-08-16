import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu } from "antd";
import { IRepaymentPlanColumn } from "../../../types/repayment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

export const REPAYMENT_PLAN_TABLE_COLUMNS =
  (): ColumnsType<IRepaymentPlanColumn> => [
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
      dataIndex: "principalPayment",
    },
    {
      title: "Interest",
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
                <Menu.Item key="1">Change Status</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];
