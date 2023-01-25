import { Form, Input, InputNumber, Select, Switch } from "antd";
import { generalValidationRules } from "FormHelpers/validation";
import React, { useState } from "react";

type TProbationType = {
  label: "Monthly" | "Weekly";
  value: "months" | "weeks";
  min: number;
  max: number;
};
const probationTypes: TProbationType[] = [
  { label: "Monthly", value: "months", min: 1, max: 6 },
  { label: "Weekly", value: "weeks", min: 1, max: 3 },
];

const ProbationPolicyForm = () => {
  const [choosenProbationType, setChoosenProbationType] =
    useState<TProbationType>(probationTypes[0]);
  const handleProbationChange = (val: "months" | "weeks") => {
    const option = probationTypes.find((item) => item.value === val);
    if (option) setChoosenProbationType(option);
  };
  return (
    <div>
      <Form labelCol={{ span: 24 }}>
        <div className="grid grid-cols-2 gap-5">
          <Form.Item name="period" label="Probation Period">
            <Input.Group compact>
              <Form.Item
                noStyle
                name={["period", "type"]}
                rules={generalValidationRules}
              >
                <Select
                  options={probationTypes}
                  className="w-24"
                  placeholder="type"
                  onChange={handleProbationChange}
                />
              </Form.Item>
              <Form.Item
                noStyle
                name={["period", "length"]}
                rules={generalValidationRules}
              >
                <InputNumber
                  placeholder="length"
                  min={choosenProbationType.min}
                  max={choosenProbationType.max}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item
            name="role"
            label="Choose the role you wish to be notified when probation is over ?"
          >
            <div className="w-48">
              <Select
                options={[]}
                placeholder="Choose the role to notify e.g HR"
              />
            </div>
          </Form.Item>
          <Form.Item
            name="automaticStatusChange "
            label="Do you want employee to automatically be taken off probation?"
          >
            <Switch unCheckedChildren="No" checkedChildren="Yes" />
          </Form.Item>
          <Form.Item
            name="probationReminder"
            label="Do you want a reminder to be sent out to the choosen role?"
          >
            <Switch unCheckedChildren="No" checkedChildren="Yes" />
          </Form.Item>
        </div>

        <Form.Item className="mt-4">
          <button className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium">
            Save Policy
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProbationPolicyForm;
