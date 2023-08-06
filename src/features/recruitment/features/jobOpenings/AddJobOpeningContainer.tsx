import React from "react";
import { Steps } from "antd";
import "antd/dist/antd.min.css";

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
      <div className="w-fit flex gap-2">
        <a href="">
          <svg
            className="m-auto"
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
      <Steps current={1} labelPlacement="vertical">
        <Step description="Job details" />
        <Step description="Application Questions" />
        <Step description="Additional Questions" />
      </Steps>
    </>
  );
};
