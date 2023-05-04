import { Switch, Tabs } from "antd";
import React from "react";
import IndividualResponses from "./IndividualResponses";
import ResponsesSummary from "./ResponsesSummary";

const SurveyResponsesContainer = () => {
  return (
    <div className="bg-card px-6 rounded-md py-5 flex flex-col gap-4">
      <div className="bg-white p-4 rounded-md flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">0 Responses</h4>
          <div className="flex gap-3 items-center">
            <span>Accepting Responses</span>
            <Switch size="small" />
          </div>
        </div>
        <div>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Summary" key="1">
              <ResponsesSummary />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Individual" key="2">
              <IndividualResponses />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SurveyResponsesContainer;
