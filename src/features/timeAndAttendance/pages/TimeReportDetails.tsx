import { AttendanceSubToper } from "../components/AttendanceSubToper";
import { LineChart } from "components/charts/LineChart";
import { MONTH_CHART_LABELS } from "constants/general";
import { PageIntro } from "components/layout/PageIntro";
import { useState } from "react";
import { appRoutes } from "config/router/paths";
import { DatePicker } from "antd";
import { AttendanceReportDetailsTable } from "../components/AttendanceReportDetailsTable";

export const TimeReportDetails = () => {
  const [switchTabs, setSwitchTabs] = useState("Shift_Per_Employee");
  return (
    <>
      <AttendanceSubToper active="reports"/>

      <div className="Container">
        <PageIntro
          title="Shift Per Employee / Report"
          link={appRoutes.attendanceReport}
        />
        <div className="flex items-center gap-x-6 font-medium border-b md:text-base my-7">
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
        <div className="px-5 mb-7">
          <DatePicker />
          <LineChart
            data={Array(12).fill(12)}
            labels={MONTH_CHART_LABELS}
            dataEntityLabel=""
            bgColors={"#aaa"}
          />
        </div>

        <AttendanceReportDetailsTable />
      </div>
    </>
  );
};
