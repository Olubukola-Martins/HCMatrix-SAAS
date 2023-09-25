import { Form } from "antd";
import { FormCostCentreInput } from "features/payroll/components/costCentres/FormCostCentreInput";
import React from "react";
import { boxStyle, boxTitle } from "styles/reused";

const SelectLoanCostCentre: React.FC<{
  Form: any;
}> = ({ Form }) => {
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Select Cost Centre</h5>
      </div>
      <p className="text-sm pt-2">
        This is the cost centre that loans repayments will be paid into
      </p>

      <div>
        <FormCostCentreInput
          Form={Form}
          control={{ name: "costCentreId", label: "" }}
        />
      </div>
    </div>
  );
};

export default SelectLoanCostCentre;
