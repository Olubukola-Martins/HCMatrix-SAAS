import { SimpleCard } from "components/cards/SimpleCard";
import React from "react";

import { Skeleton } from "antd";
import { useGetConferenceRoomAnalytics } from "../hooks/useGetConferenceRoomAnalytics";

const requestStyle =
  "flex items-center justify-between cursor-pointer group border-b pb-2";

const AvailableRoomsCard: React.FC<{
  data?: { name: string; id: number }[];
  loading?: boolean;
}> = ({ data = [], loading }) => {
  return (
    <div className="bg-mainBg border rounded-lg text-sm shadow">
      <div className="flex items-center justify-between px-3 py-3 border-b">
        <p className="font-medium">Available Conference Rooms</p>
      </div>
      <div className="px-3 py-2">
        <Skeleton loading={loading} paragraph={{ rows: 3 }}>
          <div className="flex flex-col gap-3 ">
            {data.map((item, i) => (
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

const MeetingRoomRequestCard: React.FC<{
  title?: string;
  total?: number;
  loading?: boolean;
}> = ({ title, total, loading }) => {
  return (
    <SimpleCard title={title ?? ""} highlight={`${total}`} loading={loading} />
  );
};
const CRBCards = () => {
  const { data, isLoading } = useGetConferenceRoomAnalytics();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <>
          <MeetingRoomRequestCard
            title="Total Requests"
            total={data?.requests.total}
            loading={isLoading}
          />
          <MeetingRoomRequestCard
            title="Pending Requests"
            total={data?.requests.pending}
            loading={isLoading}
          />
          <MeetingRoomRequestCard
            title="Rejected Requests"
            total={data?.requests.rejected}
            loading={isLoading}
          />
        </>
        <AvailableRoomsCard
          loading={isLoading}
          data={data?.availableRooms.map((item) => ({
            name: item.name,
            id: item.id,
          }))}
        />

        <>
          <MeetingRoomRequestCard
            title="My Approved Bookings"
            total={data?.bookings.approved}
            loading={isLoading}
          />
          <MeetingRoomRequestCard
            title="My Pending Bookings"
            total={data?.bookings.pending}
            loading={isLoading}
          />
          <MeetingRoomRequestCard
            title="My Rejected Bookings"
            total={data?.bookings.rejected}
            loading={isLoading}
          />
        </>
      </div>
    </div>
  );
};

export default CRBCards;
