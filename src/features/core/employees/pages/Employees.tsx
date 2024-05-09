import { Tabs } from "antd";
import ActiveEmployeesContainer from "../components/list/ActiveEmployeesContainer";
import EmpPageHeader from "../components/list/EmpPageHeader";
import InactiveEmployeesContainer from "../components/list/InactiveEmployeesContainer";
import InvitedEmployeesContainer from "../components/list/InvitedEmployeesContainer";
import { useState } from "react";
import { TEmployeeFilterProps } from "../types/employee-filter";

const Employees = () => {
  const [filterProps, seTEmployeeFilterProps] = useState<TEmployeeFilterProps>(
    {}
  );
  const tabItems = [
    {
      label: "Active Employees",
      children: <ActiveEmployeesContainer filterProps={filterProps} />,
      key: "1",
    },
    {
      label: "Inactive Employees",
      children: <InactiveEmployeesContainer filterProps={filterProps} />,
      key: "2",
    },
    {
      label: "Invited Employees",
      children: <InvitedEmployeesContainer />,
      key: "3",
    },
  ];
  return (
    <>
      <div className="Container">
        <div className="flex flex-col gap-4">
          <EmpPageHeader
            handleFilter={(props) => seTEmployeeFilterProps(props)}
          />
          <Tabs items={tabItems} />
        </div>
      </div>
    </>
  );
};

export default Employees;
