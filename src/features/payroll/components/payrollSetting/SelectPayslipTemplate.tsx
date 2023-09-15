import { Switch } from "antd";
import React, { useState } from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { FormPayslipTemplateInput } from "../payslips/templates/FormPayslipTemplateInput";

const SelectPayslipTemplate: React.FC<{
  Form: any;
}> = ({ Form }) => {
  const [bankDSwitch, setBankDSwitch] = useState(false);

  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Select Payslip Template</h5>
        <Switch
          checked={bankDSwitch}
          onChange={(value) => {
            setBankDSwitch(value);
          }}
        />
      </div>
      <p className="text-sm pt-2">
        This is will be the payslip template that will be used to create
        payslips
      </p>

      {bankDSwitch && (
        <div>
          <div className="flex flex-col gap-4 mt-5">
            <FormPayslipTemplateInput
              Form={Form}
              control={{ name: "templateId", label: "" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectPayslipTemplate;
