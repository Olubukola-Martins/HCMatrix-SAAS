import { SimpleCard } from "components/cards/SimpleCard";
import { useGetLoanAnalytics } from "../../hooks/analytics/useGetLoanAnalytics";
import { PermissionRestrictor } from "components/permission-restriction/PermissionRestrictor";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

const LoanOverviewCards = () => {
  const { data: employeeData, isFetching: isFetchingEmpData } =
    useGetLoanAnalytics({ type: "mine" });
  const { data: allData, isFetching: isFetchingAllData } = useGetLoanAnalytics({
    type: "all",
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* employee */}
        <>
          <SimpleCard
            title="My Total Loan Requests"
            highlight={`${employeeData?.mine?.total ?? 0}`}
            loading={isFetchingEmpData}
          />
          <SimpleCard
            title="My Pending Loan Requests"
            highlight={`${employeeData?.mine?.pending ?? 0}`}
            loading={isFetchingEmpData}
          />
          <SimpleCard
            title="My Approved Loan Requests"
            highlight={`${employeeData?.mine?.approved ?? 0}`}
            loading={isFetchingEmpData}
          />
          <SimpleCard
            title="My Rejected Loan Requests"
            highlight={`${employeeData?.mine?.rejected ?? 0}`}
            loading={isFetchingEmpData}
          />
          <SimpleCard
            title="Loan Balance"
            highlight={`${formatNumberWithCommas(
              employeeData?.mine?.balance ?? 0
            )}`}
            loading={isFetchingAllData}
          />
        </>
        {/* all */}
        <>
          <PermissionRestrictor
            requiredPermissions={["view-all-loan-requests"]}
          >
            <SimpleCard
              title="Pending Loan Requests"
              highlight={`${allData?.company?.pending ?? 0}`}
              loading={isFetchingAllData}
            />
            <SimpleCard
              title="Approved Loan Requests"
              highlight={`${allData?.company?.approved ?? 0}`}
              loading={isFetchingAllData}
            />
            <SimpleCard
              title="Rejected Loan Requests"
              highlight={`${allData?.company.rejected ?? 0}`}
              loading={isFetchingAllData}
            />
          </PermissionRestrictor>
        </>
      </div>
    </div>
  );
};

export default LoanOverviewCards;
