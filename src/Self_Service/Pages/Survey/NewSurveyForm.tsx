import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import { Popover, Select, Switch, Tabs, Tooltip } from "antd";
import SurveyHeader from "../../Components/Survey/SurveyHeader";
import SurveyTemplatesContainer from "../../Components/Survey/SurveyTemplatesContainer";
import NewSurveyHeader from "../../Components/Survey/NewSurveyHeader";
import SurveyQuestionsContainer from "../../Components/Survey/SurveyQuestionsContainer";
import SurveyResponsesContainer from "../../Components/Survey/SurveyResponsesContainer";
import SurveySettingsContainer from "../../Components/Survey/SurveySettingsContainer";
const { Option } = Select;

const NewSurveyForm = () => {
  const [switchGrid, setSwitchGrid] = useState(true);
  return (
    <DashboardLayout>
      <SelfServiceSubNav />

      <div className="Container">
        <div className="flex flex-col gap-4">
          <NewSurveyHeader />
          <Tabs>
            <Tabs.TabPane tab="Questions" key="item-1">
              <SurveyQuestionsContainer />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Responses" key="item-2">
              <SurveyResponsesContainer />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Settings" key="item-3">
              <SurveySettingsContainer />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewSurveyForm;
