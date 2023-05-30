import { Badge, Dropdown } from "antd";
import { PageIntro } from "components/layout/PageIntro";
import { useFetchNotifications } from "../hooks/useFetchNotifications";

export const Notification = () => {
  const { data } = useFetchNotifications({});
  console.log(data, "notify");
  return (
    <>
      <div className="Container">
        <PageIntro title="Notifications" link="/" />
        <div className="flex justify-end mt-3">
          <h5 className="cursor-pointer font-medium hover:text-caramel pb-1">
            Clear All
          </h5>
        </div>
        {Array(3)
          .fill(0)
          .map(() => (
            <div className="border rounded mt-4 px-3 py-3 cursor-pointer hover:bg-card flex md:justify-between gap-x-5">
              <div className="flex items-center gap-3">
                <Badge dot>
                  <i className="ri-notification-3-line text-lg"></i>
                </Badge>
                <div>
                  <h5 className="text-xs md:text-sm">
                    Loan Request : Your loan request has been approved
                  </h5>
                  <span className="text-xs md:hidden pt-2 block">4h ago</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="md:flex items-center hidden gap-2 text-accent">
                  <i className="ri-timer-line text-base"></i>
                  <span>4h ago</span>
                </div>
                <Dropdown
                  overlay={
                    <div className="bg-mainBg rounded shadow-sm py-3 px-2 text-xs border font-medium">
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
    </>
  );
};
