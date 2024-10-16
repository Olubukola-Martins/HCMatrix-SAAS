import { TableProps, TablePaginationConfig } from "antd";
import { ColumnsType } from "antd/lib/table";
import { appRoutes } from "config/router/paths";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TPayrollListData } from "features/payroll/types/payroll";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import moment from "moment";
import { Link } from "react-router-dom";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import { TableWithFocusType } from "components/table";

export const PayrollTable: React.FC<{
  isProject?: boolean;
  data?: TPayrollListData[];
  loading?: boolean;
  onChange?: TableProps<TPayrollListData>["onChange"];
  total?: number;
  pagination?: TablePaginationConfig;
}> = ({
  isProject = false,
  data = [],
  loading,
  onChange,
  total,
  pagination,
}) => {
  let ogColumns: ColumnsType<TPayrollListData> = [
    {
      title: "Created At",
      dataIndex: "Created At",
      key: "Created At",
      render: (_, item) => (
        <span>{moment(item.createdAt).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },
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
      title: "Cycle",
      dataIndex: "Cycle",
      key: "Cycle",
      render: (_, item) => (
        <span className="capitalize">
          {item.scheme.type === "project"
            ? `Payment ${item.frequency}`
            : item.frequency}{" "}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      render: (_, item) => <span>{item.date} </span>,
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
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
      render: (_, item) => (
        <span>{formatNumberWithCommas(item.totalTax)} </span>
      ),
    },
    {
      title: "Gross Pay",
      dataIndex: "Gross Pay",
      key: "Gross Pay",
      render: (_, item) => (
        <span>{formatNumberWithCommas(item.totalGrossPay)} </span>
      ),
    },
    {
      title: "Net Pay",
      dataIndex: "netPay",
      key: "netPay",
      render: (_, item) => (
        <span>{formatNumberWithCommas(item.totalNetPay)} </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      render: (_, item) => (
        <span className="capitalize">{item.status.split("-").join(" ")} </span>
      ),
    },
    {
      title: "Disbursement Date",
      dataIndex: "Disbursement Date",
      key: "Disbursement Date",
      ellipsis: true,
      render: (_, item) => (
        <span>
          {item?.disbursementDate
            ? moment(item.disbursementDate).format(DEFAULT_DATE_FORMAT)
            : ""}{" "}
        </span>
      ),
    },
  ];

  const columns: ColumnsType<TPayrollListData> = isProject
    ? [
        ...ogColumns,
        // {
        //   title: "Project",
        //   dataIndex: "project",
        //   key: "project",
        //   render: (_, item) => <span>{`Project?`} </span>,
        // },
      ]
    : ogColumns;

  return (
    <>
      <TableWithFocusType
        size="small"
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{ ...pagination, total }}
        onChange={onChange}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};
