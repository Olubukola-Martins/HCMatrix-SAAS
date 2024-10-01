import { Skeleton } from "antd";
import { AppButton, IAppBtnProps } from "components/button/AppButton";
import React from "react";
import { Link } from "react-router-dom";
import { IDivProps } from "types/html";

export interface ISimpleCard extends IDivProps {
  title: string;
  highlight?: string | number;
  highlightClassName?: string;
  url?: string;
  action?: IAppBtnProps;
  center?: boolean;
  loading?: boolean;
  handleClick?: () => void;
  cardActions?: { onClick: () => void; icon: React.ReactNode }[];
}

export const SimpleCard: React.FC<ISimpleCard> = ({
  title,
  highlight,
  url,
  action,
  center = false,
  loading,
  cardActions,
  className,
  handleClick,
  highlightClassName = "font-semibold text-lg mb-2 capitalize",
}) => {
  const defaultClassName =
    "border rounded-md p-2 shadow-sm bg-card hover:shadow-md cursor-pointer group";

  if (url) {
    return (
      <Link to={url} className={className ?? defaultClassName}>
        <div
          className={`rounded-md bg-mainBg shadow p-3 group-hover:border-b-2 group-hover:border-caramel flex flex-col ${
            center && "items-center text-center"
          }`}
        >
          <Skeleton loading={loading} paragraph={{ rows: 3 }}>
            <>
              <p className="text-sm font-medium py-3 capitalize">{title}</p>
              <h2 className="font-semibold text-lg capitalize">{highlight}</h2>
            </>
          </Skeleton>
        </div>
      </Link>
    );
  }
  return (
    <div onClick={handleClick} className={className ?? defaultClassName}>
      <div
        className={`h-full rounded-md bg-mainBg shadow p-3 group-hover:border-b-2 group-hover:border-caramel flex flex-col ${
          center && "items-center text-center"
        }`}
      >
        <Skeleton loading={loading} paragraph={{ rows: 3 }}>
          <div className="h-full flex flex-col justify-evenly">
            <div className="flex justify-between py-3 items-start">
              <div className="flex justify-between items-center w-full">
                <p className="text-sm font-medium  capitalize">{title}</p>
                {handleClick && (
                  <i
                    onClick={handleClick}
                    className="ri-arrow-right-s-line text-lg cursor-pointer group-hover:text-caramel"
                  ></i>
                )}
              </div>
              <div className="flex gap-2">
                {cardActions?.map(({ icon, onClick }, i) => (
                  <div key={i} onClick={onClick}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>
            {highlight && (
              <h2 className={highlightClassName}>{highlight.toString()}</h2>
            )}
            {action && <AppButton {...action} />}
          </div>
        </Skeleton>
      </div>
    </div>
  );
};
