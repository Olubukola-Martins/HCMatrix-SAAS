import React from "react";
import { Button, DatePicker, Form, Input } from "antd";
import Themes from "../../../../Themes/Themes";

const AddHolidayForm = () => {
  return (
    <div>
      <Form labelCol={{ span: 24 }}>
        <Form.Item label="Name">
          <Input placeholder="name" />
        </Form.Item>
        <Form.Item label="Length">
          <DatePicker className="w-full" />
        </Form.Item>

        <div className="flex flex-row justify-between items-center">
          <Button type="text">Cancel</Button>
          <div className="flex flex-row gap-4">
            <Button type="ghost">Save And Add Another</Button>
            <Themes isBg={false}>
              <button className="button w-full" htmlType="submit">
                Submit
              </button>
            </Themes>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddHolidayForm;
