import React from "react";

import { EntityInfoCard } from "components/cards/EntityInfoCard";
import moment from "moment";
import { TAsset } from "../types";

export const AssetInfo: React.FC<{ asset: TAsset }> = ({ asset }) => {
  return (
    <EntityInfoCard
      data={[
        {
          name: "Asset Type",
          value: asset.type.name,
        },
        {
          name: "Brand",
          value: asset.brand,
        },
        {
          name: "Model",
          value: asset.model,
        },
        {
          name: "Color",
          value: asset.color,
        },

        {
          name: "Purchase Cost",
          value: asset.cost,
        },
        {
          name: "Purchase Date",
          value: asset.purchaseDate
            ? moment(asset.purchaseDate).format("YYYY/MM/DD")
            : "",
        },

        {
          name: "Status",
          value: asset.status,
        },
        {
          name: "Description",
          value: asset.description,
          collapse: true,
        },
      ]}
    />
  );
};
