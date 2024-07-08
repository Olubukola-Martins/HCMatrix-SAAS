import { Form, Switch } from "antd";
import React from "react";

export interface IOtherSettingsFormSwitchProps {
  name: string;
  label: string;
}

export const OtherSettingsFormSwitch: React.FC<
  IOtherSettingsFormSwitchProps
> = ({ label, name }) => {
  return (
    <div className="bg-card px-4 py-5 rounded mb-5 shadow-sm flex justify-between items-center">
      <h3 className="text-base">{label}</h3>
      <div className="flex gap-5 items-center justify-end">
        <Form.Item
          valuePropName="checked"
          name={name}
          className="flex justify-end items-end"
          noStyle
        >
          <Switch defaultChecked={false} />
        </Form.Item>
      </div>
    </div>
  );
};
