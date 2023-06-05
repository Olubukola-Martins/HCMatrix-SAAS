import React from "react";

import { useGetAssetTypes } from "../hooks/useGetAssetTypes";
import { useApiAuth } from "hooks/useApiAuth";
import { Skeleton } from "antd";
import { SimpleCard } from "components/cards/SimpleCard";

export const AssetTypeCardList: React.FC<{
  limit?: number;
  layout?: "4-col" | "3-col";
}> = ({ layout = "3-col" }) => {
  const { companyId, token } = useApiAuth();
  const { data, isFetching } = useGetAssetTypes({ companyId, token });
  return (
    <Skeleton active loading={isFetching} paragraph={{ rows: 7 }}>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${
          layout === "3-col" && "lg:grid-cols-3"
        } ${layout === "4-col" && "lg:grid-cols-4"} gap-6`}
      >
        {data?.data.map((item) => (
          <SimpleCard key={item.id} title={item.name} highlight={"N?A"} />
        ))}
      </div>
    </Skeleton>
  );
};
