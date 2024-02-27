import { useState } from "react";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { AppButton } from "components/button/AppButton";
import Table, { ColumnsType } from "antd/lib/table";
import { Dropdown, Menu, Popconfirm } from "antd";
import { ITimeOffProps } from "../types";
import { AddTimeOff } from "../components/AddTimeOff";
import { AttendanceSubToper } from "features/timeAndAttendance/components/AttendanceSubToper";
import { QUERY_KEY_FOR_TIME_OFF, useGetTimeOff } from "../hooks/useGetTimeOff";
import { usePagination } from "hooks/usePagination";
import { useDeleteTimeAndAttendance } from "features/timeAndAttendance/hooks/useDeleteTimeAndAttendance";

export const TimeOff = () => {
  const [newTimeOffModal, setNewTimeOffModal] = useState(false);
  const [timeOffId, settimeOffId] = useState<number>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetTimeOff({ pagination });
  const { removeData } = useDeleteTimeAndAttendance({
    EndPointUrl: "time-off-requests",
    queryKey: QUERY_KEY_FOR_TIME_OFF,
  });

  const handleEdit = (id: number) => {
    setNewTimeOffModal(true);
    settimeOffId(id);
  };

  //   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  //   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //     console.log("selectedRowKeys changed: ", newSelectedRowKeys);
  //     setSelectedRowKeys(newSelectedRowKeys);
  //   };
  //   const rowSelection = {
  //     selectedRowKeys,
  //     onChange: onSelectChange,
  //   };
  //   const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<ITimeOffProps> = [
    {
      title: "Time off Policy",
      dataIndex: "timeOffPolicy",
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
                <Menu.Item key="1" onClick={() => handleEdit(val.id as number)}>Edit</Menu.Item>
                <Menu.Item key="2">
                  <Popconfirm
                    title={`Delete ${val.policyId}`}
                    onConfirm={() => removeData(val.id as number)}
                  >
                    Delete
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item key="3">Reject</Menu.Item>
                <Menu.Item key="4">Approve</Menu.Item>
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
            <button className="flex items-center gap-x-2 transparentButton">
              <span className="text-caramel font-medium">Filter</span>
              <i className="ri-filter-2-line text-caramel"></i>
            </button>
            <AppButton
              label="Add Time off"
              handleClick={() => setNewTimeOffModal(true)}
            />
          </div>
        </div>

        {/* {hasSelected && (
          <div className="flex gap-3 mb-5">
            <AppButton label="Reject" variant="transparent" />
            <AppButton label="Approve" variant="transparent" />
          </div>
        )} */}

        <Table
          className="mt-3"
          columns={columns}
          dataSource={data?.data}
          //   rowSelection={rowSelection}
          loading={isLoading}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
        />
      </div>
    </>
  );
};
