import React from "react";
import "../../style/addJobOpening.css";
import { Steps } from "antd";
import "antd/dist/antd.min.css";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import { JobDetails } from "features/recruitment/components/JobDetails";
import { ApplicationQuestions } from "features/recruitment/components/ApplicationQuestions";

export const AddJobOpeningContainer = () => {
  const { Step } = Steps;

  return (
    <>
      {/* <br />
      <br />
      <div className="text-slate-500">
        This task can be broken down to components; Job Details, Application
        Questions, & Additional Questions
      </div> */}

      {/* ADD JOB OPENING */}
      <div className="w-[82.1vw] flex gap-2 mx-auto">
        <a href="" className="flex flex-col items-center">
          <svg
            className="my-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M10.828 12L15.778 16.95L14.364 18.364L8 12L14.364 5.63599L15.778 7.04999L10.828 12Z"
              fill="#3A3A3A"
            />
          </svg>
        </a>
        <a href="">
          <h2 className="text-gray-700 text-[28px] font-bold">
            Add Job Opening
          </h2>
        </a>
      </div>

      {/* STEPPER */}
      <div
        className="w-[82.1vw] h-36 mx-auto my-6 rounded-2xl shadow shadow-[rgba(0, 0, 0, 0.08)] add-job-opening"
        id="add-job-opening"
      >
        <Steps current={0} labelPlacement="vertical" className="py-6 h-auto ">
          <Step description="Job details" />
          <Step description="Application Questions" />
          <Step description="Additional Questions" />
        </Steps>
      </div>

      <section className="w-[83.3vw] bg-card pt-7 pb-16 mx-auto lg-ml-auto lg-mr-1 ">
        {/* <JobDetails /> */}
        <ApplicationQuestions/>
      </section>
    </>
  );
};
