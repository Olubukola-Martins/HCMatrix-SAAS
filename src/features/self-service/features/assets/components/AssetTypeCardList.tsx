import React from "react";

import { Skeleton } from "antd";
import { SimpleCard } from "components/cards/SimpleCard";
import { useGetAssetAnalytics } from "../hooks/useGetAssetAnalytics";

export const AssetTypeCardList: React.FC<{
  limit?: number;
  layout?: "4-col" | "3-col";
}> = ({ layout = "3-col" }) => {
  const { data, isLoading } = useGetAssetAnalytics();
  return (
    <Skeleton active loading={isLoading} paragraph={{ rows: 7 }}>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${
          layout === "3-col" && "lg:grid-cols-3"
        } ${layout === "4-col" && "lg:grid-cols-4"} gap-6`}
      >
        {data?.assetTypes.map((item) => (
          <SimpleCard
            key={item.id}
            title={item.name}
            highlight={`${item.assetCount}`}
          />
        ))}
      </div>
    </Skeleton>
  );
};
