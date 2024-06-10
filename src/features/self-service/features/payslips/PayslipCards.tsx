import { SimpleCard } from "components/cards/SimpleCard";
import { useFetchSingleEmployee } from "features/core/employees/hooks/useFetchSingleEmployee";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";
import { determineEmployeeGrossPay } from "features/payroll/utils/determineEmployeeGrossPay";

const PayslipCards = () => {
  const { currentCompanyEmployeeId: employeeId, isLoading: isLoadingAuth } =
    useMostRecentApiAuth();
  const { data: employee, isLoading: isLoadingEmployee } =
    useFetchSingleEmployee({ employeeId });
  const { loading: baseCurrLoading, formatValueWithCurrency } =
    useGetCompanyBaseCurrency();
  const isLoading = isLoadingAuth || isLoadingEmployee || baseCurrLoading;
  const employeeGrossPay = determineEmployeeGrossPay(employee?.jobInformation);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
      <>
        <div>
          <SimpleCard
            title="Payment Cycle"
            highlight={employee?.jobInformation.frequency}
            loading={isLoading}
          />
        </div>
        <div>
          <SimpleCard
            title="Payroll Scheme"
            highlight={
              employee?.jobInformation.payrollType === "office"
                ? "Step Pay"
                : employee?.jobInformation.payrollType
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
