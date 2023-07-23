import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";

import { SetUpPayrollForm } from "./SetUpPayrollForm";
import { TDirectSalaryPayrollScheme } from "features/payroll/types/payrollSchemes/directSalary";

export const SetUpSingleProjectPayrollContainer = () => {
  const { data: payrollScheme, isFetching } = useGetPayrollSchemeByTypeOrId({
    typeOrId: "wages",
  });
  const scheme = payrollScheme as TDirectSalaryPayrollScheme;
  return (
    <>
      <SetUpPayrollForm
        name="Monthly Wages Payroll Scheme"
        frequency="monthly"
        type="wages"
        scheme={scheme}
        isFetching={isFetching}
      />
    </>
  );
};
