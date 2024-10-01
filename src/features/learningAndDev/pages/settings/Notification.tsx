import { Form, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { LeaningSettingsNav } from "features/learningAndDev/components/settings/LeaningSettingsNav";
import "../../assets/style.css";

export const Notification = () => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values: any) => {};

  return (
    <>
      <LeaningSettingsNav active="notification" />
      <div className="Container">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-medium text-lg">Notification Settings</h3>
          <AppButton label="Next setting" />
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
                  Allow notification for all accepted trainings
                </h3>
                <div className="flex justify-end">
                  <Form.Item name="allowTraining" noStyle>
                    <Switch defaultChecked />
                  </Form.Item>
                </div>
              </div>
              <div className={`formWrapper`}>
                <h3 className="font-medium">
                  Allow notifications for all rejected trainings
                </h3>
                <div className="flex justify-end">
                  <Form.Item name="allowRejectedTraining" noStyle>
                    <Switch defaultChecked />
                  </Form.Item>
                </div>
              </div>

              <div className={`formWrapper`}>
                <h3 className="font-medium">
                  Allow notifications for all completed trainings
                </h3>
                <div className="flex justify-end">
                  <Form.Item name="allowCompletedTraining" noStyle>
                    <Switch defaultChecked />
                  </Form.Item>
                </div>
              </div>
              <div className={`formWrapper`}>
                <h3 className="font-medium">
                  Allow notifications for all overdue trainings
                </h3>
                <div className="flex justify-end">
                  <Form.Item name="allowOverdueTraining" noStyle>
                    <Switch defaultChecked />
                  </Form.Item>
                </div>
              </div>
              <div className={`formWrapper`}>
                <h3 className="font-medium">
                  Allow notifications for all feedback trainings
                </h3>
                <div className="flex justify-end">
                  <Form.Item name="allowFeedbackTraining" noStyle>
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
      </div>
    </>
  );
};
