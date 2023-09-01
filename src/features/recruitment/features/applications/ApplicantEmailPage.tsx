import { Form, Select } from "antd";
import { appRoutes } from "config/router/paths";
import { ApplicantSettingsIntro } from "features/recruitment/components/ApplicantSettingsIntro";
import { JoditEditorComponent } from "features/recruitment/components/JoditEditor";
import { AppButton } from "components/button/AppButton";
import { textInputValidationRules } from "utils/formHelpers/validation";

const ApplicantEmailPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Received values of form:", values);
  };

  const options = [
    {
      value: "phoneConversationRequest",
      label: "Phone Conversation Request",
    },
    {
      value: "invitationToInPersonInterview",
      label: "Invitation to In-Person Interview",
    },
    {
      value: "regretToInformApplicant",
      label: "Regret to Inform - Applicant",
    },
    {
      value: "regretToInformInterviewed",
      label: "Regret to Inform - Interviewed",
    },
    {
      value: "regretToInformInternational",
      label: "Regret to Inform - International",
    },
    {
      value: "requestForReferenceed",
      label: "Request for Reference",
    },
  ];
  return (
    <>
      <ApplicantSettingsIntro title="Send Samuel an Email" description="" />

      <Form
        className="flex flex-col gap-2 Container"
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item label="Email Template" className="w-48">
          <Select options={options} />
        </Form.Item>
        <JoditEditorComponent />
        <div className="w-full flex justify-end gap-5">
          <button
            className="text-base text-caramel underline underline-offset-4 hover:no-underline font-medium"
            type="reset"
          >
            Cancel
          </button>
          <Form.Item className="mt-5">
            <AppButton type="submit" label="Save template" />
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default ApplicantEmailPage;
