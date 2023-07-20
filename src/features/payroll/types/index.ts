import { TCostCentre } from "./costCentres";
import { TExchangeRateListItem } from "./exchangeRateList";
import { TPayGradeCategory } from "./payGradeCategories";
import { TPayGrade } from "./payGrades";

export {
  type TPayGrade,
  type TPayGradeCategory,
  type TExchangeRateListItem,
  type TCostCentre,
};

type TfakeSalaryComponent = {
  name: string;
  identifier: string;
  formula: string;
  dependencies: string[];
  monthsApplicableTo?: string[];
  type?: "allowance" | "deduction" | "placeholder"; //needs to be cumpolsory(or default to placeholder) taxable income will probably be the only comp that takes the placeholder type
  rateOfCalculation?: "monthly" | "hourly"; // this will default to the frequency of scheme, overtime will have this set to 'hourly', so that
};

type TPayrollSchemeSetting = {
  components: TfakeSalaryComponent;
  overtimeSetting: {
    active: boolean;
    hourlyRateFormula: string | number;
  };
  approvalSetting: {
    active: boolean;
    workflowId: number;
  };
  leaveAllowance: {
    active: boolean;
    component_identifier: string;
  };
  thirteenthMonth: {
    active: boolean;
    component_identifier: string;
  };
  tax: {
    active: boolean;

    component_identifier: string; // tax_component = a component created using a pre-choosen tax_policy && taxable_income if need
  };

  //   and the rest ....
};
