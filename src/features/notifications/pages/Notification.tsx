import { Badge, Dropdown } from "antd";
import { PageIntro } from "components/layout/PageIntro";
import { useFetchNotifications } from "../hooks/useFetchNotifications";
import moment from "moment";
import { NotificationList } from "../components/NotificationList";

export const Notification = () => {
  const { data } = useFetchNotifications({});
  return (
    <>
      <div className="Container">
        <PageIntro title="Notifications" link="/" />
        <div className="flex justify-end mt-3">
          <h5 className="cursor-pointer font-medium hover:text-caramel pb-1">
            Clear All
          </h5>
        </div>
        <NotificationList />
      </div>
    </>
  );
};
