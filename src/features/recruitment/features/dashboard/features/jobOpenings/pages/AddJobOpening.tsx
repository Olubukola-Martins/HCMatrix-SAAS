import { Form, Steps } from "antd";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import RecruitmentSubNav from "features/recruitment/components/RecruitmentSubNav";
import React from "react";
import { useNavigate } from "react-router-dom";
import JobDetails from "../components/addJobOpenings/JobDetails";
import ApplicationQuestions from "../components/addJobOpenings/ApplicationQuestions";
import AdditionalQuestions from "../components/addJobOpenings/AdditionalQuestions";

const AddJobOpening = () => {
  const { Step } = Steps;
  const [form] = Form.useForm();
  const [stepperCurrentState, setStepperCurrentState] = React.useState<number>(0);
  const navigate = useNavigate();

  const jobDetailsHidden = stepperCurrentState !== 0 ? "hidden" : "";
  const applicQuestHidden = stepperCurrentState !== 1 ? "hidden" : "";
  const addQuestHidden = stepperCurrentState !== 2 ? "hidden" : "";

  const onFinish = () => {
    navigate(appRoutes.recruitmentDashboard);
  };

  const updateCount = (newState: number) => {
    setStepperCurrentState(newState);
  };

  return (
    <>
      <RecruitmentSubNav />

      <div className="Container">
        <PageIntro title="Add Job Openings" link={appRoutes.recruitmentJobOpenings} />
        <div className="w-full h-36 mx-auto my-6 rounded-2xl shadow shadow-[rgba(0, 0, 0, 0.08)] add-job-opening-step" id="add-job-opening">
          <Steps current={stepperCurrentState} labelPlacement="vertical" className="py-6 h-auto ">
            <Step description="Job details" />
            <Step description="Application Questions" />
            <Step description="Additional Questions" />
          </Steps>
        </div>

        <section id="addJobOpeningSection" className="w-full max-sm:w-full bg-card pt-7 pb-16 mx-auto lg-ml-auto lg-mr-1 ">
          <Form name="addJobOpening" form={form} layout="vertical" className="w-11/12 bg-mainBg mx-auto md-px-3 py-8 px-6 max-sm:py-6 max-sm:px-4 rounded-lg flex flex-col gap-6" onFinish={onFinish}>
            {/* useEffect or call back for the details instead*/}
            <>
              <>{stepperCurrentState === 0 && <JobDetails stepperCurrentState={stepperCurrentState} updateCount={updateCount} form={form} isHidden={jobDetailsHidden} />} </>
              
              <>{stepperCurrentState === 1 && <ApplicationQuestions stepperCurrentState={stepperCurrentState} updateCount={updateCount} form={form} isHidden={applicQuestHidden} />}</>
              <>{stepperCurrentState === 2 && <AdditionalQuestions stepperCurrentState={stepperCurrentState} updateCount={updateCount} form={form} isHidden={addQuestHidden} />}</>
            </>
          </Form>
        </section>
      </div>
    </>
  );
};

export default AddJobOpening;
