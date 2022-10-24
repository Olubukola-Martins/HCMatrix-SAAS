import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import { Popover, Select, Switch, Tabs, Tooltip } from "antd";

import NewSurveyHeader from "../../Components/Survey/NewSurveyHeader";
import SurveyQuestionsContainer, {
  IFormDetails,
} from "../../Components/Survey/SurveyQuestionsContainer";
import SurveyResponsesContainer from "../../Components/Survey/SurveyResponsesContainer";
import SurveySettingsContainer from "../../Components/Survey/SurveySettingsContainer";
import SurveyQuestionsPreviewContainer from "../../Components/Survey/SurveyQuestionsPreviewContainer";

const NewSurveyForm = () => {
  const [formDetail, setFormDetail] = useState<IFormDetails | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <DashboardLayout>
      <SelfServiceSubNav />

      <div className="Container">
        <div className="flex flex-col gap-4">
          <NewSurveyHeader
            handlePreview={setShowPreview}
            showPreview={showPreview}
          />
          <Tabs>
            <Tabs.TabPane tab="Questions" key="item-1">
              <>
                <SurveyQuestionsPreviewContainer
                  formDetail={formDetail}
                  showPreview={showPreview}
                />

                <SurveyQuestionsContainer
                  handleFormDetail={setFormDetail}
                  showPreview={showPreview}
                />
              </>
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
