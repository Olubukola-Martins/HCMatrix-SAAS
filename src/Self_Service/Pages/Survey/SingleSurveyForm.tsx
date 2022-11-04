import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import { Popover, Select, Switch, Tooltip } from "antd";
import SurveyHeader from "../../Components/Survey/SurveyHeader";
import SurveyTemplatesContainer from "../../Components/Survey/SurveyTemplatesContainer";
import SingleSurveyFormQuestionsContainer from "../../Components/Survey/SingleSurveyFormQuestionsContainer";
import {
  EInputType,
  IFormDetails,
} from "../../Components/Survey/SurveyQuestionsContainer";
const { Option } = Select;

const SingleSurveyForm = () => {
  const [switchGrid, setSwitchGrid] = useState(true);
  //   dummy formDetail (to be replaced from DB) based in Id
  const formDetail: IFormDetails = {
    title: "Manager Survey",
    description: "This is a manager test survey form",
    questions: [
      {
        content: "What is the best thing you've done ?",
        id: 2,
        type: EInputType.RADIO,
        options: [
          {
            value: "This works as expected",
          },
          {
            value: "This doesn't work as expected",
          },
        ],
      },
      {
        content: "Describe your supervisor ?",
        id: 1,
        type: EInputType.TEXTAREA,
      },
    ],
  };
  return (
    <DashboardLayout>
      <SelfServiceSubNav />

      <div className="Container">
        <div className="flex flex-col gap-4">
          <SurveyHeader title="Survey Form" />
          <SingleSurveyFormQuestionsContainer formDetail={formDetail} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SingleSurveyForm;
