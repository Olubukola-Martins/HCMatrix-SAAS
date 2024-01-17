import { Tabs } from "antd";
import HospitalContainer from "../settings/hospital/HospitalContainer";
import EmployeeHealthAccessContainer from "../employee/EmployeeHealthAccessContainer";
import AuthEmployeeHealthAccess from "../employee/AuthEmployeeHealthAccess";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

const HealthAccessHomeTabs = () => {
  const { userPermissions } = useGetUserPermissions();
  const tabItems: {
    label: string;
    key: string;
    children: React.ReactNode;
    hidden: boolean;
  }[] = [
    {
      label: "My Health Access",
      key: "My Health Access",
      children: <AuthEmployeeHealthAccess />,
      hidden: false,
    },
    {
      label: "Registered Employees",
      key: "Registered Employees",
      children: <EmployeeHealthAccessContainer />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-employee-health-access"],
      }),
    },
    {
      label: "Available Hospitals",
      key: "Available Hospitals",
      hidden: false,
      children: (
        <HospitalContainer
          type="mine"
          showAdd={false}
          showDelete={false}
          showEdit={false}
        />
      ),
    },
  ];
  return <Tabs items={[...tabItems.filter((item) => item.hidden === false)]} />;
};

export default HealthAccessHomeTabs;
