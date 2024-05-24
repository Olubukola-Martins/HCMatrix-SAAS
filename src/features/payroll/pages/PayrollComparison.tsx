import React, { useState } from "react";
import PayrollSubNav from "../components/PayrollSubNav";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { Select } from "antd";
import { useSearchParams } from "react-router-dom";
import {
  PayrollComparisonPerSelection,
  PayrollComparisonPerEmployee,
  PayrollComparisonPerTotal,
} from "../components/payrollComparism/perViews";
import { TPayrollComaparisonType } from "../hooks/payroll/comparison/useComparePayroll";

const PAYROLL_COMPARISON_VIEWS = [
  "View per Employee",
  "View per Total",
  "View per Selection",
];
const PayrollComparison: React.FC = () => {
  const [view, setView] =
    useState<(typeof PAYROLL_COMPARISON_VIEWS)[number]>("View per Employee");
  // get the selected, against, type, payrollId from query params
  const [searchParams] = useSearchParams();
  const selected = searchParams.get("selected") ?? "";
  const against = searchParams.get("against") ?? "";
  const type = searchParams.get("type") ?? "";
  const payrollId = searchParams.get("payrollId") ?? "";
  return (
    <>
      <PayrollSubNav />
      <div className="Container flex flex-col gap-2">
        <PageIntro title="Payroll Comparison" link={appRoutes.payrollHome} />
        <div
          className={`flex flex-col mt-5 gap-2 md:flex-row md:justify-between md:items-center  p-2 rounded text-sm `}
        >
          <span>{`Compare two different payroll data`}</span>
          <Select
            value={view}
            onSelect={setView}
            options={PAYROLL_COMPARISON_VIEWS.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </div>

        {view === "View per Selection" && <PayrollComparisonPerSelection />}
        {view === "View per Employee" && (
          <PayrollComparisonPerEmployee
            {...{
              selected: selected as string,
              against: against as string,
              type: type as TPayrollComaparisonType,
              payrollId: payrollId as unknown as number,
            }}
          />
        )}
        {view === "View per Total" && (
          <PayrollComparisonPerTotal
            {...{
              selected: selected as string,
              against: against as string,
              type: type as TPayrollComaparisonType,
              payrollId: payrollId as unknown as number,
            }}
          />
        )}
      </div>
    </>
  );
};

export default PayrollComparison;
