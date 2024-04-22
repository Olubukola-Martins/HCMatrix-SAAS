import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { AddBreak } from "../components/AddBreak";
import Table, { ColumnsType } from "antd/lib/table";
import { Dropdown, Menu, Popconfirm } from "antd";
import { settingsBreakProps } from "../../workSchedule/types";
import {
  QUERY_KEY_FOR_BREAK_POLICY,
  useGetBreakPolicy,
} from "../hooks/useGetBreakPolicy";
import { usePagination } from "hooks/usePagination";
import { useDeleteTimeAndAttendance } from "features/timeAndAttendance/hooks/useDeleteTimeAndAttendance";
import { convertMinutesToHours } from "features/timeAndAttendance/utils";
import { TimeAttendanceSettingsNav } from "../../components/TimeAttendanceSettingsNav";
import { AttendanceSettingsIntro } from "../../components/AttendanceSettingsIntro";

const WorkBreak = () => {
  const [openBreak, setOpenBreak] = useState(false);
  const [breakPolicyId, setBreakPolicyId] = useState<number>();
  const { pagination, onChange } = usePagination({ pageSize: 5 });
  const { data, isLoading } = useGetBreakPolicy({ pagination });
  const { removeData } = useDeleteTimeAndAttendance({
    EndPointUrl: "settings/break-policies",
    queryKey: QUERY_KEY_FOR_BREAK_POLICY,
  });

  const handleEdit = (id: number) => {
    setOpenBreak(true);
    setBreakPolicyId(id);
  };

  const columns: ColumnsType<settingsBreakProps> = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Payment Status",
      dataIndex: "isPaid",
      render: (_, val) => <span>{val?.isPaid ? "Yes" : "No"}</span>,
    },

    {
      title: "Enforce Period",
      dataIndex: "enforcePeriod",
      render: (_, val) => <span>{val?.enforcePeriod ? "Yes" : "No"}</span>,
    },
    {
      title: "Start At",
      dataIndex: "startAt",
      render: (_, val) => <span>{val?.startAt ? val?.startAt : "....."}</span>,
    },
    {
      title: "End At",
      dataIndex: "endAt",
      render: (_, val) => <span>{val?.endAt ? val?.endAt : "....."}</span>,
    },
    {
      title: "Break duration",
      dataIndex: "duration",
      render: (_, val) => convertMinutesToHours(val?.duration),
    },
    {
      title: "Action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => handleEdit(val?.id)}>
                  Edit
                </Menu.Item>
                <Menu.Item key="2">
                  {" "}
                  <Popconfirm
                    title={`Delete ${val?.name}`}
                    onConfirm={() => removeData(val?.id)}
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
      <AddBreak
        open={openBreak}
        id={breakPolicyId}
        handleClose={() => setOpenBreak(false)}
      />
      <TimeAttendanceSettingsNav active="workBreak" />
      <AttendanceSettingsIntro
        title={"Work Break"}
        description=" Schedule breaks by setting fixed times or durations here. If left
        empty, members can clock into breaks freely."
      />
      <div className="Container mt-7">
        <div className="flex justify-end">
          <AppButton
            label="Add break"
            handleClick={() => {
              setOpenBreak(true);
              setBreakPolicyId(undefined);
            }}
          />
        </div>

        <Table
          className="mt-5"
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

export default WorkBreak;
