import React, { useState } from "react";
import "../../style/addJobOpening.css";
import { Form, Steps } from "antd";
import "antd/dist/antd.min.css";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import { JobDetails } from "features/recruitment/components/JobDetails";
import { ApplicationQuestions } from "features/recruitment/components/ApplicationQuestions";
import { AdditionalQuestions } from "features/recruitment/components/AdditionalQuestions";

export const AddJobOpeningContainer = () => {
  const { Step } = Steps;
  const [form] = Form.useForm();
  const [stepperCurrentState, setStepperCurrentState] = useState<number>(0);
  // handling Form onFinish
  const onFinish = (values: any) => {
    console.log(values);
  };

const updateCount = (newState: number) => {
  setStepperCurrentState(newState);
};

  return (
    <>
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
        <Steps
          current={stepperCurrentState}
          labelPlacement="vertical"
          className="py-6 h-auto "
        >
          <Step description="Job details" />
          <Step description="Application Questions" />
          <Step description="Additional Questions" />
        </Steps>
      </div>

      <section
        id="addJobOpeningSection"
        className="w-[83.3vw] max-sm:w-full bg-card pt-7 pb-16 mx-auto lg-ml-auto lg-mr-1 "
      >
        <Form
          name="addJobOpening"
          form={form}
          layout="vertical"
          className="w-11/12 bg-mainBg mx-auto md-px-3 py-8 px-6 rounded-lg flex flex-col gap-6"
          onFinish={onFinish}
        >
          {/* <AdditionalQuestions /> */}
          <JobDetails
            stepperCurrentState={stepperCurrentState}
            updateCount={updateCount}
          />
          {/* <ApplicationQuestions /> */}
        </Form>
      </section>
    </>
  );
};
