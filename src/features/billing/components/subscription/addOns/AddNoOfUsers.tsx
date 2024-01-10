import { numberHasToBeAWholeNumberRule } from "utils/formHelpers/validation";
import { Form, Input } from "antd";
import { boxStyle, boxTitle } from "styles/reused";

export const AddNoOfUsers: React.FC<{
  Form: typeof Form;
  pricePerUser: string;
  title: string;
  name: string;
  onChange?: (val: string | number) => void;
}> = ({ pricePerUser, title, name, Form, onChange }) => {
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h5 className={boxTitle}>{title}</h5>
      </div>
      <div>
        <Form.Item
          name={name}
          label={`User`}
          rules={[numberHasToBeAWholeNumberRule]}
        >
          <Input
            placeholder={title}
            onChange={(e) => onChange?.(e.target.value)}
          />
        </Form.Item>
        <div className="flex justify-end mt-4">
          <span className="text-xs">Price Per User: {pricePerUser}</span>
        </div>
      </div>
    </div>
  );
};
