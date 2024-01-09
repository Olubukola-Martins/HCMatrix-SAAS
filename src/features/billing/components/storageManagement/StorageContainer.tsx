import React from "react";
import { StorageTransactionTable } from "./StorageTransactionTable";
import { useGetFileStorageSetting } from "features/core/company/hooks/fileStorage/setting/useGetFileStorageSetting";
import { Skeleton, Slider } from "antd";

const StorageContainer = () => {
  const { isLoading, data } = useGetFileStorageSetting();
  return (
    <Skeleton active loading={isLoading} paragraph={{ rows: 24 }}>
      <div className="space-y-6">
        <div className="space-x-4">
          <div className="flex items-center gap-x-2 px-4 py-2 border text-sm">
            <i className="ri-cloud-line" />
            <span>{data?.formattedTotalFileStorage} Total Size</span>
          </div>
          {/* TODO: Confirm that unit are appropiate */}
          <Slider
            max={data?.totalFileStorage}
            value={data?.totalUsedInGB}
            disabled
          />
        </div>
        <StorageTransactionTable />
      </div>
    </Skeleton>
  );
};

export default StorageContainer;
