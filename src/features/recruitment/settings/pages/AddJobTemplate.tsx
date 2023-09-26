import { Form, Input, Skeleton } from "antd";
import { appRoutes } from "config/router/paths";
import { RecruitmentSettingsIntro } from "../../components/RecruitmentSettingsIntro";
import { JoditEditorComponent } from "../../components/JoditEditor";
import { AppButton } from "components/button/AppButton";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
import { useCreateJobTemplate } from "../hooks/useCreateJobTemplate";
import { useApiAuth } from "hooks/useApiAuth";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_JOB_TEMPLATE } from "../hooks/useGetJobTemplate";
import { useQueryClient } from "react-query";

const AddJobTemplate = () => {
  const { mutate, isLoading } = useCreateJobTemplate();
  const { token, companyId } = useApiAuth();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    mutate(
      {
        companyId,
        departmentId: values.department,
        description: values.templateDescription,
        title: values.jobName,
        token,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          console.log("checking resp:", res);
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_JOB_TEMPLATE]);
        },
      }
    );
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
              <AppButton
                type="submit"
                label="Save template"
                isLoading={isLoading}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddJobTemplate;
