import React, { useEffect, useState } from "react";
import { DatePicker, Select } from "antd";
import EmployeePayslipsTable from "./EmployeePayslipsTable";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import { PAYROLL_SCHEME_OPTIONS } from "features/payroll/constants";
import { TSingleProjectPayrollScheme } from "features/payroll/types/payrollSchemes/singleProject";
import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";
import { TProjectPayrollScheme } from "features/payroll/types/payrollSchemes/project";

export const EmployeePayslipsContainer = () => {
  //   const [comp, setComp] = useState<"add-category" | "add-grade">();
  // const [scheme, setScheme] = useState<TPayrollSchemeType>();
  const [selectedScheme, setSelectedScheme] = useState<TPayrollSchemeType>();
  const [projects, setProjects] = useState<TProjectPayrollScheme>([]);
  const { data: payrollScheme, isLoading } = useGetPayrollSchemeByTypeOrId({
    typeOrId: selectedScheme,
  });
  useEffect(() => {
    if (
      selectedScheme === "project" &&
      Array.isArray(payrollScheme) &&
      payrollScheme.length > 0 &&
      (payrollScheme as TProjectPayrollScheme)?.every(
        (item) => item.type === "project"
      )
    ) {
      //TODO: set to project schemes
      setProjects(payrollScheme as TProjectPayrollScheme);
    }
  }, [payrollScheme, selectedScheme]);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-end">
          <div className="flex gap-2">
            <Select
              options={PAYROLL_SCHEME_OPTIONS.map((item) => ({
                ...item,
                label: <span className="capitalize">{item.label}</span>,
              }))}
              value={selectedScheme}
              onSelect={(val: TPayrollSchemeType) => {
                setSelectedScheme(val);
              }}
              allowClear
              onClear={() => {
                setSelectedScheme(undefined);
              }}
              placeholder="Select Scheme"
            />
            {selectedScheme === "project" && (
              <Select
                loading={isLoading}
                placeholder="Select Project"
                options={projects.map((item) => ({
                  label: <span className="capitalize">{item.name}</span>,
                  value: item.id,
                }))}
              />
            )}
            <DatePicker.RangePicker
              picker={"date"}
              placeholder={["From", "To"]}
            />
          </div>
        </div>
        <EmployeePayslipsTable />
      </div>
    </>
  );
};
