import React, { useState } from "react";

import { Pagination } from "antd";
import { usePagination } from "hooks/usePagination";

import { AppButton } from "components/button/AppButton";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import AddProject from "features/core/projects/components/AddProject";

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

type TProject = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};
const DUMMY_PROJECTS: TProject[] = [
  {
    id: 1,
    name: "HcMatrix v3",
    createdAt: "Not needed",
    updatedAt: "Not Needed",
  },
  {
    id: 2,
    name: "Bi Collaboration",
    createdAt: "03/07/2020",
    updatedAt: "03/07/2020",
  },
  {
    id: 3,
    name: "Marketing Optimization",
    createdAt: "03/07/2020",
    updatedAt: "03/07/2020",
  },
  {
    id: 4,
    name: "Artificial Intelligence Integration",
    createdAt: "03/07/2020",
    updatedAt: "03/07/2020",
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
const PayrollSchemeCard: React.FC<TProject> = ({
  name,
  createdAt,
  updatedAt,
  id,
}) => {
  return (
    <>
      {/* view */}
      <div className="rounded border shadow bg-mainBg">
        <div className="bg-card p-3 flex justify-between items-center">
          <h4 className="font-medium text-lg">{name}</h4>
          <div className="flex gap-2 ">
            <Link to={appRoutes.setupSingleProjectPayrollScheme(id).path}>
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
