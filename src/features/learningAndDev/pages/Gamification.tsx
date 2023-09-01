import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { LeaningNavbar } from "../components/LeaningNavbar";
import { Dropdown, Input, Menu, Select } from "antd";
import { Link } from "react-router-dom";
import Table, { ColumnsType } from "antd/lib/table";

type TGamification = {
  key: React.Key;
  name: string;
  level: number;
  badge: string;
  course: string;
  certificate: number;
};

const data: TGamification[] = [
  {
    key: 1,
    name: "Godswill Omenuko",
    level: 2,
    badge: "100 badges",
    course: "14 Courses",
    certificate: 3,
  },
];
export const Gamification = () => {
  const columns: ColumnsType<TGamification> = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Levels",
      dataIndex: "level",
    },
    {
      title: "Badges",
      dataIndex: "badge",
    },
    {
      title: "Courses",
      dataIndex: "courses",
    },
    {
      title: "Certificate",
      dataIndex: "certificate",
    },
    {
      title: "Action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <Link to={appRoutes.trackProgressDetails(1).path}>View</Link>
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
  return (
    <>
      <LeaningNavbar active="gamification" />
      <div className="Container">
        <PageIntro link={appRoutes.learningHome} title="Gamification" />
        <div className="flex justify-between items-center mt-10 mb-7">
          <Input.Search
            placeholder="Search branch"
            style={{ width: "35%" }}
            allowClear
          />

          <Select
            placeholder="Select department"
            options={[{ value: 1, label: "Dev" }]}
            className="font-medium text-slate-400"
          />
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
