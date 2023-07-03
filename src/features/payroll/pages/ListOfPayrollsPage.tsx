import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { Button, Dropdown, Menu, Table, Tabs } from "antd";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/lib/table";
import { EyeFilled } from "@ant-design/icons";

type TPayrollItem = {
  createdAt: string;
  type: "office" | "direct-salary" | "project" | "wage";
  allowances: number;
  deductions: number;
  grossPay: number;
  netPay: number;
  tax: number;
  name: string;
  project?: string;
  ranFor: string;
  frequency: "monthly" | "daily" | "project-duration";
  status:
    | "create"
    | "in-review"
    | "ongoing-approval"
    | "confirmed"
    | "disbursed"
    | "closed";
};

const ListOfPayrollsPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="List of Payrolls" link={appRoutes.payrollHome} />
        <ListOfPayrollsContainer />
      </div>
    </>
  );
};
const ListOfPayrollsContainer = () => {
  const tabItems = [
    {
      key: "Office",
      label: "Office",
      children: (
        <PayrolTable
          data={[
            {
              createdAt: "02/02/2028",
              type: "office",
              allowances: 40004040004,
              deductions: 300003,
              grossPay: 3400040404045,
              netPay: 40404040550,
              tax: 204900,
              name: "May Pay",

              ranFor: "05/2023",
              frequency: "monthly",
              status: "in-review",
            },
          ]}
        />
      ),
    },
    {
      key: "Direct Salary",
      label: "Direct Salary",
      children: (
        <PayrolTable
          data={[
            {
              createdAt: "02/02/2028",
              type: "direct-salary",
              allowances: 40004040004,
              deductions: 300003,
              grossPay: 3400040404045,
              netPay: 40404040550,
              tax: 204900,
              name: "May Pay",

              ranFor: "05/2023",
              frequency: "monthly",
              status: "in-review",
            },
          ]}
        />
      ),
    },
    {
      key: "Project",
      label: "Project",
      children: (
        <PayrolTable
          data={[
            {
              createdAt: "02/02/2028",
              type: "project",
              allowances: 40004040004,
              deductions: 300003,
              grossPay: 3400040404045,
              netPay: 40404040550,
              tax: 204900,
              name: "May Pay",
              project: "HCM V3",

              ranFor: "1st Payment",
              frequency: "project-duration",
              status: "ongoing-approval",
            },
          ]}
        />
      ),
    },
    {
      key: "Wages",
      label: "Wages",
      children: (
        <PayrolTable
          data={[
            {
              createdAt: "02/02/2028",
              type: "wage",
              allowances: 40004040004,
              deductions: 300003,
              grossPay: 3400040404045,
              netPay: 40404040550,
              tax: 204900,
              name: "May Pay",

              ranFor: "05/2023",
              frequency: "monthly",
              status: "in-review",
            },
            {
              createdAt: "02/02/2028",
              type: "wage",
              allowances: 40004040004,
              deductions: 300003,
              grossPay: 3400040404045,
              netPay: 40404040550,
              tax: 204900,
              name: "Wednesday Pay",

              ranFor: "05/2023",
              frequency: "daily",
              status: "confirmed",
            },
          ]}
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col mt-5 gap-2 md:flex-row md:justify-between md:items-center  p-2 rounded text-sm">
        <p>{`You can create and manage payrolls`}</p>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <Link to={appRoutes.createOfficePayroll}>
                  Create Office Payroll
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={appRoutes.createDirectSalaryPayroll}>
                  Create Direct Salary Payroll
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={appRoutes.createWagesPayroll}>
                  Create Wages Payroll
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={appRoutes.createProjectPayroll}>
                  Create Project Payroll
                </Link>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <button className="button flex items-center gap-2">
            <span>Create Payroll</span>{" "}
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </Dropdown>
      </div>
      <Tabs items={tabItems} />
    </div>
  );
};

const PayrolTable: React.FC<{ isProject?: boolean; data?: TPayrollItem[] }> = ({
  isProject = false,
  data = [],
}) => {
  let ogColumns: ColumnsType<TPayrollItem> = [
    {
      title: "Created At",
      dataIndex: "date",
      key: "date",
      render: (_, item) => <span>{item.createdAt} </span>,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (_, item) => <span>{item.name} </span>,
    },
    {
      title: "frequency",
      dataIndex: "frequency",
      key: "frequency",
      render: (_, item) => <span>{item.frequency} </span>,
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
      render: (_, item) => <span>{item.type} </span>,
    },
    {
      title: "Ran For",
      dataIndex: "Ran For",
      key: "Ran For",
      render: (_, item) => <span>{item.ranFor} </span>,
    },
    {
      title: "allowances",
      dataIndex: "allowances",
      key: "allowances",
      render: (_, item) => <span>{item.allowances} </span>,
    },
    {
      title: "deductions",
      dataIndex: "deductions",
      key: "deductions",
      render: (_, item) => <span>{item.deductions} </span>,
    },
    {
      title: "tax",
      dataIndex: "tax",
      key: "tax",
      render: (_, item) => <span>{item.tax} </span>,
    },
    {
      title: "grossPay",
      dataIndex: "grossPay",
      key: "grossPay",
      render: (_, item) => <span>{item.grossPay} </span>,
    },
    {
      title: "netPay",
      dataIndex: "netPay",
      key: "netPay",
      render: (_, item) => <span>{item.netPay} </span>,
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => <span>{item.status} </span>,
    },

    {
      title: "",
      key: "action",
      render: (_, item) => (
        <Button
          title="View"
          icon={<EyeFilled />}
          type="text"
          // onClick={() => handleEdit(item._id)}
        />
      ),
    },
  ];

  const columns: ColumnsType<TPayrollItem> = isProject
    ? [
        ...ogColumns,
        {
          title: "Project",
          dataIndex: "project",
          key: "project",
          render: (_, item) => <span>{item?.project} </span>,
        },
      ]
    : ogColumns;

  return (
    <>
      <Table size="small" dataSource={data} columns={columns} />
    </>
  );
};
export default ListOfPayrollsPage;
