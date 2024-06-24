import { useState } from "react";
import { Form, Steps } from "antd";
import { JobDetails } from "features/recruitment/features/jobOpenings/components/JobDetails";
import { ApplicationQuestions } from "features/recruitment/features/jobOpenings/components/ApplicationQuestions";
import { AdditionalQuestions } from "features/recruitment/features/jobOpenings/components/AdditionalQuestions";
import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";

export const AddJobOpeningContainer = () => {
  const { Step } = Steps;
  const [form] = Form.useForm();
  const [stepperCurrentState, setStepperCurrentState] = useState<number>(0);
  const navigate = useNavigate();
  // handling Form onFinish
  const onFinish = (values: any) => {
    console.log(values);
    navigate(appRoutes.recruitmentDashboard);
  };

  const updateCount = (newState: number) => {
    setStepperCurrentState(newState);
  };

  return (
    <>
      <RecruitmentSettingsIntro title="Add Job Opening" description={""} />

      {/* STEPPER */}
      <div
        className="w-full h-36 mx-auto my-6 rounded-2xl shadow shadow-[rgba(0, 0, 0, 0.08)] add-job-opening-step"
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
        className="w-full max-sm:w-full bg-card pt-7 pb-16 mx-auto lg-ml-auto lg-mr-1 "
      >
        <Form
          name="addJobOpening"
          form={form}
          layout="vertical"
          className="w-11/12 bg-mainBg mx-auto md-px-3 py-8 px-6 max-sm:py-6 max-sm:px-4 rounded-lg flex flex-col gap-6"
          onFinish={onFinish}
        >
          {stepperCurrentState === 0 ? (
            <>
              <JobDetails
                stepperCurrentState={stepperCurrentState}
                updateCount={updateCount}
                form={form}
              />
              <div
                style={{
                  display: "none",
                }}
              >
                <ApplicationQuestions
                  stepperCurrentState={stepperCurrentState}
                  updateCount={updateCount}
                />
              </div>
              <div
                style={{
                  display: "none",
                }}
              >
                <AdditionalQuestions
                  stepperCurrentState={stepperCurrentState}
                  updateCount={updateCount}
                />
              </div>
            </>
          ) : stepperCurrentState === 1 ? (
            <>
              <div
                style={{
                  display: "none",
                }}
              >
                <JobDetails
                  stepperCurrentState={stepperCurrentState}
                  updateCount={updateCount}
                  form={form}
                />
              </div>

              <ApplicationQuestions
                stepperCurrentState={stepperCurrentState}
                updateCount={updateCount}
              />

              <div
                style={{
                  display: "none",
                }}
              >
                <AdditionalQuestions
                  stepperCurrentState={stepperCurrentState}
                  updateCount={updateCount}
                />
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "none",
                }}
              >
                <JobDetails
                  stepperCurrentState={stepperCurrentState}
                  updateCount={updateCount}
                  form={form}
                />
              </div>
              <div
                style={{
                  display: "none",
                }}
              >
                <ApplicationQuestions
                  stepperCurrentState={stepperCurrentState}
                  updateCount={updateCount}
                />
              </div>
              <AdditionalQuestions
                stepperCurrentState={stepperCurrentState}
                updateCount={updateCount}
              />
            </>
          )}
        </Form>
      </section>
    </>
  );
};
