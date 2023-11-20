import { Tabs } from "antd";
import HMOPlansContainer from "./hmoPlan/HMOPlansContainer";
import HospitalCategoryContainer from "./hospital/category/HospitalCategoryContainer";
import HospitalContainer from "./hospital/HospitalContainer";

const HealthAccessSettingTabs = () => {
  return (
    <Tabs
      items={[
        {
          label: "HMO Plan",
          key: "HMO Plan",
          children: <HMOPlansContainer />,
        },
        {
          label: "Hospital Category",
          key: "Hospital Category",
          children: <HospitalCategoryContainer />,
        },
        {
          label: "Hospital List",
          key: "Hospital List",
          children: <HospitalContainer />,
        },
      ]}
    />
  );
};

export default HealthAccessSettingTabs;
