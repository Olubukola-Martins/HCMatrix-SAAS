import { Skeleton, Tabs } from "antd";
import Background from "./Background/Background";
import { Finance } from "./Finance";
import { History } from "./History/History";
import { JobInformation } from "./JobInformation";
import ManagerAndDirectReports from "./ManagerAndDirectReports/ManagerAndDirectReports";
import Profile from "./Profile/Profile";
import { UserGroups } from "./UserGroups";
import { FingerPrint } from "./FingerPrint";
import { EmployeeProjects } from "./EmployeeProjects";
import { TSingleEmployee } from "../../types";

interface IProps {
  employee?: TSingleEmployee;
  isLoading: boolean;
}

export const EmployeeTabs: React.FC<IProps> = ({ employee, isLoading }) => {
  const tabItems = [
    {
      key: "Profile",
      label: "Profile",
      children: (
        <Profile
          {...{
            dependents: employee?.dependents,
            emergencyContact: employee?.emergencyContact,
            employeeId: employee?.id,
            personalInfo: employee?.personalInformation,
          }}
        />
      ),
    },
    {
      key: "Job Information",
      label: "Job Information",
      children: (
        <JobInformation
          {...{
            employeeId: employee?.id,
            jobInformation: employee?.jobInformation,
          }}
        />
      ),
    },
    {
      key: "Finance",
      label: "Finance",
      children: (
        <Finance
          {...{
            employeeId: employee?.id,
            finance: employee?.finance,
          }}
        />
      ),
    },
    {
      key: "Background",
      label: "Background",
      children: (
        <Background
          {...{
            educationDetails: employee?.educationDetails,
            employeeId: employee?.id,
            employmentHistory: employee?.employmentHistory,
            skills: employee?.skills,
          }}
        />
      ),
    },
    {
      key: "Manager(s)/Direct Report(s)",
      label: "Manager(s)/Direct Report(s)",
      children: (
        <ManagerAndDirectReports
          {...{
            directReport: employee?.directReport,
            managerHistory: employee?.managerHistory,
          }}
        />
      ),
    },
    {
      key: "User Groups",
      label: "User Groups",
      children: (
        <UserGroups
          {...{
            groups: employee?.userGroups,
          }}
        />
      ),
    },
    {
      key: "History",
      label: "History",
      children: (
        <History
          {...{
            roleHistory: employee?.roleHistory,
            salaryHistory: employee?.salaryHistory,
          }}
        />
      ),
    },
    // {
    //   key: "Finger Prints",
    //   label: "Finger Prints",
    //   children: <FingerPrint />,
    // },
    {
      key: "Projects",
      label: "Projects",
      children: (
        <EmployeeProjects
          {...{
            data: employee?.userProjects,
          }}
        />
      ),
    },
  ];
  return (
    <Skeleton loading={isLoading} paragraph={{ rows: 14 }} active>
      <Tabs
        defaultActiveKey="Profile"
        className="tabBlackActive"
        items={tabItems}
      />
    </Skeleton>
  );
};
