import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import axios from "axios";
import { openNotification } from "utils/notifications";

const VAPID_KEY =
  "BNksQuoGE7iAnui3NM6TeLKazyCTI25mwZzNMPTqmWu9vRDfl-19AeyxAoS7z9tVfl14tJob9bLVNNFhof9kcSc";
export const APP_AUTHORIZATION_TOKEN_FOR_FCM_TOKEN_ENDPOINT =
  "6e964d49fbb3a02748ee80e5b42346d3cedd460cda2c3292c946607b5b8a953e";
const handleFCMToken = async (props: {
  employeeId: number;
  fireBaseToken: string;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.NOTIFICATION}/firebase/fcm-token`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${APP_AUTHORIZATION_TOKEN_FOR_FCM_TOKEN_ENDPOINT}`,
    },
  };
  const data = {
    token: props.fireBaseToken,
    employeeId: props.employeeId,
  };

  const response = await axios.post(url, data, config);

  console.log("FCM", response);
  return response;
};

export const requestNotificationsPermission = async ({
  employeeId,
}: {
  employeeId: number;
}) => {
  console.log("Requesting Notifications permission");
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    await saveMessagingDeviceToken({ employeeId });
  } else {
    console.log("Unable to get permission to notify");
    // TO DO: Propogate message to ui to inform user
  }
};
export const saveMessagingDeviceToken = async ({
  employeeId,
}: {
  employeeId: number;
}) => {
  const msg = await messaging();
  if (!msg) {
    // TO DO: send a notification to inform user
    return "Browser does not support push notifications, switch to another browser";
  }

  const fcmToken = await getToken(msg, { vapidKey: VAPID_KEY });
  console.log("fcmToken: ", fcmToken);

  if (fcmToken && msg) {
    console.log("Got FCM device token:", fcmToken);
    // make api call to send token and employeeId to backend
    await handleFCMToken({ employeeId, fireBaseToken: fcmToken });

    onMessage(msg, (message) => {
      console.log(
        "New foreground notification from firebase",
        message.notification
      );
      const notification = message.notification;
      notification?.title &&
        new Notification(notification?.title, { body: notification.body });

      if (notification) {
        openNotification({
          state: "success",

          title: notification?.title ?? "",
          description: notification.body,
          // duration: 0.4,
        });
      }
    });
  } else {
    console.log("Permission needed");
    requestNotificationsPermission({ employeeId });
  }
};
