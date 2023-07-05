import { Form, InputNumber } from "antd";
import { AppButton } from "components/button/AppButton";
import { textInputValidationRulesOpt } from "utils/formHelpers/validation";

export const WeeklyWork = () => {
  const boxStyle = "border py-3 px-7 text-accent font-medium text-base";
  return (
    <div>
      <div className="flex items-center flex-wrap gap-6">
        <h4 className="text-base font-medium">Days of the week</h4>
        <div className="flex items-center flex-wrap">
          <div className={`${boxStyle} bg-caramel rounded-l`}>
            <h5>M</h5>
          </div>
          <div className={`${boxStyle} bg-caramel`}>
            <h5>T</h5>
          </div>
          <div className={`${boxStyle} bg-caramel`}>
            <h5>W</h5>
          </div>
          <div className={`${boxStyle} bg-caramel`}>
            <h5>T</h5>
          </div>
          <div className={`${boxStyle} bg-caramel`}>
            <h5>F</h5>
          </div>
          <div className={`${boxStyle}`}>
            <h5>S</h5>
          </div>
          <div className={`${boxStyle} rounded-r`}>
            <h5>S</h5>
          </div>
        </div>
      </div>

      {/* form */}

      <Form className="mt-6 lg:w-1/2 md:w-4/5">
        <Form.Item label="Hours" name="hours" rules={textInputValidationRulesOpt}>
          <InputNumber
            className="w-full md:ml-24"
            placeholder="Enter hours..."
          />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton label="Save" type="submit" />
        </div>
      </Form>
    </div>
  );
};
