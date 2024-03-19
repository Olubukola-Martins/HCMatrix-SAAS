import { AttendanceSubToper } from "../../../components/AttendanceSubToper";
import { SimpleCard } from "components/cards/SimpleCard";
import { AttendanceMonthCard } from "../../../components/AttendanceMonthCard";
import { TimesheetCard } from "../../../components/TimesheetCard";
import { Tabs } from "antd";
import { TimeOffRequestCard } from "../../../components/TimeOffRequestCard";

export const AttendanceHome = () => {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  return (
    <>
      <AttendanceSubToper active="none-active" />
      <div className="Container">
        <div className="flex justify-between">
          <div>
            <h2 className="font-medium text-lg pb-2">Good morning Esther</h2>
            <p>
              Welcome to border, here is a breakdown summary of all employee
              attendance today.
            </p>
          </div>
          <div>
            <button className="border rounded px-3 py-2 flex items-center gap-x-3 font-medium">
              <i className="ri-calendar-2-line"></i>
              <span>
                {month} {year}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3">
          <SimpleCard title="Clocked in" highlight="0" />
          <SimpleCard title="Clocked out" highlight="0" />
          <SimpleCard title="Break" highlight="0" />
          <SimpleCard title="Remote workers" highlight="0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          <div className="col-span-4">
            <AttendanceMonthCard />
          </div>
          <div className="lg:col-span-2 col-span-6">
            <TimesheetCard />
          </div>

          <div className="col-span-4 bg-mainBg shadow border rounded-lg p-3">
            <h3 className="text-base">Who is out?</h3>

            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Leave (0)",
                  children: (
                    <>
                      <h4>No One is Currently on Leave</h4>
                    </>
                  ),
                },
                {
                  key: "2",
                  label: "Remote Work (0)",
                  children: (
                    <>
                      <h4>No Remote Worker</h4>
                    </>
                  ),
                },
              ]}
            />
          </div>
          <div className="lg:col-span-2 col-span-6">
            <TimeOffRequestCard />
          </div>
        </div>
      </div>
    </>
  );
};
