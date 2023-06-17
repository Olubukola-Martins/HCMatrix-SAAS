import { PageIntro } from "components/layout/PageIntro";
import { SubToper } from "../components/SubToper";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import { ShiftPerEmpReport } from "../components/ShiftPerEmpReport";
import { HoursPerEmpReport } from "../components/HoursPerEmpReport";
import { EmpPerShift } from "../components/EmpPerShift";

export const TimeReport = () => {
  const [switchTabs, setSwitchTabs] = useState("Shift_Per_Employee");
  return (
    <>
      <SubToper />
      <div className="Container">
        <PageIntro title="Report" link={appRoutes.attendanceHome} />
        <p className="pt-2 pb-5">Welcome on board, set your time off policy</p>

        <div className="flex items-center gap-x-6 font-medium border-b md:text-base mb-7">
          <div>
            <span
              className="cursor-pointer"
              onClick={() => setSwitchTabs("Shift_Per_Employee")}
            >
              Shift Per Employee
            </span>
            <div
              className={
                switchTabs === "Shift_Per_Employee"
                  ? "border-b-4 border-caramel md:mx-3 pt-2"
                  : "md:mx-3 pt-2"
              }
            />
          </div>
          <div>
            <span
              className="cursor-pointer"
              onClick={() => setSwitchTabs("Hours_Per_Employee")}
            >
              Hours Per Employee
            </span>
            <div
              className={
                switchTabs === "Hours_Per_Employee"
                  ? "border-b-4 border-caramel md:mx-3 pt-2"
                  : "md:mx-3 pt-2"
              }
            />
          </div>
          <div>
            <span
              className="cursor-pointer"
              onClick={() => setSwitchTabs("Employee_Per_shift")}
            >
              Employee Per Shift
            </span>
            <div
              className={
                switchTabs === "Employee_Per_shift"
                  ? "border-b-4 border-caramel md:mx-3 pt-2"
                  : "md:mx-3 pt-2"
              }
            />
          </div>
        </div>

        {switchTabs === "Shift_Per_Employee" && <ShiftPerEmpReport />}
        {switchTabs === "Hours_Per_Employee" && <HoursPerEmpReport />}
        {switchTabs === "Employee_Per_shift" && <EmpPerShift />}
      </div>
    </>
  );
};
