import moment from "moment";

export const convertMinutesToHours = (val: number) => {
  const duration = moment.duration(val, "minutes");
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  return `${hours}h:${minutes}m`;
};
