import React, { useEffect, useState } from "react";
import { DatePicker, Select } from "antd";
import PayslipsTable from "./PayslipsTable";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import { PAYROLL_SCHEME_OPTIONS } from "features/payroll/constants";
import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";
import { TProjectPayrollScheme } from "features/payroll/types/payrollSchemes/project";
import { TGetPayslipsProps } from "features/payroll/hooks/payslips/useGetPayslips";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import moment from "moment";
import dayjs from "dayjs";

interface IProps {
  role: TGetPayslipsProps["role"];
  defaultScheme?: TPayrollSchemeType;
}

// helper fns
const generateScheme = (
  scheme?: TPayrollSchemeType,
  projectId?: number
): TGetPayslipsProps["scheme"] => {
  let data: TGetPayslipsProps["scheme"] = "office";
  if (projectId && scheme === "project") {
    data = { scheme: scheme, projectId };
  }
  if (scheme && scheme !== "project") {
    data = scheme;
  }
  return data;
};
export const PayslipsContainer: React.FC<IProps> = ({
  role,
  defaultScheme,
}) => {
  //   const [comp, setComp] = useState<"add-category" | "add-grade">();
  // const [scheme, setScheme] = useState<TPayrollSchemeType>();
  const [selectedScheme, setSelectedScheme] = useState<
    TPayrollSchemeType | undefined
  >(defaultScheme);
  const [projects, setProjects] = useState<TProjectPayrollScheme>([]);
  const [projectId, setProjectId] = useState<number>();
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

  const [duration, setDuration] = useState<[string, string]>([
    moment().subtract(25, "days").format("YYYY-MM-DD"),
    moment().add(25, "days").format("YYYY-MM-DD"),
  ]);

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
              placeholder="Select Scheme"
            />
            {selectedScheme === "project" && (
              <Select
                onSelect={(id: number) => setProjectId(id)}
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
              value={[dayjs(duration[0]), dayjs(duration[1])]}
              onChange={(val) => {
                if (val && val.length === 2 && val[0] && val[1])
                  setDuration([
                    val[0].format(DEFAULT_DATE_FORMAT),
                    val[1].format(DEFAULT_DATE_FORMAT),
                  ]);
              }}
            />
          </div>
        </div>
        <PayslipsTable
          role={role}
          scheme={generateScheme(selectedScheme, projectId)}
          fromDate={duration ? duration[0] : undefined}
          toDate={duration ? duration[1] : undefined}
        />
      </div>
    </>
  );
};
