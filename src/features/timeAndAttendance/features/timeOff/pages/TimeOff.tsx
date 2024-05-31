import { useState, useEffect } from "react";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { AppButton } from "components/button/AppButton";
import Table, { ColumnsType } from "antd/lib/table";
import { Dropdown, Menu, Popconfirm, Select } from "antd";
import { ITimeOffProps } from "../types";
import { AddTimeOff } from "../components/AddTimeOff";
import { AttendanceSubToper } from "features/timeAndAttendance/components/AttendanceSubToper";
import { QUERY_KEY_FOR_TIME_OFF, useGetTimeOff } from "../hooks/useGetTimeOff";
import { usePagination } from "hooks/usePagination";
import { useDeleteTimeAndAttendance } from "features/timeAndAttendance/hooks/useDeleteTimeAndAttendance";
import { useHandleTimeAndAttendanceStatus } from "features/timeAndAttendance/hooks/useHandleTimeAndAttendanceStatus";

export const TimeOff = () => {
  const [newTimeOffModal, setNewTimeOffModal] = useState(false);
  const [status, setStatus] = useState<string>();
  const [timeOffId, settimeOffId] = useState<number>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetTimeOff({ pagination, status });
  const { removeData } = useDeleteTimeAndAttendance({
    EndPointUrl: "time-off-requests",
    queryKey: QUERY_KEY_FOR_TIME_OFF,
  });
  
  const { requestType } = useHandleTimeAndAttendanceStatus({
    queryKey: QUERY_KEY_FOR_TIME_OFF,
  });

  const handleEdit = (id: number) => {
    setNewTimeOffModal(true);
    settimeOffId(id);
  };


  const columns: ColumnsType<ITimeOffProps> = [
    {
      title: "Employee",
      dataIndex: "employee",
      render: (_, val) => <span>{val?.employee?.firstName} {val?.employee?.lastName}</span>,
    },
    {
      title: "Time off Policy",
      dataIndex: "timeOffPolicy",
      render: (_, val) => <span>{val.policy?.title}</span>,
    },
    {
      title: "Duration in hours",
      dataIndex: "duration",
      render: (_, val) => <span>{val.policy?.duration}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
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
                <Menu.Item key="1" onClick={() => handleEdit(val.id as number)}>
                  Edit
                </Menu.Item>
                <Menu.Item key="2">
                  <Popconfirm
                    title={`Delete ${val.policy?.title}`}
                    onConfirm={() => removeData(val.id as number)}
                  >
                    Delete
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item key="5">
                  <Popconfirm
                    title={`Cancel ${val.policy?.title}`}
                    onConfirm={() => requestType(val.id as number, "canceled")}
                  >
                    Cancel
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item key="3">
                  <Popconfirm
                    title={`Reject ${val.policy?.title}`}
                    onConfirm={() => requestType(val.id as number, "rejected")}
                  >
                    Reject
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item key="4">
                  <Popconfirm
                    title={`Approve ${val.policy?.title}`}
                    onConfirm={() => requestType(val.id as number, "approved")}
                  >
                    Approve
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
      <AttendanceSubToper active="time-off" />
      <AddTimeOff
        id={timeOffId}
        open={newTimeOffModal}
        handleClose={() => setNewTimeOffModal(false)}
      />
      <div className="Container">
        <div className="flex items-center justify-between">
          <div>
            <PageIntro
              title="Timeoff Request"
              link={appRoutes.attendanceHome}
            />
            <p className="pt-2 pb-5">
              Welcome on board, set your time off policy
            </p>
          </div>

          <div className="flex items-center gap-x-3">
            <Select
              options={[
                { value: "pending", label: "Pending" },
                { value: "approved", label: "Approved" },
                { value: "rejected", label: "Rejected" },
                { value: "canceled", label: "Canceled" },
              ]}
              className="w-[7.8rem]"
              placeholder="Status"
              onChange={(val) => setStatus(val)}
              allowClear
            />
            <AppButton
              label="Add Time off"
              handleClick={() => {
                setNewTimeOffModal(true);
                settimeOffId(undefined);
              }}
            />
          </div>
        </div>

        <Table
          className="mt-3"
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
