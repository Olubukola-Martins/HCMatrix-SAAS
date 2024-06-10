import { Form, ColorPicker } from "antd";
import {
  generalValidationRulesOp,
  generalValidationRules,
} from "utils/formHelpers/validation";

export const FormColorInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string | (string | number)[] };
  optional?: boolean;
}> = ({
  Form,
  showLabel = true,
  control = { name: "color", label: undefined },
  optional = false,
}) => {
  return (
    <Form.Item
      name={control?.name}
      label={showLabel ? control?.label ?? "Color" : null}
      valuePropName={control?.name as string} //as per the value it pick from the associated state object
      getValueFromEvent={(color) => {
        console.log(color?.toHexString(), "color");
        return color?.toHexString();
      }}
      rules={optional ? generalValidationRulesOp : generalValidationRules}
    >
      <ColorPicker
        showText={(color) => <span>Color {optional ? "(optional)" : ""} </span>}
      />
    </Form.Item>
  );
};
