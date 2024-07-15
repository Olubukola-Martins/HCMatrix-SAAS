import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import Table, { ColumnsType } from "antd/lib/table";
import { Dropdown, Menu, Popconfirm } from "antd";
import { useDeleteTimeAndAttendance } from "features/timeAndAttendance/hooks/useDeleteTimeAndAttendance";
import { AddBiometric } from "../components/AddBiometric";
import { TimeAttendanceSettingsNav } from "../../components/TimeAttendanceSettingsNav";
import { AttendanceSettingsIntro } from "../../components/AttendanceSettingsIntro";
import { biometricProps } from "../types";
import {
  QUERY_KEY_FOR_BIOMETRIC_DEVICE,
  useGetBiometricDevice,
} from "../hooks/useGetBiometricDevice";
import { usePagination } from "hooks/usePagination";
import { useHandleBiometricStatus } from "../hooks/useHandleBiometricStatus";

export const Biometrics = () => {
  const [addClockIn, setAddClockIn] = useState(false);
  const [biometricId, setBiometricId] = useState<number>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetBiometricDevice({ pagination });
  const { removeData } = useDeleteTimeAndAttendance({
    EndPointUrl: "settings/biometrics/devices",
    queryKey: QUERY_KEY_FOR_BIOMETRIC_DEVICE,
  });
  const { requestType } = useHandleBiometricStatus({
    queryKey: QUERY_KEY_FOR_BIOMETRIC_DEVICE,
  });

  const handleEdit = (id: number) => {
    setAddClockIn(true);
    setBiometricId(id);
  };

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
      title: "Status",
      dataIndex: "status",
      render: (_, val) => (
        <span> {val.isEnabled ? "Enabled" : "Disabled"}</span>
      ),
    },
    {
      title: "Action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="3" onClick={() => handleEdit(val.id)}>
                  Edit
                </Menu.Item>
                <Menu.Item key="2">
                  <Popconfirm
                    title={`Delete ${val.name}`}
                    onConfirm={() => removeData(val.id)}
                  >
                    Delete
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item key="1">
                  <Popconfirm
                    title={`${val.isEnabled ? "Disable" : "Enable"}  ${
                      val.name
                    }`}
                    onConfirm={() => requestType(val.id)}
                  >
                    {val.isEnabled ? "Disable" : "Enable"}
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
      <TimeAttendanceSettingsNav active="biometrics" />
      <AttendanceSettingsIntro
        title={"Clock in Settings"}
        description="Set up Biometric..."
      />
      <AddBiometric
        id={biometricId}
        open={addClockIn}
        handleClose={() => {
          setAddClockIn(false);
          setBiometricId(undefined);
        }}
      />
      <div className="Container">
        <div className="flex justify-end">
          <AppButton
            label="Create Biometrics"
            handleClick={() => setAddClockIn(true)}
          />
        </div>

        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          className="mt-5"
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default Biometrics;
