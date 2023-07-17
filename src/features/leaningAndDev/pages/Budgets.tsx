import { LeaningNavbar } from "../components/LeaningNavbar";
import { AppButton } from "components/button/AppButton";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { Dropdown, Menu } from "antd";
import Table, { ColumnsType } from "antd/lib/table";

type TBudget = {
  key: React.Key;
  department: string;
  allocation: number;
  year: string;
};

const data: TBudget[] = [
  {
    key: 1,
    allocation: 100,
    department: "Dev team",
    year: "2020",
  },
];

export const Budgets = () => {
  const columns: ColumnsType<TBudget> = [
    {
      title: "Department",
      dataIndex: "department",
    },

    {
      title: "Allocation",
      dataIndex: "allocation",
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">Modify</Menu.Item>
                <Menu.Item key="2">Delete</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <>
      <LeaningNavbar active="training" />
      <div className="Container">
        <div className="flex items-center justify-between">
          <PageIntro link={appRoutes.paidTraining} title="Budgets" />
          <AppButton label="Set Budget" />
        </div>

        <Table
          className="mt-3"
          columns={columns}
          dataSource={data}
          scroll={{ x: 600 }}
        />
      </div>
    </>
  );
};
