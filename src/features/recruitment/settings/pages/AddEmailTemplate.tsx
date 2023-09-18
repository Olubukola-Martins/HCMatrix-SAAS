import { Form, Input } from "antd";
import { appRoutes } from "config/router/paths";
import { RecruitmentSettingsIntro } from "../../components/RecruitmentSettingsIntro";
import { JoditEditorComponent } from "../../components/JoditEditor";
import { AppButton } from "components/button/AppButton";
import { textInputValidationRules } from "utils/formHelpers/validation";

const AddEmailTemplate = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <>
      <RecruitmentSettingsIntro
        title="New Email Template"
        description={""}
        nextLink={appRoutes.recruitmentEmailTemplate}
      />
      <div className="Container mt-5">
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <h2 className="text-lg py-2 font-nedium">
            Template Name <span className="text-red-600">*</span>
          </h2>
          <Form.Item
            name="jobName"
            rules={textInputValidationRules}
            className="w-56"
          >
            <Input />
          </Form.Item>
          <JoditEditorComponent />
          <div className=" flex justify-end gap-5">
            <button className="text-base font-medium" type="reset">
              Cancel
            </button>
            <Form.Item className="mt-5 w-[125px]">
              <AppButton type="submit" label="Save template" />
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddEmailTemplate;
