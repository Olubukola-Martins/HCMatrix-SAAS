import { AttendanceHome } from "features/timeAndAttendance/features/home/pages/AttendanceHome";
import { TAppPageDataFnProps, TRouteData } from "../types";
import { appRoutes } from "../paths";
import TimeTrackingRules from "features/timeAndAttendance/features/settings/timeTrackingRules/pages/TimeTrackingRules";
import { OtherSettings } from "features/timeAndAttendance/features/settings/otherSettings/pages/OtherSettings";
import Biometrics from "features/timeAndAttendance/features/settings/Biometrics/pages/Biometrics";
import Location from "features/timeAndAttendance/features/settings/location/pages/Location";
import TimeOffPolicy from "features/timeAndAttendance/features/settings/timeOffPolicy/pages/TimeOffPolicy";
import WorkSchedule from "features/timeAndAttendance/features/settings/workSchedule/pages/WorkSchedule";
import HoursPerEmployee from "features/timeAndAttendance/features/reports/pages/HoursPerEmployee";
import EmployeesPerShift from "features/timeAndAttendance/features/reports/pages/EmployeesPerShift";
import { TimeOff } from "features/timeAndAttendance/features/timeOff/pages/TimeOff";
import TimeSheet from "features/timeAndAttendance/features/timeSheet/pages/TimeSheet";
import TimeSheetDetails from "features/timeAndAttendance/features/timeSheet/pages/TimeSheetDetails";
import WorkBreak from "features/timeAndAttendance/features/settings/break/Pages/WorkBreak";
import SwapShiftRequest from "features/timeAndAttendance/features/swapShiftRequest/pages/SwapShiftRequest";
import { canUserAccessComponent } from "components/permission-restriction/PermissionRestrictor";

export const attendanceRoutes = (props: TAppPageDataFnProps): TRouteData[] => {
  const { userPermissions, licenseType, activeSubscription } = props;
  const isUserLicensed = licenseType === "licensed";
  return [
    {
      element: <AttendanceHome />,
      path: appRoutes.attendanceHome,
      isSearchable: true,
      title: "Time & Attendance",
    },

    {
      element: <TimeSheet />,
      path: appRoutes.timeSheet,
      isSearchable: true,
      title: "Time-sheet",
    },
    {
      element: <TimeOff />,
      path: appRoutes.timeOff,
      isSearchable: true,
      title: "Time-off",
    },

    {
      element: <SwapShiftRequest />,
      path: appRoutes.swapShiftRequest,
      isSearchable: true,
      title: "Swap Shift Request",
    },

    {
      element: <TimeSheetDetails />,
      path: appRoutes.timeSheetDetails().format,
      isSearchable: false,
    },
    // start
    {
      element: <TimeTrackingRules />,
      path: appRoutes.timeTrackingRules,
      isSearchable: false,
      hidden:
        !isUserLicensed &&
        !canUserAccessComponent({
          userPermissions,
          requiredPermissions: ["manage-time-and-attendance-settings"],
          activeSubscription,
          requiredSubscriptionState: {
            label: "time-and-attendance",
            resources: [],
          },
        }),
    },
    {
      element: <WorkSchedule />,
      path: appRoutes.workSchedule,
      isSearchable: false,
      hidden:
      !isUserLicensed &&
      !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-time-and-attendance-settings"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "time-and-attendance",
          resources: [],
        },
      }),
    },
    {
      element: <TimeOffPolicy />,
      path: appRoutes.timeOffPolicy,
      isSearchable: false,
      hidden:
      !isUserLicensed &&
      !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-time-and-attendance-settings"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "time-and-attendance",
          resources: [],
        },
      }),
    },
    {
      element: <Biometrics />,
      path: appRoutes.biometrics,
      isSearchable: false,
      hidden:
      !isUserLicensed &&
      !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-time-and-attendance-settings"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "time-and-attendance",
          resources: [],
        },
      }),
    },
    {
      element: <Location />,
      path: appRoutes.location,
      isSearchable: false,
      hidden:
      !isUserLicensed &&
      !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-time-and-attendance-settings"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "time-and-attendance",
          resources: [],
        },
      }),
    },
    {
      element: <OtherSettings />,
      path: appRoutes.otherSettings,
      isSearchable: false,
      hidden:
      !isUserLicensed &&
      !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-time-and-attendance-settings"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "time-and-attendance",
          resources: [],
        },
      }),
    },

    {
      element: <WorkBreak />,
      path: appRoutes.breakSetUp,
      isSearchable: false,
      hidden:
      !isUserLicensed &&
      !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-time-and-attendance-settings"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "time-and-attendance",
          resources: [],
        },
      }),
    },
    // end
    {
      element: <HoursPerEmployee />,
      path: appRoutes.hoursPerEmployee,
      isSearchable: false,
      hidden:
      !isUserLicensed &&
      !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-time-and-attendance-reports"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "time-and-attendance",
          resources: [],
        },
      }),
    },
    {
      element: <EmployeesPerShift />,
      path: appRoutes.employeesPerShift,
      isSearchable: false,
      hidden:
      !isUserLicensed &&
      !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-time-and-attendance-reports"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "time-and-attendance",
          resources: [],
        },
      }),
    },
  ];
};
