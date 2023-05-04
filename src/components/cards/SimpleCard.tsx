import { AppButton, IAppBtnProps } from "components/button/AppButton";
import React from "react";
import { Link } from "react-router-dom";

export interface ISimpleCard {
  title: string;
  highlight?: string;
  url?: string;
  action?: IAppBtnProps;
  center?: boolean;
}

export const SimpleCard: React.FC<ISimpleCard> = ({
  title,
  highlight,
  url,
  action,
  center = false,
}) => {
  if (url) {
    return (
      <Link
        to={url}
        className="border rounded-md p-2 shadow-sm bg-card hover:shadow-md cursor-pointer group"
      >
        <div
          className={`rounded-md bg-mainBg shadow p-3 group-hover:border-b-2 group-hover:border-caramel flex flex-col ${
            center && "items-center"
          }`}
        >
          <p className="text-sm font-medium py-3 capitalize">{title}</p>
          <h2 className="font-semibold text-lg">{highlight}</h2>
        </div>
      </Link>
    );
  }
  return (
    <div className="border rounded-md p-2 shadow-sm bg-card hover:shadow-md cursor-pointer group">
      <div
        className={`rounded-md bg-mainBg shadow p-3 group-hover:border-b-2 group-hover:border-caramel flex flex-col ${
          center && "items-center"
        }`}
      >
        <p className="text-sm font-medium py-3 capitalize">{title}</p>
        {highlight && <h2 className="font-semibold text-lg">{highlight}</h2>}
        {action && <AppButton {...action} />}
      </div>
    </div>
  );
};
