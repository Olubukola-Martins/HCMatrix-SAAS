import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";

import { TOfficePayrollScheme } from "features/payroll/types/payrollSchemes/office";
import { SetUpPayrollForm } from "./SetUpPayrollForm";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";

export const SetUpGradePayrollContainer = () => {
  const { data: payrollScheme, isFetching } = useGetPayrollSchemeByTypeOrId({
    typeOrId: "office",
  });
  const scheme = payrollScheme as TOfficePayrollScheme;
  const { baseCurrency, loading } = useGetCompanyBaseCurrency();
  return (
    <>
      <SetUpPayrollForm
        name="Office Payroll Scheme"
        frequency={scheme?.frequency}
        type="office"
        scheme={scheme}
        isFetching={isFetching || loading}
        baseCurrency={baseCurrency?.currency}
        description={`Set up  payroll based on the pay grade assigned to employees`}
      />
    </>
  );
};
