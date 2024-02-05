import { Dropdown, Menu, Popconfirm } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { TimeAttendanceSettingsNav } from "../../components/TimeAttendanceSettingsNav";
import { AddLocation } from "../components/AddLocation";
import { AttendanceSettingsIntro } from "../../components/AttendanceSettingsIntro";
import { locationProps } from "../types";
import {
  QUERY_KEY_FOR_LOCATION,
  useGetLocations,
} from "../hooks/useGetLocations";
import { useDeleteTimeAndAttendance } from "features/timeAndAttendance/hooks/useDeleteTimeAndAttendance";

const Location = () => {
  const [openAddLocation, setOpenAddLocation] = useState(false);
  const { data, isLoading } = useGetLocations();
  const [locationId, setLocationId] = useState<number>();
  const { removeData } = useDeleteTimeAndAttendance({
    EndPointUrl: "settings/branch-locations",
    queryKey: QUERY_KEY_FOR_LOCATION,
  });

  const handleEdit = (id: number) => {
    setOpenAddLocation(true);
    setLocationId(id);
  };

  const columns: ColumnsType<locationProps> = [
    {
      title: "Brand Name",
      dataIndex: "branchId",
    },
    {
      title: "Biometric Device",
      dataIndex: "biometricDeviceId",
    },
    {
      title: "Action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => handleEdit(val.id)}>
                  Edit
                </Menu.Item>
                <Menu.Item key="2">
                  <Popconfirm
                    title={`Delete ${val.biometricDeviceId}`}
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
      <TimeAttendanceSettingsNav active="location" />
      <AttendanceSettingsIntro
        title={"Locations"}
        description="Places where your team members will be clocking in and out."
      />
      <AddLocation
        id={locationId}
        open={openAddLocation}
        handleClose={() => {
          setOpenAddLocation(false);
          setLocationId(undefined);
        }}
      />

      <div className="Container mt-5">
        <div className="flex justify-end mb-5">
          <AppButton
            label="Add Location"
            handleClick={() => setOpenAddLocation(true)}
          />
        </div>
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          pagination={{ pageSize: 10, total: data?.length }}
        />
      </div>
    </>
  );
};

export default Location;
