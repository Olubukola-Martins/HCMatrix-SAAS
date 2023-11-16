import { SimpleCard } from "components/cards/SimpleCard";
import React, { useState } from "react";

import { useGetConferenceRoomAnalytics } from "../hooks/useGetConferenceRoomAnalytics";
import { RecentCard } from "components/cards/RecentCard";
import { TSingleConferenceRoom } from "../types";
import { DeleteConferenceRoom } from "./conference-rooms/DeleteConferenceRoom";
import { EditConferenceRoom } from "./conference-rooms/EditConferenceRoom";

const AvailableRoomsCard: React.FC<{
  data?: Pick<TSingleConferenceRoom, "id" | "name">[];
  loading?: boolean;
}> = ({ data = [], loading }) => {
  const [action, setAction] = useState<"edit" | "delete">();
  const [room, setRoom] =
    useState<Pick<TSingleConferenceRoom, "id" | "name">>();
  const onClose = () => {
    setAction(undefined);
    setRoom(undefined);
  };
  return (
    <>
      <EditConferenceRoom
        handleClose={onClose}
        open={action === "edit"}
        room={room}
      />
      <DeleteConferenceRoom
        handleClose={onClose}
        open={action === "delete"}
        room={room}
      />
      <RecentCard
        title="Available Conference Rooms"
        loading={loading}
        data={data.map((item) => ({
          title: `${item.name}`,
          secondaryCol: {
            type: "options",
            options: [
              {
                name: "Edit",
                onClick: () => {
                  setAction("edit");
                  setRoom(item);
                },
              },
              {
                name: "Delete",
                onClick: () => {
                  setAction("delete");
                  setRoom(item);
                },
              },
            ],
          },
        }))}
      />
    </>
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
          <div>
            <MeetingRoomRequestCard
              title="Total Requests"
              total={data?.requests.total}
              loading={isLoading}
            />
          </div>
          <div>
            <MeetingRoomRequestCard
              title="Pending Requests"
              total={data?.requests.pending}
              loading={isLoading}
            />
          </div>
          <div>
            <MeetingRoomRequestCard
              title="Rejected Requests"
              total={data?.requests.rejected}
              loading={isLoading}
            />
          </div>
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
