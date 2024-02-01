import { AttendanceHome } from "features/timeAndAttendance/pages/AttendanceHome";
import { TRouteData } from "../types";
import { appRoutes } from "../paths";
import { TimeSheet } from "features/timeAndAttendance/pages/TimeSheet";
import { TimeOff } from "features/timeAndAttendance/pages/TimeOff";
import { UploadTimesheet } from "features/timeAndAttendance/pages/UploadTimesheet";
import { TimeSheetDetails } from "features/timeAndAttendance/pages/TimeSheetDetails";
import { WorkSchedule } from "features/timeAndAttendance/pages/settings/WorkSchedule";
import { TimeOffPolicy } from "features/timeAndAttendance/pages/settings/TimeOffPolicy";
import { ShiftPerEmployee } from "features/timeAndAttendance/pages/report/ShiftPerEmployee";
import { HoursPerEmployee } from "features/timeAndAttendance/pages/report/HoursPerEmployee";
import { EmployeesPerShift } from "features/timeAndAttendance/pages/report/EmployeesPerShift";
import TimeTrackingRules from "features/timeAndAttendance/features/settings/timeTrackingRules/pages/TimeTrackingRules";
import { OtherSettings } from "features/timeAndAttendance/features/settings/otherSettings/pages/OtherSettings";
import Biometrics from "features/timeAndAttendance/features/settings/Biometrics/pages/Biometrics";
import Location from "features/timeAndAttendance/features/settings/location/pages/Location";

export const attendanceRoutes: TRouteData[] = [
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
    element: <UploadTimesheet />,
    path: appRoutes.uploadAttendance,
    isSearchable: false,
  },
  {
    element: <TimeSheetDetails />,
    path: appRoutes.timeSheetDetails().format,
    isSearchable: false,
  },
  {
    element: <TimeTrackingRules />,
    path: appRoutes.timeTrackingRules,
    isSearchable: false,
  },
  {
    element: <WorkSchedule />,
    path: appRoutes.workSchedule,
    isSearchable: false,
  },
  {
    element: <TimeOffPolicy />,
    path: appRoutes.timeOffPolicy,
    isSearchable: false,
  },
  {
    element: <Biometrics />,
    path: appRoutes.biometrics,
    isSearchable: false,
  },
  {
    element: <Location />,
    path: appRoutes.location,
    isSearchable: false,
  },
  {
    element: <OtherSettings />,
    path: appRoutes.otherSettings,
    isSearchable: false,
  },

  {
    element: <ShiftPerEmployee/>,
    path: appRoutes.shiftPerEmployee,
    isSearchable: false,
  },
  {
    element: <HoursPerEmployee/>,
    path: appRoutes.hoursPerEmployee,
    isSearchable: false,
  },
  {
    element: <EmployeesPerShift/>,
    path: appRoutes.employeesPerShift,
    isSearchable: false,
  },
];
