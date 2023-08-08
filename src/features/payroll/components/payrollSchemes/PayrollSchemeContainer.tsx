import React, { useEffect, useState } from "react";

import { Pagination, Skeleton } from "antd";
import { usePagination } from "hooks/usePagination";

import { AppButton } from "components/button/AppButton";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { useGetPayrollSchemes } from "features/payroll/hooks/scheme/useGetPayrollSchemes";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import moment from "moment";

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
  type: TPayrollSchemeType;
  createdAt?: string;
  updatedAt?: string;
  projectCount?: number;
  setUpLink: string;
};
const PAYROLL_SCHEMES: TScheme[] = [
  {
    name: "Office/Grade Payroll",
    type: "office",

    setUpLink: appRoutes.setupGradePayrollScheme,
  },
  {
    name: "Direct Salary Payroll",
    type: "direct-salary",

    setUpLink: appRoutes.setupDirectSalaryPayrollScheme,
  },
  {
    name: "Timesheet/Wages Payroll",
    type: "wages",

    setUpLink: appRoutes.setupWagesPayrollScheme,
  },
  {
    name: "Project/Contract Payroll",
    type: "project",

    setUpLink: appRoutes.setupProjectPayrollScheme,
  },
];
const PayrollSchemeCardList = () => {
  const { pagination, onChange } = usePagination();
  const { data, isLoading, isSuccess } = useGetPayrollSchemes();
  const [schemes, setSchemes] = useState<TScheme[]>(PAYROLL_SCHEMES);
  useEffect(() => {
    // TODO: Replicate this logic for requisition settings
    if (data && isSuccess) {
      setSchemes((prevSchemes) => {
        const parsedSchemes = prevSchemes.map((scheme) => {
          const schemeFoundInFetchedData = data.data.find(
            (val) => val.type === scheme.type
          );
          if (schemeFoundInFetchedData) {
            const modifiedScheme: TScheme = {
              ...scheme,
              name: schemeFoundInFetchedData.name,
              createdAt: moment(schemeFoundInFetchedData.createdAt).format(
                "DD-MM-YYYY"
              ),
              updatedAt: moment(schemeFoundInFetchedData.updatedAt).format(
                "DD-MM-YYYY"
              ),
              projectCount:
                scheme.type === "project"
                  ? data.data.filter((item) => item.type === "project").length
                  : undefined,
            };
            return modifiedScheme;
          }
          return scheme;
        });
        let currentSchemes: TScheme[][] = [];
        // group schemes by type
        const directSalarySchemes: TScheme[] = parsedSchemes.filter(
          (scheme) => scheme.type === "direct-salary"
        );
        const officeSalarySchemes: TScheme[] = parsedSchemes.filter(
          (scheme) => scheme.type === "office"
        );
        const wagesSalarySchemes: TScheme[] = parsedSchemes.filter(
          (scheme) => scheme.type === "wages"
        );
        const projectSalarySchemes: TScheme[] = parsedSchemes.filter(
          (scheme) => scheme.type === "project"
        );
        currentSchemes = [
          officeSalarySchemes,
          directSalarySchemes,
          wagesSalarySchemes,
          projectSalarySchemes,
        ];
        return currentSchemes.map((schemeGroup) => {
          const schemeFoundInFetchedData = data.data.find(
            (val) => val.type === schemeGroup[0].type
          );
          if (schemeFoundInFetchedData) {
            let name = schemeFoundInFetchedData.name;
            if (schemeFoundInFetchedData.type === "wages") {
              name = "Timesheet/Wages Payroll";
            }
            if (schemeFoundInFetchedData.type === "project") {
              name = "Project/Contract Payroll";
            }
            const modifiedScheme: TScheme = {
              ...schemeGroup[0],
              name,
              createdAt: moment(schemeFoundInFetchedData.createdAt).format(
                "DD-MM-YYYY"
              ),
              updatedAt: moment(schemeFoundInFetchedData.updatedAt).format(
                "DD-MM-YYYY"
              ),
              projectCount:
                schemeGroup[0].type === "project"
                  ? data.data.filter((item) => item.type === "project").length
                  : undefined,
            };
            return modifiedScheme;
          }
          return schemeGroup[0];
        });
      });
    }
  }, [data, isSuccess]);

  return (
    <Skeleton loading={isLoading} active paragraph={{ rows: 8 }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-10 gap-y-10">
        {schemes.map((item, i) => (
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
    </Skeleton>
  );
};
const PayrollSchemeCard: React.FC<TScheme> = ({
  name,
  createdAt = "Pending",
  updatedAt = "Pending",
  setUpLink,
  projectCount,
}) => {
  const btnLabel =
    createdAt === "Pending" ? "Set Up Payroll" : "Modify Payroll";
  const btnVariant = createdAt === "Pending" ? "transparent" : "default";
  return (
    <>
      {/* view */}
      <div className="rounded border shadow bg-mainBg">
        <div className="bg-card p-3 flex justify-between items-center">
          <h4 className="font-medium text-lg">{name}</h4>
          <div className="flex gap-2 ">
            <Link to={setUpLink}>
              <AppButton label={btnLabel} variant={btnVariant} />
            </Link>
          </div>
        </div>
        <div className="px-3">
          <div className="border-b flex gap-5 text-sm">
            <div className="py-7">
              {projectCount && (
                <p className="pb-2">
                  No of Payroll projects set up: {projectCount}
                </p>
              )}
              <p className="pb-2">Date Created: {createdAt}</p>
              <p>Last Modified: {updatedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
