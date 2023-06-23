import React from "react";

import { Pagination } from "antd";
import { usePagination } from "hooks/usePagination";

import { AppButton } from "components/button/AppButton";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";

export const PayrollSchemeContainer = () => {
  return (
    <>
      <div className="flex flex-col gap-8">
        <PageSubHeader description={`Set up different payroll schemes`} />

        <PayrollSchemeCardList />
      </div>
    </>
  );
};

type TScheme = {
  name: string;
  createdAt: string;
  updatedAt: string;
  setUpLink: string;
};
const PAYROLL_SCHEMES: TScheme[] = [
  {
    name: "Office/Grade Payroll",
    createdAt: "Not needed",
    updatedAt: "Not Needed",
    setUpLink: appRoutes.setupGradePayrollScheme,
  },
  {
    name: "Direct Salary Payroll",
    createdAt: "03/07/2020",
    updatedAt: "03/07/2020",
    setUpLink: "",
  },
  {
    name: "Timesheet/Wages Payroll",
    createdAt: "03/07/2020",
    updatedAt: "03/07/2020",
    setUpLink: "",
  },
  {
    name: "Project Payroll",
    createdAt: "03/07/2020",
    updatedAt: "03/07/2020",
    setUpLink: "",
  },
];
const PayrollSchemeCardList = () => {
  const { pagination, onChange } = usePagination();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-10 gap-y-10">
        {PAYROLL_SCHEMES.map((item, i) => (
          <PayrollSchemeCard key={i} {...item} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination
          {...{ ...pagination, total: PAYROLL_SCHEMES.length }}
          onChange={onChange}
          size="small"
        />
      </div>
    </div>
  );
};
const PayrollSchemeCard: React.FC<TScheme> = ({
  name,
  createdAt,
  updatedAt,
  setUpLink,
}) => {
  return (
    <>
      {/* view */}
      <div className="rounded border shadow bg-mainBg">
        <div className="bg-card p-3 flex justify-between items-center">
          <h4 className="font-medium text-lg">{name}</h4>
          <div className="flex gap-2 ">
            <Link to={setUpLink}>
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
