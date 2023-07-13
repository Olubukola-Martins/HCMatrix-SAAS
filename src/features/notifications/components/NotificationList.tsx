import { Badge, Dropdown, Pagination, Skeleton } from "antd";
import moment from "moment";
import { useFetchNotifications } from "../hooks/useFetchNotifications";
import { usePagination } from "hooks/usePagination";

export const NotificationList = () => {
  const { onChange, pagination } = usePagination();
  const { data, isFetching } = useFetchNotifications({ pagination });

  return (
    <div className="flex flex-col gap-4">
      <Skeleton loading={isFetching} active paragraph={{ rows: 8 }}>
        <div>
          {data?.data.map((item) => (
            <div className="border rounded mt-4 px-3 py-3 cursor-pointer hover:bg-card flex md:justify-between gap-x-5">
              <div className="flex items-center gap-3">
                <Badge dot>
                  <i className="ri-notification-3-line text-lg"></i>
                </Badge>
                <div>
                  <h5 className="text-xs md:text-sm">
                    {item.title} : {item.message}
                  </h5>
                  <span className="text-xs md:hidden pt-2 block">
                    {moment(item.createdAt).fromNow()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="md:flex items-center hidden gap-2 text-accent">
                  <i className="ri-timer-line text-base"></i>
                  <span>{moment(item.createdAt).fromNow()}</span>
                </div>
                <Dropdown
                  overlay={
                    <div className="bg-mainBg flex flex-col gap-2 rounded shadow-sm py-3 px-2 text-xs border font-medium">
                      <div className="flex items-center gap-2 cursor-pointer group">
                        <i className="ri-eye-line"></i>
                        <span className="group-hover:text-caramel">
                          View Notification
                        </span>
                      </div>
                      <div className="flex items-center gap-2 cursor-pointer group mt-2">
                        <i className="ri-delete-bin-line"></i>
                        <span className="group-hover:text-caramel">
                          Delete Notification
                        </span>
                      </div>
                    </div>
                  }
                  trigger={["click"]}
                >
                  <i className="ri-more-2-fill text-lg"></i>
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
      </Skeleton>
      <div className="mt-4 flex justify-end">
        <Pagination
          {...{ ...pagination, total: data?.total }}
          onChange={onChange}
          size="small"
        />
      </div>
    </div>
  );
};
