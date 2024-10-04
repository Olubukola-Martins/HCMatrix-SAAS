import React from "react";
import ModuleCard, { IModuleCardProps } from "./ModuleCard";
import { Checkbox, Form } from "antd";

export const ModuleCards: React.FC<{
  data?: IModuleCardProps[];
  loading?: boolean;
  Form: typeof Form;
  onChange?: (val: number[] | string[]) => void;
}> = ({ data, Form, onChange }) => {
  return (
    <Form.Item name="purchased" className="w-full">
      <Checkbox.Group className="space-y-6 w-full" onChange={(val) => onChange?.(val as number[] | string[])}>
        <div className="w-full grid grid-cols-2 gap-x-5 gap-y-8">
          {data?.map((module, index) => (
            <ModuleCard key={index} Checkbox={Checkbox} {...module} />
          ))}
        </div>
      </Checkbox.Group>
    </Form.Item>
  );
};
