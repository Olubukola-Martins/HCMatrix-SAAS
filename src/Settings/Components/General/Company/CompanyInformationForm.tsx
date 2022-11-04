import { Form, Input, Select } from "antd";
import React from "react";
import { generalValidationRules } from "../../../../FormHelpers/validation";
import { industries } from "../../../Data";

const CompanyInformationForm = () => {
  return (
    <div>
      <Form requiredMark={false} labelCol={{ span: 24 }}>
        <div className="flex flex-col gap-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Form.Item
              label="Company Name"
              rules={generalValidationRules}
              name="companyName"
            >
              <Input placeholder="Enter Company name" />
            </Form.Item>
            <Form.Item label="Website (optional)" name="website">
              <Input placeholder="Enter Company website" />
            </Form.Item>
            <Form.Item
              label="Industry"
              rules={generalValidationRules}
              name="industry"
            >
              <Select placeholder="Enter industry">
                {industries.map((item) => (
                  <Select.Option value={item.value}>{item.value}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Contact Phone"
              rules={generalValidationRules}
              name="contactPhone"
            >
              <Input placeholder="contact phone" />
            </Form.Item>
            <Form.Item
              label="Contact Email"
              rules={generalValidationRules}
              name="contactEmail"
            >
              <Input placeholder="contact Email" />
            </Form.Item>
            <Form.Item
              label="Company Address"
              rules={generalValidationRules}
              name="companyAddress"
            >
              <Input placeholder="Enter Address Details" />
            </Form.Item>
            <Form.Item label="City" rules={generalValidationRules} name="city">
              <Input placeholder="Enter city" />
            </Form.Item>
            <Form.Item
              label="State/Province"
              rules={generalValidationRules}
              name="state"
            >
              <Input placeholder="Enter city" />
            </Form.Item>
            <Form.Item
              label="Country"
              rules={generalValidationRules}
              name="country"
            >
              <Select placeholder="Select Country">
                {industries.map((item) => (
                  <Select.Option value={item.value}>{item.value}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <button className="button" type="submit">
                Save
              </button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CompanyInformationForm;
