import { Tabs } from "antd";
import HMOPlansContainer from "./hmoPlan/HMOPlansContainer";
import HospitalCategoryContainer from "./hospital/category/HospitalCategoryContainer";
import HospitalContainer from "./hospital/HospitalContainer";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

const HealthAccessSettingTabs = () => {
  const { userPermissions } = useGetUserPermissions();

  const tabItems: {
    label: string;
    key: string;
    children: React.ReactNode;
    hidden: boolean;
  }[] = [
    {
      label: "HMO Plan",
      key: "HMO Plan",
      children: <HMOPlansContainer />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-hmo-plans"],
      }),
    },
    {
      label: "Hospital Category",
      key: "Hospital Category",
      children: <HospitalCategoryContainer />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-hospital-categories"],
      }),
    },
    {
      label: "Hospital List",
      key: "Hospital List",
      children: <HospitalContainer />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-hospitals"],
      }),
    },
  ];
  return <Tabs items={[...tabItems.filter((item) => item.hidden === false)]} />;
};

export default HealthAccessSettingTabs;
