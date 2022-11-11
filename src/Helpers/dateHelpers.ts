import { Duration } from "moment";

export const calcDuration = (duration: Duration) => {
  let ans = "";

  if (duration.asDays() > 0) {
    ans += `${Math.floor(duration.asDays())}${
      Math.floor(duration.asDays()) > 1 ? "days" : "day"
    } `;
  }

  if (duration.hours() > 0) {
    ans += `${Math.floor(duration.hours())}${
      Math.floor(duration.hours()) > 1 ? "hrs" : "hr"
    } `;
  }

  if (duration.minutes() > 0) {
    ans += Math.floor(duration.minutes()) + "min ";
  }

//   if (duration.seconds() > 0) {
//     ans += Math.floor(duration.seconds()) + "s ";
//   }

  return ans;
};
