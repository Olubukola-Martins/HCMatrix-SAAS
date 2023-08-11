import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { Button, Dropdown, Menu, Table, Tabs } from "antd";
import { Link } from "react-router-dom";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { EyeFilled } from "@ant-design/icons";
import { TPayrollSchemeType } from "../types/payrollSchemes";
import { useState } from "react";
import { useGetAllPayrollsByScheme } from "../hooks/payroll/useGetAllPayrollsByScheme";
import { usePagination } from "hooks/usePagination";
import { TPayrollListData } from "../types/payroll";
import moment from "moment";
import { CreatePayrollButton } from "../components/payrollCreations/CreatePayrollButton";

const ListOfPayrollsPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Payroll Cycle" link={appRoutes.payrollHome} />
        <ListOfPayrollsContainer />
      </div>
    </>
  );
};
const ListOfPayrollsContainer = () => {
  const [scheme, setScheme] = useState<TPayrollSchemeType>("office");
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetAllPayrollsByScheme({
    data: { pagination },
    schemeType: scheme,
  });
  const tabItems = [
    {
      key: "office",
      label: "Office",
    },
    {
      key: "direct-salary",
      label: "Direct Salary",
    },
    {
      key: "project",
      label: "Project",
    },
    {
      key: "wages",
      label: "Wages",
    },
  ].map((item) => ({
    ...item,
    children: (
      <PayrollTable
        data={data?.data}
        total={data?.total}
        onChange={onChange}
        loading={isFetching}
        pagination={pagination}
        isProject={item.key === "project"}
      />
    ),
  }));
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col mt-5 gap-2 md:flex-row md:justify-between md:items-center  p-2 rounded text-sm">
        <p>{`You can create and manage payrolls`}</p>
        <CreatePayrollButton />
      </div>
      <Tabs
        activeKey={scheme}
        onChange={(val) => setScheme(val as unknown as TPayrollSchemeType)}
        items={tabItems}
      />
    </div>
  );
};

const PayrollTable: React.FC<{
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
      dataIndex: "crt",
      key: "crt",
      render: (_, item) => (
        <span>{moment(item.createdAt).format("YYYY-MM-DD")} </span>
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
      dataIndex: "frequency",
      key: "frequency",
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
      render: (_, item) => <span>{item.totalAllowances} </span>,
    },
    {
      title: "Deductions",
      dataIndex: "deductions",
      key: "deductions",
      render: (_, item) => <span>{item.totalDeductions} </span>,
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
      render: (_, item) => <span>{item.totalTax} </span>,
    },
    {
      title: "Gross Pay",
      dataIndex: "grossPay",
      key: "grossPay",
      render: (_, item) => <span>{item.totalGrossPay} </span>,
    },
    {
      title: "Net Pay",
      dataIndex: "netPay",
      key: "netPay",
      render: (_, item) => <span>{item.totalNetPay} </span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span className="capitalize">{item.status.split("-").join(" ")} </span>
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
      <Table
        size="small"
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{ ...pagination, total }}
        onChange={onChange}
      />
    </>
  );
};
export default ListOfPayrollsPage;
