import { ISimpleCard, SimpleCard } from "components/cards/SimpleCard";
import { useFetchAllAvailableConferenceRooms } from "../hooks/useFetchAllAvailableConferenceRooms";
import React from "react";
import {
  TCRBookingStatus,
  useFetchAllConferenceRoomBookings,
} from "../hooks/useFetchAllConferenceRoomBookings";
import { useApiAuth } from "hooks/useApiAuth";
import { Skeleton } from "antd";

const requestStyle =
  "flex items-center justify-between cursor-pointer group border-b pb-2";

const AvailableRoomsCard = () => {
  const { data, isFetching } = useFetchAllAvailableConferenceRooms({
    pagination: {
      limit: 3,
      offset: 0,
    },
  });
  return (
    <div className="bg-mainBg border rounded-lg text-sm shadow">
      <div className="flex items-center justify-between px-3 py-3 border-b">
        <p className="font-medium">Available Conference Rooms</p>
      </div>
      <div className="px-3 py-2">
        <Skeleton loading={isFetching} paragraph={{ rows: 3 }}>
          <div className="flex flex-col gap-3 ">
            {data?.data.map((item, i) => (
              <div className={requestStyle} key={i}>
                <div>
                  <h5 className="group-hover:text-caramel font-medium mb-2">
                    {item.name}
                  </h5>
                </div>
                <i className="ri-more-fill text-lg"></i>
              </div>
            ))}
          </div>
          <h2 className="text-caramel text-center text-base font-semibold cursor-pointer hover:text-accent pb-2 pt-1">
            See All
          </h2>
        </Skeleton>
      </div>
    </div>
  );
};

const MeetingRoomRequestCard: React.FC<
  ISimpleCard & { status?: TCRBookingStatus; employeeId?: number }
> = ({ title, status }) => {
  const { data, isFetching } = useFetchAllConferenceRoomBookings({
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
const CRBCards = () => {
  const { currentUserEmployeeId } = useApiAuth();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <>
          <MeetingRoomRequestCard title="Total Requests" />
          <MeetingRoomRequestCard title="Pending Requests" status="pending" />
          <MeetingRoomRequestCard title="Rejected Requests" status="rejected" />
        </>
        <AvailableRoomsCard />

        <>
          <MeetingRoomRequestCard
            title="My Approved Bookings"
            employeeId={currentUserEmployeeId}
          />
          <MeetingRoomRequestCard
            title="My Pending Bookings"
            status="pending"
            employeeId={currentUserEmployeeId}
          />
          <MeetingRoomRequestCard
            title="My Rejected Bookings"
            status="rejected"
            employeeId={currentUserEmployeeId}
          />
        </>
      </div>
    </div>
  );
};

export default CRBCards;
