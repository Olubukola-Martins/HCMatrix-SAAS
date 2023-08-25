import { Form, Input } from "antd";
import { appRoutes } from "config/router/paths";
import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import { JoditEditorComponent } from "../components/JoditEditor";
import { AppButton } from "components/button/AppButton";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";

const AddJobTemplate = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Received values of form:", values);
  };
  return (
    <>
      <RecruitmentSettingsIntro
        title="Job Template"
        description={""}
        nextLink={appRoutes.recruitmentJobTemplate}
      />
      <div className="Container mt-5">
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <h2 className="text-lg py-2 font-medium">
            Job Name <span className="text-red-600">*</span>
          </h2>
          <div className="flex gap-4 mb-5 lg:w-2/4">
            <Form.Item name="jobName" rules={textInputValidationRules}>
              <Input placeholder="Job Role" />
            </Form.Item>
            <FormDepartmentInput
              Form={Form}
              showLabel={false}
              control={{ label: "", name: "department" }}
            />
          </div>
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
      </div>
    </>
  );
};

export default AddJobTemplate;
