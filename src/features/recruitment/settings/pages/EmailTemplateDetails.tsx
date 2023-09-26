import { appRoutes } from "config/router/paths";
import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { useGetSingleTemplate } from "../../hooks/useGetSingleTemplate";
import { useParams } from "react-router-dom";
import { JoditEditorComponent } from "features/recruitment/components/JoditEditor";
import { Form, Input, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { useUpdateEmailTemplate } from "../hooks/useUpdateEmailTemplate";

const EmailTemplateDetails = () => {
  const params = useParams();
  // const itemId = params.id && parseInt(params.id, 10);
  const itemId = Number(params.id);
  console.log(itemId);
  console.log(typeof itemId);

  const { data, isLoading } = useGetSingleTemplate({
    itemId: itemId as unknown as number,
    queryKey: "emailTemplate",
    templateEndpointUrl: "email-templates",
  });
  const [form] = Form.useForm();
  const { putData, isLoading: postLoading } = useUpdateEmailTemplate({
    queryKey: "emailTemplate",
    putEndpointUrl: "email-templates",
  });
  form.setFieldsValue({
    templateName: data?.name,
    templateSubject: data?.subject,
    templateDescription: data?.body,
  });
  const handleSubmit = (itemId: number) => {
    putData(itemId);
  };
  return (
    <>
      <RecruitmentSettingsIntro
        title="Email Template"
        description={
          "Customize email templates to send to candidates on your ATS."
        }
        nextLink={appRoutes.recruitmentOfferTemplate}
      />
      <div className="Container mt-5">
        <Skeleton loading={isLoading}>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <div>
              <div className="flex gap-10">
                <div>
                  <h2 className="text-lg py-2 font-medium">
                    Template Name <span className="text-red-600">*</span>
                  </h2>
                  <Form.Item
                    name="templateName"
                    rules={textInputValidationRules}
                    className="w-56"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <h2 className="text-lg py-2 font-medium">
                    Template Subject <span className="text-red-600">*</span>
                  </h2>
                  <Form.Item
                    name="templateSubject"
                    rules={textInputValidationRules}
                    className="w-56"
                  >
                    <Input />
                  </Form.Item>
                </div>
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
                    isLoading={postLoading}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </Skeleton>
      </div>
    </>
  );
};

export default EmailTemplateDetails;
