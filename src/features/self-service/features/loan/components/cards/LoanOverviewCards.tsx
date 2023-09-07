import React from "react";

import { SimpleCard } from "components/cards/SimpleCard";
// import { useGetLeaveAnalytics } from "../hooks/useGetLeaveAnalytics";

const LoanOverviewCards = () => {
  //   const { data, isLoading } = useGetLeaveAnalytics();
  const data: any = undefined;
  const isLoading = false;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <>
          <SimpleCard
            title="Total Loan Requests"
            highlight={`${data?.approved}`}
            loading={isLoading}
          />
          <SimpleCard
            title="Pending Loan Requests"
            highlight={`${data?.pending}`}
            loading={isLoading}
          />
          <SimpleCard
            title="Approved Loan Requests"
            highlight={`${data?.rejected}`}
            loading={isLoading}
          />
          <SimpleCard
            title="Rejected Loan Requests"
            highlight={`${data?.holiday}`}
            loading={isLoading}
          />
        </>
      </div>
    </div>
  );
};

export default LoanOverviewCards;
