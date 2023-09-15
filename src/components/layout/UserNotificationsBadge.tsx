import { Badge } from "antd";
import { appRoutes } from "config/router/paths";
import { useGetAlerts } from "features/notifications/hooks/useGetAlerts";
import React from "react";
import { Link } from "react-router-dom";

const OVERFLOW_COUNT_FOR_NOTIFICATION = 8;
export const UserNotificationsBadge = () => {
  const { data } = useGetAlerts({ isRead: true });
  return (
    <Badge
      size="small"
      count={data?.total}
      overflowCount={OVERFLOW_COUNT_FOR_NOTIFICATION}
    >
      <Link to={appRoutes.notifications}>
        <i
          className="ri-notification-3-line text-xl cursor-pointer"
          title="Notifications"
        ></i>
      </Link>
    </Badge>
  );
};
