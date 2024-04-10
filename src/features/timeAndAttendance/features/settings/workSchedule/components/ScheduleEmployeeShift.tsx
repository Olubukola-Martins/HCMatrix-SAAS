import { useState } from "react";
import { AddMultipleEmployeeShift } from "./AddMultipleEmployeeShift";
import { Dropdown, Menu } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { scheduleEmployeesShiftProps, scheduleFilterProps } from "../types";
import { usePagination } from "hooks/usePagination";
import { useGetScheduleEmployeeShift } from "../hooks/useGetScheduleEmployeeShift";
import { AddEmployeeShift } from "./AddEmployeeShift";
import { FilterScheduledEmp } from "./FilterScheduledEmp";

export const ScheduleEmployeeShift = () => {
  const [addMultiple, setAddMultiple] = useState(false);
  const [filterData, setFilterData] = useState<scheduleFilterProps>();
  const { pagination, onChange } = usePagination({ pageSize: 5 });
  const { data, isLoading } = useGetScheduleEmployeeShift({ pagination });
  const [assignEmployee, setAssignEmployee] = useState(false);
  const [assignId, setAssignId] = useState<number>();
  const [filterDrawer, setFilterDrawer] = useState(false);

  const handleEdit = (id: number) => {
    setAssignEmployee(true);
    setAssignId(id);
  };

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
      render: (_, val) => <span className="capitalize">{val?.shiftType}</span>,
    },
    {
      title: "Action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  onClick={() => handleEdit(val.id as unknown as number)}
                >
                  Update
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
    <div className="mt-3">
      <AddMultipleEmployeeShift
        open={addMultiple}
        handleClose={() => setAddMultiple(false)}
      />
      <AddEmployeeShift
        id={assignId}
        open={assignEmployee}
        handleClose={() => {
          setAssignEmployee(false);
          setAssignId(undefined);
        }}
      />
      <FilterScheduledEmp
        setFilterData={setFilterData}
        open={filterDrawer}
        handleClose={() => setFilterDrawer(false)}
      />
      <div className="flex justify-end mb-5">
        <div className="flex items-center gap-3">
          <button
            className="button flex items-center gap-3"
            onClick={() => setFilterDrawer(true)}
          >
            <span>Filter</span>
            <i className="fa fa-filter"></i>
          </button>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  onClick={() => {
                    setAssignEmployee(true);
                    setAssignId(undefined);
                  }}
                >
                  Add Shift
                </Menu.Item>
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
