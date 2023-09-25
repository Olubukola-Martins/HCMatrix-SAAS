import { Badge, Dropdown, Empty, Pagination, Skeleton } from "antd";
import moment from "moment";
import { usePagination } from "hooks/usePagination";
import { useGetAlerts } from "../hooks/useGetAlerts";
import { NotificationCard } from "./NotificationCard";

const NOTIFICATION_PAGE_SIZE = 15;

export const NotificationList = () => {
  const { onChange, pagination } = usePagination({
    pageSize: NOTIFICATION_PAGE_SIZE,
  });
  const { data, isFetching } = useGetAlerts({ pagination });

  return (
    <div className="flex flex-col gap-4">
      <Skeleton loading={isFetching} active paragraph={{ rows: 8 }}>
        {data && data?.data.length > 0 ? (
          <>
            <div>
              {data?.data.map((item) => (
                <NotificationCard item={item} key={item.id} />
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Pagination
                {...{ ...pagination, total: data?.total }}
                onChange={onChange}
                size="small"
              />
            </div>
          </>
        ) : (
          <div className="flex items-center h-72 justify-center">
            <Empty description="No notifications available" />
          </div>
        )}
      </Skeleton>
    </div>
  );
};
