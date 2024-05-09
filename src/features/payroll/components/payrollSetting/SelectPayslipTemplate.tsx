import React from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { FormPayslipTemplateInput } from "../payslips/templates/FormPayslipTemplateInput";
import { Form } from "antd";

const SelectPayslipTemplate: React.FC<{
  Form: typeof Form;
}> = ({ Form }) => {
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Default Payslip Template</h5>
      </div>
      <p className="text-sm pt-2">
        This is will be the payslip template that will be used to create
        payslips
      </p>

      <div>
        <div className="flex flex-col gap-4 mt-5">
          <FormPayslipTemplateInput
            Form={Form}
            control={{ name: "templateId", label: "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPayslipTemplate;
