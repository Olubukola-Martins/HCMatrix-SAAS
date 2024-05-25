import React, { useState } from "react";
import PayrollSubNav from "../components/PayrollSubNav";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { Button, Select } from "antd";
import { useSearchParams } from "react-router-dom";
import {
  PayrollComparisonPerSelection,
  PayrollComparisonPerEmployee,
  PayrollComparisonPerTotal,
} from "../components/payrollComparism/perViews";
import { TPayrollComaparisonType } from "../hooks/payroll/comparison/useComparePayroll";
import { TbFileExport } from "react-icons/tb";

const PAYROLL_COMPARISON_VIEWS = [
  "View per Employee",
  "View per Total",
  // "View per Selection", //Done bcos design didn't specify the need for this, this feature was added at the discretion of the developer(and still needs a bit of tweaking)
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
          <div className="flex items-center gap-x-4">
            <Button icon={<TbFileExport className="text-2xl" />} type="text" />
            <Select
              value={view}
              onSelect={setView}
              options={PAYROLL_COMPARISON_VIEWS.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </div>
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
