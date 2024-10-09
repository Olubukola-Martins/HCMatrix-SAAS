import moment from "moment";
import { openNotification } from "utils/notifications";

export const convertMinutesToHours = (val: number) => {
  const duration = moment.duration(val, "minutes");
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  return `${hours}h:${minutes}m`;
};

export const noAttendance = () => {
  openNotification({
    state: "error",
    title: "Error",
    description: "Attendance not found",
    duration: 4.5,
  });
};