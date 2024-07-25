import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu } from "antd";
import { repaymentPlanColumnProps } from "../../../types/repayment";

export const REPAYMENT_PLAN_TABLE_COLUMNS =
  (): ColumnsType<repaymentPlanColumnProps> => [
    {
      title: "Date",
      key: "date",
    },
    {
      title: "Amount Deducted",
      key: "amount",
    },
    {
      title: "Interest",
      key: "interest",
    },

    {
      title: "Total Payment",
      key: "totalPayment",
    },
    {
      title: "Remaining Balance",
      key: "balance",
    },
    {
      title: "Status",
      key: "status",
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
