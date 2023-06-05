import { AttendanceHome } from "features/timeAndAttendance/pages/AttendanceHome";
import { TRouteData } from "../types";
import { appRoutes } from "../paths";

export const attendanceRoutes: TRouteData[] = [
  {
    element: <AttendanceHome />,
    path: appRoutes.attendanceHome,
    isSearchable: true,
    title: "Time & Attendance",
  },
];
