import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import { Popover, Select, Switch, Tooltip } from "antd";
import SurveyHeader from "../../Components/Survey/SurveyHeader";
import SurveyTemplatesContainer from "../../Components/Survey/SurveyTemplatesContainer";
const { Option } = Select;

const SurveyHome = () => {
  const [switchGrid, setSwitchGrid] = useState(true);
  return (
    <DashboardLayout>
      <SelfServiceSubNav />

      <div className="Container">
        <div className="flex flex-col gap-4">
          <SurveyHeader />
          <SurveyTemplatesContainer />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SurveyHome;
