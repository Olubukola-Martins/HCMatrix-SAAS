import React from "react";

import { Empty, Skeleton } from "antd";

export const requestStyle =
  "flex items-center justify-between cursor-pointer group border-b pb-2";

export const LIMIT_OF_ITEMS_TO_DISPLAY = 3;

interface IProps {
  title: string;
  secondaryColTitle?: string;
  loading?: boolean;
  data?: {
    title: string;
    features?: { name: string; value: string }[];
    secondaryCol?:
      | { type: "text"; text: string }
      | { type: "options"; options: { name: string; onClick: () => void }[] };
  }[];
  handleViewMore?: () => void;
  total?: number;
}

export const RecentCard: React.FC<IProps> = ({
  title,
  secondaryColTitle,
  data,
  total,
  loading,
}) => {
  return (
    <div className="bg-mainBg border mt-4 rounded-lg text-sm shadow">
      <div className="flex items-center justify-between px-3 py-3 border-b">
        <p className="font-medium">{title}</p>
        <span className="text-xs">{secondaryColTitle}</span>
      </div>
      <div className="flex flex-col gap-3 px-3 py-2">
        <Skeleton loading={loading} active paragraph={{ rows: 4 }}>
          {data && data.length > 0 ? (
            data.map((item, i) => (
              <div className={requestStyle} key={i}>
                <div className="flex flex-col gap-1">
                  <h5 className="group-hover:text-caramel font-medium">
                    {item.title}
                  </h5>
                  {item?.features?.map((item, i) => (
                    <span className="text-xs" key={i}>
                      {item.name}: {item.value}
                    </span>
                  ))}
                </div>
                {item.secondaryCol?.type === "options" && (
                  <i className="ri-more-fill text-lg"></i>
                )}
                {item.secondaryCol?.type === "text" && (
                  <span className="text-xs">{item.secondaryCol.text}</span>
                )}
              </div>
            ))
          ) : (
            <Empty description="No Vehicle Requests" />
          )}
        </Skeleton>
      </div>
      {total && total > LIMIT_OF_ITEMS_TO_DISPLAY ? (
        <h2 className="text-caramel text-right px-3 text-sm font-semibold cursor-pointer hover:text-accent pb-2 pt-1">
          See All
        </h2>
      ) : null}
    </div>
  );
};
