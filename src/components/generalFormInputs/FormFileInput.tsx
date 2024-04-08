import { Button, Form, Upload } from "antd";
import {
  TCeateFileValidationRuleProps,
  createFileValidationRule,
} from "utils/formHelpers/validation";
import { UploadOutlined } from "@ant-design/icons";
import { DEFAULT_MULTIPLE_MAX_FILE_UPLOAD_COUNT } from "constants/files";

export const FormFileInput: React.FC<{
  Form: typeof Form;
  label?: React.ReactNode;
  ruleOptions: TCeateFileValidationRuleProps;
  name: string;
  multiple?: boolean;
  triggerComp?: React.ReactNode;
}> = ({
  Form,
  label,
  ruleOptions,
  name,
  multiple = false,
  triggerComp = (
    <Button icon={<UploadOutlined />} className="flex w-full">
      Click to Upload
    </Button>
  ),
}) => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Form.Item
      rules={[
        createFileValidationRule(
          multiple
            ? {
                ...ruleOptions,
                maxFileUploadCount:
                  ruleOptions.maxFileUploadCount ??
                  DEFAULT_MULTIPLE_MAX_FILE_UPLOAD_COUNT,
              }
            : ruleOptions
        ),
      ]}
      label={label}
      name={name}
      valuePropName="fileList" //as per the value it pick from the associated state object
      getValueFromEvent={normFile}
    >
      <Upload
        beforeUpload={() => false}
        multiple={multiple}
        maxCount={
          ruleOptions.maxFileUploadCount
            ? ruleOptions.maxFileUploadCount + 1
            : undefined
        } //ensures only a certain amount of files are uploaded, a plus one so the error shows up
        className="w-full flex-1 flex flex-col"
      >
        {triggerComp}
      </Upload>
    </Form.Item>
  );
};
