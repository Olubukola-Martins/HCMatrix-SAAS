import { Tabs } from "antd";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React, { useState } from "react";
import NewSurveyHeader from "../components/NewSurveyHeader";
import SurveyQuestionsContainer, {
  IFormDetails,
} from "../components/SurveyQuestionsContainer";
import SurveyQuestionsPreviewContainer from "../components/SurveyQuestionsPreviewContainer";
import SurveyResponsesContainer from "../components/SurveyResponsesContainer";
import SurveySettingsContainer from "../components/SurveySettingsContainer";

const NewSurveyForm = () => {
  const [formDetail, setFormDetail] = useState<IFormDetails | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
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
    </>
  );
};

export default NewSurveyForm;
