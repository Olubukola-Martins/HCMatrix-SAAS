import { Form, Input, Select } from "antd";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import JoditEditorComponent from "../components/JoditEditor";
import { AppButton } from "components/button/AppButton";

const AddJobTemplate = () => {
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    console.log(editorContent);
  };
  const handleSubmit = (values: any) => {
    console.log("Received values of form:", values);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <RecruitmentSettingsIntro
        title="Job Template"
        description={""}
        nextLink={appRoutes.recruitmentJobTemplate}
      />
      <div className="Container mt-10">
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <h2 className="text-xl py-2 font-nedium">
            Job Name <span className="text-red-600">*</span>
          </h2>
          <div className="flex gap-4 mb-5">
            <Form.Item
              name="jobName"
              label=""
              rules={[{ required: true, message: "Job Name is required" }]}
              className="w-56"
            >
              <Input />
            </Form.Item>
            <Form.Item className="w-56" name="department">
              <Select
                defaultValue="Finance"
                onChange={handleChange}
                options={[
                  {
                    value: "application",
                    label: "Application Department",
                  },
                  {
                    value: "financeDepartment",
                    label: "Finance",
                  },
                  {
                    value: "csi",
                    label: "CSI",
                  },
                ]}
              />
            </Form.Item>
          </div>

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

export default AddJobTemplate;
