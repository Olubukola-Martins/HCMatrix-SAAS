import { useState } from "react";
import JoditEditorComponent from "../components/JoditEditor";
import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import { appRoutes } from "config/router/paths";
import { Form, Input } from "antd";
import { AppButton } from "components/button/AppButton";

const AddOfferTemplate = () => {
  const [form] = Form.useForm();
  const [offerLetterContent, setOfferLetterContent] = useState("");

  const handleOfferLetterChange = (content: string) => {
    setOfferLetterContent(content);
    console.log(offerLetterContent);
  };

  const handleSubmit = (values: any) => {
    console.log("Received values of form:", values);
    console.log("Offer Letter Content:", offerLetterContent);
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
          <h2 className="text-xl py-2 font-nedium">
            Template Name <span className="text-red-600">*</span>
          </h2>
          <Form.Item
            name="templateName"
            rules={[{ required: true, message: "Template Name is required" }]}
          >
            <Input className="w-56" />
          </Form.Item>
          <Form.Item
            label="Offer Letter"
            name="offerLetter"
            className="font-medium text-xl"
          >
            <JoditEditorComponent
              value={offerLetterContent}
              onChange={handleOfferLetterChange}
            />
          </Form.Item>
          <div className="flex justify-end gap-5">
            <button
              className="text-base text-caramel underline underline-offset-4 hover:no-underline font-medium "
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

export default AddOfferTemplate;
