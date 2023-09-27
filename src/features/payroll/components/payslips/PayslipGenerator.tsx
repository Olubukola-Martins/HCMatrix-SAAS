import { useGetSingleEmployeePayroll } from "features/payroll/hooks/payroll/employee/useGetSingleEmployeePayroll";
import PayslipPrintTemplate from "./templates/PayslipPrintTemplate";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";
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

    const { baseCurrency, loading: baseCurrLoading } =
      useGetCompanyBaseCurrency();

    const { data: employeePayroll, isLoading } = useGetSingleEmployeePayroll({
      employeeId,
      payrollId,
    });

    const { currentCompanyEmployeeDetails } = useApiAuth();

    return (
      <div ref={ref}>
        {baseCurrency &&
          employeePayroll &&
          payslipTemplate &&
          currentCompanyEmployeeDetails?.company && (
            <PayslipPrintTemplate
              defaultPayslipTemplate={payslipTemplate}
              employeePayroll={employeePayroll}
              baseCurrency={baseCurrency}
              company={currentCompanyEmployeeDetails?.company}
            />
          )}
      </div>
    );
  }
);
