import { Skeleton } from "antd";
import React from "react";
import { PieChart } from "components/charts/PieChart";
import { useGetAssetAnalytics } from "../hooks/useGetAssetAnalytics";

export const AssetsByStatusCard = () => {
  const { data, isLoading } = useGetAssetAnalytics();

  return (
    <div>
      <div className="border rounded-md px-4 py-2 shadow">
        <p>Assets by Status</p>
        <div className="flex justify-center my-6">
          <Skeleton active paragraph={{ rows: 9 }} loading={isLoading}>
            <div className="w-72">
              <PieChart
                data={data ? Object.values(data?.assetByStatus) : []}
                labels={data ? Object.keys(data?.assetByStatus) : []}
                dataEntityLabel="vehicles"
                bgColors={["#ff6647", "#FFA600", "#FFDBD3", "#cfcfcf"]}
              />
            </div>
          </Skeleton>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#ff6647]" />
            <span className="text-sm">
              {data?.assetByStatus.assigned} Assigned
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ background: "#FFA600" }}
            />
            <span className="text-sm">
              {data?.assetByStatus.unassigned} Available
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ background: "#FFDBD3" }}
            />
            <span className="text-sm">
              {data?.assetByStatus["under-repair"]} Under Repair
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#cfcfcf]" />
            <span className="text-sm">
              {data?.assetByStatus.condemned} Condemned
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
