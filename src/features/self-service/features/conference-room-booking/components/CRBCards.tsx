import SimpleCardList from "components/cards/SimpleCardList";
import { useFetchAllConferenceRooms } from "../hooks/useFetchAllConferenceRooms";
import { ISimpleCard } from "components/cards/SimpleCard";

const data: ISimpleCard[] = [
  {
    title: "Total Requests",

    highlight: "0 ",
  },
  {
    title: "Pending Requests",

    highlight: "0",
  },
  {
    title: "Rejected Requests",

    highlight: "0",
  },
];
const requestStyle =
  "flex items-center justify-between cursor-pointer group border-b pb-2";

const AvailableRoomsCard = () => {
  const { data } = useFetchAllConferenceRooms({
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
      <div className="flex flex-col gap-3 px-3 py-2">
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
    </div>
  );
};
const RecentRequestsCard = () => {
  return (
    <div className="bg-mainBg border rounded-lg text-sm shadow">
      <div className="flex items-center justify-between px-3 py-3 border-b">
        <p className="font-medium">Recent Requests </p>
        <span className="text-xs">Status</span>
      </div>
      <div className="flex flex-col gap-3 px-3 py-2">
        {Array(2)
          .fill(0)
          .map((item, i) => (
            <div className={requestStyle} key={i}>
              <div>
                <h5 className="group-hover:text-caramel font-medium mb-2">
                  Ruth Godwin
                </h5>
                <div className="flex flex-col gap-0.5 text-xs">
                  <span className="text-xs">Department: Sales</span>
                  <span className="text-xs">Board Room</span>
                </div>
              </div>
              <i className="ri-more-fill text-lg"></i>
            </div>
          ))}
      </div>
      <h2 className="text-caramel text-center text-base font-semibold cursor-pointer hover:text-accent pb-2 pt-1">
        See All
      </h2>
    </div>
  );
};
const CRBCards = () => {
  return (
    <div>
      <SimpleCardList
        entries={data}
        extra={false ? <RecentRequestsCard /> : <AvailableRoomsCard />}
      />
    </div>
  );
};

export default CRBCards;
