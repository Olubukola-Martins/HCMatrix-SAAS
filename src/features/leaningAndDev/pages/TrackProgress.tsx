import { PageIntro } from "components/layout/PageIntro";
import { LeaningNavbar } from "../components/LeaningNavbar";
import { appRoutes } from "config/router/paths";
import { Dropdown, Input, Menu, Select } from "antd";
import Table, { ColumnsType } from "antd/lib/table";

type TTrackP = {
  key: React.Key;
  name: string;
  department: string;
  title: string;
  type: string;
  status: string;
};

const data: TTrackP[] = [
  {
    key: 1,
    department: "Dev team",
    name: "Godswill Omenuko",
    status: "In progress",
    title: "HTML/CSS",
    type: "Online",
  },
];

export const TrackProgress = () => {
  const columns: ColumnsType<TTrackP> = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Training Title",
      dataIndex: "title",
    },
    {
      title: "Training type",
      dataIndex: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">View Training</Menu.Item>
                <Menu.Item key="2">View Employee</Menu.Item>
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
      <LeaningNavbar active="tracking-progress" />
      <div className="Container">
        <PageIntro link={appRoutes.leaningHome} title="Tracking Progress" />

        <div className="flex justify-between items-center mt-10 mb-7">
          <Input.Search
            placeholder="Search branch"
            style={{ width: "35%" }}
            allowClear
          />
          <div className="flex items-center gap-x-3">
            <Select
              placeholder="Filter by training type"
              options={[{ value: 1, label: "All Training Type" }]}
              className="font-medium text-slate-400"
            />
            <Select
              placeholder="Select department"
              options={[{ value: 1, label: "Dev" }]}
              className="font-medium text-slate-400"
            />
          </div>
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
