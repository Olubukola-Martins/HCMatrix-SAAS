import React from "react";
import CompanyTrainingSessionCalender from "./CompanyTrainingSessionCalender";

const CompanyTrainingSessionContainer = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className=" font-light">Schedule your training session.</p>
      <div>
        <CompanyTrainingSessionCalender />
      </div>
    </div>
  );
};

export default CompanyTrainingSessionContainer;
