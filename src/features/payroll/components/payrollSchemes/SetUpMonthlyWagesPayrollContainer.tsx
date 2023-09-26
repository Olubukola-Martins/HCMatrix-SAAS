import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";

import { SetUpPayrollForm } from "./SetUpPayrollForm";
import { TSingleWagePayrollScheme } from "features/payroll/types/payrollSchemes/singleWage";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";

export const SetUpMonthlyWagesPayrollContainer: React.FC<{
  schemeId?: number;
}> = ({ schemeId }) => {
  const { data: payrollScheme, isFetching } = useGetPayrollSchemeByTypeOrId({
    typeOrId: schemeId,
  });
  const scheme = payrollScheme as TSingleWagePayrollScheme;
  const { baseCurrency, loading } = useGetCompanyBaseCurrency();
  return (
    <>
      <SetUpPayrollForm
        name="Monthly Wages Payroll Scheme"
        frequency={"monthly"}
        type="wages"
        scheme={scheme}
        isFetching={isFetching || loading}
        baseCurrency={baseCurrency?.currency}
        description={`Set up monthly payroll based on the hourly rate assigned to employees`}
      />
    </>
  );
};
