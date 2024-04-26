import { appRoutes } from "config/router/paths";

export const createPendingSetupLinks = (value: string): string => {
  let link = "";
  switch (value) {
    case "workSchedule":
      link = appRoutes.workSchedule;
      break;
    case "others":
      link = appRoutes.otherSettings;
      break;
    case "timeTrackingRules":
      link = appRoutes.timeTrackingRules;
      break;
    case "break":
      link = appRoutes.breakSetUp;
      break;
    case "scheduleEmployeeShift":
      link = appRoutes.workSchedule;
      break;
    case "timeOffPolicy":
      link = appRoutes.timeOffPolicy;
      break;
    case "biometrics":
      link = appRoutes.biometrics;
      break;
    case "locations":
      link = appRoutes.location;
      break;

    default:
      break;
  }

  return link;
};
