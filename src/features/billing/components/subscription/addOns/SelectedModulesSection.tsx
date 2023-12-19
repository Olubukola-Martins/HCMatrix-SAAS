import { Form, Input } from "antd";
import React from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { numberHasToBeAWholeNumberRule } from "utils/formHelpers/validation";

type IProps = {
  Form: typeof Form;
  selectedModules: string[];
  pricePerUser: string;
};
export const SelectedModulesSection: React.FC<IProps> = ({
  Form,
  selectedModules,
  pricePerUser,
}) => {
  return (
    <div className={`${boxStyle} text-sm bg-card`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Selected Module</h5>
      </div>

      <div>
        <div className="flex flex-col gap-4 mt-5">
          {selectedModules.map((module, index) => (
            <div
              key={index}
              className={`${boxStyle} text-sm flex justify-between items-center`}
            >
              <span>{module}</span>
              <i className="ri-check-line text-caramel" />
            </div>
          ))}
          <AddNoOfUsers
            title="Number of License User"
            name="noOfUsers"
            pricePerUser={pricePerUser}
            Form={Form}
          />
        </div>
      </div>
    </div>
  );
};

export const AddNoOfUsers: React.FC<
  Pick<IProps, "pricePerUser" | "Form"> & { title: string; name: string }
> = ({ pricePerUser, title, name, Form }) => {
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h5 className={boxTitle}>{title}</h5>
      </div>
      <Form.Item
        name={name}
        label={`User`}
        rules={[numberHasToBeAWholeNumberRule]}
      >
        <Input placeholder={title} />
        <div className="flex justify-end mt-4">
          <span className="text-xs">Price Per User: {pricePerUser}</span>
        </div>
      </Form.Item>
    </div>
  );
};
