import React from "react";
import { AttendanceSubToper } from "../AttendanceSubToper";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { PageIntro } from "components/layout/PageIntro";
import { AppButton } from "components/button/AppButton";

interface IProps {
  active: "Shift_Per_Employee" | "Hours_Per_Employee" | "Employee_Per_shift";
}
export const ReportNav = (props: IProps) => {
  const applyStyle = "border-b-4 border-caramel md:mx-3 pt-2";
  return (
    <>
      <AttendanceSubToper active="reports" />
      <div className="Container flex items-center justify-between mb-3">
        <PageIntro title="Report" link={appRoutes.attendanceHome} />
        <div className="flex items-center gap-x-3">
          <button className="flex items-center gap-2 transparentButton">
            <span className="text-caramel">Filter</span>{" "}
            <i className="ri-filter-2-line text-caramel text-lg"></i>
          </button>
          <AppButton />
        </div>
      </div>
      <div className="flex items-center gap-x-6 font-medium border-b md:text-base mb-7 Container">
        <Link to={appRoutes.shiftPerEmployee}>
          <span className="cursor-pointer">Shift Per Employee</span>
          <div
            className={
              props.active === "Shift_Per_Employee"
                ? `${applyStyle}`
                : "md:mx-3 pt-2"
            }
          />
        </Link>

        <Link to={appRoutes.hoursPerEmployee}>
          <span className="cursor-pointer">Hours Per Employee</span>
          <div
            className={
              props.active === "Hours_Per_Employee"
                ? `${applyStyle}`
                : "md:mx-3 pt-2"
            }
          />
        </Link>
        <Link to={appRoutes.employeesPerShift}>
          <span className="cursor-pointer">Employee Per Shift</span>
          <div
            className={
              props.active === "Employee_Per_shift"
                ? `${applyStyle}`
                : "md:mx-3 pt-2"
            }
          />
        </Link>
      </div>
    </>
  );
};
