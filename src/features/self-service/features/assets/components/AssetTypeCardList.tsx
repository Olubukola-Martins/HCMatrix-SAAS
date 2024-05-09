import React, { useState } from "react";

import { Skeleton } from "antd";
import { SimpleCard } from "components/cards/SimpleCard";
import { useGetAssetAnalytics } from "../hooks/useGetAssetAnalytics";
import { DeleteAssetType } from "./asset-type/DeleteAssetType";
import { TAssetType } from "../types";
import EditAssetType from "./asset-type/EditAssetType";
import { truncateString } from "utils/dataHelpers/truncateString";

export const AssetTypeCardList: React.FC<{
  displayActions?: boolean;
  layout?: "4-col" | "3-col";
}> = ({ layout = "3-col", displayActions = false }) => {
  const { data, isLoading } = useGetAssetAnalytics();
  const [action, setAction] = useState<"edit" | "delete">();
  const [type, setType] = useState<Pick<TAssetType, "name" | "id">>();
  const onClose = () => {
    setType(undefined);
    setAction(undefined);
  };
  return (
    <>
      <DeleteAssetType
        open={action === "delete"}
        assetType={type}
        handleClose={onClose}
      />
      <EditAssetType
        open={action === "edit"}
        type={type}
        handleClose={onClose}
      />
      <Skeleton active loading={isLoading} paragraph={{ rows: 7 }}>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            layout === "3-col" && "lg:grid-cols-3"
          } ${layout === "4-col" && "lg:grid-cols-4"} gap-6`}
        >
          {data?.assetTypes.map((item) => (
            <SimpleCard
              key={item.id}
              title={truncateString(item.name)}
              highlight={`${item.assetCount}`}
              cardActions={
                displayActions
                  ? [
                      {
                        icon: (
                          <i className="ri-pencil-line cursor-pointer hover:text-caramel" />
                        ),
                        onClick: () => {
                          setType(item);
                          setAction("edit");
                        },
                      },
                      {
                        icon: (
                          <i className="ri-delete-bin-line cursor-pointer hover:text-caramel" />
                        ),
                        onClick: () => {
                          setType(item);
                          setAction("delete");
                        },
                      },
                    ]
                  : undefined
              }
            />
          ))}
        </div>
      </Skeleton>
    </>
  );
};
