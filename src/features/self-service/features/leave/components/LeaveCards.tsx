import React from "react";
import { TApprovalStatus } from "types/statuses";
import { useFetchLeaves } from "../hooks/useFetchLeaves";
import { ISimpleCard, SimpleCard } from "components/cards/SimpleCard";
import { useGetLeaveAnalytics } from "../hooks/useGetLeaveAnalytics";

const LeaveCards = () => {
  const { data, isLoading } = useGetLeaveAnalytics();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <>
          <SimpleCard
            title="Spill Over"
            highlight={`${data?.spillOver}`}
            loading={isLoading}
          />
          <SimpleCard
            title="Leave Bank"
            highlight={`${data?.leaveBank}`}
            loading={isLoading}
          />
          <SimpleCard
            title="Used Leave"
            highlight={`${data?.usedLeave}`}
            loading={isLoading}
          />
          <SimpleCard
            title="Leave Balance"
            highlight={`${data?.leaveBalance}`}
            loading={isLoading}
          />
        </>

        <>
          <SimpleCard
            title="My Approved Requests"
            highlight={`${data?.approved}`}
            loading={isLoading}
          />
          <SimpleCard
            title="My Pending Requests"
            highlight={`${data?.pending}`}
            loading={isLoading}
          />
          <SimpleCard
            title="My Rejected Requests"
            highlight={`${data?.rejected}`}
            loading={isLoading}
          />
          <SimpleCard
            title="Recognised Public Holidays"
            highlight={`${data?.holiday}`}
            loading={isLoading}
          />
        </>
      </div>
    </div>
  );
};

export default LeaveCards;
