import { Select } from "antd";
import React from "react";
import { generalValidationRules } from "../../../../FormHelpers/validation";

interface IProps {
  Form: any;
  columns: string[];
}
const PersonalInfoMapping = ({ Form, columns }: IProps) => {
  return (
    <div className="bg-card px-3 py-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-x-5">
      <Form.Item
        name="firstName"
        label="First Name"
        rules={generalValidationRules}
      >
        <Select
          className="text-capitalize"
          options={columns.map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder="Select First Name"
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={generalValidationRules}
      >
        <Select
          className="text-capitalize"
          options={columns.map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder="Select Last Name"
        />
      </Form.Item>
      <Form.Item name="empUid" label="Employee ID" requiredMark="optional">
        <Select
          className="text-capitalize"
          options={columns.map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder="Employee ID"
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="Employee Email"
        rules={generalValidationRules}
      >
        <Select
          className="text-capitalize"
          options={columns.map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder="Select Email"
        />
      </Form.Item>
    </div>
  );
};

export default PersonalInfoMapping;
