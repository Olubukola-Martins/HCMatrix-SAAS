import React from "react";
import SurveyTemplate from "./SurveyTemplate";

const SurveyTemplates = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
      {Array(4)
        .fill(0)
        .map(() => (
          <SurveyTemplate />
        ))}
    </div>
  );
};

export default SurveyTemplates;
