import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";

import { SetUpPayrollForm } from "./SetUpPayrollForm";
import { TSingleWagePayrollScheme } from "features/payroll/types/payrollSchemes/singleWage";

export const SetUpDailyWagesPayrollContainer: React.FC<{
  schemeId?: number;
}> = ({ schemeId }) => {
  const { data: payrollScheme, isFetching } = useGetPayrollSchemeByTypeOrId({
    typeOrId: schemeId,
  });
  const scheme = payrollScheme as TSingleWagePayrollScheme;
  return (
    <>
      <SetUpPayrollForm
        name="Daily Wages Payroll Scheme"
        frequency="daily"
        type="wages"
        scheme={scheme}
        isFetching={isFetching}
      />
    </>
  );
};
