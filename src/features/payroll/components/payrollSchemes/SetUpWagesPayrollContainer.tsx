import React, { useState } from "react";

import { Pagination } from "antd";
import { usePagination } from "hooks/usePagination";

import { AppButton } from "components/button/AppButton";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import AddProject from "features/core/projects/components/AddProject";

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

type TWagePayrollSetup = {
  id: number;
  name: string;
  description: string;
  link: string;
};
const DUMMY_PROJECTS: TWagePayrollSetup[] = [
  {
    id: 1,
    name: "Daily",
    link: appRoutes.setupDailyWagesPayrollScheme,
    description:
      "This will calculate payroll based on the amount of hours of work an employee puts in daily",
  },
  {
    id: 2,
    name: "Monthly",
    link: appRoutes.setupMonthlyWagesPayrollScheme,
    description:
      "This will calculate payroll based on the amount of hours of work an employee puts in monthly",
  },
];
const PayrollSchemeCardList = () => {
  const { pagination, onChange } = usePagination();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-10 gap-y-10">
        {DUMMY_PROJECTS.map((item, i) => (
          <PayrollSchemeCard key={i} {...item} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination
          {...{ ...pagination, total: DUMMY_PROJECTS.length }}
          onChange={onChange}
          size="small"
        />
      </div>
    </div>
  );
};
const PayrollSchemeCard: React.FC<TWagePayrollSetup> = ({
  name,
  description,
  link,
  id,
}) => {
  return (
    <>
      {/* view */}
      <div className="rounded border shadow bg-mainBg">
        <div className="bg-card p-3 flex justify-between items-center">
          <h4 className="font-medium text-lg">{name}</h4>
          <div className="flex gap-2 ">
            <Link to={link}>
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
