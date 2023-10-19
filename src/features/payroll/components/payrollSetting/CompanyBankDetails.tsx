import { Input, Form } from "antd";
import { FormBankInput } from "components/generalFormInputs/FormBankInput";
import React from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { TPaystackBank } from "types/paystackBank";
import { generalValidationRules } from "utils/formHelpers/validation";

const CompanyBankDetails: React.FC<{
  Form: typeof Form;
  handleBank: (data?: TPaystackBank) => void;
}> = ({ Form, handleBank }) => {
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Company Bank Details</h5>
      </div>
      <p className="text-sm pt-2">Set up company account details</p>

      <div>
        <div className="flex flex-col gap-4 mt-5">
          <FormBankInput
            Form={Form}
            control={{ name: "bankCode", label: "" }}
            handleSelect={(_, bank) => handleBank(bank)}
          />

          <Form.Item name="accountNumber" rules={generalValidationRules}>
            <Input placeholder="Account Number" />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default CompanyBankDetails;
