import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";

import { SetUpPayrollForm } from "./SetUpPayrollForm";
import { TDirectSalaryPayrollScheme } from "features/payroll/types/payrollSchemes/directSalary";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";

export const SetUpDirectSalaryPayrollContainer = () => {
  const { data: payrollScheme, isFetching } = useGetPayrollSchemeByTypeOrId({
    typeOrId: "direct-salary",
  });
  const scheme = payrollScheme as TDirectSalaryPayrollScheme;
  const { baseCurrency, loading } = useGetCompanyBaseCurrency();
  return (
    <>
      <SetUpPayrollForm
        name="Direct Salary Payroll Scheme"
        frequency={scheme?.frequency}
        type="direct-salary"
        scheme={scheme}
        isFetching={isFetching || loading}
        baseCurrency={baseCurrency}
        description={`Set up  payroll based on the gross pay assigned to employees`}
      />
    </>
  );
};
