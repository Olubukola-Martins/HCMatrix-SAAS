import { Form, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { generalValidationRules } from "utils/formHelpers/validation";

export const DisbursementSetUp = () => {
  const [form] = Form.useForm();

  const onSubmit = (val: any) => {
    console.log(val);
  };
  return (
    <div>
      <h3 className="font-medium pb-5">Disbursement Setup</h3>

      <Form
        onFinish={onSubmit}
        form={form}
        requiredMark={false}
      >
        <div className="flex items-center justify-between mb-7">
          <h5 className="font-medium">Set Payment Plan</h5>
          <Form.Item
            name="enable-disbursement"
            noStyle
            rules={generalValidationRules}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </div>

        <div className="flex justify-end">
          <AppButton type="submit" label="Save Settings" />
        </div>
      </Form>
    </div>
  );
};
