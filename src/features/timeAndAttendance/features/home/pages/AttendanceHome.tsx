import { AttendanceSubToper } from "../../../components/AttendanceSubToper";
import { SimpleCard } from "components/cards/SimpleCard";
import { AttendanceMonthCard } from "../../../components/AttendanceMonthCard";
import { TimesheetCard } from "../components/TimesheetCard";
import { Tabs } from "antd";
import { TimeOffRequestCard } from "../components/TimeOffRequestCard";
import { useGetCompanyOwnerDashboard } from "features/core/company/hooks/dashboard/useGetCompanyOwnerDashboard";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { LeaveWhoIsOut } from "features/home/components/whoIsOut/LeaveWhoIsOut";
import { RemoteWhoIsOut } from "features/home/components/whoIsOut/RemoteWhoIsOut";
import { useGetAnalyticsRecord } from "../hooks/useGetAnalyticsRecord";
import { useGetDashboardGraph } from "../hooks/useGetDashboardGraph";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";
import { useEffect, useState } from "react";
import { useWelcomeNote } from "../hooks/useWelcomeNote";

export const AttendanceHome = () => {
  const [greeting, setGreeting] = useState("");
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const fullYear = today.getFullYear();
  const { data, isError, isLoading, error } = useGetCompanyOwnerDashboard({
    year: fullYear.toString(),
  });
  const hour = today.getHours();

  const { data: analyticsData, isLoading: analyticsLoading } =
    useGetAnalyticsRecord();
  const { user } = useMostRecentApiAuth();
  const { data: welcomeNoteData } = useWelcomeNote();


  useEffect(() => {
    if (hour >= 5 && hour < 12) {
      setGreeting("Morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Afternoon");
    } else {
      setGreeting("Evening");
    }
  }, [hour]);

  return (
    <ErrorBoundary>
      <AttendanceSubToper active="none-active" />
      <div className="Container">
        <div className="flex justify-between">
          <div>
            <h2 className="font-medium text-lg pb-2">
              Good {greeting} {user?.fullName}
            </h2>
            <p>{welcomeNoteData}</p>
          </div>
          <div>
            <button className="border rounded px-3 py-2 flex items-center gap-x-3 font-medium">
              <i className="ri-calendar-2-line"></i>
              <span>
                {month} {fullYear}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3">
          <SimpleCard
            title="Clocked in"
            highlight={analyticsData?.clockIns || 0}
          />
          <SimpleCard
            title="Clocked out"
            highlight={analyticsData?.clockOuts || 0}
          />
          <SimpleCard
            title="Break"
            highlight={analyticsData?.employeesOnBreak || 0}
          />

          <SimpleCard
            title="Remote workers"
            highlight={analyticsData?.remoteWorkers?.count || 0}
          />
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
                  label: `Leave (${data?.outToday.leave.totalCount})`,
                  children: (
                    <LeaveWhoIsOut data={data?.outToday.leave.result} />
                  ),
                },
                {
                  key: "2",
                  label: `Remote Work (${data?.outToday.remoteWork.totalCount})`,
                  children: (
                    <RemoteWhoIsOut data={data?.outToday.remoteWork.result} />
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
    </ErrorBoundary>
  );
};
