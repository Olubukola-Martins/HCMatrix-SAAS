import { AttendanceHome } from "features/timeAndAttendance/pages/AttendanceHome";
import { TRouteData } from "../types";
import { appRoutes } from "../paths";
import { TimeSheet } from "features/timeAndAttendance/pages/TimeSheet";
import { TimeOff } from "features/timeAndAttendance/pages/TimeOff";
import { TimeReport } from "features/timeAndAttendance/pages/TimeReport";
import { UploadTimesheet } from "features/timeAndAttendance/pages/UploadTimesheet";
import { TimeSheetDetails } from "features/timeAndAttendance/pages/TimeSheetDetails";

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
];
