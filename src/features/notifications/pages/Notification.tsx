import { PageIntro } from "components/layout/PageIntro";
import { NotificationList } from "../components/NotificationList";
import { appRoutes } from "config/router/paths";

export const Notification = () => {
  return (
    <>
      <div className="Container">
        <PageIntro title="Notifications" link={appRoutes.home} />
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
