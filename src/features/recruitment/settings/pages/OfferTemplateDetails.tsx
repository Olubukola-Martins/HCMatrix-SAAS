import { Skeleton, Form, Input } from "antd";
import { AppButton } from "components/button/AppButton";
import { appRoutes } from "config/router/paths";
import { JoditEditorComponent } from "features/recruitment/components/JoditEditor";
import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { useParams } from "react-router-dom";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { useGetSingleTemplate } from "../../hooks/useGetSingleTemplate";
import { useUpdateEmailTemplate } from "../hooks/useUpdateEmailTemplate";

const OfferTemplateDetails = () => {
  const params = useParams();
  const itemId = params.id;
  const { data, isLoading } = useGetSingleTemplate({
    itemId: itemId as unknown as number,
    queryKey: "offerTemplate",
    templateEndpointUrl: "offer-templates",
  });
  const { putData, isLoading: putLoading } = useUpdateEmailTemplate({
    putEndpointUrl: "offer-templates",
    queryKey: "offerTemplate",
  });

  const [form] = Form.useForm();
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
        title="Offer Template"
        description={
          "Customize email templates to send to candidates on your ATS."
        }
        nextLink={appRoutes.recruitmentJobTemplate}
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
                    isLoading={putLoading}
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

export default OfferTemplateDetails;
