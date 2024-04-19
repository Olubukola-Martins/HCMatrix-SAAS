import { ColumnsType } from "antd/lib/table";
import { timeSheetProps } from "../../types";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { convertMinutesToHours } from "features/timeAndAttendance/utils";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

export const TIME_SHEET_TABLE_COLUMNS = (
  noAttendance: () => void
): ColumnsType<timeSheetProps> => [
  {
    title: "Name",
    dataIndex: "name",
    render: (_, val) => (
      <span className="capitalize">
        {/* {val?.employee?.firstName} {val?.employee?.lastName} */}
        {getEmployeeFullName(val?.employee)}
      </span>
    ),
  },
  {
    title: "Monday",
    dataIndex: "monday",
    render: (_, val) =>
      val?.days?.Monday?.date ? (
        <Link
          className="hover:text-caramel"
          to={
            appRoutes.timeSheetDetails(
              val?.employee?.id,
              val?.days?.Monday?.date
            ).path
          }
        >
          {convertMinutesToHours(val?.days?.Monday?.totalTimeTracked)}
        </Link>
      ) : (
        <div
          className="hover:text-caramel cursor-pointer"
          onClick={() => noAttendance()}
        >
          {convertMinutesToHours(val?.days?.Monday?.totalTimeTracked)}
        </div>
      ),
  },
  {
    title: "Tuesday",
    dataIndex: "tuesday",
    render: (_, val) =>
      val?.days?.Tuesday?.date ? (
        <Link
          className="hover:text-caramel"
          to={
            appRoutes.timeSheetDetails(
              val?.employee?.id,
              val?.days?.Tuesday?.date
            ).path
          }
        >
          {convertMinutesToHours(val?.days?.Tuesday?.totalTimeTracked)}
        </Link>
      ) : (
        <div
          className="hover:text-caramel cursor-pointer"
          onClick={() => noAttendance()}
        >
          {convertMinutesToHours(val?.days?.Tuesday?.totalTimeTracked)}
        </div>
      ),
  },
  {
    title: "Wednesday",
    dataIndex: "wednesday",
    render: (_, val) =>
      val?.days?.Wednesday?.date ? (
        <Link
          className="hover:text-caramel"
          to={
            appRoutes.timeSheetDetails(
              val?.employee?.id,
              val?.days?.Wednesday?.date
            ).path
          }
        >
          {convertMinutesToHours(val?.days?.Wednesday?.totalTimeTracked)}
        </Link>
      ) : (
        <div
          className="hover:text-caramel cursor-pointer"
          onClick={() => noAttendance()}
        >
          {convertMinutesToHours(val?.days?.Wednesday?.totalTimeTracked)}
        </div>
      ),
  },
  {
    title: "Thursday",
    dataIndex: "thursday",
    render: (_, val) =>
      val?.days?.Thursday?.date ? (
        <Link
          className="hover:text-caramel"
          to={
            appRoutes.timeSheetDetails(
              val?.employee?.id,
              val?.days?.Thursday?.date
            ).path
          }
        >
          {convertMinutesToHours(val?.days?.Thursday?.totalTimeTracked)}
        </Link>
      ) : (
        <div
          className="hover:text-caramel cursor-pointer"
          onClick={() => noAttendance()}
        >
          {convertMinutesToHours(val?.days?.Thursday?.totalTimeTracked)}
        </div>
      ),
  },
  {
    title: "Friday",
    dataIndex: "friday",
    render: (_, val) =>
      val?.days?.Friday?.date ? (
        <Link
          className="hover:text-caramel"
          to={
            appRoutes.timeSheetDetails(
              val?.employee?.id,
              val?.days?.Friday?.date
            ).path
          }
        >
          {convertMinutesToHours(val?.days?.Friday?.totalTimeTracked)}
        </Link>
      ) : (
        <div
          className="hover:text-caramel cursor-pointer"
          onClick={() => noAttendance()}
        >
          {convertMinutesToHours(val?.days?.Friday?.totalTimeTracked)}
        </div>
      ),
  },
  {
    title: "Saturday",
    dataIndex: "saturday",
    render: (_, val) =>
      val?.days?.Saturday?.date ? (
        <Link
          className="hover:text-caramel"
          to={
            appRoutes.timeSheetDetails(
              val?.employee?.id,
              val?.days?.Saturday?.date
            ).path
          }
        >
          {convertMinutesToHours(val?.days?.Saturday?.totalTimeTracked)}
        </Link>
      ) : (
        <div
          className="hover:text-caramel cursor-pointer"
          onClick={() => noAttendance()}
        >
          {convertMinutesToHours(val?.days?.Saturday?.totalTimeTracked)}
        </div>
      ),
  },
  {
    title: "Sunday",
    dataIndex: "sunday",
    render: (_, val) =>
      val?.days?.Sunday?.date ? (
        <Link
          className="hover:text-caramel"
          to={
            appRoutes.timeSheetDetails(
              val?.employee?.id,
              val?.days?.Sunday?.date
            ).path
          }
        >
          {convertMinutesToHours(val?.days?.Sunday?.totalTimeTracked)}
        </Link>
      ) : (
        <div
          className="hover:text-caramel cursor-pointer"
          onClick={() => noAttendance()}
        >
          {convertMinutesToHours(val?.days?.Sunday?.totalTimeTracked)}
        </div>
      ),
  },
  {
    title: "Total",
    dataIndex: "total",
    render: (_, val) => convertMinutesToHours(val?.totalWeeklyTimeTracked),
  },
];

export const TIME_SHEET_EXPORT_COLUMNS = (
  items?: timeSheetProps[]
): Record<string, string | number>[] => {
  return (
    items?.map((val) => ({
      Name: getEmployeeFullName(val?.employee),
      Monday: convertMinutesToHours(val?.days?.Monday?.totalTimeTracked),
      Tuesday: convertMinutesToHours(val?.days?.Tuesday?.totalTimeTracked),
      Wednesday: convertMinutesToHours(val?.days?.Wednesday?.totalTimeTracked),
      Thursday: convertMinutesToHours(val?.days?.Thursday?.totalTimeTracked),
      Friday: convertMinutesToHours(val?.days?.Friday?.totalTimeTracked),
      Saturday: convertMinutesToHours(val?.days?.Saturday?.totalTimeTracked),
      Sunday: convertMinutesToHours(val?.days?.Sunday?.totalTimeTracked),
      Total: convertMinutesToHours(val?.totalWeeklyTimeTracked),
    })) ?? []
  );
};
