import { Checkbox, Form, InputNumber, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";

export const WorkFlexible = () => {
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
      <div>
        <Form className="mt-6 lg:w-1/2 md:w-4/5">
          <Form.Item label="Monday" name="monday">
            <InputNumber className="w-full md:ml-20" placeholder="0h: 0min"/>
          </Form.Item>
          <Form.Item label="Tuesday" name="tuesday">
            <InputNumber className="w-full md:ml-20" placeholder="0h: 0min"/>
          </Form.Item>
          <Form.Item label="Wednesday" name="wednesday">
            <InputNumber className="w-full md:ml-20" placeholder="0h: 0min"/>
          </Form.Item>
          <Form.Item label="Thursday" name="thursday">
            <InputNumber className="w-full md:ml-20" placeholder="0h: 0min"/>
          </Form.Item>
          <Form.Item label="Friday" name="friday">
            <InputNumber className="w-full md:ml-20" placeholder="0h: 0min"/>
          </Form.Item>
          <Form.Item label="Saturday" name="saturday">
            <InputNumber className="w-full md:ml-20" placeholder="0h: 0min"/>
          </Form.Item>
          <Form.Item label="Sunday" name="sunday">
            <InputNumber className="w-full md:ml-20" placeholder="0h: 0min"/>
          </Form.Item>

          <div className="flex justify-end mt-4">
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
};
