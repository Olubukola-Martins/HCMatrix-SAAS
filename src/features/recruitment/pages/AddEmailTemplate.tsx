import { Form, Input } from "antd";
import JoditEditorComponent from "jodit-react";
import { useState } from "react";
import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import { appRoutes } from "config/router/paths";
import { AppButton } from "components/button/AppButton";

const AddEmailTemplate = () => {
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    console.log(editorContent);
  };
  const handleSubmit = (values: any) => {
    console.log("Received values of form:", values);
  };
  return (
    <>
      <RecruitmentSettingsIntro
        title="Job Template"
        description={""}
        nextLink={appRoutes.recruitmentEmailTemplate}
      />
      <div className="Container mt-10">
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <h2 className="text-xl py-2 font-nedium">
            Template Name <span className="text-red-600">*</span>
          </h2>
          <Form.Item
            name="templateName"
            label=""
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
              value={editorContent}
              onChange={handleEditorChange}
            />
          </Form.Item>
          <div className="w-full flex justify-end gap-5">
            <button
              className="text-base underline underline-offset-4 hover:no-underline font-medium hover:text-caramel"
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

export default AddEmailTemplate;
