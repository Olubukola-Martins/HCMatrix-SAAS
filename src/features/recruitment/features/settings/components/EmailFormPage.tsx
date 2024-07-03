import { Form, Input, Select, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { JoditEditorComponent } from "features/recruitment/components/JoditEditor";
import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import React from "react";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { IEmailFormPageProps } from "../types";

export const EmailFormPage: React.FC<IEmailFormPageProps> = ({
  templateLabel,
  candidateStatusLabel,
  panelistSwitch,
  handleSubmit,
  pageDescription,
  pageTitle,
}) => {
  const [form] = Form.useForm();
  return (
    <div className="Container">
      <RecruitmentSettingsIntro
        description={pageDescription}
        title={pageTitle}
      />
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <div className="flex justify-between items-center p-3 m-2">
          <div className="flex gap-8">
            <div>
              <h2 className="text-lg py-2 ">
                {templateLabel} <span className="text-red-600">*</span>
              </h2>
              <Form.Item
                rules={textInputValidationRules}
                required
                name="templateName"
              >
                <Input />
              </Form.Item>
            </div>

            {candidateStatusLabel && (
              <div>
                <h2 className="text-lg py-2 ">
                  {candidateStatusLabel}
                  <span className="text-red-600">*</span>
                </h2>
                <Form.Item
                  rules={textInputValidationRules}
                  required
                  name="candidateStatus"
                >
                  <Select options={[{ label: "New", value: "new" }]} />
                </Form.Item>
              </div>
            )}
          </div>

          <div className="grid grid-rows-2 gap-4">
            <div className="grid grid-cols-2 gap-3">
              <p>Send automatically</p>
              <Form.Item
                valuePropName="checked"
                name="sendAutomatically"
                noStyle
              >
                <Switch
                  defaultChecked={false}
                  className="w-1/4"
                  //   onChange={onChange}
                />
              </Form.Item>
            </div>
            {panelistSwitch && (
              <div className="grid grid-cols-2 gap-3">
                <p>For panelist</p>
                <Form.Item valuePropName="checked" name="panelist" noStyle>
                  <Switch
                    className="w-1/4"
                    defaultChecked={false}
                    //   onChange={onChange}
                  />
                </Form.Item>
              </div>
            )}
          </div>
        </div>

        {!panelistSwitch && (
          <div>
            <h2 className="text-lg font-bold p-1">Offer Email/Letter</h2>
            <p className="px-2 py-1 mb-5">
              This is the email the candidate will receive notifying them of
              their offer.
            </p>
          </div>
        )}

        <JoditEditorComponent />

        <div className="flex justify-end items-center gap-5">
          <AppButton label="Cancel" variant="transparent" type="reset" />
          <AppButton label="Save Template" type="submit" />
        </div>
      </Form>
    </div>
  );
};
