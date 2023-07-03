import { Checkbox, Form, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";

export const WorkFixed = () => {
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
            <TimePicker.RangePicker className="w-full md:ml-20 py-2" />
          </Form.Item>
          <Form.Item label="Tuesday" name="tuesday">
            <TimePicker.RangePicker className="md:ml-20 w-full py-2" />
          </Form.Item>
          <Form.Item label="Wednesday" name="wednesday">
            <TimePicker.RangePicker className="w-full md:ml-20 py-2" />
          </Form.Item>
          <Form.Item label="Thursday" name="thursday">
            <TimePicker.RangePicker className="w-full md:ml-20 py-2" />
          </Form.Item>
          <Form.Item label="Friday" name="friday">
            <TimePicker.RangePicker className="w-full md:ml-20 py-2" />
          </Form.Item>
          <Form.Item label="Saturday" name="saturday">
            <TimePicker.RangePicker className="w-full md:ml-20 py-2" />
          </Form.Item>
          <Form.Item label="Sunday" name="sunday">
            <TimePicker.RangePicker className="w-full md:ml-20 py-2" />
          </Form.Item>

          <div className="flex justify-between items-start">
            <div className="flex items-start gap-2 md:gap-5">
              <h4 className="pt-1">Payroll hours</h4>
              <Form.Item>
                <Checkbox>
                  Include time tracked before scheduled start time
                </Checkbox>
              </Form.Item>
            </div>
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
};
