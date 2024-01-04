import { useGetSingleEmployeePayroll } from "features/payroll/hooks/payroll/employee/useGetSingleEmployeePayroll";
import PayslipPrintTemplate from "./templates/PayslipPrintTemplate";
import React, { forwardRef } from "react";
import { useGetSinglePayrollTemplate } from "features/payroll/hooks/templates/useGetSinglePayrollTemplate";
import { useApiAuth } from "hooks/useApiAuth";

interface IProps {
  params: {
    payrollId?: number;
    employeeId?: number;
  };
  defaultPayslipTemplateId?: number;
}
export const PayslipGenerator = forwardRef<HTMLDivElement, IProps>(
  ({ params, defaultPayslipTemplateId }, ref) => {
    const { employeeId, payrollId } = params;
    const { data: payslipTemplate } = useGetSinglePayrollTemplate({
      templateId: defaultPayslipTemplateId,
      type: "payslip",
    });

    const { data: employeePayroll } = useGetSingleEmployeePayroll({
      employeeId,
      payrollId,
    });

    const { currentCompanyEmployeeDetails } = useApiAuth();

    return (
      <div ref={ref}>
        {employeePayroll &&
          payslipTemplate &&
          currentCompanyEmployeeDetails?.company && (
            <PayslipPrintTemplate
              defaultPayslipTemplate={payslipTemplate}
              employeePayroll={employeePayroll}
              company={currentCompanyEmployeeDetails?.company}
            />
          )}
      </div>
    );
  }
);
