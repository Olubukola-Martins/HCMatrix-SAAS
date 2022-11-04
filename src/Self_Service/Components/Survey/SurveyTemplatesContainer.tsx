import { Button, Popover } from "antd";
import SurveyFormsContainer from "./SurveyFormsContainer";
import SurveyTempHeader from "./SurveyTempHeader";
import SurveyTemplates from "./SurveyTemplates";

const SurveyTemplatesContainer = () => {
  return (
    <div className="flex flex-col gap-2">
      <SurveyTempHeader />
      <SurveyTemplates />
      <SurveyFormsContainer />
    </div>
  );
};

export default SurveyTemplatesContainer;
