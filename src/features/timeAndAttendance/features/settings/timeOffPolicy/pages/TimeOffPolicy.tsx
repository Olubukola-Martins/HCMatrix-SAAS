import { Dropdown, Menu, Popconfirm } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { ITimeOffPolicyRule } from "../types";
import { TimeAttendanceSettingsNav } from "../../components/TimeAttendanceSettingsNav";
import { AttendanceSettingsIntro } from "../../components/AttendanceSettingsIntro";
import {
  QUERY_KEY_FOR_TIME_OFF_POLICY,
  useGetTimeOffPolicy,
} from "../hooks/useGetTimeOffPolicy";
import { CreateTimeOffPolicy } from "../components/CreateTimeOffPolicy";
import { useDeleteTimeAndAttendance } from "features/timeAndAttendance/hooks/useDeleteTimeAndAttendance";
import { usePagination } from "hooks/usePagination";

export const TimeOffPolicy = () => {
  const [openAddPolicy, setOpenAddPolicy] = useState(false);
  const [policyId, setPolicyId] = useState<number>();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetTimeOffPolicy({pagination});
  const { removeData } = useDeleteTimeAndAttendance({
    EndPointUrl: "settings/time-off-policies",
    queryKey: QUERY_KEY_FOR_TIME_OFF_POLICY,
  });

  const handleEdit = (id: number) => {
    setOpenAddPolicy(true);
    setPolicyId(id);
  };

  const columns: ColumnsType<ITimeOffPolicyRule> = [
    {
      title: "Branch Name",
      dataIndex: "title",
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
                <Menu.Item key="1" onClick={() => handleEdit(val.id)}>
                  Edit
                </Menu.Item>
                <Menu.Item key="2">
                  <Popconfirm
                    title={`Delete ${val.title}`}
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
      <TimeAttendanceSettingsNav active="time off policy" />
      <AttendanceSettingsIntro
        title={"Time Off Policy"}
        description="Plan work by setting your team's work and break time. Manage overtime rules in settings."
      />
      <CreateTimeOffPolicy
        id={policyId}
        open={openAddPolicy}
        handleClose={() => setOpenAddPolicy(false)}
      />
      <div className="Container mt-5">
        <div className="flex justify-end mb-5">
          <AppButton
            label="Add time off policy"
            handleClick={() => {
              setOpenAddPolicy(true);
              setPolicyId(undefined);
            }}
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

export default TimeOffPolicy;
