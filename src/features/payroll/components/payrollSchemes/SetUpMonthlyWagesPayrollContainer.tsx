import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";

import { SetUpPayrollForm } from "./SetUpPayrollForm";
import { TSingleWagePayrollScheme } from "features/payroll/types/payrollSchemes/singleWage";

export const SetUpMonthlyWagesPayrollContainer: React.FC<{
  schemeId?: number;
}> = ({ schemeId }) => {
  const { data: payrollScheme, isFetching } = useGetPayrollSchemeByTypeOrId({
    typeOrId: schemeId,
  });
  const scheme = payrollScheme as TSingleWagePayrollScheme;
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
