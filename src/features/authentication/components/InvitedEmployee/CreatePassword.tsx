import { Form, Input } from "antd";
import { stepperInputProps } from "features/authentication/types";
import { passwordValidationRules } from "utils/formHelpers/validation";

export const CreatePassword = ({
  onFinished,
  initialValues,
  email,
}: stepperInputProps) => {
  return (
    <div>
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={onFinished}
        initialValues={initialValues}
      >
        <Form.Item label="Email Address" name="email" initialValue={email}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="password"
          label="Enter Password"
          rules={passwordValidationRules}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Field is required",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered does not match."
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <div className="flex justify-end mt-3">
          <button type="submit" className="button">
            Continue
          </button>
        </div>
      </Form>
    </div>
  );
};
