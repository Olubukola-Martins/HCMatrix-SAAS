import { PageIntro } from "components/layout/PageIntro";
import { NotificationList } from "../components/NotificationList";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import { MarkAllAsRead } from "../components/MarkAllAsRead";
import { DeleteAllNotifications } from "../components/DeleteAllNotifications";

type TAction = "delete" | "as-read";
export const Notification = () => {
  const [action, setAction] = useState<TAction>();
  const onClear = () => {
    setAction(undefined);
  };
  return (
    <>
      <MarkAllAsRead open={action === "as-read"} handleClose={onClear} />
      <DeleteAllNotifications
        open={action === "delete"}
        handleClose={onClear}
      />
      <div className="Container">
        <PageIntro title="Notifications" link={appRoutes.home} />
        <div className="flex justify-end gap-5 mt-3">
          <h5
            className="cursor-pointer underline hover:no-underline underline-offset-2 font-medium hover:text-caramel pb-1"
            onClick={() => setAction("as-read")}
          >
            Mark all as read
          </h5>
          <h5
            className="cursor-pointer underline hover:no-underline underline-offset-2 font-medium hover:text-caramel pb-1"
            onClick={() => setAction("delete")}
          >
            Clear All
          </h5>
        </div>
        <NotificationList />
      </div>
    </>
  );
};
