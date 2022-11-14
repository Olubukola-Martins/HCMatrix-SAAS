import { Form, Input, Select } from "antd";
import React from "react";
import { inputValidationRules } from "../../../../FormHelpers/validation";
import { industries } from "../../../Data";

industries;

const CompanyInformationForm = () => {
  return (
    <div>
      <Form requiredMark={false} labelCol={{ span: 24 }}>
        <div className="flex flex-col gap-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Form.Item label="Company Name" rules={inputValidationRules}>
              <Input placeholder="Enter Company name" />
            </Form.Item>
            <Form.Item label="Website (optional)">
              <Input placeholder="Enter Company name" />
            </Form.Item>
            <Form.Item label="Industry" rules={inputValidationRules}>
              <Select placeholder="Enter industry">
                {industries.map((item) => (
                  <Select.Option>{item.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Contact Phone" rules={inputValidationRules}>
              <Input placeholder="contact phone" />
            </Form.Item>
            <Form.Item label="Contact Email" rules={inputValidationRules}>
              <Input placeholder="contact Email" />
            </Form.Item>
            <Form.Item label="Company Address" rules={inputValidationRules}>
              <Input placeholder="Enter Address Details" />
            </Form.Item>
            <Form.Item label="City" rules={inputValidationRules}>
              <Input placeholder="Enter city" />
            </Form.Item>
            <Form.Item label="State/Province" rules={inputValidationRules}>
              <Input placeholder="Enter city" />
            </Form.Item>
            <Form.Item label="Country" rules={inputValidationRules}>
              <Select placeholder="Select Country">
                {industries.map((item) => (
                  <Select.Option>{item.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CompanyInformationForm;
