import { SimpleCard } from "components/cards/SimpleCard";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";
import { determineEmployeeGrossPay } from "features/payroll/utils/determineEmployeeGrossPay";
import { TSingleEmployee } from "features/core/employees/types";

const PayslipCards: React.FC<{
  jobInfo?: TSingleEmployee["jobInformation"];
}> = ({ jobInfo }) => {
  const { loading: baseCurrLoading, formatValueWithCurrency } =
    useGetCompanyBaseCurrency();
  const isLoading = baseCurrLoading;
  const employeeGrossPay = determineEmployeeGrossPay(jobInfo);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
      <>
        <div>
          <SimpleCard
            title="Payment Cycle"
            highlight={jobInfo?.frequency}
            loading={isLoading}
          />
        </div>
        <div>
          <SimpleCard
            title="Payroll Scheme"
            highlight={
              jobInfo?.payrollType === "office"
                ? "Step Pay"
                : jobInfo?.payrollType
            }
            loading={isLoading}
          />
        </div>

        <div>
          <SimpleCard
            title="Gross Salary"
            highlight={formatValueWithCurrency(employeeGrossPay)}
            loading={isLoading}
          />
        </div>
      </>
    </div>
  );
};

export default PayslipCards;
