import React from "react";
import { StorageTransactionTable } from "./StorageTransactionTable";
import { useGetFileStorageSetting } from "features/core/company/hooks/fileStorage/setting/useGetFileStorageSetting";
import { Skeleton, Slider } from "antd";
import { TFileStorageSetting } from "features/core/company/types/fileStorage/fileStorageSetting";

const StorageContainer: React.FC<{
  data?: TFileStorageSetting;
  isLoading?: boolean;
}> = ({ data, isLoading }) => {
  return (
    <Skeleton active loading={isLoading} paragraph={{ rows: 24 }}>
      <div className="space-y-6">
        <div className="flex gap-x-4 items-center">
          <div className="flex items-center gap-x-2 px-4 py-2 border rounded-md border-1 font-semibold shadow-sm text-sm ">
            <i className="ri-cloud-line" />
            <span>{data?.formattedTotalFileStorage} Total Size</span>
          </div>
          {/* TODO: Confirm that unit are appropiate */}
          <div className="w-[200px] relative">
            <Slider
              className="w-full"
              step={1000}
              max={data?.totalFileStorage}
              min={0}
              value={data?.totalUsedInGB}
              disabled
            />
            <span className="text-[0.65rem] absolute top-6">
              {data?.formattedTotalUsedInGB} Used
            </span>
          </div>
        </div>
        <StorageTransactionTable />
      </div>
    </Skeleton>
  );
};

export default StorageContainer;
