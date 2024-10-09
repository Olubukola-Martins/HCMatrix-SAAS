import { SimpleCard } from "components/cards/SimpleCard";
import { useGetEmployeeLeaveDBAnalytics } from "../hooks/leaveAnalytics/useGetEmployeeLeaveDBAnalytics";
import { useState } from "react";
import LeaveBalanceOverviewDetails from "./LeaveBalanceOverview";
import LeaveBankOverviewDetails from "./LeaveBankOverview";

type TAction = "view-leave-balance-overview" | "view-leave-bank-overview";
const LeaveCards = () => {
  const { data, isLoading } = useGetEmployeeLeaveDBAnalytics();
  const [action, setAction] = useState<TAction>();
  const handleClose = () => {
    setAction(undefined);
  };
  return (
    <>
      <LeaveBalanceOverviewDetails
        data={data?.leaveBankBreakdown}
        handleClose={handleClose}
        open={action === "view-leave-balance-overview"}
      />
      <LeaveBankOverviewDetails
        data={data?.leaveBankBreakdown}
        handleClose={handleClose}
        open={action === "view-leave-bank-overview"}
      />
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <>
            <SimpleCard
              title="Spill Over"
              highlight={`${data?.spillover ?? 0}`}
              loading={isLoading}
            />
            <SimpleCard
              title="Annual Leave Bank"
              highlight={`${data?.annualLeaveBank ?? 0}`}
              handleClick={() => setAction("view-leave-bank-overview")}
              loading={isLoading}
            />
            <SimpleCard
              title="Annual Used Leave"
              highlight={`${data?.usedAnnualLeave ?? 0}`}
              loading={isLoading}
            />
            <SimpleCard
              title="Annual Leave Balance"
              highlight={`${data?.annualLeaveBalance ?? 0}`}
              handleClick={() => setAction("view-leave-balance-overview")}
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
    </>
  );
};

export default LeaveCards;
