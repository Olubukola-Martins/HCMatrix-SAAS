import { Switch } from "antd";
import React from "react";

const SurveySettingsContainer = () => {
  return (
    <div className="bg-card px-6 rounded-md py-5 flex flex-col gap-4">
      <div className="bg-white p-3 flex flex-col gap-6 rounded-md">
        <div className="flex flex-col gap-3">
          <h4 className="text-base">Responses</h4>
          <p className="text-xs">
            Control the collection and protection of replies.
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h5>Allow response editing</h5>
            <p className="text-xs">
              Respondent can modify answers that have already been submitted.
            </p>
          </div>
          <Switch size="small" />
        </div>
      </div>
      <div className="bg-white p-3 flex flex-col gap-6 rounded-md">
        <div className="flex flex-col gap-3">
          <h4 className="text-base">Presentation</h4>
          <p className="text-xs">
            Control the presentation of the form and the responses.
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <h5>Form Presentation</h5>
            <p className="text-xs">
              Thank you for providing your filling the form!
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Switch size="small" />
            <span className="text-caramel underline text-xs">Edit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveySettingsContainer;
