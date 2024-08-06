import { AttendanceSubToper } from "../../../components/AttendanceSubToper";
import { TimesheetCard } from "../components/TimesheetCard";
import { TimeOffRequestCard } from "../components/TimeOffRequestCard";
import { useGetCompanyOwnerDashboard } from "features/core/company/hooks/dashboard/useGetCompanyOwnerDashboard";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";
import { useEffect, useState } from "react";
import { useWelcomeNote } from "../hooks/useWelcomeNote";
import { useApiAuth } from "hooks/useApiAuth";
import AttendanceHomeCards from "../components/home/AttendanceHomeCards";
import AttendanceOverviewHomeCard from "../components/home/AttendanceOverviewHomeCard";
import WhoIsOut from "features/home/components/whoIsOut/WhoIsOut";
import AttendancePunctualityHomeCard from "../components/home/AttendancePunctualityHomeCard";
import AttendanceStatusHomeCard from "../components/home/AttendanceStatusHomeCard";
import AttendanceWelcomeHeader from "../components/home/AttendanceWelcomeHeader";
import { TFilterAttendanceDBFormProps } from "../components/home/FilterDBBtn";
import { useGetDashboardGraph } from "../hooks/useGetDashboardGraph";
import AttendanceLocationCard from "../components/home/AttendanceLocationCard";
import { PermissionRestrictor } from "components/permission-restriction/PermissionRestrictor";

export const AttendanceHome = () => {
  const [greeting, setGreeting] = useState("");
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const fullYear = today.getFullYear();
  const { data: timeDBData, isLoading: isLoadingTimeDBData } =
    useGetDashboardGraph({
      year: fullYear,
    });
  const { data: ownerDBData, isLoading: isLoadingOwnerDBData } =
    useGetCompanyOwnerDashboard({
      year: fullYear.toString(),
    });
  const hour = today.getHours();

  const { user, isLoading: isRetrievingUserData } = useMostRecentApiAuth();
  const { data: welcomeNoteData } = useWelcomeNote();
  const [filterProps, setFilterProps] = useState<TFilterAttendanceDBFormProps>(
    {}
  );

  useEffect(() => {
    if (hour >= 5 && hour < 12) {
      setGreeting("Morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Afternoon");
    } else {
      setGreeting("Evening");
    }
  }, [hour]);

  const { currentCompanyEmployeeDetails } = useApiAuth();


  return (
    <ErrorBoundary>
      <AttendanceSubToper active="none-active" />
      <div className="Container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-x-4 lg:gap-x-6 md:gap-y-8 lg:gap-y-12">
        <AttendanceWelcomeHeader
          {...{
            fullYear,
            month,
            greeting,
            userFullName: user?.fullName,
            welcomeNoteData,
            filterProps: {
              handleSubmit: (val) => setFilterProps(val),
              formData: filterProps,
            },
          }}
          className="flex justify-between col-span-4"
        />

        <AttendanceHomeCards className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3 col-span-4" />

        <PermissionRestrictor
          requiredPermissions={["view-time-and-attendance-dashboard-summary"]}
        >
          <AttendanceStatusHomeCard className="bg-mainBg pb-3 border rounded-lg text-sm shadow  col-span-1" />

          <AttendanceOverviewHomeCard className="bg-mainBg pb-3 border rounded-lg text-sm shadow  col-span-2" />
        </PermissionRestrictor>

        <PermissionRestrictor
          requiredPermissions={["view-all-time-and-attendance-timesheet"]}
        >
          <TimesheetCard className="bg-mainBg pb-3 border rounded-lg text-sm shadow col-span-1 flex flex-col" />
        </PermissionRestrictor>

        <PermissionRestrictor
          requiredPermissions={["view-time-and-attendance-dashboard-summary"]}
        >
          <AttendancePunctualityHomeCard
            className="col-span-3 bg-mainBg border rounded-lg text-sm shadow p-3"
            data={timeDBData ? Object.values(timeDBData) : []}
            labels={timeDBData ? Object.keys(timeDBData) : []}
            isLoading={isLoadingTimeDBData}
          />
        </PermissionRestrictor>

        <PermissionRestrictor
          requiredPermissions={["view-all-time-off-requests"]}
        >
          <TimeOffRequestCard className="bg-mainBg pb-3 border rounded-lg text-sm shadow col-span-1 flex flex-col" />
        </PermissionRestrictor>

        <AttendanceLocationCard
          className="col-span-3 bg-mainBg border rounded-lg text-sm shadow p-3"
          isLoading={isRetrievingUserData}
        />
        <PermissionRestrictor
          requiredPermissions={["view-time-and-attendance-dashboard-summary"]}
        >
          <WhoIsOut
            data={ownerDBData}
            isLoading={isLoadingOwnerDBData}
            className="col-span-4 bg-mainBg shadow border rounded-lg p-3"
          />
        </PermissionRestrictor>
      </div>
    </ErrorBoundary>
  );
};
