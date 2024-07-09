import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";

export const EnterBackupCodes = ({ open, handleClose }: IModalProps) => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => handleClose()}
      title={`Enter Backup Code`}
    >
      <div className="text-center pt-5">
        <p>
          Enter backup code to disable 2FA on your account. Each backup{" "}
          <br className="md:flex hidden" /> code can only be used once.
        </p>

        <Form
          onFinish={handleFormSubmit}
          form={form}
          layout="vertical"
          className="mt-4"
          requiredMark={false}
        >
          <Form.Item name="digits" rules={generalValidationRules}>
            <Input.OTP formatter={(str) => str.toUpperCase()} />
          </Form.Item>

          <div className="flex justify-end">
            <AppButton label="Continue" type="submit" />
          </div>
        </Form>
      </div>
    </Modal>
  );
};
