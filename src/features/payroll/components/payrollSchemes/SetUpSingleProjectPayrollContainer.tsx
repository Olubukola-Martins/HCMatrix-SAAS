import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";

import { SetUpPayrollForm } from "./SetUpPayrollForm";
import { TSingleProjectPayrollScheme } from "features/payroll/types/payrollSchemes/singleProject";

export const SetUpSingleProjectPayrollContainer: React.FC<{
  schemeId?: number;
  projectId?: number;
}> = ({ schemeId, projectId }) => {
  const { data: payrollScheme, isFetching } = useGetPayrollSchemeByTypeOrId({
    typeOrId: schemeId,
  });
  const scheme = payrollScheme as TSingleProjectPayrollScheme;
  return (
    <>
      <SetUpPayrollForm
        name="Project Payroll Scheme"
        frequency={0}
        type="project"
        projectId={projectId}
        scheme={scheme}
        isFetching={isFetching}
      />
    </>
  );
};
