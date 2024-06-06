import { Input, Form } from "antd";
import { FormBankInput } from "components/generalFormInputs/FormBankInput";
import React from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { TPaystackBank } from "types/paystackBank";
import {
  generalValidationRulesOp,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";

const CompanyBankDetails: React.FC<{
  Form: typeof Form;
  handleBank: (data?: TPaystackBank & { accountName?: string }) => void;
  bank?: Pick<TPaystackBank, "code" | "name"> & { accountName?: string };
}> = ({ Form, handleBank, bank }) => {
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Company Bank Details (Optional)</h5>
      </div>
      <p className="text-sm pt-2">Set up company account details</p>

      <div>
        <div className="flex flex-col gap-4 mt-5">
          <FormBankInput
            rules={generalValidationRulesOp}
            Form={Form}
            control={{ name: "bankCode", label: "" }}
            handleSelect={(_, bank) => handleBank(bank)}
          />

          <Form.Item name="accountNumber" rules={textInputValidationRulesOp}>
            <Input placeholder="Account Number" />
          </Form.Item>
          {bank?.accountName ? (
            <Form.Item>
              <Input
                placeholder="Account Name"
                disabled
                value={bank?.accountName}
              />
            </Form.Item>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CompanyBankDetails;
