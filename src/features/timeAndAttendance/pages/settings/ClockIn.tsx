import { AppButton } from "components/button/AppButton";
import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import { useState } from "react";
import { AddClockIn } from "features/timeAndAttendance/components/settings/AddClockIn";
import Table, { ColumnsType } from "antd/lib/table";
import { Dropdown, Menu, Popconfirm } from "antd";
import {
  QUERY_KEY_FOR_BIOMETRIC_DEVICE,
  useGetBiometricDevice,
} from "features/timeAndAttendance/hooks/useGetBiometricDevice";
import { biometricProps } from "features/timeAndAttendance/types/settings";
import { useDeleteTimeAndAttendance } from "features/timeAndAttendance/hooks/useDeleteTimeAndAttendance";

export const ClockIn = () => {
  const [addClockIn, setAddClockIn] = useState(false);
  const { data, isLoading } = useGetBiometricDevice();
  const { removeData } = useDeleteTimeAndAttendance({
    EndPointUrl: "settings/biometrics/devices",
    queryKey: QUERY_KEY_FOR_BIOMETRIC_DEVICE,
  });

  const columns: ColumnsType<biometricProps> = [
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
                <Menu.Item key="2">
                  <Popconfirm
                    title={`Delete ${val.name}`}
                    onConfirm={() => removeData(val.id)}
                  >
                    Delete
                  </Popconfirm>
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
      <TimeAttendanceSettingsNav active="clock in settings" />
      <AttendanceSettingsIntro title={"Clock in Settings"} description="" />
      <AddClockIn open={addClockIn} handleClose={() => setAddClockIn(false)} />
      <div className="Container mt-4">
        <div className="flex justify-end">
          <AppButton
            label="Create Biometrics"
            handleClick={() => setAddClockIn(true)}
          />
        </div>

        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          className="mt-5"
        />
      </div>
    </>
  );
};
