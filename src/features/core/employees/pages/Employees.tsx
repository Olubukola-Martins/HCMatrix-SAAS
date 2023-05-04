import { Tabs } from "antd";
import ActiveEmployeesContainer from "../components/list/ActiveEmployeesContainer";
import EmpPageHeader from "../components/list/EmpPageHeader";
import InactiveEmployeesContainer from "../components/list/InactiveEmployeesContainer";
import InvitedEmployeesContainer from "../components/list/InvitedEmployeesContainer";

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
    <>
      <div className="Container">
        <div className="flex flex-col gap-4">
          <EmpPageHeader />
          <Tabs items={tabItems} />
        </div>
      </div>
    </>
  );
};

export default Employees;
