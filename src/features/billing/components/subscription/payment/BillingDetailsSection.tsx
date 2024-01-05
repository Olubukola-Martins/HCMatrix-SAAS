import { Form, FormInstance, Input } from "antd";
import { FormAddressInput } from "components/generalFormInputs/FormAddressInput";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import React from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { generalValidationRules } from "utils/formHelpers/validation";

type IProps = {
  Form: typeof Form;
  form: FormInstance;
};
type TInputType = "input" | "phone" | "address";
const BILLING_FORM_ITEMS: {
  name: string;
  title: string;
  inputType: TInputType;
  options?: { value: string; label: string }[];
}[] = [
  {
    name: "billingName",
    title: "Billing Name/Company Name",
    inputType: "input",
  },
  {
    name: "phoneNumber",
    title: "Phone Number",
    inputType: "phone",
  },

  {
    name: "address",
    title: "Address",
    inputType: "address",
  },
];
const BillingDetailsSection: React.FC<IProps> = ({ Form, form }) => {
  return (
    <div className={`${boxStyle} text-sm bg-card`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Billing Details</h5>
      </div>
      <div>
        <div className="flex flex-col gap-2 mt-5">
          {BILLING_FORM_ITEMS.map(({ name, options, title, inputType }, i) => (
            <BillingFormItem
              form={form}
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
  Pick<IProps, "Form" | "form"> & {
    name: string;
    title: string;
    options?: { label: string; value: string }[];
    inputType: TInputType;
  }
> = ({ Form, name, title, options, inputType, form }) => {
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

      {inputType === "phone" && (
        <FormPhoneInput Form={Form} control={{ name, label: "" }} />
      )}
      {inputType === "address" && (
        <FormAddressInput
          form={form}
          Form={Form}
          control={{ name, label: "" }}
        />
      )}
    </div>
  );
};

export default BillingDetailsSection;
