import { Form, FormInstance, Input } from "antd";
import { FormAddressInput } from "components/generalFormInputs/FormAddressInput";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import React from "react";
import { boxStyle, boxTitle, cardStyle } from "styles/reused";
import { generalValidationRules } from "utils/formHelpers/validation";

type IProps = {
  Form: typeof Form;
  form: FormInstance;
  size?: "lg" | "sm";
};
type TInputType = "input" | "phone" | "address";
const BILLING_FORM_ITEMS: {
  name: string;
  title: string;
  inputType: TInputType;
  gridSpanClass?: string;
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
const BillingDetailsSection: React.FC<IProps> = ({ Form, form, size = "sm" }) => {
  return (
    <div className={`${cardStyle} `}>
      <div className="flex items-center justify-between">
        <h5 className={`${boxTitle} text-xl`}>Billing Details</h5>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4 mt-5">
          {BILLING_FORM_ITEMS.map(({ name, options, title, inputType }, i) => (
            <BillingFormItem form={form} Form={Form} name={name} title={title} options={options} key={i} inputType={inputType} gridSpanClass={`${size === "sm" ? "col-span-1" : "col-span-2"}`} />
          ))}
          <FormAddressInput form={form} Form={Form} className={`${boxStyle} text-sm ${size === "sm" ? "col-span-1" : "col-span-2"}`} control={{ name: "address", label: "address" }} />
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
    gridSpanClass?: string;
  }
> = ({ Form, name, title, options, inputType, form, gridSpanClass = "col-span-2" }) => {
  return (
    // <div className={`${boxStyle} text-sm ${gridSpanClass}`}>
    <>
      {inputType === "input" && (
        <Form.Item className={`${boxStyle} text-sm ${gridSpanClass}`} label={title} name rules={generalValidationRules}>
          <Input placeholder="Snapnet Solutions" />
        </Form.Item>
      )}

      {inputType === "phone" && (
        <div className={`${boxStyle} text-sm ${gridSpanClass}`}>
          <FormPhoneInput Form={Form} control={{ name, label: title }} />
        </div>
      )}
    </>
    // </div>
  );
};

export default BillingDetailsSection;
