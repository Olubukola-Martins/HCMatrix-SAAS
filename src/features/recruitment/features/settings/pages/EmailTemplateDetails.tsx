import { Form, Input, Select, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { JoditEditorComponent } from "features/recruitment/components/JoditEditor";
import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

export const EmailTemplateDetails = () => {
  return (
    <div className="Container">
      <RecruitmentSettingsIntro
        description="Note: if the panelist toggle is off the candidate status will be available to attach to the email which simply means the email is only for Candidate and not for panelist."
        title="Email Template"
      />
      <Form layout="vertical">
        <div className="flex justify-between">
          <div className="flex gap-6 items-center">
            {" "}
            <Form.Item
              label="Email Template Subject"
              rules={textInputValidationRules}
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Select Application Candidate Status*"
              rules={generalValidationRules}
              required
            >
              <Select options={[{ label: "Applied", value: "applied" }]} />
            </Form.Item>
          </div>
          <div>
            <div>
              <p>Send automatically</p>
              <Form.Item valuePropName="checked" name="" noStyle>
                <Switch
                  defaultChecked={false}
                  //   onChange={onChange}
                />
              </Form.Item>
            </div>
            <div>
              <p>For panelist</p>
              <Form.Item valuePropName="checked" name="" noStyle>
                <Switch
                  defaultChecked={false}
                  //   onChange={onChange}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <JoditEditorComponent />

        <div className="flex justify-end items-center gap-5">
          <AppButton label="Cancel" variant="transparent" />
          <AppButton label="Save Template" />
        </div>
      </Form>
    </div>
  );
};
