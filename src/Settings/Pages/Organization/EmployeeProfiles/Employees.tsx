import { Tabs } from "antd";

import DashboardLayout from "../../../../Layout/DashboardLayout";

import EmpPageHeader from "../../../Components/Organization/EmployeeProfiles/Employees/EmpPageHeader";
import ActiveEmployeesContainer from "../../../Components/Organization/EmployeeProfiles/Employees/ActiveEmployeesContainer";
import InactiveEmployeesContainer from "../../../Components/Organization/EmployeeProfiles/Employees/InactiveEmployeesContainer";
import InvitedEmployeesContainer from "../../../Components/Organization/EmployeeProfiles/Employees/InvitedEmployeesContainer";

const Employees = () => {
  const tabItems = [
    {
      label: "Active Employees",
      children: <ActiveEmployeesContainer />,
      key: "1",
    },
    {
      label: "Inactive Employees",
      children: <InactiveEmployeesContainer />,
      key: "2",
    },
    {
      label: "Invited Employees",
      children: <InvitedEmployeesContainer />,
      key: "3",
    },
  ];
  return (
    <DashboardLayout>
      <div className="Container">
        <div className="flex flex-col gap-4">
          <EmpPageHeader />
          <Tabs items={tabItems} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Employees;
