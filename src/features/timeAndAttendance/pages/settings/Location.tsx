import { Dropdown, Menu } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import { AddLocation } from "features/timeAndAttendance/components/settings/AddLocation";
import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import { useState } from "react";

type TLocation = {
  key: React.Key;
  branch: string;
  biometricDevice: string;
};


const columns: ColumnsType<TLocation> = [
  {
    title: "Brand Name",
    dataIndex: "branch",
  },
  {
    title: "Biometric Device",
    dataIndex: "biometricDevice",
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

const Location = () => {
  const [openAddLocation, setOpenAddLocation] = useState(false);
  return (
    <>
      <TimeAttendanceSettingsNav active="location" />
      <AttendanceSettingsIntro
        title={"Location"}
        description="Places where your team members will be clocking in and out."
      />
      <AddLocation
        open={openAddLocation}
        handleClose={() => setOpenAddLocation(false)}
      />

      <div className="Container mt-5">
        <div className="flex justify-end mb-5">
          <AppButton
            label="Add Location"
            handleClick={() => setOpenAddLocation(true)}
          />
        </div>
        <Table columns={columns} dataSource={[]} />
      </div>
    </>
  );
};

export default Location;
