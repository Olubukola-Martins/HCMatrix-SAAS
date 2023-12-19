import { Form, Select } from "antd";
import React from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { AddNoOfUsers } from "./SelectedModulesSection";
import { generalValidationRules } from "utils/formHelpers/validation";
import AppSwitch from "components/switch/AppSwitch";
import { SUBSCRIPTION_ADD_ONS } from "features/billing/constants";

type IProps = {
  Form: typeof Form;
  pricePerUser: string;
};
export const AddOnSection: React.FC<IProps> = ({ Form, pricePerUser }) => {
  return (
    <div className={`${boxStyle} text-sm bg-card`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Add Ons</h5>
      </div>

      <div>
        <div className="flex flex-col gap-2 mt-5">
          <AddNoOfUsers
            title="Number of Unlicensed User"
            name="noOfUsers"
            pricePerUser={pricePerUser}
            Form={Form}
          />
          {SUBSCRIPTION_ADD_ONS.map(({ name, options, title }, i) => (
            <SelectAddon
              Form={Form}
              name={name}
              title={title}
              options={options}
              key={i}
            />
          ))}
          <div
            className={`${boxStyle} text-sm flex justify-between items-center`}
          >
            <span>{`Auto-Renewal`}</span>
            <AppSwitch size="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectAddon: React.FC<
  Pick<IProps, "Form"> & {
    name: string;
    title: string;
    options: { label: string; value: string }[];
  }
> = ({ Form, name, title, options }) => {
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h5 className={boxTitle}>{title}</h5>
      </div>
      <Form.Item name={name} rules={generalValidationRules}>
        <Select placeholder={title} options={options} />
      </Form.Item>
    </div>
  );
};
