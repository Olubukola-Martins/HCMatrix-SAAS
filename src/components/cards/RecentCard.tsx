import React from "react";

import { Dropdown, Empty, Skeleton } from "antd";

export const requestStyle =
  "flex items-center justify-between cursor-pointer group border-b pb-2";

export const LIMIT_OF_ITEMS_TO_DISPLAY = 3;

interface IProps {
  emptyComp?: React.ReactNode;
  title: string;
  secondaryColTitle?: string;
  loading?: boolean;
  data?: {
    title: string;
    features?: { name?: string; value: string; color?: string }[];
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
  handleViewMore,
  emptyComp = <Empty description="No Data" />,
}) => {
  return (
    <div className="bg-mainBg pb-6 border rounded-lg text-sm shadow">
      <div className="flex items-center justify-between px-3 py-3 border-b">
        <p className="font-medium">{title}</p>
        <span className="text-xs capitalize">{secondaryColTitle}</span>
      </div>
      <div className="flex flex-col gap-3 px-3 py-2">
        <Skeleton loading={loading} active paragraph={{ rows: 4 }}>
          {data && data.length > 0 ? (
            data.map((item, i) => (
              <div className={requestStyle} key={i}>
                <div className="flex flex-col gap-1">
                  <h5 className="font-medium capitalize">{item.title}</h5>
                  {item?.features?.map((item, i) => (
                    <span
                      className="text-xs capitalize"
                      key={i}
                      style={{ color: item.color }}
                    >
                      {item.name && `${item?.name}:`} {item.value}
                    </span>
                  ))}
                </div>
                {item.secondaryCol?.type === "options" && (
                  <Dropdown
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentElement as HTMLElement
                    }
                    className="overflow-hidden"
                    overlay={
                      <div className="bg-mainBg flex flex-col gap-2 rounded shadow-sm py-2 relative -top-2  px-2 text-xs border font-medium">
                        {item.secondaryCol.options.map((option, i) => (
                          <div
                            key={i}
                            className="cursor-pointer "
                            onClick={option.onClick}
                          >
                            <span className="hover:text-caramel">
                              {option.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    }
                    trigger={["click"]}
                  >
                    <i className="ri-more-fill text-base" />
                  </Dropdown>
                )}
                {item.secondaryCol?.type === "text" && (
                  <span className="text-xs capitalize">
                    {item.secondaryCol.text}
                  </span>
                )}
              </div>
            ))
          ) : (
            <>{emptyComp}</>
          )}
        </Skeleton>
      </div>
      {total && total > LIMIT_OF_ITEMS_TO_DISPLAY ? (
        <h2
          onClick={() => handleViewMore?.()}
          className="text-caramel text-right px-3 text-sm font-semibold cursor-pointer hover:text-accent pb-2 pt-1"
        >
          See All
        </h2>
      ) : null}
    </div>
  );
};
