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
import { usePagination } from "hooks/usePagination";

const Location = () => {
  const [openAddLocation, setOpenAddLocation] = useState(false);
  const [locationId, setLocationId] = useState<number>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetLocations({ pagination });
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
      title: "Branch Name",
      dataIndex: "branchId",
      render: (_, val) => <span>{val?.branch?.name}</span>,
    },
    {
      title: "Biometric Device",
      dataIndex: "biometricDeviceId",
      render: (_, val) => <span>{val?.biometricDevice?.name}</span>,
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
          dataSource={data?.data}
          loading={isLoading}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default Location;
