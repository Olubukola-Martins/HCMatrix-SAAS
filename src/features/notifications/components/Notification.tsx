import { onMessageListener, requestFirebaseToken } from "config/firebase";
import React from "react";

export const Notification = () => {
  requestFirebaseToken();

  onMessageListener()
    .then((payload) => {
      console.log("PAYLOAD", payload);
      //   setNotification({title: payload?.notification?.title, body: payload?.notification?.body});
    })
    .catch((err: any) => console.log("failed: ", err));
  return <div>Notification</div>;
};
