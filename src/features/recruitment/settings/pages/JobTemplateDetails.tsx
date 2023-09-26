import { Skeleton, Form, Input } from "antd";
import { AppButton } from "components/button/AppButton";
import { appRoutes } from "config/router/paths";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
import { JoditEditorComponent } from "features/recruitment/components/JoditEditor";
import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { useGetSingleTemplate } from "features/recruitment/hooks/useGetSingleTemplate";
import { useParams } from "react-router-dom";
import { textInputValidationRules } from "utils/formHelpers/validation";

const JobTemplateDetails = () => {
  const params = useParams();
  const itemId = params.id;
  const { data, isLoading } = useGetSingleTemplate({
    itemId: itemId as unknown as number,
    queryKey: "jobTemplate",
    templateEndpointUrl: "job-templates",
  });
  const [form] = Form.useForm();
  form.setFieldsValue({
    jobName: data?.title,
    templateDescription: data?.description,
  });
  return (
    <>
      <RecruitmentSettingsIntro
        title="Job Template"
        description={
          "Customize email templates to send to candidates on your ATS."
        }
        nextLink={appRoutes.otherSettings}
      />
      <div className="Container mt-5">
        <Skeleton active loading={isLoading}>
          <Form layout="vertical" form={form}>
            <h2 className="text-lg py-2 font-medium">
              Job Name <span className="text-red-600">*</span>
            </h2>
            <div className="flex gap-4 mb-5 lg:w-1/3 md:w-1/2">
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
            <div className=" flex justify-end gap-5">
              <button className="text-base font-medium" type="reset">
                Cancel
              </button>
              <Form.Item className="mt-5 w-[125px]">
                <AppButton type="submit" label="Save template" />
              </Form.Item>
            </div>
          </Form>
        </Skeleton>
      </div>
    </>
  );
};

export default JobTemplateDetails;
