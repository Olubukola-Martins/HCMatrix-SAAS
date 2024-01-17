import { notification } from "antd";
import { ReactNode } from "react";

const NOTIFICATION_KEY = "general notification";
const DEFAULT_DURATION = 8;
export const openNotification = ({
  title,
  description,
  state,
  duration,
  key = NOTIFICATION_KEY,
}: {
  title: string;
  description: string | ReactNode;
  state?: "open" | "success" | "error" | "info";
  duration?: number;
  key?: string;
}) => {
  notification[state ?? "open"]({
    key,
    message: title,
    description,
    duration: duration ?? DEFAULT_DURATION,
    onClick: () => {},
  });
};
