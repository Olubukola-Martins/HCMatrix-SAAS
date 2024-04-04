import { useState } from "react";
import { AddMultipleEmployeeShift } from "./AddMultipleEmployeeShift";
import { Dropdown, Menu } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { scheduleEmployeesShiftProps } from "../types";
import { usePagination } from "hooks/usePagination";
import { useGetScheduleEmployeeShift } from "../hooks/useGetScheduleEmployeeShift";

export const ScheduleEmployeeShift = () => {
  const [addMultiple, setAddMultiple] = useState(false);
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetScheduleEmployeeShift({ pagination });

  const columns: ColumnsType<scheduleEmployeesShiftProps> = [
    {
      title: "Employee",
      dataIndex: "name",
      render: (_, val) => (
        <span className="capitalize">
          {val?.employee?.firstName} {val?.employee?.lastName}
        </span>
      ),
    },
    {
      title: "Shift Type",
      dataIndex: "shiftType",
    },
    {
      title: "Action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">Update</Menu.Item>
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
    <div className="mt-3">
      <AddMultipleEmployeeShift
        open={addMultiple}
        handleClose={() => setAddMultiple(false)}
      />
      <div className="flex justify-end mb-5">
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="1">Add Shift</Menu.Item>
              <Menu.Item key="2" onClick={() => setAddMultiple(true)}>
                Import Shift
              </Menu.Item>
            </Menu>
          }
        >
          <button className="button flex items-center gap-3">
            <span>Assign Shift</span>
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </Dropdown>
      </div>

      <Table
        columns={columns}
        dataSource={data?.data}
        scroll={{ x: 500 }}
        loading={isLoading}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
