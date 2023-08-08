import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";

import { SetUpPayrollForm } from "./SetUpPayrollForm";
import { TSingleWagePayrollScheme } from "features/payroll/types/payrollSchemes/singleWage";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";

export const SetUpDailyWagesPayrollContainer: React.FC<{
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
        name="Daily Wages Payroll Scheme"
        frequency={"daily"}
        type="wages"
        scheme={scheme}
        isFetching={isFetching || loading}
        baseCurrency={baseCurrency}
        description={`Set up daily payroll based on the hourly rate assigned to employees`}
      />
    </>
  );
};
