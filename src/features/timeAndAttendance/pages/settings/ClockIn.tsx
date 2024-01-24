import { AppButton } from "components/button/AppButton";
import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import { useState } from "react";
import { AddClockIn } from "features/timeAndAttendance/components/settings/AddClockIn";
import Table, { ColumnsType } from "antd/lib/table";
import { Dropdown, Menu } from "antd";
import { useGetBiometricDevice } from "features/timeAndAttendance/hooks/useGetBiometricDevice";

interface IClockIn {
  name: string;
  serialNumber: string;
}

const columns: ColumnsType<IClockIn> = [
  {
    title: "Biometrics Device",
    dataIndex: "name",
  },
  {
    title: "Serial Number",
    dataIndex: "serialNumber",
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

export const ClockIn = () => {
  const [addClockIn, setAddClockIn] = useState(false);
  const { data, isLoading } = useGetBiometricDevice();
  return (
    <>
      <TimeAttendanceSettingsNav active="clock in settings" />
      <AttendanceSettingsIntro title={"Clock in Settings"} description="" />
      <AddClockIn open={addClockIn} handleClose={() => setAddClockIn(false)} />
      <div className="Container mt-4">
        <div className="flex justify-end">
          <AppButton
            label="Set clock in"
            handleClick={() => setAddClockIn(true)}
          />
        </div>

        <Table
          columns={columns}
          dataSource={[]}
          loading={isLoading}
          className="mt-5"
        />
      </div>
    </>
  );
};
