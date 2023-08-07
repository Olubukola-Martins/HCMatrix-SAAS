import React, { useState } from "react";
import { DatePicker, Select } from "antd";
import EmployeePayslipsTable from "./EmployeePayslipsTable";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import { useGetPayrollSchemes } from "features/payroll/hooks/scheme/useGetPayrollSchemes";
import { useGetAllPayrollsByScheme } from "features/payroll/hooks/payroll/useGetAllPayrollsByScheme";

export const EmployeePayslipsContainer = () => {
  //   const [comp, setComp] = useState<"add-category" | "add-grade">();
  // const [scheme, setScheme] = useState<TPayrollSchemeType>();
  const [selectedScheme, setSelectedScheme] = useState<TPayrollSchemeType>();
  const { data: schemeData, isFetching: schemeFetching } =
    useGetPayrollSchemes();

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-end">
          <div className="flex gap-2">
            <Select
              options={schemeData?.data.map((item) => ({
                label: (
                  <span className="capitalize">
                    {" "}
                    {item.type} ({item.frequency})
                  </span>
                ),
                value: item.type,
              }))}
              value={selectedScheme}
              loading={schemeFetching}
              onSelect={(val: TPayrollSchemeType) => {
                setSelectedScheme(val);
              }}
              allowClear
              onClear={() => {
                setSelectedScheme(undefined);
              }}
              placeholder="Select Scheme"
            />
            <DatePicker picker={"date"} placeholder="Select a date" />
          </div>
        </div>
        <EmployeePayslipsTable />
      </div>
    </>
  );
};
