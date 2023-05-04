import { Select } from "antd";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React, { useState } from "react";
import SurveyHeader from "../components/SurveyHeader";
import SurveyTemplatesContainer from "../components/SurveyTemplatesContainer";

const { Option } = Select;

const SurveyHome = () => {
  const [switchGrid, setSwitchGrid] = useState(true);
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container">
        <div className="flex flex-col gap-4">
          <SurveyHeader />
          <SurveyTemplatesContainer />
        </div>
      </div>
    </>
  );
};

export default SurveyHome;
