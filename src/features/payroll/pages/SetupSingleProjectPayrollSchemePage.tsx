import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { SetUpSingleProjectPayrollContainer } from "../components/payrollSchemes/SetUpSingleProjectPayrollContainer";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";
import { useGetSingleProject } from "features/core/projects/hooks/useGetSingleProject";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";

const SetupSingleProjectPayrollSchemePage = () => {
  const params = useParams();
  const schemeId = params.schemeId;
  const projectId = params.projectId;
  const {
    data: project,
    isFetching,
    isError,
  } = useGetSingleProject({
    id: projectId ? +projectId : undefined,
  });
  return (
    <>
      <PayrollSubNav />
      <Skeleton active loading={isFetching} paragraph={{ rows: 12 }}>
        <ErrorWrapper
          isError={isError}
          backLink={appRoutes.setupProjectPayrollScheme}
          message="Project Payroll Scheme not found!"
        >
          <>
            <div className="Container">
              <PageIntro
                title={`${project?.name} Project Payroll Setup`}
                link={appRoutes.setupProjectPayrollScheme}
              />
              <SetUpSingleProjectPayrollContainer
                schemeId={schemeId ? +schemeId : undefined}
                project={project ? project : undefined}
              />
            </div>
          </>
        </ErrorWrapper>
      </Skeleton>
    </>
  );
};

export default SetupSingleProjectPayrollSchemePage;
