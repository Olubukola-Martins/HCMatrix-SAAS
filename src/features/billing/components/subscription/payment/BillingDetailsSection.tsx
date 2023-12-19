import { Form, Input, Select } from "antd";
import { FormCountryInput } from "components/generalFormInputs/FormCountryInput";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import { FormStateInput } from "components/generalFormInputs/FormStateInput";
import React from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { generalValidationRules } from "utils/formHelpers/validation";

type IProps = {
  Form: typeof Form;
};
type TInputType = "input" | "select" | "phone" | "country" | "state";
const BILLING_FORM_ITEMS: {
  name: string;
  title: string;
  inputType: TInputType;
  options?: { value: string; label: string }[];
}[] = [
  {
    name: "Billing Name/Company Name",
    title: "Billing Name/Company Name",
    inputType: "input",
  },
  {
    name: "Phone Number",
    title: "Phone Number",
    inputType: "phone",
  },
  {
    name: "Country",
    title: "Country",
    inputType: "country",
  },
  {
    name: "Street Address",
    title: "Street Address",
    inputType: "input",
  },
  {
    name: "State",
    title: "State",
    inputType: "state",
  },
  {
    name: "City",
    title: "City",
    inputType: "input",
  },
  {
    name: "Zip Code",
    title: "Zip Code",
    inputType: "input",
  },
];
const BillingDetailsSection: React.FC<IProps> = ({ Form }) => {
  return (
    <div className={`${boxStyle} text-sm bg-card`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Billing Details</h5>
      </div>
      <div>
        <div className="flex flex-col gap-2 mt-5">
          {BILLING_FORM_ITEMS.map(({ name, options, title, inputType }, i) => (
            <BillingFormItem
              Form={Form}
              name={name}
              title={title}
              options={options}
              key={i}
              inputType={inputType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BillingFormItem: React.FC<
  Pick<IProps, "Form"> & {
    name: string;
    title: string;
    options?: { label: string; value: string }[];
    inputType: TInputType;
  }
> = ({ Form, name, title, options, inputType }) => {
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h5 className={boxTitle}>{title}</h5>
      </div>
      {inputType === "input" && (
        <Form.Item name={name} rules={generalValidationRules}>
          <Input placeholder={title} />
        </Form.Item>
      )}
      {inputType === "select" && (
        <Form.Item name={name} rules={generalValidationRules}>
          <Select placeholder={title} options={options} />
        </Form.Item>
      )}
      {inputType === "country" && (
        <FormCountryInput
          Form={Form}
          control={{ name: "countryId", label: "" }}
        />
      )}
      {inputType === "state" && (
        <FormStateInput Form={Form} control={{ label: "", name: "stateId" }} />
      )}
      {inputType === "phone" && (
        <FormPhoneInput Form={Form} control={{ name, label: "" }} />
      )}
    </div>
  );
};

export default BillingDetailsSection;
