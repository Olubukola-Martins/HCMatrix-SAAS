import { Form, InputNumber } from "antd";
import { AppButton } from "components/button/AppButton";
import { boxStyle, boxTitle } from "styles/reused";

export const EmployeeApplicationConfiguration = () => {
  return (
    <div className={boxStyle}>
      <h5 className={`${boxTitle} mb-2`}>
        Set Employee Application Configuration
      </h5>

      <Form requiredMark={false} layout="vertical">
        <Form.Item label="What is the maximum amount of loans an employee can apply for at once?">
          <InputNumber
            className="w-full"
            placeholder="Maximum Amount of loans per employee"
            defaultValue={1}
          />
        </Form.Item>
        <Form.Item label="What is the maximum amount of loans an employee can apply for while repaying a loan?">
          <InputNumber
            className="w-full"
            placeholder="Maximum Amount of loans per employee while repaying loan"
            defaultValue={0}
          />
        </Form.Item>
        <div className="flex justify-end">
          <AppButton label="Save" type="submit" />
        </div>
      </Form>
    </div>
  );
};
