import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { AddBreak } from "./AddBreak";
import Table, { ColumnsType } from "antd/lib/table";
import { Dropdown, Menu } from "antd";

type TBreak = {
  key: React.Key;
  name: string;
  duration: string;
  status: string;
};

const data: TBreak[] = [];
for (let i = 0; i < 4; i++) {
  data.push({
    key: i,
    name: `Morning Break`,
    status: `Paid`,
    duration: `1:30mins`,
  });
}

export const WorkBreak = () => {
  const [openBreak, setOpenBreak] = useState(false);

  const columns: ColumnsType<TBreak> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Break duration",
      dataIndex: "duration",
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
                <Menu.Item key="1">Edit</Menu.Item>
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
      <AddBreak open={openBreak} handleClose={() => setOpenBreak(false)} />
      <div className="border rounded-md p-3 md:p-5 mt-5">
        <div className="flex items-start flex-col gap-3 lg:flex-row justify-between">
          <div>
            <h3 className="font-semibold text-lg">Breaks</h3>
            <p>
              Schedule breaks by setting fixed times or durations here. If left
              empty, members can clock into breaks freely.
            </p>
          </div>
          <AppButton label="Add break" handleClick={() => setOpenBreak(true)} />
        </div>

        <Table className="mt-5" columns={columns} dataSource={data} />
      </div>
    </>
  );
};
