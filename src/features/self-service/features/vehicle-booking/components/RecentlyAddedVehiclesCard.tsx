import React from "react";
import {
  LIMIT_OF_ITEMS_TO_DISPLAY,
  requestStyle,
} from "./RecentVehicleRequestsCard";
import { useFetchVehicles } from "../hooks/useFetchVehicles";
import { Empty } from "antd";
import moment from "moment";
import { useApiAuth } from "hooks/useApiAuth";

export const RecentlyAddedVehiclesCard: React.FC<{
  handleSeeAll: () => void;
}> = ({ handleSeeAll }) => {
  const { token, companyId } = useApiAuth();

  const { data, isSuccess } = useFetchVehicles({
    token,
    companyId,
    pagination: {
      limit: LIMIT_OF_ITEMS_TO_DISPLAY,
      offset: 0,
    },
  });
  return (
    <div className="bg-mainBg border rounded-lg text-sm shadow">
      <div className="flex items-center justify-between px-3 py-3 border-b">
        <p className="font-medium">Recently Added Vehicles</p>
        <span className="text-xs">Date</span>
      </div>
      <div className="flex flex-col gap-3 px-3 py-2">
        {isSuccess && data?.data.length > 0 ? (
          data?.data.map((item) => (
            <div key={item.id} className={requestStyle}>
              <h5 className="group-hover:text-caramel font-medium">
                {item.brand} {item.model}
              </h5>
              <span className="text-xs">
                {moment(item.createdAt).format("YYYY/MM/DD")}
              </span>
            </div>
          ))
        ) : (
          <Empty description="No Vehicles" />
        )}
      </div>
      {isSuccess && data.total > LIMIT_OF_ITEMS_TO_DISPLAY ? (
        <h2
          className="text-caramel text-right px-3 text-sm font-semibold cursor-pointer hover:text-accent pb-2 pt-1"
          onClick={handleSeeAll}
        >
          See All
        </h2>
      ) : null}
    </div>
  );
};
