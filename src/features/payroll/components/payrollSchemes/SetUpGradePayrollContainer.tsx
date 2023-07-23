import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";

import { TOfficePayrollScheme } from "features/payroll/types/payrollSchemes/office";
import { SetUpPayrollForm } from "./SetUpPayrollForm";

export const SetUpGradePayrollContainer = () => {
  const { data: payrollScheme, isFetching } = useGetPayrollSchemeByTypeOrId({
    typeOrId: "office",
  });
  const scheme = payrollScheme as TOfficePayrollScheme;
  return (
    <>
      <SetUpPayrollForm
        name="Office Payroll Scheme"
        frequency="monthly"
        type="office"
        scheme={scheme}
        isFetching={isFetching}
      />
    </>
  );
};
