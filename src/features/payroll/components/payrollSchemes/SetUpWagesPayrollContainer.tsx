import React, { useEffect, useState } from "react";

import { Pagination, Skeleton } from "antd";
import { usePagination } from "hooks/usePagination";

import { AppButton } from "components/button/AppButton";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import AddProject from "features/core/projects/components/AddProject";
import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";
import { TWagesPayrollScheme } from "features/payroll/types/payrollSchemes/wages";

export const SetUpWagesPayrollContainer = () => {
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
  id?: number;
  frequency: "daily" | "monthly";

  description: string;
  link: string;
};
const WAGE_PAYROLL_SCHEMES: TScheme[] = [
  {
    frequency: "daily",
    link: appRoutes.setupDailyWagesPayrollScheme,
    description:
      "This will calculate payroll based on the amount of hours of work an employee puts in daily",
  },
  {
    frequency: "monthly",
    link: appRoutes.setupMonthlyWagesPayrollScheme,
    description:
      "This will calculate payroll based on the amount of hours of work an employee puts in monthly",
  },
];
const PayrollSchemeCardList = () => {
  const { pagination, onChange } = usePagination();
  const {
    data: payrollScheme,
    isLoading,
    isSuccess,
  } = useGetPayrollSchemeByTypeOrId({
    typeOrId: "wages",
  });
  const fetchedWageSchemes = payrollScheme
    ? (payrollScheme as TWagesPayrollScheme)
    : undefined;
  const [schemes, setSchemes] = useState<TScheme[]>(WAGE_PAYROLL_SCHEMES);
  useEffect(() => {
    // TODO: Replicate this logic for requisition settings
    if (
      Array.isArray(fetchedWageSchemes) &&
      fetchedWageSchemes?.length > 0 &&
      isSuccess
    ) {
      setSchemes((prevSchemes) => {
        return prevSchemes.map((scheme) => {
          const schemeFoundInFetchedData = fetchedWageSchemes.find(
            (val) => val.frequency === scheme.frequency
          );
          if (schemeFoundInFetchedData) {
            const modifiedScheme: TScheme = {
              ...scheme,
              id: schemeFoundInFetchedData.id,
            };
            return modifiedScheme;
          }
          return scheme;
        });
      });
    }
  }, [fetchedWageSchemes, isSuccess]);
  return (
    <Skeleton loading={isLoading} active paragraph={{ rows: 8 }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-10 gap-y-10">
        {schemes.map((item, i) => (
          <PayrollSchemeCard key={i} {...item} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination
          {...{ ...pagination, total: schemes.length }}
          onChange={onChange}
          size="small"
        />
      </div>
    </Skeleton>
  );
};
const PayrollSchemeCard: React.FC<TScheme> = ({
  frequency,
  description,
  link,
  id,
}) => {
  return (
    <>
      {/* view */}
      <div className="rounded border shadow bg-mainBg">
        <div className="bg-card p-3 flex justify-between items-center">
          <h4 className="font-medium text-lg capitalize">{frequency}</h4>
          <div className="flex gap-2 ">
            <Link
              to={
                id
                  ? appRoutes.setupWagesPayrollSchemeById({ frequency, id })
                      .path
                  : link
              }
            >
              <AppButton label="Set up Payroll" variant="transparent" />
            </Link>
          </div>
        </div>
        <div className="px-3">
          <div className="border-b flex gap-5 text-sm">
            <div className="py-7">
              <p className="pb-2">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
