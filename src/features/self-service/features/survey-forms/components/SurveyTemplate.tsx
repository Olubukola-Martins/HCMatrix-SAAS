import React from "react";

const SurveyTemplate = () => {
  return (
    <div className="bg-card shadow-md rounded py-5 px-3 text-center flex flex-col gap-16">
      <h4>Survey Form</h4>

      <h2 className="font-medium text-lg">HR Survey Form</h2>
      <div className="flex items-center justify-between">
        <span className="underline text-sm text-caramel">Edit</span>
        <span className="underline text-sm text-neutral">Delete</span>
      </div>
    </div>
  );
};

export default SurveyTemplate;
