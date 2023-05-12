import React from "react";
import { TApprovalStatus } from "types/statuses";
import { useFetchLeaves } from "../hooks/useFetchLeaves";
import { ISimpleCard, SimpleCard } from "components/cards/SimpleCard";
import { useApiAuth } from "hooks/useApiAuth";

const LeaveCards = () => {
  const { currentUserEmployeeId } = useApiAuth();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <>
          {/* TO DO: calculate for above with one api call and pass the values here */}
          <SimpleCard title="Spill Over" highlight="0 days" />
          <SimpleCard title="Leave Bank" highlight="0 days" />
          <SimpleCard title="Used Leave" highlight="0 days" />
          <SimpleCard title="Leave Balance" highlight="0 days" />
        </>

        <>
          <LeaveRequestCard
            title="My Approved Requests"
            employeeId={currentUserEmployeeId}
          />
          <LeaveRequestCard
            title="My Pending Requests"
            status="pending"
            employeeId={currentUserEmployeeId}
          />
          <LeaveRequestCard
            title="My Rejected Requests"
            status="rejected"
            employeeId={currentUserEmployeeId}
          />
          <PublicHolidaysCard />
        </>
      </div>
    </div>
  );
};

const LeaveRequestCard: React.FC<
  ISimpleCard & { status?: TApprovalStatus; employeeId?: number }
> = ({ title, status }) => {
  const { data, isFetching } = useFetchLeaves({
    status,
  });
  return (
    <SimpleCard
      title={title}
      highlight={`${data?.total}`}
      loading={isFetching}
    />
  );
};
const PublicHolidaysCard = () => {
  const data = { total: 0 };
  return (
    <SimpleCard
      title={`Recognised Public Holidays`}
      highlight={`${data?.total} holidays`}
      // loading={isFetching}
    />
  );
};

export default LeaveCards;
