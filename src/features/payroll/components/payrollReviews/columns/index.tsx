import { Dropdown, Menu, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { appRoutes } from "config/router/paths";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TPayrollListData } from "features/payroll/types/payroll";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import moment from "moment";
import { Link } from "react-router-dom";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import { TPayrollReviewAction } from "../PayrollReviewContainer";
import { AiOutlineMore } from "react-icons/ai";

export const PAYROLL_REVIEW_TABLE_COLUMNS = (
  handleAction: (key: TPayrollReviewAction, item?: TPayrollListData) => void,
  extraColumns: ColumnsType<TPayrollListData>
): ColumnsType<TPayrollListData> => {
  return [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      ellipsis: true,
      render: (_, item) => (
        <Link
          to={
            appRoutes.singlePayroll({
              scheme: item.scheme.type as TPayrollSchemeType,
              id: item.id,
            }).path
          }
          className="capitalize text-caramel hover:underline"
        >
          <span>{item.name} </span>
        </Link>
      ),
    },
    {
      title: "Created At",
      dataIndex: "Created At",
      key: "Created At",
      render: (_, item) => (
        <span>{moment(item.createdAt).format("YYYY-MM-DD")} </span>
      ),
    },

    {
      title: "Allowances",
      dataIndex: "allowances",
      key: "allowances",
      render: (_, item) => (
        <span>{formatNumberWithCommas(item.totalAllowances)} </span>
      ),
    },
    {
      title: "Deductions",
      dataIndex: "deductions",
      key: "deductions",
      render: (_, item) => (
        <span>{formatNumberWithCommas(item.totalDeductions)} </span>
      ),
    },
    {
      title: "Gross Pay",
      dataIndex: "grossPay",
      key: "grossPay",
      render: (_, item) => (
        <span>{formatNumberWithCommas(item.totalGrossPay)} </span>
      ),
    },
    ...extraColumns,
    {
      title: "Net Pay",
      dataIndex: "Net Pay",
      key: "Net Pay",
      render: (_, item) => (
        <span>{formatNumberWithCommas(item.totalNetPay)} </span>
      ),
    },
    {
      title: "Disbursment Date",
      dataIndex: "Disbursment Date",
      key: "Disbursment Date",
      ellipsis: true,
      render: (_, item) => (
        <span>
          {moment(item.disbursementDate).format(DEFAULT_DATE_FORMAT)}{" "}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span
          className="capitalize"
          style={{
            color: getAppropriateColorForStatus(item?.status ?? ""),
          }}
        >
          {item.status.split("-").join(" ")}{" "}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.SubMenu key="comparison" title="Compare">
                <Menu.Item
                  key="comparison-basic"
                  onClick={() => {
                    handleAction("comapare-payroll-basic", item);
                  }}
                >
                  Basic
                </Menu.Item>
                <Menu.Item
                  key="comparison-advanced"
                  onClick={() => {
                    handleAction("compare-payroll-advanced", item);
                  }}
                >
                  Advanced
                </Menu.Item>
              </Menu.SubMenu>

              <Menu.Item
                key="stages"
                onClick={() => {
                  handleAction("view-approval-stages", item);
                }}
              >
                View Stages
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button title="Actions" icon={<AiOutlineMore />} type="text" />
        </Dropdown>
      ),
    },
  ];
};
