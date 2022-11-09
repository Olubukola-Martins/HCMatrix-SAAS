import { DatePicker, Form } from "antd";
import React from "react";

export const Profile = () => {
  return (
    <div>
      <div className="bg-mainBg shadow-sm rounded-md p-4">
        <div className="flex justify-between">
          <h2 className="font-medium text-lg">Personal Information</h2>
          <i className="ri-pencil-line cursor-pointer hover:text-caramel text-xl"></i>
        </div>

        <div className="bg-card p-3 rounded">
            <Form>
                <Form.Item name="dob" label="Date of Birth">
                <DatePicker />
                </Form.Item>
            </Form>
        </div>
      </div>
    </div>
  );
};
