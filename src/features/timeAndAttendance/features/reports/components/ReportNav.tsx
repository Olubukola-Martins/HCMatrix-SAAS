import { AttendanceSubToper } from "../../../components/AttendanceSubToper";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { PageIntro } from "components/layout/PageIntro";

interface IProps {
  active: "Hours_Per_Employee" | "Employee_Per_shift";
}
export const ReportNav = (props: IProps) => {
  const applyStyle = "border-b-4 border-caramel md:mx-3 pt-2";
  return (
    <>
      <div className="Container">
        <div className="flex items-center gap-x-6 font-medium border-b md:text-base mb-7">
          {/* <Link to={appRoutes.shiftPerEmployee}>
            <span className="cursor-pointer">Shift Per Employee</span>
            <div
              className={
                props.active === "Shift_Per_Employee"
                  ? `${applyStyle}`
                  : "md:mx-3 pt-2"
              }
            />
          </Link> */}

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
      </div>
    </>
  );
};
