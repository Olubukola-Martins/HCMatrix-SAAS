import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";

import { SetUpPayrollForm } from "./SetUpPayrollForm";
import { TSingleProjectPayrollScheme } from "features/payroll/types/payrollSchemes/singleProject";
import { TSingleProject } from "features/core/projects/types";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";

export const SetUpSingleProjectPayrollContainer: React.FC<{
  schemeId?: number;
  project?: TSingleProject;
}> = ({ schemeId, project }) => {
  const { data: payrollScheme, isFetching } = useGetPayrollSchemeByTypeOrId({
    typeOrId: schemeId,
  });
  const scheme = payrollScheme as TSingleProjectPayrollScheme;
  const { baseCurrency, loading } = useGetCompanyBaseCurrency();
  return (
    <>
      <SetUpPayrollForm
        name="Project Payroll Scheme"
        frequency={+scheme?.frequency}
        type="project"
        project={project}
        scheme={scheme}
        isFetching={isFetching || loading}
        baseCurrency={baseCurrency}
      />
    </>
  );
};
