import React from "react";

import { SimpleCard } from "components/cards/SimpleCard";
import { useGetLoanAnalytics } from "../../hooks/analytics/useGetLoanAnalytics";
// import { useGetLeaveAnalytics } from "../hooks/useGetLeaveAnalytics";

const LoanOverviewCards = () => {
  const { data: employeeData, isFetching: isFetchingEmpData } =
    useGetLoanAnalytics({ type: "me" });
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
            highlight={`${employeeData?.total}`}
            loading={isFetchingEmpData}
          />
          <SimpleCard
            title="My Pending Loan Requests"
            highlight={`${employeeData?.pending}`}
            loading={isFetchingEmpData}
          />
          <SimpleCard
            title="My Approved Loan Requests"
            highlight={`${employeeData?.approved}`}
            loading={isFetchingEmpData}
          />
          <SimpleCard
            title="My Rejected Loan Requests"
            highlight={`${employeeData?.rejected}`}
            loading={isFetchingEmpData}
          />
        </>
        {/* all */}
        <>
          <SimpleCard
            title="Total Loan Requests"
            highlight={`${allData?.total}`}
            loading={isFetchingAllData}
          />
          <SimpleCard
            title="Pending Loan Requests"
            highlight={`${allData?.pending}`}
            loading={isFetchingAllData}
          />
          <SimpleCard
            title="Approved Loan Requests"
            highlight={`${allData?.approved}`}
            loading={isFetchingAllData}
          />
          <SimpleCard
            title="Rejected Loan Requests"
            highlight={`${allData?.rejected}`}
            loading={isFetchingAllData}
          />
        </>
      </div>
    </div>
  );
};

export default LoanOverviewCards;
