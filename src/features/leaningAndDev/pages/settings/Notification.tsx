import { Form, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { LeaningSettingsNav } from "features/leaningAndDev/components/settings/LeaningSettingsNav";

export const Notification = () => {
  const formWrapStyle =
    "bg-card px-4 pt-4 rounded grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-5 shadow-sm";
  const [form] = Form.useForm();

  const handleFormSubmit = (values: any) => {
    console.log("Form submitted:", values);
  };

  return (
    <>
      <LeaningSettingsNav active="notification" />
      <div className="Container">
        <div className="flex items-center justify-between">
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
              <div
                className={`${formWrapStyle} flex justify-between items-center`}
              >
                <h3 className="font-medium">
                  Allow notification for all accepted trainings
                </h3>
                <Form.Item
                  name="allowTraining"
                  className="flex justify-end items-end"
                >
                  <Switch defaultChecked />
                </Form.Item>
              </div>
              <div
                className={`${formWrapStyle} flex justify-between items-center`}
              >
                <h3 className="font-medium">
                  Allow notifications for all rejected trainings
                </h3>
                <Form.Item
                  name="allowRejectedTraining"
                  className="flex justify-end items-end"
                >
                  <Switch defaultChecked />
                </Form.Item>
              </div>

              {/*  */}
              <div
                className={`${formWrapStyle} flex justify-between items-center`}
              >
                <h3 className="font-medium">
                  Allow notifications for all completed trainings
                </h3>
                <Form.Item
                  name="allowCompletedTraining"
                  className="flex justify-end items-end"
                >
                  <Switch defaultChecked />
                </Form.Item>
              </div>
              <div
                className={`${formWrapStyle} flex justify-between items-center`}
              >
                <h3 className="font-medium">
                  Allow notifications for all overdue trainings
                </h3>
                <Form.Item
                  name="allowOverdueTraining"
                  className="flex justify-end items-end"
                >
                  <Switch defaultChecked />
                </Form.Item>
              </div>
              <div
                className={`${formWrapStyle} flex justify-between items-center`}
              >
                <h3 className="font-medium">
                  Allow notifications for all feedback trainings
                </h3>
                <Form.Item
                  name="allowFeedbackTraining"
                  className="flex justify-end items-end"
                >
                  <Switch defaultChecked />
                </Form.Item>
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
