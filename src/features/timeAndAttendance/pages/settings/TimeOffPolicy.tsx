import { Dropdown, Menu } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { CreateTimeOffPolicy } from "features/timeAndAttendance/components/settings/CreateTimeOffPolicy";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import { useGetTimeOffPolicy } from "features/timeAndAttendance/hooks/useGetTimeOffPolicy";
import { useState } from "react";

type TTimeOff = {
  key: React.Key;
  name: string;
  durationInDays: string;
  comment: string;
};

const tableData: TTimeOff[] = [];
for (let i = 0; i < 4; i++) {
  tableData.push({
    key: i,
    name: `Break policy`,
    durationInDays: `1`,
    comment: `Break policy for...`,
  });
}

const columns: ColumnsType<TTimeOff> = [
  {
    title: "Policy Name",
    dataIndex: "name",
  },
  {
    title: "Duration In Days",
    dataIndex: "durationInDays",
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

export const TimeOffPolicy = () => {
  const [openAddPolicy, setOpenAddPolicy] = useState(false);
  const { data } = useGetTimeOffPolicy();
  return (
    <>
      <TimeAttendanceSettingsNav active="time off policy" />
      <AttendanceSettingsIntro
        title={"Time Off Policy"}
        description="Plan work by setting your team's work and break time. Manage overtime rules in settings."
      />
      <CreateTimeOffPolicy
        open={openAddPolicy}
        handleClose={() => setOpenAddPolicy(false)}
      />
      <div className="Container mt-5">
        <div className="flex justify-end mb-5">
          <AppButton
            label="Add time off policy"
            handleClick={() => setOpenAddPolicy(true)}
          />
        </div>

        <Table columns={columns} dataSource={tableData} />
      </div>
    </>
  );
};
