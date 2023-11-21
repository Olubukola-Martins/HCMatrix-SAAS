import { Tabs } from "antd";
import HospitalContainer from "../settings/hospital/HospitalContainer";
import EmployeeHealthAccessContainer from "../employee/EmployeeHealthAccessContainer";
import AuthEmployeeHealthAccess from "../employee/AuthEmployeeHealthAccess";

const HealthAccessHomeTabs = () => {
  return (
    <Tabs
      items={[
        {
          label: "My Health Access",
          key: "My Health Access",
          children: <AuthEmployeeHealthAccess />,
        },
        {
          label: "Registered Employees",
          key: "Registered Employees",
          children: <EmployeeHealthAccessContainer />,
        },
        {
          label: "Available Hospitals",
          key: "Available Hospitals",
          children: <HospitalContainer type="mine" />,
        },
      ]}
    />
  );
};

export default HealthAccessHomeTabs;
