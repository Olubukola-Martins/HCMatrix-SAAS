import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";

import { SetUpPayrollForm } from "./SetUpPayrollForm";
import { TDirectSalaryPayrollScheme } from "features/payroll/types/payrollSchemes/directSalary";

export const SetUpDirectSalaryPayrollContainer = () => {
  const { data: payrollScheme, isFetching } = useGetPayrollSchemeByTypeOrId({
    typeOrId: "direct-salary",
  });
  const scheme = payrollScheme as TDirectSalaryPayrollScheme;
  return (
    <>
      <SetUpPayrollForm
        name="Direct Salary Payroll Scheme"
        frequency="monthly"
        type="direct-salary"
        scheme={scheme}
        isFetching={isFetching}
      />
    </>
  );
};
