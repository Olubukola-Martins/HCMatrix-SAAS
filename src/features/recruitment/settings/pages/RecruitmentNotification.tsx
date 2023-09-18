
import { Form, Switch, Input } from "antd";
import { AppButton } from "components/button/AppButton";
import "../../assets/style.css";

export const RecruitmentNotification = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <>
      <div className="bg-card rounded md:p-5 p-3">
        <h2 className="pb-5 font-medium text-base"> Notifications</h2>
        <div className="bg-mainBg py-4 px-4 rounded">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
            name="notificationsSettings"
          >
            <div className="recruitmentSettingsForm flex flex-row gap-2">
              <h3 className="font-medium">
                Notify me when an applicant send in his/her applications
              </h3>
              <Form.Item
                name="notifyMeOnApplication"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm flex flex-row gap-2">
              <h3 className="font-medium">
                Notify me when an applicant send me any email
              </h3>
              <Form.Item
                name="notifyMeOnApplicantEmail"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm flex flex-row gap-2">
              <h3 className="font-medium">
                Send notification to team lead applicant to view their applicant
                resume/cv
              </h3>
              <Form.Item
                name="sendNotificationToTeamLead"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm flex flex-row gap-2">
              <h3 className="font-medium">
                Send a notification reminder after 2 weeks for applicant placed
                on Hold
              </h3>
              <Form.Item
                name="sendNotificationReminderForApplicantPlacedOnHold"
                className="flex justify-end items-end"
                noStyle
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="flex justify-between self-center mt-5 w-96 ml-auto max-sm:w-full max-lg:w-80">
              <button
                className="text-base font-medium hover:text-caramel"
                type="reset"
              >
                Cancel
              </button>
              <AppButton type="submit" label="Add" />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
