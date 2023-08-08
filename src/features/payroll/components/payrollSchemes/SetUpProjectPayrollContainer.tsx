import React, { useEffect, useState } from "react";

import { Empty, Pagination, Skeleton } from "antd";
import { usePagination } from "hooks/usePagination";

import { AppButton } from "components/button/AppButton";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import AddProject from "features/core/projects/components/AddProject";
import { useGetProjects } from "features/core/projects/hooks/useGetProjects";
import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";
import { TProjectPayrollScheme } from "features/payroll/types/payrollSchemes/project";
import moment from "moment";

const SetUpProjectPayrollContainer = () => {
  const [showM, setShowM] = useState(false);
  return (
    <>
      <AddProject open={showM} handleClose={() => setShowM(false)} />
      <div className="flex flex-col gap-8">
        <PageSubHeader
          description={`Set up payroll for projects`}
          actions={[{ handleClick: () => setShowM(true), name: `Add Project` }]}
          hideBackground
        />

        <PayrollSchemeCardList />
      </div>
    </>
  );
};

type TScheme = {
  projectId: number;
  schemeId?: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const PayrollSchemeCardList = () => {
  const { pagination, onChange } = usePagination({ pageSize: 4 });
  const {
    data: projects,
    isSuccess: isSuccessProjects,
    isFetching: isFetchingProjects,
  } = useGetProjects({
    pagination,
    status: "active",
  });
  const {
    data: payrollScheme,
    isFetching: isFecthingScheme,
    isSuccess: isSuccessScheme,
  } = useGetPayrollSchemeByTypeOrId({
    typeOrId: "project",
  });
  const fetchedProjectSchemes = payrollScheme
    ? (payrollScheme as TProjectPayrollScheme)
    : undefined;
  const [schemes, setSchemes] = useState<TScheme[]>([]);
  useEffect(() => {
    if (
      isSuccessProjects &&
      projects &&
      isSuccessScheme &&
      Array.isArray(fetchedProjectSchemes)
    ) {
      setSchemes(() => {
        return projects.data.map((project) => {
          const schemeFoundInFetchedData = fetchedProjectSchemes.find(
            (val) => val.projectId === project.id
          );
          if (schemeFoundInFetchedData) {
            const modifiedScheme: TScheme = {
              projectId: schemeFoundInFetchedData.projectId,
              schemeId: schemeFoundInFetchedData.id,
              name: project.name,
              createdAt: moment(schemeFoundInFetchedData.createdAt).format(
                "YYYY-MM-DD"
              ),
              updatedAt: moment(schemeFoundInFetchedData.updatedAt).format(
                "YYYY-MM-DD"
              ),
            };
            return modifiedScheme;
          }
          return {
            projectId: project.id,
            name: project.name,
            createdAt: "Pending",
            updatedAt: "Pending",
          };
        });
      });
    }
  }, [fetchedProjectSchemes, isSuccessProjects, isSuccessScheme, projects]);

  return (
    <Skeleton
      loading={isFecthingScheme || isFetchingProjects}
      active
      paragraph={{ rows: 8 }}
    >
      <>
        {schemes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-10 gap-y-10">
              {schemes.map((item, i) => (
                <PayrollSchemeCard key={i} {...item} />
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Pagination
                {...{ ...pagination, total: projects?.total }}
                onChange={onChange}
                size="small"
              />
            </div>
          </>
        ) : (
          <Empty description="No active projects available" />
        )}
      </>
    </Skeleton>
  );
};
const PayrollSchemeCard: React.FC<TScheme> = ({
  name,
  createdAt,
  updatedAt,
  projectId,
  schemeId,
}) => {
  return (
    <>
      {/* view */}
      <div className="rounded border shadow bg-mainBg">
        <div className="bg-card p-3 flex justify-between items-center">
          <h4 className="font-medium text-lg">{name}</h4>
          <div className="flex gap-2 ">
            <Link
              to={
                appRoutes.setupSingleProjectPayrollScheme({
                  projectId,
                  schemeId,
                }).path
              }
            >
              <AppButton label="Set up Payroll" variant="transparent" />
            </Link>
          </div>
        </div>
        <div className="px-3">
          <div className="border-b flex gap-5 text-sm">
            <div className="py-7">
              <p className="pb-2">Date Created: {createdAt}</p>
              <p>Last Modified: {updatedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SetUpProjectPayrollContainer;
