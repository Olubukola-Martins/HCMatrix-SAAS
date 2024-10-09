import { Collapse, Form, Select, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { LeaningSettingsNav } from "features/learningAndDev/components/settings/LeaningSettingsNav";
import { ScoreRange } from "features/learningAndDev/components/settings/ScoreRange";
const { Panel } = Collapse;

export const TrainingSettings = () => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values: any) => {};

  return (
    <>
      <LeaningSettingsNav active="training" />
      <div className="Container">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-medium text-lg">Training Settings</h3>
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
              <h3 className="font-medium">
                Select Training Feedback Frequency
              </h3>
              <div className="flex justify-end mt-2 md:mt-0">
                <Form.Item name="frequency" noStyle>
                  <Select
                    allowClear
                    placeholder="Select"
                    className="w-full"
                    options={[
                      { value: 1, label: "Every two weeks" },
                      { value: 2, label: "Every three weeks " },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className={`formWrapper`}>
              <h3 className="font-medium">Select Training Feedback Workflow</h3>
              <div className="flex justify-end mt-2 md:mt-0">
                <Form.Item name="workflow" noStyle>
                  <Select
                    allowClear
                    placeholder="Select"
                    className="w-full"
                    options={[
                      { value: 1, label: "Training Feedback Workflow" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className={`formWrapper`}>
              <h3 className="font-medium">
                Select Training Evaluation Frequency
              </h3>
              <div className="flex justify-end mt-2 md:mt-0">
                <Form.Item name="EvaluationFrequency" noStyle>
                  <Select
                    allowClear
                    placeholder="Select"
                    className="w-full"
                    options={[
                      { value: 1, label: "Every Three Month" },
                      { value: 1, label: "Every Two Month" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className={`formWrapper`}>
              <h3 className="font-medium">
                Allow selection of supervision of each course
              </h3>
              <div className="flex justify-end">
                <Form.Item name="allowEachCourse" noStyle>
                  <Switch defaultChecked />
                </Form.Item>
              </div>
            </div>
            <div className={`formWrapper`}>
              <h3 className="font-medium">Allow course editing</h3>
              <div className="flex justify-end">
                <Form.Item name="editing" noStyle>
                  <Switch defaultChecked />
                </Form.Item>
              </div>
            </div>
            <div className={`formWrapper`}>
              <h3 className="font-medium">
                Allow learners or employees to accept or reject course{" "}
              </h3>
              <div className="flex justify-end">
                <Form.Item name="employees" noStyle>
                  <Switch defaultChecked />
                </Form.Item>
              </div>
            </div>
            <div className={`formWrapper`}>
              <h3 className="font-medium">Allow comment under courses</h3>
              <div className="flex justify-end">
                <Form.Item name="courseComment" noStyle>
                  <Switch defaultChecked />
                </Form.Item>
              </div>
            </div>
            <div className={`formWrapper`}>
              <h3 className="font-medium">
                Enable additional comment after filling the feedback and
                evaluation forms
              </h3>
              <div className="flex justify-end">
                <Form.Item name="additionalComment" noStyle>
                  <Switch defaultChecked />
                </Form.Item>
              </div>
            </div>
            <div className={`formWrapper`}>
              <Collapse ghost>
                <Panel
                  className="font-medium"
                  header="Enable scoring when filling the feedback and evaluation forms"
                  key="1"
                >
                  <ScoreRange />
                </Panel>
              </Collapse>

              <div className="flex justify-end">
                <Form.Item name="EnableScoring" noStyle>
                  <Switch defaultChecked />
                </Form.Item>
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
