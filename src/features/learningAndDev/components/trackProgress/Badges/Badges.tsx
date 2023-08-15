import medal from "../../../assets/imgaes/medal.svg";

export const Badges = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <BadgeCard />
    </div>
  );
};

const BadgeCard = () => {
  return (
    <div className="border rounded-md p-2 shadow-sm bg-card hover:shadow-md cursor-pointer group">
      <div
        className={`rounded-md bg-mainBg shadow px-3 py-4 text-accent group-hover:border-b-2 group-hover:border-caramel flex flex-col`}
      >
        <div className="flex items-center justify-between">
          <h4 className="text text-base">Activity Badges</h4>
          <i className="ri-more-2-fill font-medium text-lg cursor-pointer"></i>
        </div>
        <div className="flex items-center justify-between mt-5">
          <h4 className="text text-lg font-semibold">0</h4>
          <img src={medal} alt="medal" className="h-5" />
        </div>
      </div>
    </div>
  );
};
