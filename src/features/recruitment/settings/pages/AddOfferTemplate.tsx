import { appRoutes } from "config/router/paths";
import { Form, Input } from "antd";
import { AppButton } from "components/button/AppButton";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { JoditEditorComponent } from "features/recruitment/components/JoditEditor";
import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { useCreateOfferTemplate } from "../hooks/useCreateOfferTemplate";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_OFFER_TEMPLATE } from "../hooks/useGetOfferTemplate";
import { useApiAuth } from "hooks/useApiAuth";
import { useQueryClient } from "react-query";

const AddOfferTemplate = () => {
  const { mutate, isLoading } = useCreateOfferTemplate();
  const { token, companyId } = useApiAuth();
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    mutate(
      {
        body: values.templateDescription,
        name: values.templateName,
        subject: values.templateSubject,
        token,
        companyId,
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
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_OFFER_TEMPLATE]);
        },
      }
    );
  };
  return (
    <>
      <RecruitmentSettingsIntro
        title="Offer Template"
        description={""}
        nextLink={appRoutes.recruitmentOfferTemplate}
      />
      <div className="Container mt-5">
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
                  isLoading={isLoading}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddOfferTemplate;
