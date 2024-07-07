import { Form, Switch } from "antd";
import { IRecruitmentSettingsSwitchFormProps } from "../types";

export const RecruitmentSettingsSwitchForm: React.FC<
  IRecruitmentSettingsSwitchFormProps
> = ({ name, label, onChange }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      <div className="bg-card px-4 py-5 rounded mb-5 shadow-sm flex justify-between items-center">
        <h3 className="text-base">{label}</h3>
        <div className="flex gap-5 items-center justify-end">
          <Form.Item
            valuePropName="checked"
            name={name}
            className="flex justify-end items-end"
            noStyle
          >
            <Switch defaultChecked={false} onChange={onChange} />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
