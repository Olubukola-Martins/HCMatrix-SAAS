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
  fireBaseToken: string;
  auth: {
    companyId: number;
    token: string;
  };
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.NOTIFICATION}/firebase/fcm-token`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };
  const data = {
    token: props.fireBaseToken,
  };

  const response = await axios.post(url, data, config);

  return response;
};

export const requestNotificationsPermission = async ({
  companyId,
  token,
  employeeId,
}: {
  companyId: number;
  employeeId: number;
  token: string;
}) => {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    await saveMessagingDeviceToken({ companyId, token, employeeId });
  } else {
    // TO DO: Propogate message to ui to inform user
  }
};
export const saveMessagingDeviceToken = async ({
  companyId,
  token,
  employeeId,
}: {
  companyId: number;
  employeeId: number;
  token: string;
}) => {
  const msg = await messaging();
  if (!msg) {
    // TO DO: send a notification to inform user
    return "Browser does not support push notifications, switch to another browser";
  }

  const fcmToken = await getToken(msg, { vapidKey: VAPID_KEY });

  if (fcmToken && msg) {
    // make api call to send token and employeeId to backend
    await handleFCMToken({
      auth: { companyId, token },
      fireBaseToken: fcmToken,
    });

    onMessage(msg, (message) => {
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
    requestNotificationsPermission({ companyId, token, employeeId });
  }
};
