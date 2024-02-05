import { Dropdown, Menu } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { ITimeOffPolicyRule } from "../types";
import { TimeAttendanceSettingsNav } from "../../components/TimeAttendanceSettingsNav";
import { AttendanceSettingsIntro } from "../../components/AttendanceSettingsIntro";
import { useGetTimeOffPolicy } from "../hooks/useGetTimeOffPolicy";
import { CreateTimeOffPolicy } from "../components/CreateTimeOffPolicy";

const columns: ColumnsType<ITimeOffPolicyRule> = [
  {
    title: "Branch Name",
    dataIndex: "name",
  },
  {
    title: "Duration In Days",
    dataIndex: "duration",
  },
  {
    title: "Comment",
    dataIndex: "comment",
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
  const { data, isLoading } = useGetTimeOffPolicy();

//   console.log(data);
  
  
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

        <Table columns={columns} dataSource={data} loading={isLoading} />
      </div>
    </>
  );
};

export default TimeOffPolicy;