import { Badge } from "antd";
import { appRoutes } from "config/router/paths";
import { useGetUnReadNotificationCount } from "features/notifications/hooks/unRead/useGetUnReadNotificationCount";
import React from "react";
import { Link } from "react-router-dom";

const OVERFLOW_COUNT_FOR_NOTIFICATION = 8;
export const UserNotificationsBadge = () => {
  const { data } = useGetUnReadNotificationCount();
  return (
    <Badge
      size="small"
      count={data?.unreadCount}
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
