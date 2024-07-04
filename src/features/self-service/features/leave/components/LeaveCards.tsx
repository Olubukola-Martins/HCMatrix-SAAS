import { SimpleCard } from "components/cards/SimpleCard";
import { useGetEmployeeLeaveDBAnalytics } from "../hooks/leaveAnalytics/useGetEmployeeLeaveDBAnalytics";

const LeaveCards = () => {
  const { data, isLoading } = useGetEmployeeLeaveDBAnalytics();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <>
          <SimpleCard
            title="Spill Over"
            highlight={`${data?.spillOver ?? 0}`}
            loading={isLoading}
          />
          <SimpleCard
            title="Leave Bank"
            highlight={`${data?.leaveBank ?? 0}`}
            loading={isLoading}
          />
          <SimpleCard
            title="Used Leave"
            highlight={`${data?.usedLeave ?? 0}`}
            loading={isLoading}
          />
          <SimpleCard
            title="Leave Balance"
            highlight={`${data?.leaveBalance ?? 0}`}
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
