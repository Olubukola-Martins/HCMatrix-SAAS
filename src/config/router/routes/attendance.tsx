import { AttendanceHome } from "features/timeAndAttendance/pages/AttendanceHome";
import { TRouteData } from "../types";
import { appRoutes } from "../paths";
import { TimeSheet } from "features/timeAndAttendance/pages/TimeSheet";
import { TimeOff } from "features/timeAndAttendance/pages/TimeOff";
import { TimeReport } from "features/timeAndAttendance/pages/TimeReport";
import { UploadTimesheet } from "features/timeAndAttendance/pages/UploadTimesheet";
import { TimeSheetDetails } from "features/timeAndAttendance/pages/TimeSheetDetails";
import { TimeReportDetails } from "features/timeAndAttendance/pages/TimeReportDetails";
import { TimeTrackingRules } from "features/timeAndAttendance/pages/settings/TimeTrackingRules";
import { WorkSchedule } from "features/timeAndAttendance/pages/settings/WorkSchedule";
import { TimeOffPolicy } from "features/timeAndAttendance/pages/settings/TimeOffPolicy";
import { ClockIn } from "features/timeAndAttendance/pages/settings/ClockIn";
import { AddLocation } from "features/timeAndAttendance/pages/settings/AddLocation";
import { Other } from "features/timeAndAttendance/pages/settings/Other";
import { ShiftPerEmployee } from "features/timeAndAttendance/pages/report/ShiftPerEmployee";
import { HoursPerEmployee } from "features/timeAndAttendance/pages/report/HoursPerEmployee";
import { EmployeesPerShift } from "features/timeAndAttendance/pages/report/EmployeesPerShift";

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
    element: <TimeReport />,
    path: appRoutes.attendanceReport,
    isSearchable: true,
    title: "attendance report",
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
    element: <TimeReportDetails />,
    path: appRoutes.attendanceReportDetails().format,
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
    element: <ClockIn />,
    path: appRoutes.clockInSettings,
    isSearchable: false,
  },
  {
    element: <AddLocation />,
    path: appRoutes.addLocation,
    isSearchable: false,
  },
  {
    element: <Other />,
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
