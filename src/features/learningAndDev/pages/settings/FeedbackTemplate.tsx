import { Collapse, Form, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { LeaningSettingsNav } from "features/learningAndDev/components/settings/LeaningSettingsNav";
import "../../assets/style.css";
import {
  Instructor,
  OverallBenefit,
  TrainingEvaluation,
  TrainingTool,
} from "features/learningAndDev/components/settings/FeedbackTemplates";
const { Panel } = Collapse;

export const FeedbackTemplate = () => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values: any) => {};

  return (
    <>
      <LeaningSettingsNav active="feedback" />
      <div className="Container">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-medium text-lg pb-1">
              Feedback Template Settings
            </h3>
            <p>The score range settings is use to answer these questions.</p>
          </div>
          <AppButton label="Next setting" />
        </div>
      </div>

      <div className="bg-card rounded md:p-5 p-3">
        <div className="bg-mainBg py-4 px-4 rounded">
          <Form
            form={form}
            onFinish={handleFormSubmit}
            layout="vertical"
            requiredMark={false}
          >
            <div className={`formWrapper`}>
              <Collapse ghost>
                <Panel header="Training Evaluation" key="1">
                  <TrainingEvaluation />
                </Panel>
              </Collapse>
              <div>
                <div className="flex justify-end items-center mt-3">
                  <Form.Item name="allowTraining" noStyle>
                    <Switch defaultChecked />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className={`formWrapper`}>
              <Collapse ghost>
                <Panel header="Training Tool" key="1">
                  <TrainingTool />
                </Panel>
              </Collapse>
              <div>
                <div className="flex justify-end items-center mt-3">
                  <Form.Item name="allowTrainingTool" noStyle>
                    <Switch defaultChecked />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className={`formWrapper`}>
              <Collapse ghost>
                <Panel header="Instructor & Enrollment" key="1">
                  <Instructor />
                </Panel>
              </Collapse>
              <div>
                <div className="flex justify-end items-center mt-3">
                  <Form.Item name="allowTrainingTool" noStyle>
                    <Switch defaultChecked />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className={`formWrapper`}>
              <Collapse ghost>
                <Panel header="Overall Benefit" key="1">
                  <OverallBenefit />
                </Panel>
              </Collapse>
              <div>
                <div className="flex justify-end items-center mt-3">
                  <Form.Item name="allowTrainingTool" noStyle>
                    <Switch defaultChecked />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <AppButton label="Save" type="submit" />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
