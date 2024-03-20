import { RecentCard } from "components/cards/RecentCard";
import { usePagination } from "hooks/usePagination";
import { useGetTimeOff } from "../../timeOff/hooks/useGetTimeOff";
import { Dropdown, Empty, Menu, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

export const TimeOffRequestCard = () => {
  const { pagination } = usePagination({ pageSize: 2 });
  const { data, isLoading } = useGetTimeOff({ pagination });

  return (
    <div className="bg-mainBg pb-3 border rounded-lg text-sm shadow">
      <div className="flex items-center justify-between px-3 py-3 border-b">
        <p className="font-medium">Timesheet</p>
        <span className="text-xs capitalize"></span>
      </div>
      <div className="flex flex-col gap-3 px-3 py-2">
        <Skeleton loading={isLoading} active paragraph={{ rows: 4 }}>
          {data?.data && data.data.length > 0 ? (
            data?.data.map((item, i) => (
              <div
                className="flex items-center justify-between group border-b pb-2"
                key={i}
              >
                <div className="flex flex-col gap-1">
                  <h5 className="font-medium capitalize">
                    {item.employee?.firstName} {item.employee?.lastName}
                  </h5>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs capitalize">
                      Status: - {item.status}
                    </span>
                    <span className="text-xs capitalize">
                      Time off Policy: - {item.policy?.title}
                    </span>
                    <span className="text-xs capitalize">
                      Duration: -
                      {`${item.policy?.duration} ${
                        item.policy?.duration !== undefined
                          ? item.policy.duration > 1
                            ? "days"
                            : "day"
                          : "Unknown"
                      }`}
                    </span>
                  </div>
                </div>
                <Dropdown
                  trigger={["click"]}
                  overlay={
                    <Menu>
                      <Menu.Item key={1}>
                        {/* <Link
                          to={
                            appRoutes.timeSheetDetails(
                              item?.employee?.id,
                              item.clockIn.date
                            ).path
                          }
                        >
                          View details
                        </Link> */}
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <i className="ri-more-fill text-base cursor-pointer" />
                </Dropdown>
              </div>
            ))
          ) : (
            <>
              <Empty />
            </>
          )}
        </Skeleton>
      </div>

      <div className="flex justify-end mt-2">
        <Link
          to={appRoutes.timeOff}
          className="text-caramel text-right px-3 text-sm font-semibold cursor-pointer hover:text-accent pb-2 pt-1"
        >
          See All
        </Link>
      </div>
    </div>
  );
};
